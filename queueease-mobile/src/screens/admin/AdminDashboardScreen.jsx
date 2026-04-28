import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Animated, RefreshControl, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

import { AuthContext } from '../../context/AuthContext';
import { useQueue } from '../../hooks/useQueue';
import { markAsDone } from '../../api/queue.api';
import { getClinicAppointmentsToday } from '../../api/appointment.api';
import { getMyClinic } from '../../api/clinic.api';
import { normalizeClinic, unwrapApiData } from '../../utils/helpers';

const AdminDashboardScreen = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [clinic, setClinic] = useState(null);

  // Real-time Queue hook
  const { currentToken, totalBookedToday } = useQueue(clinic?.id);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [patients, setPatients] = useState([]);
  const [loadingAction, setLoadingAction] = useState(false);
  const [loadingClinic, setLoadingClinic] = useState(true);

  // Animated token
  const tokenScale = useRef(new Animated.Value(1)).current;

  const fetchClinic = useCallback(async () => {
    try {
      setLoadingClinic(true);
      const res = await getMyClinic();
      const data = normalizeClinic(res);
      setClinic(data);
      return data;
    } catch (error) {
      console.error(error);
      Toast.show({ type: 'error', text1: 'Error', text2: 'Could not load clinic' });
    } finally {
      setLoadingClinic(false);
    }
  }, []);

  const fetchDashboardData = useCallback(async (clinicIdParam) => {
    if (!clinicIdParam) return;
    try {
      const res = await getClinicAppointmentsToday(clinicIdParam);
      const data = unwrapApiData(res);
      const list = data?.appointments || res?.appointments || (Array.isArray(data) ? data : []) || [];
      setPatients(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error(err);
      Toast.show({ type: 'error', text1: 'Error', text2: 'Could not load today’s appointments' });
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchClinic();
  }, [fetchClinic]);

  useEffect(() => {
    if (clinic?.id) {
      fetchDashboardData(clinic.id);
    }
  }, [clinic?.id, fetchDashboardData]);

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchClinic().then((data) => fetchDashboardData(data?.id));
  };

  // Pop effect for 'Now Serving' number change
  useEffect(() => {
    Animated.sequence([
      Animated.timing(tokenScale, { toValue: 1.3, duration: 150, useNativeDriver: true }),
      Animated.timing(tokenScale, { toValue: 1, duration: 150, useNativeDriver: true })
    ]).start();
  }, [currentToken]);

  const handleNextPatient = async () => {
    if (!clinic?.id) return;
    try {
      setLoadingAction(true);
      await markAsDone(clinic.id);
      Toast.show({ type: 'success', text1: 'Queue updated', text2: 'Live queue moved to the next patient.' });
      await fetchDashboardData(clinic.id);
    } catch (error) {
      console.error(error);
      Toast.show({
        type: 'error',
        text1: 'Queue update failed',
        text2: error?.response?.data?.message || 'Could not update the queue.',
      });
    } finally {
      setLoadingAction(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'BOOKED': return 'bg-gray-100 text-gray-600';
      case 'SERVING': return 'bg-primary/20 text-primary';
      case 'DONE': return 'bg-[#10B981]/20 text-[#10B981]';
      case 'CANCELLED': return 'bg-error/10 text-error';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const remaining = Math.max(0, (totalBookedToday || 0) - (currentToken || 0));
  const servingPatient = patients.find((p) => (p.status || '').toUpperCase() === 'SERVING');
  const nextBookedPatient = patients.find((p) => (p.status || '').toUpperCase() === 'BOOKED');
  const currentPatient = servingPatient || (currentToken > 0 ? patients.find((p) => p.tokenNumber === currentToken) : null);
  const actionLabel = currentPatient ? 'Mark as Done & Call Next' : nextBookedPatient ? 'Start Queue' : 'No Active Patient';
  const actionDisabled = loadingAction || (!currentPatient && !nextBookedPatient);
  const hourBuckets = Array.from({ length: 6 }, (_, index) => {
    const hour = index + 9;
    const count = patients.filter((patient) => {
      const appointmentDate = patient?.appointmentDate ? new Date(patient.appointmentDate) : null;
      return appointmentDate && appointmentDate.getHours() === hour;
    }).length;

    return {
      label: `${hour > 12 ? hour - 12 : hour}${hour >= 12 ? 'p' : 'a'}`,
      count,
    };
  });
  const maxBucketCount = Math.max(...hourBuckets.map((bucket) => bucket.count), 1);

  if (loadingClinic) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#2563EB" />
        <Text className="text-textSecondary mt-2">Loading clinic...</Text>
      </SafeAreaView>
    );
  }

  if (!clinic) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center px-6">
        <StatusBar style="dark" />
        <Text className="text-2xl font-bold text-textPrimary mb-3">No clinic found</Text>
        <Text className="text-textSecondary text-center mb-6">Add your clinic to start managing queues.</Text>
        <TouchableOpacity className="bg-primary px-5 py-3 rounded-xl" onPress={() => navigation.navigate('AddClinic')}>
          <Text className="text-white font-semibold">Add your clinic</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // Handle Pending status
  if (clinic.status === 'PENDING') {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center px-6">
        <StatusBar style="dark" />
        <View className="w-24 h-24 bg-yellow-50 rounded-full justify-center items-center mb-6">
          <Text className="text-5xl">⏳</Text>
        </View>
        <Text className="text-2xl font-bold text-textPrimary mb-2 text-center">Verification Pending</Text>
        <Text className="text-textSecondary text-center mb-8 px-4">
          Your clinic "{clinic.name}" is currently being reviewed. A verifier will visit your location soon.
        </Text>
        <TouchableOpacity 
          className="bg-gray-100 px-6 py-3 rounded-xl border border-gray-200" 
          onPress={onRefresh}
          disabled={isRefreshing}
        >
          {isRefreshing ? <ActivityIndicator color="#6B7280" /> : <Text className="text-textPrimary font-semibold">Check Status</Text>}
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  // Handle Rejected status
  if (clinic.status === 'REJECTED') {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center px-6">
        <StatusBar style="dark" />
        <View className="w-24 h-24 bg-red-50 rounded-full justify-center items-center mb-6">
          <Text className="text-5xl">❌</Text>
        </View>
        <Text className="text-2xl font-bold text-textPrimary mb-2 text-center">Registration Rejected</Text>
        <Text className="text-textSecondary text-center mb-8 px-4">
          Unfortunately, your clinic registration was not approved. Please contact support or update your details.
        </Text>
        <TouchableOpacity className="bg-primary px-6 py-3 rounded-xl" onPress={() => navigation.navigate('AddClinic')}>
          <Text className="text-white font-semibold">Update Details</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="px-6 pt-4 pb-2 flex-row justify-between items-center bg-white border-b border-[#E5E7EB]">
        <View>
          <Text className="text-sm text-textSecondary font-medium">Good Morning, Dr.</Text>
          <Text className="text-xl font-bold text-textPrimary">{user?.name || 'Admin'} 👋</Text>
          <Text className="text-xs text-primary font-bold mt-1 uppercase tracking-wider">{clinic?.name}</Text>
        </View>
        <TouchableOpacity className="w-10 h-10 bg-[#F9FAFB] rounded-full justify-center items-center border border-[#E5E7EB]">
          <Text className="text-lg">🔔</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        className="flex-1"
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} colors={['#2563EB']} />}
      >
        {/* Three live stat cards */}
        <View className="px-6 py-6 flex-row justify-between">
          <View className="bg-white border border-[#E5E7EB] rounded-2xl p-4 flex-1 mr-2 items-center shadow-sm">
            <Text className="text-textSecondary text-xs font-semibold mb-1">Total Today</Text>
            <Text className="text-textPrimary text-xl font-bold">{totalBookedToday || 0}</Text>
          </View>

          <View className="bg-primary rounded-2xl p-4 flex-1 mx-1 border border-primary items-center shadow-sm">
            <Text className="text-white/80 text-xs font-semibold mb-1">Now Serving</Text>
            <Animated.Text style={{ transform: [{ scale: tokenScale }] }} className="text-white text-3xl font-extrabold leading-none -mt-1">
              {currentToken > 0 ? `#${currentToken}` : '--'}
            </Animated.Text>
          </View>

          <View className="bg-white border border-[#E5E7EB] rounded-2xl p-4 flex-1 ml-2 items-center shadow-sm">
            <Text className="text-textSecondary text-xs font-semibold mb-1">Remaining</Text>
            <Text className="text-textPrimary text-xl font-bold">{remaining || 0}</Text>
          </View>
        </View>

        {/* Queue Management Card */}
        <View className="px-6 mb-8">
          <View className="bg-white rounded-3xl p-6 border border-[#E5E7EB] shadow-sm items-center">
            <Text className="text-textSecondary uppercase tracking-wider font-bold text-xs mb-2">Currently Serving</Text>
            <Animated.Text style={{ transform: [{ scale: tokenScale }] }} className="text-primary font-extrabold text-5xl mb-1">
              {currentPatient ? `Token #${currentPatient.tokenNumber}` : nextBookedPatient ? `Up Next #${nextBookedPatient.tokenNumber}` : 'Queue Idle'}
            </Animated.Text>
            <Text className="text-textPrimary font-semibold text-lg">
              {currentPatient?.patientName || nextBookedPatient?.patientName || 'No patient is being served right now'}
            </Text>
            <Text className="text-textSecondary text-sm mb-6">
              {currentPatient
                ? `Current status: ${(currentPatient.status || '').toUpperCase()}`
                : nextBookedPatient
                  ? 'Queue is ready to start for today.'
                  : 'No real-time queue activity yet.'}
            </Text>

            <TouchableOpacity 
              className="w-full bg-[#10B981] rounded-2xl py-4 items-center justify-center shadow-sm flex-row"
              onPress={handleNextPatient}
              disabled={actionDisabled}
              style={{ opacity: actionDisabled ? 0.6 : 1 }}
            >
              {loadingAction ? <ActivityIndicator color="#fff" /> : (
                <>
                  <Text className="text-white font-bold text-lg mr-2">{actionLabel}</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Mini Bar Chart Mock */}
        <View className="px-6 mb-8">
          <Text className="text-lg font-bold text-textPrimary mb-4">Appointments by Hour</Text>
          <View className="bg-white p-5 rounded-2xl border border-[#E5E7EB] flex-row justify-between items-end h-40 shadow-sm">
            {hourBuckets.map((bucket) => {
              const height = `${Math.max((bucket.count / maxBucketCount) * 100, bucket.count > 0 ? 16 : 4)}%`;
              return (
                <View key={bucket.label} className="items-center flex-1">
                  <View className="w-8 bg-primary/20 rounded-t-md" style={{ height }}>
                    <View className="absolute bottom-0 w-full bg-primary rounded-t-md" style={{ height }} />
                  </View>
                  <Text className="text-xs text-textSecondary mt-2">{bucket.label}</Text>
                  <Text className="text-[10px] text-textSecondary mt-1">{bucket.count}</Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Today's patient list */}
        <View className="px-6 pb-10">
          <Text className="text-lg font-bold text-textPrimary mb-4">Today's Queue</Text>
          <View className="bg-white rounded-2xl border border-[#E5E7EB] overflow-hidden shadow-sm">
            {patients.length === 0 ? (
              <View className="p-6 items-center">
                <Text className="text-textSecondary">No appointments today</Text>
              </View>
            ) : (
              patients.map((p, index) => {
                const statusClass = getStatusColor((p.status || '').toUpperCase());
                const parts = statusClass.split(' ');
                return (
                  <View key={p.id || index} className={`flex-row items-center justify-between p-4 ${index !== patients.length - 1 ? 'border-b border-[#E5E7EB]' : ''}`}>
                    <View className="flex-row items-center">
                      <View className="w-10 h-10 bg-[#F9FAFB] rounded-full justify-center items-center border border-[#E5E7EB] mr-3">
                        <Text className="font-bold text-textSecondary">#{p.tokenNumber || p.token}</Text>
                      </View>
                      <Text className="font-semibold text-textPrimary text-base">{p.patientName || p.name}</Text>
                    </View>
                    <View className={`px-3 py-1 rounded-full ${parts[0]}`}>
                      <Text className={`text-xs font-bold ${parts[1]}`}>{(p.status || '').toUpperCase()}</Text>
                    </View>
                  </View>
                );
              })
            )}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminDashboardScreen;
