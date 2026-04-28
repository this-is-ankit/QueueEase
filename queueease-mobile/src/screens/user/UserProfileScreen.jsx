import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { AuthContext } from '../../context/AuthContext';
import Button from '../../components/common/Button';

const UserProfileScreen = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      
      <View className="px-6 py-4 border-b border-gray-100">
        <Text className="text-2xl font-bold text-textPrimary">My Profile</Text>
      </View>

      <ScrollView className="flex-1 px-6 pt-6">
        {/* Profile Header */}
        <View className="items-center mb-8">
          <View className="w-24 h-24 bg-blue-100 rounded-full items-center justify-center mb-4">
            <Text className="text-4xl">👤</Text>
          </View>
          <Text className="text-xl font-bold text-textPrimary">{user?.name || 'User'}</Text>
          <Text className="text-textSecondary">{user?.phone || user?.email || 'user@example.com'}</Text>
        </View>

        {/* Info Section */}
        <View className="bg-gray-50 rounded-2xl p-6 mb-8">
          <Text className="text-sm font-bold text-textSecondary uppercase tracking-wider mb-4">Personal Details</Text>
          
          <View className="flex-row justify-between mb-4 pb-4 border-b border-gray-200">
            <Text className="text-textSecondary">Name</Text>
            <Text className="text-textPrimary font-medium">{user?.name}</Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-textSecondary">Phone</Text>
            <Text className="text-textPrimary font-medium">{user?.phone}</Text>
          </View>
        </View>

        {/* User Specific Actions */}
        <View className="mb-10">
           <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-100">
              <Text className="text-lg mr-3">📅</Text>
              <Text className="flex-1 text-textPrimary text-base font-medium">My Appointments</Text>
              <Text className="text-textSecondary">›</Text>
           </TouchableOpacity>
           
           <TouchableOpacity className="flex-row items-center py-4 border-b border-gray-100">
              <Text className="text-lg mr-3">💳</Text>
              <Text className="flex-1 text-textPrimary text-base font-medium">Payment History</Text>
              <Text className="text-textSecondary">›</Text>
           </TouchableOpacity>

           <TouchableOpacity className="flex-row items-center py-4">
              <Text className="text-lg mr-3">📍</Text>
              <Text className="flex-1 text-textPrimary text-base font-medium">Saved Addresses</Text>
              <Text className="text-textSecondary">›</Text>
           </TouchableOpacity>
        </View>

        <Button 
          label="Logout" 
          variant="secondary" 
          onPress={handleLogout}
          fullWidth={true}
        />
        
        <Text className="text-center text-gray-400 text-xs mt-8 mb-10">
          QueueEase v1.0.0
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserProfileScreen;
