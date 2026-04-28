import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, ActivityIndicator } from 'react-native';
import { useQueue } from '../../hooks/useQueue';

const LiveQueueCard = ({ clinicId }) => {
  const { currentToken, totalBookedToday, estimatedWaitTime, remaining, loading } = useQueue(clinicId);

  // Animations
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const numberScale = useRef(new Animated.Value(1)).current;

  // Pulse effect for the red dot
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 0.4, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true })
      ])
    ).start();
  }, []);

  // Pop effect for 'Now Serving' number change
  useEffect(() => {
    Animated.sequence([
      Animated.spring(numberScale, {
        toValue: 1.2,
        speed: 14,
        bounciness: 10,
        useNativeDriver: true,
      }),
      Animated.spring(numberScale, {
        toValue: 1,
        speed: 14,
        bounciness: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentToken]);

  if (loading) {
    return (
      <View className="bg-cardBg p-5 rounded-2xl border border-[#E5E7EB] mt-4 shadow-sm items-center justify-center min-h-[160px]">
        <ActivityIndicator size="large" color="#2563EB" />
        <Text className="text-textSecondary mt-2">Loading Live Queue...</Text>
      </View>
    );
  }

  // Derived values
  const progressPercent = totalBookedToday > 0 ? Math.min((currentToken / totalBookedToday) * 100, 100) : 0;
  const nextToken = (totalBookedToday || 0) + 1;

  return (
    <View className="bg-cardBg p-5 rounded-2xl border border-[#E5E7EB] mt-4 shadow-sm">
      {/* Header */}
      <View className="flex-row items-center mb-4">
        <Animated.View style={{ opacity: pulseAnim }}>
          <View className="w-3 h-3 bg-error rounded-full mr-2" />
        </Animated.View>
        <Text className="font-bold text-lg text-textPrimary">Live Queue Status</Text>
      </View>

      {/* Stats Row */}
      <View className="flex-row justify-between mb-5">
        <View className="items-center flex-1 border-r border-[#E5E7EB]">
          <Text className="text-textSecondary text-xs mb-1 font-medium">Now Serving</Text>
          <Animated.Text style={{ transform: [{ scale: numberScale }] }} className="text-primary text-3xl font-extrabold">
            #{currentToken}
          </Animated.Text>
        </View>
        <View className="items-center flex-1 border-r border-[#E5E7EB]">
          <Text className="text-textSecondary text-xs mb-1 font-medium">Total Today</Text>
          <Text className="text-textPrimary text-xl font-bold">{totalBookedToday}</Text>
        </View>
        <View className="items-center flex-1">
          <Text className="text-textSecondary text-xs mb-1 font-medium">Est. Wait</Text>
          <Text className="text-textPrimary text-xl font-bold">{estimatedWaitTime}m</Text>
        </View>
      </View>

      {/* Progress tracking */}
      <View className="mb-2">
        <View className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <View 
            className="h-full bg-primary rounded-full" 
            style={{ width: `${progressPercent}%` }} 
          />
        </View>
        <View className="mt-2 flex-row justify-between items-center">
          <Text className="text-textSecondary text-xs font-medium">
            {currentToken} of {totalBookedToday} served · {remaining} waiting
          </Text>
        </View>
      </View>

      {/* Info Badge */}
      <View className="bg-primary/10 rounded-lg p-3 mt-3 items-center">
        <Text className="text-primary text-sm font-semibold">
          Book now to get Token #{nextToken}
        </Text>
      </View>
    </View>
  );
};

export default LiveQueueCard;
