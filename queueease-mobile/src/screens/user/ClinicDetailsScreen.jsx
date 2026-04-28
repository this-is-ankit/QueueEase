import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Linking } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import { getClinicById } from '../../api/clinic.api';
import LiveQueueCard from '../../components/common/LiveQueueCard';
import ImageCarousel from '../../components/clinic/ImageCarousel';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { buildMapsUrl, normalizeClinic } from '../../utils/helpers';

const ClinicDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { clinicId } = route.params;

  const [clinic, setClinic] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchClinicDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getClinicById(clinicId);
      setClinic(normalizeClinic(data));
    } catch (err) {
      console.error(err);
      setError('Could not load clinic details. Tap to retry.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClinicDetails();
  }, [clinicId]);

  const handleOpenMap = async () => {
    if (!clinic) return;

    const mapUrl = buildMapsUrl(
      clinic.displayAddress || clinic.address || clinic.name,
      clinic.latitude,
      clinic.longitude
    );

    try {
      const supported = await Linking.canOpenURL(mapUrl);
      if (!supported) {
        Toast.show({ type: 'error', text1: 'Map unavailable', text2: 'No supported maps app was found.' });
        return;
      }
      await Linking.openURL(mapUrl);
    } catch (err) {
      console.error(err);
      Toast.show({ type: 'error', text1: 'Map unavailable', text2: 'Could not open the map link.' });
    }
  };

  if (error) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-white px-6">
        <Text className="text-error font-medium mb-4 text-center">{error}</Text>
        <TouchableOpacity onPress={fetchClinicDetails} className="bg-primary px-6 py-3 rounded-xl">
          <Text className="text-white font-semibold">Retry</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (loading || !clinic) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <SkeletonLoader width="100%" height={256} borderRadius={0} />
        <View className="px-6 py-6">
          <View className="flex-row items-center mb-6">
            <SkeletonLoader width={64} height={64} borderRadius={32} />
            <View className="ml-4 flex-1">
              <SkeletonLoader width={150} height={20} />
              <View className="h-2" />
              <SkeletonLoader width={100} height={16} />
            </View>
          </View>
          <SkeletonLoader width="100%" height={160} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View className="flex-1 bg-white relative">
      <StatusBar style="light" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Top Carousel section + Back button overlying it */}
        <View className="relative">
          <ImageCarousel images={clinic.clinicImages?.length > 0 ? clinic.clinicImages : [clinic.doctorPhoto || 'https://via.placeholder.com/300x200.png?text=Clinic']} />
          
          <TouchableOpacity 
            className="absolute top-12 left-4 w-10 h-10 bg-black/30 rounded-full justify-center items-center backdrop-blur-md"
            onPress={() => navigation.goBack()}
          >
            <Text className="text-white text-lg font-bold">←</Text>
          </TouchableOpacity>
        </View>

        {/* Info Container */}
        <View className="px-6 py-6 border-b border-[#E5E7EB]">
          {/* Doctor Section */}
          <View className="flex-row items-center">
            <Image 
              source={{ uri: clinic.doctorPhoto || 'https://via.placeholder.com/150' }}
              className="w-16 h-16 rounded-full bg-gray-200 border-2 border-white shadow-sm"
            />
            <View className="ml-4 flex-1">
              <Text className="text-2xl font-bold text-textPrimary" numberOfLines={1}>
                {clinic.doctorName || clinic.name || 'Clinic details'}
              </Text>
              
              <View className="flex-row items-center mt-1">
                {!!clinic.degree && (
                  <Text className="text-textSecondary font-medium">{clinic.degree}</Text>
                )}
                {!!clinic.degree && !!clinic.specialization && (
                  <View className="w-1 h-1 bg-gray-400 rounded-full mx-2" />
                )}
                {!!clinic.specialization && (
                  <View className="bg-primary/10 px-2 py-0.5 rounded pl-2">
                    <Text className="text-primary text-xs font-semibold">{clinic.specialization}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* Experience & Rating Row */}
          <View className="flex-row justify-between mt-6 bg-cardBg p-4 rounded-xl border border-[#E5E7EB]">
            <View className="items-center flex-1 border-r border-[#E5E7EB]">
              <Text className="text-textSecondary text-xs mb-1">Experience</Text>
              <Text className="text-textPrimary font-bold text-base">
                {clinic.experience ? `${clinic.experience} Years` : 'Not provided'}
              </Text>
            </View>
            <View className="items-center flex-1">
              <Text className="text-textSecondary text-xs mb-1">Rating</Text>
              <View className="flex-row items-center">
                <Text className="text-[#F59E0B] mr-1">⭐</Text>
                <Text className="text-textPrimary font-bold text-base">
                  {clinic.rating ? clinic.rating.toFixed(1) : 'New'}
                  <Text className="text-textSecondary font-normal text-sm"> ({clinic.reviewsCount || 0})</Text>
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="px-6 py-6">
          <Text className="text-lg font-bold text-textPrimary mb-3">Location</Text>
          <View className="flex-row items-start">
            <Text className="text-primary mt-0.5 mr-2 text-lg">📍</Text>
            <View className="flex-1">
              <Text className="text-textPrimary font-medium text-base mb-1">{clinic.name}</Text>
              <Text className="text-textSecondary leading-5 mb-2">{clinic.displayAddress || 'Address not listed'}</Text>
              <TouchableOpacity onPress={handleOpenMap}>
                <Text className="text-primary font-semibold text-sm">View on Map</Text>
              </TouchableOpacity>
            </View>
          </View>

          {(clinic.admin?.phone || clinic.admin?.email || clinic.college) && (
            <View className="mt-8 bg-cardBg p-4 rounded-xl border border-[#E5E7EB]">
              <Text className="text-lg font-bold text-textPrimary mb-3">Additional Details</Text>
              {!!clinic.college && (
                <Text className="text-textSecondary mb-2">College: <Text className="text-textPrimary">{clinic.college}</Text></Text>
              )}
              {!!clinic.admin?.phone && (
                <Text className="text-textSecondary mb-2">Contact: <Text className="text-textPrimary">{clinic.admin.phone}</Text></Text>
              )}
              {!!clinic.admin?.email && (
                <Text className="text-textSecondary">Email: <Text className="text-textPrimary">{clinic.admin.email}</Text></Text>
              )}
            </View>
          )}

          {/* Live Queue Component injects Real-Time Status via Socket.IO */}
          <View className="mt-8">
            <LiveQueueCard clinicId={clinicId} />
          </View>

        </View>
      </ScrollView>

      {/* Sticky Bottom Bar */}
      <View className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-[#E5E7EB] shadow-2xl">
        <TouchableOpacity 
          className="bg-primary rounded-xl h-14 justify-center items-center flex-row shadow-sm"
          onPress={() => navigation.navigate('BookAppointment', { clinicId })}
        >
          <Text className="text-white font-semibold text-lg">Book Appointment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ClinicDetailsScreen;
