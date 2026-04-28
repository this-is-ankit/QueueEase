import React, { useState, useEffect, useContext, useMemo } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { StatusBar } from 'expo-status-bar';

import { AuthContext } from '../../context/AuthContext';
import { bookAppointment } from '../../api/appointment.api';
import { getClinicById } from '../../api/clinic.api';
import { normalizeClinic, unwrapApiData } from '../../utils/helpers';

const generateNext7Days = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const d = new Date();
    d.setDate(today.getDate() + i);
    dates.push({
      dateStr: d.toISOString().split('T')[0],
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: d.getDate(),
    });
  }
  return dates;
};

const BookAppointmentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { clinicId } = route.params || {};
  const { user } = useContext(AuthContext);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [clinicLoading, setClinicLoading] = useState(true);
  const [clinic, setClinic] = useState(null);
  const [availability, setAvailability] = useState({}); // dateStr -> { booked, capacity }

  // Step 1
  const [patientName, setPatientName] = useState(user?.name || '');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  // Step 2
  const dates = useMemo(() => generateNext7Days(), []);
  const [selectedDate, setSelectedDate] = useState(dates[0].dateStr);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const timeSlots = useMemo(
    () =>
      clinic?.timeSlots || [
        { time: '09:00 AM' },
        { time: '10:00 AM' },
        { time: '11:00 AM' },
        { time: '12:00 PM' },
        { time: '04:00 PM' },
      ],
    [clinic]
  );

  const capacity = clinic?.maxPatientsPerDay || 50;

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setClinicLoading(true);
        const res = await getClinicById(clinicId);
        const details = normalizeClinic(res);
        if (!mounted) return;
        setClinic(details);

        const counts = details?.bookedCountsByDate || details?.bookedCounts || {};
        const map = {};
        generateNext7Days().forEach((d) => {
          map[d.dateStr] = {
            booked: counts[d.dateStr] || 0,
            capacity: details?.maxPatientsPerDay || 50,
          };
        });
        setAvailability(map);
      } catch (err) {
        console.error(err);
        Toast.show({ type: 'error', text1: 'Error', text2: 'Could not load clinic details.' });
      } finally {
        if (mounted) setClinicLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [clinicId]);

  useEffect(() => {
    if (step === 2) {
      setSelectedSlot(null);
    }
  }, [step, selectedDate]);

  const handleNext = () => {
    if (step === 1) {
      if (!patientName || !age || !phone) {
        Toast.show({ type: 'error', text1: 'Missing fields', text2: 'Please fill name, age, and phone.' });
        return;
      }
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        Toast.show({ type: 'error', text1: 'Invalid Email', text2: 'Enter a valid email address.' });
        return;
      }
      setStep(2);
      return;
    }

    if (step === 2) {
      const day = availability[selectedDate] || { booked: 0, capacity };
      if (day.booked >= day.capacity) {
        Toast.show({ type: 'error', text1: 'Day Full', text2: 'Please pick another date.' });
        return;
      }
      if (!selectedSlot) {
        Toast.show({ type: 'error', text1: 'Missing Selection', text2: 'Please select a time slot.' });
        return;
      }
      setStep(3);
    }
  };

  const handleConfirm = async () => {
    try {
      setLoading(true);
      const payload = {
        clinicId,
        patientName,
        age: parseInt(age, 10),
        phone,
        email,
        address,
        date: selectedDate,
        timeSlot: selectedSlot?.time,
      };

      const res = await bookAppointment(payload);
      const responseData = unwrapApiData(res);
      const appointment = responseData?.appointment || responseData;
      const requiresPayment = responseData?.paymentRequired || appointment?.paymentRequired || clinic?.paymentRequired;
      const amount = clinic?.consultationFee || appointment?.amount || 0;

      if (requiresPayment) {
        navigation.replace('Payment', { appointmentId: appointment?.id, amount });
      } else {
        navigation.replace('BookingSuccess', {
          appointment,
          clinicName: clinic?.name,
          doctorName: clinic?.doctorName,
        });
      }
    } catch (err) {
      console.error(err);
      Toast.show({ type: 'error', text1: 'Booking Failed', text2: err.response?.data?.message || 'Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const renderStepIndicator = () => (
    <View className="flex-row items-center justify-center py-6 px-4">
      {[1, 2, 3].map((num, i) => (
        <React.Fragment key={num}>
          <View className={`w-8 h-8 rounded-full items-center justify-center ${step >= num ? 'bg-primary' : 'bg-gray-200'}`}>
            <Text className={`font-bold ${step >= num ? 'text-white' : 'text-textSecondary'}`}>{num}</Text>
          </View>
          {i < 2 && <View className={`h-1 w-12 mx-1 rounded ${step > num ? 'bg-primary' : 'bg-gray-200'}`} />}
        </React.Fragment>
      ))}
    </View>
  );

  if (clinicLoading) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <StatusBar style="dark" />
        <ActivityIndicator size="large" color="#2563EB" />
        <Text className="text-textSecondary mt-3">Loading clinic details...</Text>
      </SafeAreaView>
    );
  }

  const dayAvailability = availability[selectedDate] || { booked: 0, capacity };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />

      <View className="flex-row items-center px-4 py-3 border-b border-[#E5E7EB]">
        <TouchableOpacity onPress={() => (step > 1 ? setStep(step - 1) : navigation.goBack())} className="p-2">
          <Text className="text-xl">←</Text>
        </TouchableOpacity>
        <Text className="text-xl font-bold ml-2 text-textPrimary">Book Appointment</Text>
      </View>

      {renderStepIndicator()}

      <ScrollView className="flex-1 px-6 pb-20" showsVerticalScrollIndicator={false}>
        {step === 1 && (
          <View>
            <Text className="text-lg font-bold text-textPrimary mb-4">Patient Details</Text>

            <View className="mb-4">
              <Text className="text-sm font-medium text-textSecondary mb-2">Patient Name</Text>
              <View className="flex-row items-center bg-[#F9FAFB] rounded-xl px-4 h-14 border border-[#E5E7EB]">
                <Text className="mr-2">👤</Text>
                <TextInput className="flex-1 text-textPrimary text-base" value={patientName} onChangeText={setPatientName} placeholder="Enter full name" />
              </View>
            </View>

            <View className="flex-row mb-4 space-x-4">
              <View className="flex-1 mr-2">
                <Text className="text-sm font-medium text-textSecondary mb-2">Age</Text>
                <View className="bg-[#F9FAFB] rounded-xl px-4 h-14 border border-[#E5E7EB]">
                  <TextInput className="flex-1 text-textPrimary text-base" value={age} onChangeText={setAge} placeholder="eg. 28" keyboardType="numeric" />
                </View>
              </View>
              <View className="flex-[2] ml-2">
                <Text className="text-sm font-medium text-textSecondary mb-2">Phone</Text>
                <View className="flex-row items-center bg-[#F9FAFB] rounded-xl px-4 h-14 border border-[#E5E7EB]">
                  <Text className="mr-2">📞</Text>
                  <TextInput className="flex-1 text-textPrimary text-base" value={phone} onChangeText={setPhone} placeholder="Phone number" keyboardType="phone-pad" />
                </View>
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-sm font-medium text-textSecondary mb-2">Email (Optional)</Text>
              <View className="flex-row items-center bg-[#F9FAFB] rounded-xl px-4 h-14 border border-[#E5E7EB]">
                <Text className="mr-2">✉️</Text>
                <TextInput className="flex-1 text-textPrimary text-base" value={email} onChangeText={setEmail} placeholder="Email address" keyboardType="email-address" />
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-sm font-medium text-textSecondary mb-2">Address (Optional)</Text>
              <View className="flex-row items-center bg-[#F9FAFB] rounded-xl px-4 h-14 border border-[#E5E7EB]">
                <Text className="mr-2">📍</Text>
                <TextInput className="flex-1 text-textPrimary text-base" value={address} onChangeText={setAddress} placeholder="City, Area" />
              </View>
            </View>
          </View>
        )}

        {step === 2 && (
          <View>
            <Text className="text-lg font-bold text-textPrimary mb-2">Select Date</Text>
            <Text className="text-textSecondary mb-4 text-sm">Capacity: {dayAvailability.booked}/{dayAvailability.capacity} booked</Text>

            <View className="mb-6 -mx-6">
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24 }}>
                {dates.map((d) => {
                  const day = availability[d.dateStr] || { booked: 0, capacity };
                  const isSelected = selectedDate === d.dateStr;
                  const full = day.booked >= day.capacity;
                  return (
                    <TouchableOpacity
                      key={d.dateStr}
                      onPress={() => !full && setSelectedDate(d.dateStr)}
                      disabled={full}
                      className={`w-16 h-20 rounded-xl justify-center items-center mr-3 border ${full ? 'bg-gray-100 border-gray-200' : isSelected ? 'bg-primary border-primary' : 'bg-white border-[#E5E7EB]'}`}
                    >
                      <Text className={`font-medium mb-1 ${isSelected ? 'text-white' : 'text-textSecondary'}`}>{d.dayName}</Text>
                      <Text className={`font-bold text-lg ${isSelected ? 'text-white' : 'text-textPrimary'}`}>{d.dayNumber}</Text>
                      {full && <Text className="text-[10px] text-error mt-1">Full</Text>}
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>

            <Text className="text-lg font-bold text-textPrimary mb-4">Available Time Slots</Text>
            <View className="flex-row flex-wrap justify-between">
              {timeSlots.map((slot, index) => {
                const isSelected = selectedSlot?.time === slot.time;
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => setSelectedSlot(slot)}
                    className={`w-[48%] h-12 rounded-xl justify-center items-center mb-3 border ${isSelected ? 'bg-primary/10 border-primary' : 'bg-white border-[#E5E7EB]'}`}
                  >
                    <Text className={`font-semibold ${isSelected ? 'text-primary' : 'text-textPrimary'}`}>{slot.time}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {step === 3 && (
          <View>
            <Text className="text-lg font-bold text-textPrimary mb-4">Confirm Booking</Text>

            <View className="bg-cardBg border border-[#E5E7EB] rounded-2xl p-5">
              <View className="mb-4">
                <Text className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-1">Patient Info</Text>
                <Text className="text-textPrimary font-bold text-base">{patientName}, {age}yrs</Text>
                <Text className="text-textSecondary">{phone}</Text>
              </View>

              <View className="h-[1px] bg-[#E5E7EB] w-full mb-4" />

              <View className="mb-4">
                <Text className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-1">Clinic & Doctor</Text>
                <Text className="text-textPrimary font-bold text-base">{clinic?.name}</Text>
                <Text className="text-textSecondary">{clinic?.doctorName || 'Doctor'}</Text>
              </View>

              <View className="h-[1px] bg-[#E5E7EB] w-full mb-4" />

              <View className="flex-row justify-between items-center mb-4">
                <View>
                  <Text className="text-xs font-semibold text-textSecondary uppercase tracking-wider mb-1">Date & Time</Text>
                  <Text className="text-textPrimary font-bold">{new Date(selectedDate).toLocaleDateString()} at {selectedSlot?.time}</Text>
                </View>
                <View className="bg-primary/10 px-3 py-2 rounded-lg">
                  <Text className="text-primary font-bold text-sm text-center">Est. Wait: {clinic?.estimatedWaitTime || '--'} mins</Text>
                </View>
              </View>

              {clinic?.paymentRequired && (
                <View className="bg-primary/10 rounded-lg p-3">
                  <Text className="text-primary font-semibold text-sm">Payment required: ₹{clinic?.consultationFee || '--'}</Text>
                </View>
              )}
            </View>
          </View>
        )}
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-[#E5E7EB]">
        <TouchableOpacity
          className="bg-primary rounded-xl h-14 justify-center items-center flex-row"
          onPress={step === 3 ? handleConfirm : handleNext}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text className="text-white font-semibold text-lg">{step === 3 ? 'Confirm Booking' : 'Continue'}</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BookAppointmentScreen;
