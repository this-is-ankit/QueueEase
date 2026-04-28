import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';
import { View, Text, ActivityIndicator } from 'react-native';

import SplashScreen from '../screens/auth/SplashScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';

const Stack = createStackNavigator();

import UserNavigator from './UserNavigator';
import ClinicDetailsScreen from '../screens/user/ClinicDetailsScreen';
import BookAppointmentScreen from '../screens/user/BookAppointmentScreen';
import PaymentScreen from '../screens/user/PaymentScreen';
import BookingSuccessScreen from '../screens/user/BookingSuccessScreen';
import QueueTrackingScreen from '../screens/user/QueueTrackingScreen';
import AdminNavigator from './AdminNavigator';
import VerifierNavigator from './VerifierNavigator';
import VerificationDetailScreen from '../screens/verifier/VerificationDetailScreen';
export default function AppNavigator() {
  const { loading, user } = useContext(AuthContext);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <>
          {/* App Flows based on roles */}
          {user.role === 'ADMIN' && <Stack.Screen name="AdminTabs" component={AdminNavigator} />}
          {user.role === 'USER' && <Stack.Screen name="UserTabs" component={UserNavigator} />}
          {user.role === 'VERIFIER' && <Stack.Screen name="VerifierTabs" component={VerifierNavigator} />}
          
          {/* Global/Shared Screens */}
          <Stack.Screen name="ClinicDetails" component={ClinicDetailsScreen} />
          <Stack.Screen name="BookAppointment" component={BookAppointmentScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="BookingSuccess" component={BookingSuccessScreen} />
          <Stack.Screen name="QueueTracking" component={QueueTrackingScreen} />
          <Stack.Screen name="VerificationDetail" component={VerificationDetailScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
