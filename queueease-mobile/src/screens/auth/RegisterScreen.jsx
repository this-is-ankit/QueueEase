import React, { useState, useContext, useRef } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ActivityIndicator, ScrollView, KeyboardAvoidingView, Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { AuthContext } from '../../context/AuthContext';
import { register as registerRequest } from '../../api/auth.api';

const ROLES = [
  { id: 'USER',     label: 'Patient',      icon: '🧑‍⚕️' },
  { id: 'ADMIN',    label: 'Clinic Admin', icon: '🏥' },
  { id: 'VERIFIER', label: 'Verifier',     icon: '🔍' },
];

// ─── Role-based navigation helper ─────────────────────────────────────────────
const navigateByRole = (navigation, role) => {
  if (role === 'ADMIN') navigation.replace('AdminTabs');
  else if (role === 'VERIFIER') navigation.replace('VerifierTabs');
  else navigation.replace('UserTabs');
};

// ─── Validation ────────────────────────────────────────────────────────────────
const validate = (name, phone, email, password) => {
  const errors = {};
  if (!name.trim()) errors.name = 'Full name is required.';
  if (!phone.trim()) errors.phone = 'Phone number is required.';
  else if (!/^[0-9+\s\-]{7,15}$/.test(phone.trim())) errors.phone = 'Enter a valid phone number.';
  if (!email.trim()) errors.email = 'Email is required.';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.';
  if (!password) errors.password = 'Password is required.';
  else if (password.length < 6) errors.password = 'Password must be at least 6 characters.';
  return errors;
};

const RegisterScreen = () => {
  const navigation = useNavigation();
  const { login } = useContext(AuthContext);

  // Refs for keyboard focus chain
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [name,         setName]         = useState('');
  const [phone,        setPhone]        = useState('');
  const [email,        setEmail]        = useState('');
  const [password,     setPassword]     = useState('');
  const [selectedRole, setSelectedRole] = useState('USER');
  const [errors,       setErrors]       = useState({});
  const [apiError,     setApiError]     = useState('');
  const [isLoading,    setIsLoading]    = useState(false);

  const clearFieldError = (field) =>
    setErrors((prev) => ({ ...prev, [field]: '' }));

  const handleRegister = async () => {
    setApiError('');
    const validationErrors = validate(name, phone, email, password);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    setIsLoading(true);
    try {
      const data = await registerRequest(
        name.trim(),
        phone.trim(),
        email.trim().toLowerCase(),
        password,
        selectedRole
      );

      // Auto-login: persist token + user
      await login(data.token, data.user);
      navigateByRole(navigation, data.user.role);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        (error.code === 'ECONNABORTED' ? 'Request timed out. Check your connection.' : 'Registration failed. Please try again.');
      setApiError(message);
    } finally {
      setIsLoading(false);
    }
  };

  // ─── Input field builder ────────────────────────────────────────────────────
  const renderInput = ({ label, icon, value, onChange, field, placeholder, keyboard = 'default', secure = false, ref, next, last }) => (
    <View className="mb-4">
      <Text className="text-sm font-medium text-[#6B7280] mb-2">{label}</Text>
      <View className={`flex-row items-center bg-[#F9FAFB] rounded-xl px-4 h-14 border ${errors[field] ? 'border-red-400' : 'border-[#E5E7EB]'}`}>
        <Text className="text-[#6B7280] mr-2">{icon}</Text>
        <TextInput
          ref={ref}
          className="flex-1 text-[#111827] text-base"
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          keyboardType={keyboard}
          autoCapitalize="none"
          secureTextEntry={secure}
          returnKeyType={last ? 'done' : 'next'}
          value={value}
          onChangeText={(t) => { onChange(t); clearFieldError(field); }}
          onSubmitEditing={last ? handleRegister : () => next?.current?.focus()}
        />
      </View>
      {!!errors[field] && <Text className="text-red-500 text-xs mt-1 ml-1">{errors[field]}</Text>}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView
          className="flex-1 px-6"
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          <View className="mt-8 mb-6">
            <Text className="text-[32px] font-bold text-[#111827]">Create Account</Text>
            <Text className="text-base text-[#6B7280] mt-1">Join QueueEase today.</Text>
          </View>

          {/* API error banner */}
          {!!apiError && (
            <View className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5">
              <Text className="text-sm text-red-600">{apiError}</Text>
            </View>
          )}

          {/* Role Selector */}
          <View className="mb-6">
            <Text className="text-sm font-medium text-[#6B7280] mb-3">I am a...</Text>
            <View className="flex-row justify-between">
              {ROLES.map((role) => {
                const isSelected = selectedRole === role.id;
                return (
                  <TouchableOpacity
                    key={role.id}
                    onPress={() => setSelectedRole(role.id)}
                    className={`flex-1 mx-1 h-16 rounded-xl items-center justify-center border-2 ${
                      isSelected ? 'border-primary bg-blue-50' : 'border-[#E5E7EB] bg-[#F9FAFB]'
                    }`}
                    activeOpacity={0.8}
                  >
                    <Text className="text-lg mb-0.5">{role.icon}</Text>
                    <Text className={`font-semibold text-xs ${isSelected ? 'text-primary' : 'text-[#6B7280]'}`}>
                      {role.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Fields */}
          {renderInput({ label: 'Full Name', icon: '👤', value: name, onChange: setName, field: 'name', placeholder: 'John Doe', next: phoneRef })}
          {renderInput({ label: 'Phone Number', icon: '📱', value: phone, onChange: setPhone, field: 'phone', placeholder: '+91 98765 43210', keyboard: 'phone-pad', ref: phoneRef, next: emailRef })}
          {renderInput({ label: 'Email Address', icon: '✉️', value: email, onChange: setEmail, field: 'email', placeholder: 'john@example.com', keyboard: 'email-address', ref: emailRef, next: passwordRef })}
          {renderInput({ label: 'Password', icon: '🔒', value: password, onChange: setPassword, field: 'password', placeholder: 'Min. 6 characters', secure: true, ref: passwordRef, last: true })}

          {/* Submit */}
          <TouchableOpacity
            className={`bg-primary rounded-xl h-14 justify-center items-center mb-6 ${isLoading ? 'opacity-70' : ''}`}
            onPress={handleRegister}
            disabled={isLoading}
            activeOpacity={0.85}
          >
            {isLoading
              ? <ActivityIndicator color="#FFFFFF" />
              : <Text className="text-white font-semibold text-lg">Create Account</Text>
            }
          </TouchableOpacity>

          {/* Login link */}
          <View className="flex-row justify-center pb-10">
            <Text className="text-[#6B7280] text-base">Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text className="text-primary font-bold text-base">Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
