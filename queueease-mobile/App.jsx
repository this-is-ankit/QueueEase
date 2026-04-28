import './global.css';
import 'react-native-gesture-handler';

import React, { useState } from 'react';
import { NavigationContainer, createNavigationContainerRef } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';

// Context providers
import { AuthProvider } from './src/context/AuthContext';
import { SocketProvider } from './src/context/SocketContext';

// Root navigator
import AppNavigator from './src/navigation/AppNavigator';

import ErrorBoundary from './src/components/common/ErrorBoundary';

// ─── Navigation ref (navigate from outside React tree) ─────────────────────────
export const navigationRef = createNavigationContainerRef();

export function navigateFromNotification(data) {
  if (!navigationRef.isReady() || !data) return;

  const { type, appointmentId } = data;

  switch (type) {
    case 'queue_update':
      navigationRef.navigate('QueueTracking', { appointmentId });
      break;
    case 'booking_confirmed':
      navigationRef.navigate('UserTabs', { screen: 'MyAppointments' });
      break;
    case 'clinic_approved':
      navigationRef.navigate('AdminTabs', { screen: 'Dashboard' });
      break;
    default:
      break;
  }
}

// ─── App component ─────────────────────────────────────────────────────────────
export default function App() {
  const [boundaryKey, setBoundaryKey] = useState(0);

  return (
    <AuthProvider>
      <SocketProvider>
        <ErrorBoundary onRetry={() => setBoundaryKey((k) => k + 1)}>
          <NavigationContainer ref={navigationRef} key={boundaryKey}>
            <StatusBar style="dark" />
            <AppNavigator />
          </NavigationContainer>
        </ErrorBoundary>
        <Toast />
      </SocketProvider>
    </AuthProvider>
  );
}
