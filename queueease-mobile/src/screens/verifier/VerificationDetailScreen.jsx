import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, TextInput, Modal, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import { StatusBar } from 'expo-status-bar';

import { getClinicDetails, approveClinic, rejectClinic } from '../../api/verifier.api';
import ImageCarousel from '../../components/clinic/ImageCarousel';
import SkeletonLoader from '../../components/common/SkeletonLoader';

const VerificationDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { clinicId } = route.params;

  const [clinic, setClinic] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Verification Form State
  const [verificationPhoto, setVerificationPhoto] = useState(null);
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Reject Modal State
  const [isRejectModalVisible, setRejectModalVisible] = useState(false);
  const [rejectReason, setRejectReason] = useState('');

  const fetchClinic = async () => {
    try {
      const res = await getClinicDetails(clinicId);
      // The API response via Axios puts the backend payload in res
      // Our backend sends { success: true, message: "...", data: { clinic: { ... } } }
      const clinicData = res?.data?.clinic || res?.clinic || res;
      setClinic(clinicData);
    } catch (err) {
      console.error(err);
      Toast.show({ type: 'error', text1: 'Error', text2: 'Could not load clinic details.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClinic();
  }, [clinicId]);

  const snapPhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Toast.show({ type: 'error', text1: 'Camera required', text2: 'You must grant camera permissions to capture visual proof.' });
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setVerificationPhoto(result.assets[0]);
    }
  };

  const handleApprove = async () => {
    if (!verificationPhoto) {
      Toast.show({ type: 'error', text1: 'Photo Required', text2: 'Please capture a verification photo.' });
      return;
    }

    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append('notes', notes || 'Clinic approved during physical visit.');
      formData.append('proofPhoto', {
        uri: verificationPhoto.uri,
        type: 'image/jpeg',
        name: 'verification.jpg'
      });

      await approveClinic(clinicId, formData);
      Toast.show({ type: 'success', text1: 'Verified', text2: 'Clinic successfully verified and activated.' });
      navigation.goBack();
    } catch (err) {
      console.error(err);
      Toast.show({ type: 'error', text1: 'Action Failed', text2: 'Could not approve clinic.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      Toast.show({ type: 'error', text1: 'Reason Required', text2: 'Please explain why this clinic is being rejected.' });
      return;
    }

    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append('notes', rejectReason);
      if (verificationPhoto) {
        formData.append('proofPhoto', {
          uri: verificationPhoto.uri,
          type: 'image/jpeg',
          name: 'rejection_proof.jpg'
        });
      }

      await rejectClinic(clinicId, formData);
      setRejectModalVisible(false);
      Toast.show({ type: 'success', text1: 'Rejected', text2: 'Clinic application rejected.' });
      navigation.goBack();
    } catch (err) {
      console.error(err);
      Toast.show({ type: 'error', text1: 'Action Failed', text2: 'Could not reject clinic.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !clinic) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <View className="px-6 py-4"><SkeletonLoader width="100%" height={250} borderRadius={16} /></View>
        <View className="px-6 py-4"><SkeletonLoader width="100%" height={200} borderRadius={16} /></View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      
      <View className="flex-row items-center px-4 py-3 border-b border-[#E5E7EB] bg-white z-10">
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2 mr-2">
          <Text className="text-xl">←</Text>
        </TouchableOpacity>
        <Text className="text-xl font-bold flex-1 text-textPrimary">Verification Info</Text>
      </View>

      <ScrollView className="flex-1 pb-40" showsVerticalScrollIndicator={false}>
        <ImageCarousel images={clinic.clinicImages || []} />

        <View className="px-6 py-6 border-b border-[#E5E7EB]">
           <View className="flex-row justify-between items-start mb-4">
             <View className="flex-1">
               <Text className="text-2xl font-bold text-textPrimary mb-1">{clinic.name}</Text>
               <Text className="text-textSecondary leading-5">{clinic.address}</Text>
               <Text className="text-textSecondary text-xs mt-1 uppercase tracking-wider font-bold">{clinic.city}, {clinic.state}</Text>
             </View>
             <View className="bg-yellow-100 px-3 py-1 rounded ml-4 border border-yellow-200">
               <Text className="text-yellow-700 font-bold uppercase text-xs">Pending</Text>
             </View>
           </View>

           <View className="flex-row items-center mt-2 p-4 bg-[#F9FAFB] rounded-xl border border-[#E5E7EB]">
              {clinic.doctorPhoto ? (
                <Image source={{ uri: clinic.doctorPhoto }} className="w-14 h-14 rounded-full bg-gray-200 mr-4" />
              ) : (
                <View className="w-14 h-14 rounded-full bg-blue-100 items-center justify-center mr-4">
                  <Text className="text-xl">👨‍⚕️</Text>
                </View>
              )}
              <View>
                 <Text className="font-bold text-textPrimary text-base">{clinic.doctorName}</Text>
                 <Text className="text-textSecondary text-sm">
                   {clinic.degree || 'MD'} • {clinic.specialization || 'General'}
                 </Text>
                 <Text className="text-textSecondary text-xs mt-0.5">
                   Experience: {clinic.experience !== null && clinic.experience !== undefined ? clinic.experience : '0'} Years
                 </Text>
              </View>
           </View>

           <View className="flex-row justify-between items-center mt-4 pt-4 border-t border-gray-50">
             <Text className="text-textSecondary font-medium">Max Patients/Day</Text>
             <Text className="font-bold text-textPrimary text-base">{clinic.maxPatientsPerDay || '30'}</Text>
           </View>

           <View className="flex-row justify-between items-center mt-2">
             <Text className="text-textSecondary font-medium">Pincode</Text>
             <Text className="font-bold text-textPrimary text-base">{clinic.pincode || 'N/A'}</Text>
           </View>

           {clinic.paymentRequired && (
             <View className="flex-row justify-between items-center mt-2">
               <Text className="text-textSecondary font-medium">Consultation Fee</Text>
               <Text className="font-bold text-primary text-base">₹{clinic.consultationFee || '0'}</Text>
             </View>
           )}
        </View>

        {/* Verifier Action Zone */}
        <View className="px-6 py-6 bg-blue-50/30">
           <Text className="text-lg font-bold text-textPrimary mb-4">Your Field Report</Text>
           
           <Text className="text-sm font-medium text-textSecondary mb-2">Upload Verification Photo</Text>
            {verificationPhoto ? (
              <View className="mb-6 relative">
                <Image source={{ uri: verificationPhoto.uri }} className="w-full h-48 rounded-xl border border-[#E5E7EB]" />
                <TouchableOpacity 
                  className="absolute top-2 right-2 bg-black/50 p-2 rounded-full"
                  onPress={() => setVerificationPhoto(null)}
               >
                 <Text className="text-white text-xs font-bold">Retake</Text>
               </TouchableOpacity>
             </View>
            ) : (
              <TouchableOpacity 
                className="h-32 bg-[#F9FAFB] rounded-xl border-2 border-dashed border-[#2563EB]/50 items-center justify-center mb-6"
                onPress={snapPhoto}
              >
                <Text className="text-3xl mb-1">📷</Text>
                <Text className="text-primary font-semibold">Snap Proof photo</Text>
              </TouchableOpacity>
            )}

           <Text className="text-sm font-medium text-textSecondary mb-2">Verification Notes</Text>
           <TextInput
             className="bg-white rounded-xl p-4 min-h-[100px] border border-[#E5E7EB] text-base text-textPrimary"
             multiline
             textAlignVertical="top"
             placeholder="Add notes about facility cleanliness, location accuracy, etc..."
             value={notes}
             onChangeText={setNotes}
           />
        </View>
      </ScrollView>

      {/* Sticky Bottom Actions */}
      <View className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-[#E5E7EB] shadow-2xl flex-row space-x-3">
        <TouchableOpacity 
          className="flex-1 bg-white border-2 border-error rounded-xl h-14 justify-center items-center mr-2 shadow-sm"
          onPress={() => setRejectModalVisible(true)}
          disabled={submitting}
        >
          <Text className="text-error font-bold text-lg">❌ Reject</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="flex-[1.5] bg-[#10B981] rounded-xl h-14 justify-center items-center ml-2 shadow-sm"
          onPress={handleApprove}
          disabled={submitting}
        >
          {submitting ? <ActivityIndicator color="#fff" /> : <Text className="text-white font-bold text-lg">✅ Mark as Verified</Text>}
        </TouchableOpacity>
      </View>

      {/* Rejection Modal */}
      <Modal visible={isRejectModalVisible} transparent animationType="fade">
        <View className="flex-1 justify-center px-6 bg-black/50">
          <View className="bg-white p-6 rounded-2xl shadow-xl">
            <Text className="text-xl font-bold text-textPrimary mb-2">Reject Clinic</Text>
            <Text className="text-textSecondary mb-4">Please specify exactly why this facility failed verification.</Text>
            
            <TextInput
              className="bg-[#F9FAFB] rounded-xl p-4 min-h-[100px] border border-[#E5E7EB] text-base mb-6"
              multiline
              textAlignVertical="top"
              placeholder="e.g. Address does not exist..."
              value={rejectReason}
              onChangeText={setRejectReason}
            />

            <View className="flex-row space-x-3">
              <TouchableOpacity 
                className="flex-1 py-3 items-center rounded-xl bg-gray-100"
                onPress={() => setRejectModalVisible(false)}
              >
                <Text className="font-semibold text-textSecondary">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="flex-1 py-3 items-center rounded-xl bg-error"
                onPress={handleReject}
              >
                <Text className="font-bold text-white">Confirm Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

export default VerificationDetailScreen;
