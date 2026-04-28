import React from 'react';
import { View, Text } from 'react-native';

/**
 * TokenBadge Component
 * Props:
 *   tokenNumber - The token number to display
 *   size        - 'small' | 'large' (default: 'small')
 *
 * small: compact badge for use in lists
 * large: big display for QueueTrackingScreen
 */
const TokenBadge = ({ tokenNumber, size = 'small' }) => {
  if (size === 'large') {
    return (
      <View className="bg-primary rounded-2xl px-8 py-4 items-center justify-center">
        <Text className="text-white text-xs uppercase font-bold tracking-widest mb-1">Your Token</Text>
        <Text style={{ fontSize: 64, lineHeight: 72 }} className="text-white font-extrabold">
          #{tokenNumber}
        </Text>
      </View>
    );
  }

  // Small variant — inline pill for lists / cards
  return (
    <View className="bg-primary/10 rounded-full px-3 py-1 items-center justify-center border border-primary/20">
      <Text className="text-primary font-bold text-sm">#{tokenNumber}</Text>
    </View>
  );
};

export default TokenBadge;
