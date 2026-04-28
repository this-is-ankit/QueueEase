import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { normalizeClinic } from '../../utils/helpers';

const ClinicCard = ({ clinic }) => {
  const navigation = useNavigation();
  const normalizedClinic = normalizeClinic(clinic);

  const clinicId = normalizedClinic?.id;
  const name = normalizedClinic?.name || 'Unknown Clinic';
  const doctor = normalizedClinic?.doctorName || 'Doctor details unavailable';
  const specialization = normalizedClinic?.specialization || 'General service';
  const rating = normalizedClinic?.rating ? normalizedClinic.rating.toFixed(1) : 'New';
  const distance = normalizedClinic?.distance !== null && normalizedClinic?.distance !== undefined
    ? `${normalizedClinic.distance} km`
    : '';
  const isOpen = normalizedClinic?.isOpen !== false;
  const currentToken = normalizedClinic?.queueState?.currentToken ?? '0';
  const imageUrl = normalizedClinic?.clinicImages?.[0] || normalizedClinic?.doctorPhoto || 'https://via.placeholder.com/300x200.png?text=Clinic';
  const isDisabled = !clinicId;

  return (
    <TouchableOpacity 
      className="bg-cardBg rounded-xl p-4 mb-4 border border-[#E5E7EB] shadow-sm flex-row"
      onPress={() => clinicId && navigation.navigate('ClinicDetails', { clinicId })}
      disabled={isDisabled}
      activeOpacity={0.7}
    >
      <Image 
        source={{ uri: imageUrl }} 
        className="w-24 h-24 rounded-lg mr-4 bg-gray-200"
      />
      <View className="flex-1 justify-between">
        <View>
          <Text className="text-textPrimary font-bold text-lg" numberOfLines={1}>{name}</Text>
          <Text className="text-textSecondary text-sm" numberOfLines={1}>{doctor} · {specialization}</Text>
          
          <View className="flex-row items-center mt-1">
            <Text className="text-sm font-medium mr-1 text-[#111827]">⭐ {rating}</Text>
            {distance ? <Text className="text-textSecondary text-sm">· {distance}</Text> : null}
          </View>
        </View>

        <View className="flex-row items-center justify-between mt-2">
          <View className="flex-row items-center">
            <View className={`w-2 h-2 rounded-full mr-1.5 ${isOpen ? 'bg-secondary' : 'bg-error'}`} />
            <Text className={`text-xs font-semibold ${isOpen ? 'text-secondary' : 'text-error'}`}>
              {isOpen ? 'Open' : 'Closed'}
            </Text>
          </View>
          <View className="bg-primary/10 px-2 py-1 rounded-md">
            <Text className="text-primary text-xs font-bold">Serving #{currentToken}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ClinicCard;
