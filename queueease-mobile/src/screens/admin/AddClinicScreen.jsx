import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Switch, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

import { registerClinic } from '../../api/clinic.api';

const SPECS = ['Dermatologist', 'Cardiologist', 'Urologist', 'General', 'Barber', 'LPG', 'Hospital', 'Other'];

const AddClinicScreen = () => {
  const navigation = useNavigation();
  const successTimerRef = useRef(null);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Step 1: Clinic Info
  const [clinicName, setClinicName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [maxPatients, setMaxPatients] = useState('50');

  // Step 2: Doctor Details
  const [doctorName, setDoctorName] = useState('');
  const [degree, setDegree] = useState('');
  const [experience, setExperience] = useState('');
  const [specialization, setSpecialization] = useState('General');
  const [doctorPhoto, setDoctorPhoto] = useState(null);
  const [clinicImages, setClinicImages] = useState([]);

  // Step 3: Payment
  const [requirePayment, setRequirePayment] = useState(false);
  const [fee, setFee] = useState('500');

  const pickImage = async (isDoctor) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: isDoctor, // Edit doctor face, but not bulk clinic pics generally
      aspect: isDoctor ? [1, 1] : [4, 3],
      quality: 0.7,
      allowsMultipleSelection: !isDoctor,
      selectionLimit: isDoctor ? 1 : 5,
    });

    if (!result.canceled) {
      if (isDoctor) {
        setDoctorPhoto(result.assets[0]);
      } else {
        const newImages = [...clinicImages, ...result.assets].slice(0, 5);
        setClinicImages(newImages);
      }
    }
  };

  const handleUseLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Toast.show({ type: 'error', text1: 'Permission denied', text2: 'Location permission is required.' });
        return;
      }
      const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      setLatitude(pos.coords.latitude.toString());
      setLongitude(pos.coords.longitude.toString());
      Toast.show({ type: 'success', text1: 'Location set' });
    } catch (err) {
      console.error(err);
      Toast.show({ type: 'error', text1: 'Error', text2: 'Could not fetch location' });
    }
  };

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    // Basic frontend validation
    if (!clinicName || !address || !city || !state || !pincode || !latitude || !longitude || !doctorName) {
      Toast.show({ 
        type: 'error', 
        text1: 'Required Fields', 
        text2: 'Please fill all clinic info including location (Lat/Lng).' 
      });
      setStep(1); // Take them back to Step 1 where location is
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      
      formData.append('name', clinicName);
      formData.append('address', address);
      formData.append('city', city);
      formData.append('state', state);
      formData.append('pincode', pincode);
      formData.append('latitude', latitude);
      formData.append('longitude', longitude);
      formData.append('maxPatientsPerDay', maxPatients || '30');
      formData.append('doctorName', doctorName);
      formData.append('degree', degree || '');
      formData.append('experience', experience || '0');
      formData.append('specialization', specialization || 'General');
      formData.append('paymentRequired', requirePayment ? 'true' : 'false');
      
      if (requirePayment) formData.append('consultationFee', fee);

      if (doctorPhoto) {
        formData.append('doctorPhoto', {
          uri: doctorPhoto.uri,
          type: 'image/jpeg',
          name: 'doctor.jpg'
        });
      }

      clinicImages.forEach((img, index) => {
        formData.append('clinicImages', {
          uri: img.uri,
          type: 'image/jpeg',
          name: `clinic_${index}.jpg`
        });
      });

      await registerClinic(formData);
      setIsSuccess(true);
    } catch (err) {
      console.error('[AddClinic] Submit error:', err);
      
      let errorMsg = 'Failed to submit clinic details';
      if (err.response?.data?.message) {
        errorMsg = err.response.data.message;
      } else if (err.response?.data?.errors && Array.isArray(err.response.data.errors)) {
        errorMsg = err.response.data.errors[0].message;
      }
      
      Toast.show({ 
        type: 'error', 
        text1: 'Submission Failed', 
        text2: errorMsg 
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
    };
  }, []);

  const renderStepIndicator = () => (
    <View className="flex-row items-center justify-center py-6 px-4">
      {[1, 2, 3].map((num, i) => (
        <React.Fragment key={num}>
          <View className={`w-8 h-8 rounded-full items-center justify-center ${step >= num ? 'bg-primary' : 'bg-gray-200'}`}>
            <Text className={`font-bold ${step >= num ? 'text-white' : 'text-textSecondary'}`}>{num}</Text>
          </View>
          {i < 2 && (
            <View className={`h-1 w-12 mx-1 rounded ${step > num ? 'bg-primary' : 'bg-gray-200'}`} />
          )}
        </React.Fragment>
      ))}
    </View>
  );

  if (isSuccess) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center px-6">
        <View className="w-20 h-20 bg-blue-100 rounded-full justify-center items-center mb-6">
          <Text className="text-4xl">⏳</Text>
        </View>
        <Text className="text-2xl font-bold text-textPrimary mb-2 text-center">Submitted for Verification</Text>
        <Text className="text-textSecondary text-center mb-8">Your clinic details have been submitted. Our team will verify and activate your account within 24 hours.</Text>
        
        <TouchableOpacity 
          className="bg-primary px-8 py-3 rounded-xl"
          onPress={() => navigation.reset({ index: 0, routes: [{ name: 'AdminTabs', params: { screen: 'Dashboard' } }] })}
        >
          <Text className="text-white font-semibold">Go to Dashboard</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      
      <View className="flex-row items-center px-4 py-3 border-b border-[#E5E7EB]">
        {step > 1 && (
          <TouchableOpacity onPress={handleBack} className="p-2">
             <Text className="text-xl">←</Text>
          </TouchableOpacity>
        )}
        <Text className="text-xl font-bold ml-2 text-textPrimary">Add Clinic Profile</Text>
      </View>

      {renderStepIndicator()}

      <ScrollView className="flex-1 px-6 pb-20" showsVerticalScrollIndicator={false}>
        
        {step === 1 && (
          <View>
            <Text className="text-lg font-bold text-textPrimary mb-4">Clinic Info</Text>
            
            <View className="mb-4">
              <Text className="text-sm font-medium text-textSecondary mb-2">Clinic Name</Text>
              <TextInput className="bg-[#F9FAFB] rounded-xl px-4 h-14 border border-[#E5E7EB]" value={clinicName} onChangeText={setClinicName} />
            </View>

            <View className="mb-4">
              <Text className="text-sm font-medium text-textSecondary mb-2">Address</Text>
              <TextInput className="bg-[#F9FAFB] rounded-xl px-4 h-14 border border-[#E5E7EB]" value={address} onChangeText={setAddress} />
            </View>

            <View className="flex-row mb-4">
              <View className="flex-1 mr-2">
                <Text className="text-sm font-medium text-textSecondary mb-2">City</Text>
                <TextInput className="bg-[#F9FAFB] rounded-xl px-4 h-14 border border-[#E5E7EB]" value={city} onChangeText={setCity} />
              </View>
              <View className="flex-1 ml-2">
                <Text className="text-sm font-medium text-textSecondary mb-2">State</Text>
                <TextInput className="bg-[#F9FAFB] rounded-xl px-4 h-14 border border-[#E5E7EB]" value={state} onChangeText={setState} />
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-sm font-medium text-textSecondary mb-2">Pincode</Text>
              <TextInput className="bg-[#F9FAFB] rounded-xl px-4 h-14 border border-[#E5E7EB]" value={pincode} onChangeText={setPincode} keyboardType="numeric" maxLength={6} />
            </View>

            <View className="flex-row mb-4">
              <View className="flex-1 mr-2">
                <Text className="text-sm font-medium text-textSecondary mb-2">Lat (Auto)</Text>
                <TextInput className="bg-[#F9FAFB] rounded-xl px-4 h-14 border border-[#E5E7EB]" value={latitude} onChangeText={setLatitude} />
              </View>
              <View className="flex-1 ml-2">
                <Text className="text-sm font-medium text-textSecondary mb-2">Lng (Auto)</Text>
                <TextInput className="bg-[#F9FAFB] rounded-xl px-4 h-14 border border-[#E5E7EB]" value={longitude} onChangeText={setLongitude} />
              </View>
            </View>

            <TouchableOpacity
              className="bg-primary/10 border border-primary/30 rounded-xl h-12 items-center justify-center mb-4"
              onPress={handleUseLocation}
            >
              <Text className="text-primary font-semibold">Use My Location</Text>
            </TouchableOpacity>

            <View className="mb-4">
              <Text className="text-sm font-medium text-textSecondary mb-2">Max Patients Per Day</Text>
              <TextInput className="bg-[#F9FAFB] rounded-xl px-4 h-14 border border-[#E5E7EB]" value={maxPatients} onChangeText={setMaxPatients} keyboardType="numeric" />
            </View>
          </View>
        )}

        {step === 2 && (
          <View>
            <Text className="text-lg font-bold text-textPrimary mb-4">Doctor Details</Text>

            <View className="mb-4">
              <Text className="text-sm font-medium text-textSecondary mb-2">Doctor Name</Text>
              <TextInput className="bg-[#F9FAFB] rounded-xl px-4 h-14 border border-[#E5E7EB]" value={doctorName} onChangeText={setDoctorName} />
            </View>

            <View className="flex-row mb-4">
              <View className="flex-1 mr-2">
                <Text className="text-sm font-medium text-textSecondary mb-2">Degree</Text>
                <TextInput className="bg-[#F9FAFB] rounded-xl px-4 h-14 border border-[#E5E7EB]" value={degree} onChangeText={setDegree} />
              </View>
              <View className="flex-1 ml-2">
                <Text className="text-sm font-medium text-textSecondary mb-2">Experience (Yrs)</Text>
                <TextInput className="bg-[#F9FAFB] rounded-xl px-4 h-14 border border-[#E5E7EB]" value={experience} onChangeText={setExperience} keyboardType="numeric" />
              </View>
            </View>

            <View className="mb-4">
              <Text className="text-sm font-medium text-textSecondary mb-2">Specialization / Category</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-2">
                 {SPECS.map(s => (
                   <TouchableOpacity 
                     key={s} 
                     onPress={() => setSpecialization(s)}
                     className={`mr-2 px-4 py-2 rounded-full border ${specialization === s ? 'bg-primary border-primary' : 'bg-white border-gray-200'}`}
                   >
                     <Text className={specialization === s ? 'text-white' : 'text-textSecondary'}>{s}</Text>
                   </TouchableOpacity>
                 ))}
              </ScrollView>
              {specialization === 'Other' && (
                <TextInput 
                  className="bg-[#F9FAFB] rounded-xl px-4 h-12 border border-[#E5E7EB] mt-2" 
                  placeholder="Type your specialization..."
                  onChangeText={setSpecialization}
                />
              )}
            </View>

            <View className="mb-6 mt-4">
               <Text className="text-sm font-medium text-textSecondary mb-2">Upload Doctor Photo</Text>
               <TouchableOpacity onPress={() => pickImage(true)} className="border-2 border-dashed border-gray-300 rounded-xl h-24 items-center justify-center bg-gray-50">
                   <Text className="text-primary font-semibold">{doctorPhoto ? 'Change Photo ✓' : '+ Select Photo'}</Text>
               </TouchableOpacity>
            </View>

            <View className="mb-6">
               <Text className="text-sm font-medium text-textSecondary mb-2">Upload Clinic Images (Max 5)</Text>
               <TouchableOpacity onPress={() => pickImage(false)} className="border-2 border-dashed border-gray-300 rounded-xl h-24 items-center justify-center bg-gray-50 mb-2">
                   <Text className="text-primary font-semibold">+ Select Images</Text>
               </TouchableOpacity>
               <Text className="text-xs text-textSecondary">{clinicImages.length}/5 Selected</Text>
            </View>
          </View>
        )}

        {step === 3 && (
          <View>
            <Text className="text-lg font-bold text-textPrimary mb-4">Payment Settings</Text>

            <View className="bg-[#F9FAFB] rounded-2xl border border-[#E5E7EB] p-5 mb-6 flex-row items-center justify-between">
               <View className="flex-[0.8]">
                 <Text className="font-semibold text-textPrimary mb-1">Require Payment?</Text>
                 <Text className="text-xs text-textSecondary">Patients must pay online fee to book an appointment.</Text>
               </View>
               <Switch value={requirePayment} onValueChange={setRequirePayment} />
            </View>

            {requirePayment && (
              <View className="mb-6">
                <Text className="text-sm font-medium text-textSecondary mb-2">Consultation Fee (₹)</Text>
                <TextInput className="bg-[#F9FAFB] rounded-xl px-4 h-14 border border-[#E5E7EB]" value={fee} onChangeText={setFee} keyboardType="numeric" />
              </View>
            )}

            <View className="bg-blue-50 border border-blue-100 p-5 rounded-2xl">
               <Text className="font-bold text-primary mb-2">Almost Done!</Text>
               <Text className="text-primary/80">Please ensure all details are accurate. Misleading information may result in your account suspension.</Text>
            </View>
          </View>
        )}

      </ScrollView>

      {/* Footer CTA */}
      <View className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-[#E5E7EB]">
        <TouchableOpacity 
          className="bg-primary rounded-xl h-14 justify-center items-center flex-row"
          onPress={step === 3 ? handleSubmit : handleNext}
          disabled={loading}
        >
          {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text className="text-white font-semibold text-lg">{step === 3 ? 'Submit for Verification' : 'Continue'}</Text>}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddClinicScreen;
