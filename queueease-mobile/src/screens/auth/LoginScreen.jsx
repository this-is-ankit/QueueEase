import React, { useState, useContext, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { AuthContext } from '../../context/AuthContext';
import { login as loginRequest } from '../../api/auth.api';

// ─── Role-based navigation helper ─────────────────────────────────────────────
const navigateByRole = (navigation, role) => {
  if (role === 'ADMIN') navigation.replace('AdminTabs');
  else if (role === 'VERIFIER') navigation.replace('VerifierTabs');
  else navigation.replace('UserTabs');
};

// ─── Validation ────────────────────────────────────────────────────────────────
const validate = (email, password) => {
  const errors = {};
  if (!email.trim()) errors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.';
  if (!password) errors.password = 'Password is required.';
  return errors;
};

const LoginScreen = () => {
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);
  const passwordRef = useRef(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    // Clear previous errors
    setApiError('');
    const validationErrors = validate(email, password);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    setIsLoading(true);
    try {
      const data = await loginRequest(email.trim().toLowerCase(), password);

      // Persist JWT + user via AuthContext
      await login(data.token, data.user);

      navigateByRole(navigation, data.user.role);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        (error.code === 'ECONNABORTED' ? 'Request timed out. Check your connection.' : 'Login failed. Please try again.');
      setApiError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          className="flex-1 px-6"
          contentContainerStyle={{ justifyContent: 'center', flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View className="mb-8">
            <Text className="text-[32px] font-bold text-[#111827]">Welcome Back 👋</Text>
            <Text className="text-base text-[#6B7280] mt-1">Sign in to continue</Text>
          </View>

          {/* API error banner */}
          {!!apiError && (
            <View className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5 flex-row items-center">
              <Text className="text-sm text-red-600 flex-1">{apiError}</Text>
            </View>
          )}

          {/* Email */}
          <View className="mb-4">
            <Text className="text-sm font-medium text-[#6B7280] mb-2">Email Address</Text>
            <View className={`flex-row items-center bg-[#F9FAFB] rounded-xl px-4 h-14 border ${errors.email ? 'border-red-400' : 'border-[#E5E7EB]'}`}>
              <Text className="text-[#6B7280] mr-2">✉️</Text>
              <TextInput
                className="flex-1 text-[#111827] text-base"
                placeholder="Enter your email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                value={email}
                onChangeText={(t) => { setEmail(t); if (errors.email) setErrors((e) => ({ ...e, email: '' })); }}
                onSubmitEditing={() => passwordRef.current?.focus()}
              />
            </View>
            {!!errors.email && <Text className="text-red-500 text-xs mt-1 ml-1">{errors.email}</Text>}
          </View>

          {/* Password */}
          <View className="mb-8">
            <Text className="text-sm font-medium text-[#6B7280] mb-2">Password</Text>
            <View className={`flex-row items-center bg-[#F9FAFB] rounded-xl px-4 h-14 border ${errors.password ? 'border-red-400' : 'border-[#E5E7EB]'}`}>
              <Text className="text-[#6B7280] mr-2">🔒</Text>
              <TextInput
                ref={passwordRef}
                className="flex-1 text-[#111827] text-base"
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                returnKeyType="done"
                value={password}
                onChangeText={(t) => { setPassword(t); if (errors.password) setErrors((e) => ({ ...e, password: '' })); }}
                onSubmitEditing={handleLogin}
              />
            </View>
            {!!errors.password && <Text className="text-red-500 text-xs mt-1 ml-1">{errors.password}</Text>}
          </View>

          {/* Login Button */}
          <TouchableOpacity
            className={`bg-primary rounded-xl h-14 justify-center items-center mb-6 ${isLoading ? 'opacity-70' : ''}`}
            onPress={handleLogin}
            disabled={isLoading}
            activeOpacity={0.85}
          >
            {isLoading
              ? <ActivityIndicator color="#FFFFFF" />
              : <Text className="text-white font-semibold text-lg">Login</Text>
            }
          </TouchableOpacity>

          {/* Register Link */}
          <View className="flex-row justify-center">
            <Text className="text-[#6B7280] text-base">Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text className="text-primary font-bold text-base">Register</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
