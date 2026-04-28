import React, { useState, useCallback } from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, RefreshControl, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { StatusBar } from 'expo-status-bar';

import { getMyAppointments, cancelAppointment } from '../../api/appointment.api';
import TokenBadge from '../../components/common/TokenBadge';
import Card from '../../components/common/Card';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import Button from '../../components/common/Button';

const TABS = ['Upcoming', 'Past', 'Cancelled'];

// Maps each tab to which appointment statuses should show under it
const TAB_STATUSES = {
  Upcoming: ['BOOKED', 'SERVING'],
  Past: ['DONE', 'COMPLETED'],
  Cancelled: ['CANCELLED'],
};

const STATUS_STYLE = {
  BOOKED:    { bg: 'bg-primary/10',       text: 'text-primary',      label: 'Booked' },
  SERVING:   { bg: 'bg-[#10B981]/10',     text: 'text-[#10B981]',   label: 'Serving' },
  DONE:      { bg: 'bg-gray-100',          text: 'text-gray-500',    label: 'Done' },
  COMPLETED: { bg: 'bg-gray-100',          text: 'text-gray-500',    label: 'Completed' },
  CANCELLED: { bg: 'bg-error/10',          text: 'text-error',       label: 'Cancelled' },
};

const MyAppointmentsScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchAppointments = async () => {
    try {
      const res = await getMyAppointments();
      const list = res?.data?.appointments || res?.appointments || (Array.isArray(res?.data) ? res.data : []) || res || [];
      setAppointments(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error(err);
      Toast.show({ type: 'error', text1: 'Error', text2: 'Could not load appointments.' });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Reload whenever screen is focused
  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      fetchAppointments();
    }, [])
  );

  const onRefresh = () => {
    setRefreshing(true);
    fetchAppointments();
  };

  const handleCancel = (apptId) => {
    Alert.alert(
      'Cancel Appointment',
      'Are you sure you want to cancel this appointment?',
      [
        { text: 'No, Keep', style: 'cancel' },
        {
          text: 'Yes, Cancel',
          style: 'destructive',
          onPress: async () => {
            try {
              await cancelAppointment(apptId);
              Toast.show({ type: 'success', text1: 'Appointment Cancelled' });
              fetchAppointments();
            } catch (err) {
              Toast.show({ type: 'error', text1: 'Error', text2: 'Could not cancel appointment.' });
            }
          },
        },
      ]
    );
  };

  const filteredAppointments = appointments.filter((a) => {
    const status = (a.status || '').toUpperCase();
    return TAB_STATUSES[activeTab]?.includes(status);
  });

  const renderSkeleton = () => (
    <View className="px-4">
      {[1, 2, 3].map((i) => (
        <View key={i} className="mb-4">
          <SkeletonLoader width="100%" height={130} borderRadius={16} />
        </View>
      ))}
    </View>
  );

  const renderItem = ({ item }) => {
    const status = (item.status || '').toUpperCase();
    const statusStyle = STATUS_STYLE[status] || STATUS_STYLE.DONE;
    const canTrack = ['BOOKED', 'SERVING'].includes(status);
    const canCancel = status === 'BOOKED';
    const clinicName = item.clinicName || item.clinic?.name || 'Clinic';
    const doctorName = item.doctorName || item.clinic?.doctorName || 'Doctor';

    return (
      <Card padding="p-4" style={{ marginBottom: 16 }}>
        {/* Header Row: TokenBadge + Clinic info + Status */}
        <View className="flex-row items-start mb-3">
          <TokenBadge tokenNumber={item.tokenNumber} size="small" />
          <View className="flex-1 ml-3">
            <Text className="font-bold text-base text-textPrimary" numberOfLines={1}>
              {clinicName}
            </Text>
            <Text className="text-textSecondary text-sm">{doctorName}</Text>
          </View>
          <View className={`px-2 py-1 rounded-full ${statusStyle.bg}`}>
            <Text className={`text-[10px] font-bold uppercase ${statusStyle.text}`}>
              {statusStyle.label}
            </Text>
          </View>
        </View>

        {/* Date + Time */}
        <View className="flex-row items-center mb-4">
          <Text className="text-sm mr-1">📅</Text>
          <Text className="text-textSecondary text-sm font-medium">
            {new Date(item.date).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })}
            {'  ·  '}
            {item.timeSlot}
          </Text>
        </View>

        {/* Action Buttons */}
        {(canTrack || canCancel) && (
          <View className="flex-row space-x-2">
            {canTrack && (
              <View className="flex-1 mr-1">
                <Button
                  label="Track Queue"
                  variant="primary"
                  onPress={() => navigation.navigate('QueueTracking', { appointmentId: item.id })}
                />
              </View>
            )}
            {canCancel && (
              <View className="flex-1 ml-1">
                <Button
                  label="Cancel"
                  variant="danger"
                  onPress={() => handleCancel(item.id)}
                />
              </View>
            )}
          </View>
        )}
      </Card>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]">
      <StatusBar style="dark" />

      {/* Header */}
      <View className="px-6 pt-4 pb-3 bg-white border-b border-[#E5E7EB]">
        <Text className="text-2xl font-bold text-textPrimary">My Appointments</Text>
      </View>

      {/* Filter Tabs */}
      <View className="bg-white border-b border-[#E5E7EB]">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24, paddingVertical: 12 }}>
          {TABS.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full mr-2 border ${
                activeTab === tab ? 'bg-primary border-primary' : 'bg-white border-[#E5E7EB]'
              }`}
            >
              <Text className={`font-medium ${activeTab === tab ? 'text-white' : 'text-textSecondary'}`}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Content */}
      {loading ? (
        <View className="pt-6">{renderSkeleton()}</View>
      ) : (
        <FlatList
          data={filteredAppointments}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#2563EB']} />
          }
           ListEmptyComponent={
             <View className="items-center justify-center pt-24">
               <Text className="text-4xl mb-4">📅</Text>
               <Text className="text-lg font-bold text-textPrimary text-center">No appointments yet</Text>
               <Text className="text-textSecondary text-center mt-2 max-w-[260px]">
                 Book an appointment to see it listed here.
               </Text>
             </View>
           }
        />
      )}
    </SafeAreaView>
  );
};

export default MyAppointmentsScreen;
