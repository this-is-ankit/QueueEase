import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, RefreshControl, Linking, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';

import { getPendingClinics } from '../../api/verifier.api';

const VerifierDashboardScreen = () => {
  const navigation = useNavigation();
  const [clinics, setClinics] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchVerifications = async () => {
    try {
      let params = {};
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
        params = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          radius: 50 // Default 50km for verifiers
        };
      }

      const res = await getPendingClinics(params);
      const list = res?.clinics || res?.data?.clinics || res || [];
      setClinics(list);
    } catch (err) {
      console.error(err);
      Toast.show({ type: 'error', text1: 'Error', text2: 'Could not load pending verifications.' });
    } finally {
      setIsRefreshing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerifications();
  }, []);

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchVerifications();
  };

  const handleNavigate = (clinic) => {
    const scheme = Platform.select({ ios: 'maps://0,0?q=', android: 'geo:0,0?q=' });
    let latLng = '';
    
    if (clinic.latitude && clinic.longitude) {
      latLng = `${clinic.latitude},${clinic.longitude}`;
    } else {
      latLng = `${clinic.address}`; // Fallback to text encoding
    }
    
    const url = Platform.select({
      ios: `${scheme}${clinic.name}@${latLng}`,
      android: `${scheme}${latLng}(${clinic.name})`
    });

    Linking.openURL(url).catch(() => {
        // Fallback to purely google maps intent / URL
        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(clinic.address)}`);
    });
  };

  const renderItem = ({ item }) => (
    <View className="bg-white rounded-2xl p-4 border border-[#E5E7EB] mb-4 shadow-sm">
      <View className="flex-row items-start mb-3">
        <Image 
          source={{ uri: item.imageUrl || item.images?.[0] }} 
          className="w-16 h-16 rounded-xl bg-gray-200 mr-3"
        />
        <View className="flex-1">
          <View className="flex-row justify-between items-start">
            <Text className="font-bold text-lg text-textPrimary flex-1" numberOfLines={1}>{item.name}</Text>
            <View className="bg-yellow-100 px-2 py-0.5 rounded ml-2 border border-yellow-200">
               <Text className="text-yellow-700 text-[10px] font-bold uppercase">Pending</Text>
            </View>
          </View>
          <Text className="text-textSecondary text-sm mb-1">{item.doctorName}</Text>
          <View className="flex-row items-center">
            <Text className="text-xs mr-1">📍</Text>
            <Text className="text-textSecondary text-xs flex-1" numberOfLines={1}>{item.address}</Text>
          </View>
        </View>
      </View>

      <View className="h-[1px] bg-gray-100 my-2" />
      
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-textSecondary text-xs">{item.distance}</Text>
         {item.submittedAt ? (
           <Text className="text-textSecondary text-xs italic">Submitted on {new Date(item.submittedAt).toLocaleDateString()}</Text>
         ) : null}
      </View>

      <View className="flex-row justify-between space-x-2 mt-1">
        <TouchableOpacity 
          className="flex-1 border-2 border-[#E5E7EB] rounded-xl py-2 items-center"
          onPress={() => navigation.navigate('VerificationDetail', { clinicId: item.id })}
        >
          <Text className="font-semibold text-textPrimary">View Details</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="flex-1 bg-primary rounded-xl py-2 flex-row items-center justify-center"
          onPress={() => handleNavigate(item)}
        >
          <Text className="mr-1">🧭</Text>
          <Text className="font-semibold text-white">Navigate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]">
      <StatusBar style="dark" />
      
      <View className="px-6 py-6 border-b border-[#E5E7EB] bg-white">
        <Text className="text-2xl font-bold text-textPrimary mb-1">Pending Verifications</Text>
         <Text className="text-textSecondary font-medium">{clinics.length} clinics awaiting your visit</Text>
      </View>

      <FlatList
        data={clinics}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 24 }}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} colors={['#2563EB']} />}
         ListEmptyComponent={
           !loading && (
             <View className="flex-1 items-center justify-center pt-20">
               <Text className="text-4xl mb-4">🎉</Text>
               <Text className="text-lg font-bold text-textPrimary text-center">No pending clinics</Text>
               <Text className="text-textSecondary text-center mt-2">You're all caught up!</Text>
             </View>
           )
         }
      />
    </SafeAreaView>
  );
};

export default VerifierDashboardScreen;
