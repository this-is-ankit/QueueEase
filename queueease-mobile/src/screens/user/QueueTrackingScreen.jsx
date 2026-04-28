import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Switch, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';

import { useQueue } from '../../hooks/useQueue';
import { getAppointmentById, cancelAppointment } from '../../api/appointment.api';
import { unwrapApiData } from '../../utils/helpers';

import QueueProgress from '../../components/queue/QueueProgress';
import QueueTimeline from '../../components/queue/QueueTimeline';
import SkeletonLoader from '../../components/common/SkeletonLoader';

const QueueTrackingScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { appointmentId, clinicId: clinicIdParam, userToken: userTokenParam } = route.params || {};

  const [appointment, setAppointment] = useState(null);
  const [loadingAppt, setLoadingAppt] = useState(true);
  const [notificationsOn, setNotificationsOn] = useState(false);
  const notificationIdRef = useRef(null);

  // Fetch Appt details to get clinicId and Token
  useEffect(() => {
    const fetchAppt = async () => {
      try {
        const res = await getAppointmentById(appointmentId);
        const data = unwrapApiData(res);
        setAppointment(data?.appointment || data);
      } catch (err) {
        console.error(err);
        Toast.show({ type: 'error', text1: 'Error', text2: 'Could not load appointment details.' });
      } finally {
        setLoadingAppt(false);
      }
    };
    if (appointmentId) fetchAppt();
  }, [appointmentId]);

  const clinicId = clinicIdParam || appointment?.clinicId;
  const userToken = userTokenParam || appointment?.tokenNumber;

  // Hook up Real-Time Queue
  const { currentToken, estimatedWaitTime, totalBookedToday } = useQueue(clinicId);

  const patientsAhead = Math.max(0, (userToken || 0) - (currentToken || 0));

  const handleToggleNotifications = async (val) => {
    setNotificationsOn(val);
    if (!val) {
      if (notificationIdRef.current) {
        Notifications.cancelScheduledNotificationAsync(notificationIdRef.current).catch(() => {});
        notificationIdRef.current = null;
      }
      return;
    }
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Toast.show({ type: 'info', text1: 'Permission needed', text2: 'Enable notifications in settings.' });
        setNotificationsOn(false);
        return;
      }

      // Schedule a local notification to nudge when near turn (patientsAhead <=3)
      if (patientsAhead <= 3) {
        const id = await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Almost your turn',
            body: 'Please get ready, your token is coming up.',
          },
          trigger: null,
        });
        notificationIdRef.current = id;
      }
    } catch (err) {
      console.error(err);
      setNotificationsOn(false);
    }
  };

  // Cancel scheduled notification if turn passed or done
  useEffect(() => {
    const shouldCancel = patientsAhead <= 0 || (appointment?.status || '').toUpperCase() === 'DONE' || (appointment?.status || '').toUpperCase() === 'CANCELLED';
    if (shouldCancel && notificationIdRef.current) {
      Notifications.cancelScheduledNotificationAsync(notificationIdRef.current).catch(() => {});
      notificationIdRef.current = null;
    }
  }, [patientsAhead, appointment?.status]);

  const handleCancel = () => {
    Alert.alert(
      "Cancel Appointment",
      "Are you sure you want to cancel? This action cannot be undone.",
      [
        { text: "No, Keep It", style: "cancel" },
        { 
          text: "Yes, Cancel", 
          style: "destructive",
          onPress: async () => {
            try {
              await cancelAppointment(appointmentId);
              Toast.show({ type: 'success', text1: 'Cancelled', text2: 'Appointment has been cancelled.' });
              navigation.goBack();
            } catch (err) {
               console.error(err);
               Toast.show({ type: 'error', text1: 'Error', text2: 'Failed to cancel appointment.' });
            }
          }
        }
      ]
    );
  };

  if (loadingAppt) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="px-6 py-6"><SkeletonLoader width="100%" height={300} /></View>
      </SafeAreaView>
    );
  }

  if (!appointment || !clinicId || !userToken) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center px-6">
        <Text className="text-lg font-bold text-textPrimary mb-2">Queue data unavailable</Text>
        <Text className="text-textSecondary text-center mb-6">
          We could not load the token or clinic for this appointment.
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()} className="bg-primary px-6 py-3 rounded-xl">
          <Text className="text-white font-semibold">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const appointmentStatus = (appointment?.status || '').toUpperCase();
  const isCancelled = appointmentStatus === 'CANCELLED';
  const isDone = appointmentStatus === 'DONE' || appointmentStatus === 'COMPLETED';
  const canCancel = appointmentStatus === 'BOOKED';

  const turnMessage = isCancelled
    ? 'This appointment has been cancelled.'
    : isDone
      ? 'Your consultation is complete.'
      : patientsAhead === 0
        ? 'It’s your turn! Please proceed.'
        : patientsAhead <= 3
          ? 'Almost your turn! Please be ready.'
          : `${patientsAhead} patients ahead of you.`;
  const turnColor = isCancelled
    ? 'text-error'
    : isDone || patientsAhead === 0
      ? 'text-[#10B981]'
      : patientsAhead <= 3
        ? 'text-[#F59E0B]'
        : 'text-textSecondary';

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="px-4 py-4 flex-row items-center border-b border-[#E5E7EB] bg-white">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 mr-2">
          <Text className="text-xl">←</Text>
        </TouchableOpacity>
        <Text className="text-lg font-bold text-textPrimary flex-1" numberOfLines={1}>{appointment?.clinic?.name || 'Loading Clinic'}</Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6 pb-20" showsVerticalScrollIndicator={false}>
        
        {/* Top Tokens Section */}
        <View className="items-center bg-white rounded-3xl p-8 border border-[#E5E7EB] shadow-sm">
          <Text className="text-textSecondary uppercase tracking-wider font-bold text-sm mb-2">Your Token</Text>
          <Text style={{ fontSize: 64 }} className="text-primary font-extrabold leading-none mb-6">
            #{userToken}
          </Text>

          <View className="h-[1px] w-full bg-gray-100 mb-6" />

          <View className="flex-row items-center justify-between w-full">
          <Text className="text-textPrimary font-semibold text-base">Now Serving</Text>
          <View className="bg-[#10B981]/10 px-4 py-2 rounded-full flex-row items-center">
            <View className="w-2 h-2 rounded-full bg-[#10B981] mr-2" />
            <Text className="text-[#10B981] font-bold text-xl">{currentToken > 0 ? `#${currentToken}` : 'Not started'}</Text>
          </View>
        </View>
      </View>

        {/* Live Progress Bar Components */}
        <QueueProgress 
          currentToken={currentToken || 0} 
          userToken={userToken} 
          totalToday={totalBookedToday || 0}
        />

        <View className="mt-3">
          <Text className={`text-base font-semibold ${turnColor}`}>{turnMessage}</Text>
          {!!estimatedWaitTime && patientsAhead > 0 && (
            <Text className="text-textSecondary mt-1">Estimated wait: {estimatedWaitTime} mins</Text>
          )}
        </View>

        {/* Notifications Toggle */}
        <View className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-sm mt-6 flex-row items-center justify-between">
          <View className="flex-row items-center flex-1 mr-4">
            <Text className="text-2xl mr-3">🔔</Text>
            <Text className="text-sm font-medium text-textPrimary flex-1 text-wrap">
              Get notified when 3 patients are left before your turn
            </Text>
          </View>
          <Switch
            trackColor={{ false: "#D1D5DB", true: "#93C5FD" }}
            thumbColor={notificationsOn ? "#2563EB" : "#F3F4F6"}
            onValueChange={handleToggleNotifications}
            value={notificationsOn}
          />
        </View>

        {/* Step-by-Step Timeline */}
        <QueueTimeline currentToken={currentToken || 0} userToken={userToken} status={appointment?.status} />

        {canCancel && (
          <View className="mt-8 mb-12 items-center">
            <TouchableOpacity onPress={handleCancel} className="py-2 px-4">
              <Text className="text-error font-semibold text-base">Cancel Appointment</Text>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
};

export default QueueTrackingScreen;
