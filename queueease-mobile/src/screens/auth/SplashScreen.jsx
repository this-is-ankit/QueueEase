import React, { useEffect, useContext } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { AuthContext } from '../../context/AuthContext';
import { getToken, removeToken, removeUserData } from '../../utils/storage';
import { getProfile } from '../../api/auth.api';

// ─── Role-based navigation helper ─────────────────────────────────────────────
const navigateByRole = (navigation, role) => {
  if (role === 'ADMIN') {
    navigation.replace('AdminTabs');
  } else if (role === 'VERIFIER') {
    navigation.replace('VerifierTabs');
  } else {
    navigation.replace('UserTabs');
  }
};

const SplashScreen = () => {
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    let isMounted = true;

    const bootstrap = async () => {
      try {
        const token = await getToken();

        if (!token) {
          // No token stored — go to Login after brief delay for logo display
          setTimeout(() => {
            if (isMounted) navigation.replace('Login');
          }, 1500);
          return;
        }

        // Token found — validate with backend
        const data = await getProfile();
        const user = data?.user || data;

        if (isMounted && user?.role) {
          // hydrate context with latest profile
          await login(token, user);
          navigateByRole(navigation, user.role);
        } else {
          // Unexpected response shape — treat as invalid
          throw new Error('Invalid profile response');
        }
      } catch (error) {
        // 401 or any failure — clear stale credentials and go to Login
        await removeToken().catch(() => {});
        await removeUserData().catch(() => {});
        if (isMounted) navigation.replace('Login');
      }
    };

    bootstrap();
    return () => { isMounted = false; };
  }, [navigation]);

  return (
    <View className="flex-1 bg-white justify-center items-center">
      <StatusBar style="dark" />

      {/* Logo / Branding */}
      <View className="items-center mb-12">
        {/* Blue circle icon */}
        <View className="w-20 h-20 bg-primary rounded-2xl justify-center items-center mb-6 shadow-md">
          <Text className="text-white text-4xl font-extrabold">Q</Text>
        </View>
        <Text className="text-[28px] font-bold text-[#111827] mb-2">QueueEase</Text>
        <Text className="text-base text-[#6B7280]">Skip the Queue. Save Your Time.</Text>
      </View>

      {/* Loading indicator */}
      <ActivityIndicator size="large" color="#2563EB" />
      <Text className="text-[#9CA3AF] text-sm mt-3">Checking session...</Text>
    </View>
  );
};

export default SplashScreen;
