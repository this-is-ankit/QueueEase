import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { formatDate } from '../../utils/helpers';

const BookingSuccessScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { appointment, clinicName, doctorName } = route.params || {};

  // Simple scale animation for the checkmark
  const checkScale = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(checkScale, {
      toValue: 1,
      tension: 50,
      friction: 5,
      useNativeDriver: true
    }).start();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center relative px-6">
      <StatusBar style="dark" />
      
      {/* Animated Checkmark */}
      <View className="items-center mb-8">
        <Animated.View style={{ transform: [{ scale: checkScale }] }}>
          <View className="w-24 h-24 bg-[#10B981]/20 rounded-full justify-center items-center">
             <View className="w-16 h-16 bg-[#10B981] rounded-full justify-center items-center">
               <Text className="text-white text-3xl font-bold">✓</Text>
             </View>
          </View>
        </Animated.View>
        <Text className="text-[32px] font-bold text-textPrimary mt-6 text-center">Booking Confirmed!</Text>
        <Text className="text-textSecondary text-center mt-2 max-w-[280px]">Your appointment has been successfully booked.</Text>
      </View>

      {/* Token Card */}
      <View className="bg-primary rounded-3xl w-full p-6 shadow-md mb-10 overflow-hidden">
        {/* decorative circles */}
        <View className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full" />
        <View className="absolute -bottom-10 -left-10 w-24 h-24 bg-black/10 rounded-full" />

        <Text className="text-white/80 font-bold tracking-wider uppercase text-xs mb-1">Your Token Number</Text>
        <View className="flex-row items-baseline mb-6">
          <Text className="text-white text-5xl font-extrabold mr-1">
            {appointment?.tokenNumber ? `#${appointment.tokenNumber}` : 'Pending'}
          </Text>
        </View>

        <View className="h-[1px] bg-white/20 w-full mb-4" />

        <View className="flex-row">
          <View className="flex-1 mr-4 border-r border-white/20">
            <Text className="text-white/70 text-xs mb-1">Clinic</Text>
            <Text className="text-white font-semibold text-base">{clinicName || appointment?.clinic?.name || 'Clinic assigned'}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-white/70 text-xs mb-1">Doctor</Text>
            <Text className="text-white font-semibold text-base">{doctorName || appointment?.clinic?.doctorName || 'Doctor assigned'}</Text>
          </View>
        </View>
        <View className="mt-4">
          <Text className="text-white/70 text-xs mb-1">Date</Text>
          <Text className="text-white font-semibold text-base">{formatDate(appointment?.appointmentDate)}</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="w-full space-y-4">
        {/* Track Queue primary CTA */}
        <TouchableOpacity 
          className="bg-textPrimary rounded-xl h-14 justify-center items-center mb-4"
          onPress={() => appointment?.id && navigation.replace('QueueTracking', { appointmentId: appointment.id })}
          disabled={!appointment?.id}
        >
          <Text className="font-bold text-white text-lg">Track Live Queue</Text>
        </TouchableOpacity>

        {/* View Appointments secondary CTA */}
        <TouchableOpacity 
          className="border-2 border-[#E5E7EB] bg-white rounded-xl h-14 justify-center items-center"
          onPress={() => {
            // Because MyAppointments is in the Dashboard Tabs, we reset stack there
            navigation.reset({
              index: 0,
              routes: [{ name: 'UserTabs', params: { screen: 'MyAppointments' } }]
            });
          }}
        >
          <Text className="text-textPrimary font-semibold text-lg">View My Appointments</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default BookingSuccessScreen;
