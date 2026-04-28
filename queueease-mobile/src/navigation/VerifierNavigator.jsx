import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';

import VerifierDashboardScreen from '../screens/verifier/VerifierDashboardScreen';
import VerifierProfileScreen from '../screens/verifier/VerifierProfileScreen';
import VerifierHistoryScreen from '../screens/verifier/VerifierHistoryScreen';

const Tab = createBottomTabNavigator();

export default function VerifierNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          elevation: 0, 
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        }
      }}
    >
      <Tab.Screen 
        name="Pending" 
        component={VerifierDashboardScreen} 
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>📋</Text>
        }}
      />
      <Tab.Screen 
        name="History" 
        component={VerifierHistoryScreen} 
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>🕰️</Text>
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={VerifierProfileScreen} 
        options={{
          tabBarIcon: ({ color }) => <Text style={{ color, fontSize: 20 }}>👤</Text>
        }}
      />
    </Tab.Navigator>
  );
}
