import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { StatusBar } from 'expo-status-bar';

import { createOrder, verifyPayment } from '../../api/payment.api';
import { getAppointmentById } from '../../api/appointment.api';

const PaymentScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { appointmentId, amount } = route.params;

  const [loading, setLoading] = useState(false);
  const [orderGenerating, setOrderGenerating] = useState(true);
  const [order, setOrder] = useState(null);
  const [displayAmount, setDisplayAmount] = useState(amount || 0);

  useEffect(() => {
    generateOrder();
  }, [appointmentId]);

  const generateOrder = async () => {
    try {
      setOrderGenerating(true);
      const res = await createOrder(appointmentId);
      const orderData = res?.order || res;
      setOrder(orderData);
      if (!amount && orderData?.amount) {
        setDisplayAmount(Math.round(orderData.amount / 100));
      }
    } catch (err) {
      console.error(err);
      Toast.show({ type: 'error', text1: 'Error', text2: 'Could not generate payment order' });
    } finally {
      setOrderGenerating(false);
    }
  };

  const simulateSuccess = async () => {
    if (!order) return;
    try {
      setLoading(true);
      await verifyPayment({
        appointmentId,
        razorpay_order_id: order.id || 'test_order',
        razorpay_payment_id: 'test_payment',
        razorpay_signature: 'test_signature',
      });

      const apptRes = await getAppointmentById(appointmentId).catch(() => null);
      const appointment = apptRes?.appointment || apptRes || { id: appointmentId };

      navigation.replace('BookingSuccess', {
        appointment,
        clinicName: appointment?.clinic?.name,
        doctorName: appointment?.clinic?.doctorName,
      });
    } catch (err) {
      console.error(err);
      Toast.show({ type: 'error', text1: 'Verification Failed', text2: 'Payment verification failed.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white items-center justify-center relative px-6">
      <StatusBar style="dark" />
      
      <View className="items-center mb-8">
        <View className="w-16 h-16 bg-blue-100 rounded-full justify-center items-center mb-4">
          <Text className="text-3xl text-primary font-bold">₹</Text>
        </View>
        <Text className="text-3xl font-bold text-textPrimary mb-2">Complete Payment</Text>
        <Text className="text-textSecondary text-center">Payment integration coming soon. Use the simulator to proceed.</Text>
      </View>

      <View className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl w-full p-6 mb-8 shadow-sm">
        <Text className="text-sm text-textSecondary uppercase font-bold tracking-wider mb-2">Payment Details</Text>
        <View className="flex-row justify-between mb-4">
          <Text className="text-base text-textPrimary font-medium">Consultation Fee</Text>
          <Text className="text-lg font-bold text-textPrimary">₹{displayAmount || amount || 0}</Text>
        </View>
        <View className="h-[1px] bg-gray-200 w-full mb-4" />
        <View className="flex-row justify-between">
          <Text className="text-lg text-textPrimary font-bold flex-1">Total</Text>
          <Text className="text-2xl font-bold text-primary">₹{displayAmount || amount || 0}</Text>
        </View>
      </View>

      <View className="w-full space-y-3">
        {orderGenerating ? (
          <ActivityIndicator size="large" color="#2563EB" />
        ) : (
          <TouchableOpacity
            className="w-full bg-primary rounded-xl h-14 justify-center items-center"
            onPress={simulateSuccess}
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#FFF" /> : <Text className="font-bold text-white text-lg">Simulate Payment Success</Text>}
          </TouchableOpacity>
        )}

        <TouchableOpacity className="items-center" onPress={() => navigation.goBack()}>
          <Text className="text-textSecondary font-semibold">Cancel</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

export default PaymentScreen;
