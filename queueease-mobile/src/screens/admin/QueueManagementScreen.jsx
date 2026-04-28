import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { StatusBar } from 'expo-status-bar';

import { AuthContext } from '../../context/AuthContext';
import { useQueue } from '../../hooks/useQueue';
import { markAsDone } from '../../api/queue.api';
import { getClinicAppointmentsToday } from '../../api/appointment.api';
import { getMyClinic } from '../../api/clinic.api';

const TABS = ['All', 'Waiting', 'Serving', 'Done'];

const QueueManagementScreen = () => {
  const { user } = useContext(AuthContext);
  const [clinic, setClinic] = useState(null);
  const { currentToken } = useQueue(clinic?.id);

  const [activeTab, setActiveTab] = useState('All');
  const [patients, setPatients] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loadingClinic, setLoadingClinic] = useState(true);

  const fetchClinic = async () => {
    try {
      setLoadingClinic(true);
      const res = await getMyClinic();
      const data = res?.clinic || res;
      setClinic(data);
      return data;
    } catch (error) {
      console.error(error);
      Toast.show({ type: 'error', text1: 'Error', text2: 'Could not load clinic' });
    } finally {
      setLoadingClinic(false);
    }
  };

  const fetchQueueData = async (clinicIdParam) => {
    if (!clinicIdParam) return;
    try {
      const res = await getClinicAppointmentsToday(clinicIdParam);
      const list = res?.appointments || res || [];
      setPatients(list);
    } catch (err) {
      console.error(err);
      Toast.show({ type: 'error', text1: 'Error', text2: 'Could not load queue' });
    } finally {
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchClinic();
  }, []);

  useEffect(() => {
    if (clinic?.id) {
      fetchQueueData(clinic.id);
    }
  }, [clinic?.id, currentToken]);

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchClinic().then((data) => fetchQueueData(data?.id));
  };

  const handleMarkDone = async (patient) => {
    if (!clinic?.id) return;
    try {
      await markAsDone(clinic.id);
      Toast.show({ type: 'success', text1: 'Patient marked as done' });
      fetchQueueData(clinic.id);
    } catch (error) {
      Toast.show({ type: 'error', text1: 'Error updating patient status' });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'WAITING': return 'bg-gray-100 text-gray-600 border-gray-200';
      case 'SERVING': return 'bg-primary/10 text-primary border-primary/30';
      case 'DONE': return 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const filteredPatients = patients.filter(p => activeTab === 'All' || (p.status || '').toUpperCase() === activeTab.toUpperCase());

  if (loadingClinic) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#2563EB" />
        <Text className="text-textSecondary mt-2">Loading clinic...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]">
      <StatusBar style="dark" />
      
      <View className="px-6 py-4 bg-white border-b border-[#E5E7EB]">
        <Text className="text-xl font-bold text-textPrimary">Queue Management</Text>
      </View>

      <View className="bg-white px-6 py-3 border-b border-[#E5E7EB]">
         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
           {TABS.map(tab => (
             <TouchableOpacity 
               key={tab}
               onPress={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full mr-2 border ${
                activeTab === tab ? 'bg-primary border-primary' : 'bg-white border-[#E5E7EB]'
              }`}
            >
              <Text className={`font-medium ${activeTab === tab ? 'text-white' : 'text-textSecondary'}`}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView 
        className="flex-1 px-4 pt-4"
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} colors={['#2563EB']} />}
      >
        {filteredPatients.length === 0 ? (
          <View className="items-center justify-center py-16">
            <Text className="text-4xl mb-3">🕒</Text>
            <Text className="text-textSecondary">No patients in this filter.</Text>
          </View>
        ) : (
          filteredPatients.map((patient) => {
            const status = (patient.status || '').toUpperCase();
            return (
              <View key={patient.id || patient.tokenNumber} className="bg-white rounded-2xl border border-[#E5E7EB] p-4 mb-4 shadow-sm">
                <View className="flex-row justify-between items-start mb-3">
                  <View className="flex-row items-center">
                     <View className="w-12 h-12 bg-gray-100 rounded-full justify-center items-center mr-3 border border-gray-200">
                        <Text className="text-lg font-bold text-textPrimary text-center">#{patient.tokenNumber || patient.token}</Text>
                     </View>
                     <View>
                       <Text className="font-bold text-base text-textPrimary">{patient.patientName || patient.name}</Text>
                       <Text className="text-textSecondary text-xs">{patient.phone} • {patient.timeSlot || patient.timeBooked}</Text>
                     </View>
                  </View>
                  
                  <View className={`px-2 py-1 rounded border ${getStatusColor(status)}`}>
                    <Text className="text-[10px] font-bold uppercase">{status}</Text>
                  </View>
                </View>

                {status !== 'DONE' && status !== 'COMPLETED' && (
                  <View className="h-[1px] w-full bg-gray-100 my-3" />
                )}
                
                {status !== 'DONE' && status !== 'COMPLETED' && (
                  <View className="flex-row justify-end space-x-2">
                    <TouchableOpacity 
                       className="px-4 py-2 bg-[#10B981] rounded-lg shadow-sm"
                       onPress={() => handleMarkDone(patient)}
                    >
                      <Text className="text-white font-bold text-sm">Mark as Done</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            );
          })
        )}
        <View className="h-20" />
      </ScrollView>

    </SafeAreaView>
  );
};

export default QueueManagementScreen;
