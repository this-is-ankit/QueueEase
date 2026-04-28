import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';

const QueueProgress = ({ currentToken = 0, userToken = 0, totalToday = 0 }) => {
  const progressAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const ahead = Math.max(0, userToken - currentToken);
    const totalSpan = Math.max(userToken, totalToday, 1);
    const percent = Math.min(((userToken - ahead) / totalSpan) * 100, 100);

    Animated.timing(progressAnim, {
      toValue: percent,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [currentToken, userToken, totalToday]);

  const patientsAhead = Math.max(0, userToken - currentToken);
  const estimatedWaitMins = patientsAhead * 15;

  return (
    <View className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-sm mt-6">
      <View className="flex-row justify-between mb-2">
        <Text className="text-textPrimary font-semibold">Queue Progress</Text>
        <Text className="text-textSecondary font-medium">{patientsAhead} ahead of you</Text>
      </View>

      <View className="h-2 w-full bg-gray-200 rounded-full overflow-hidden my-3">
        <Animated.View
          className="h-full bg-primary rounded-full"
          style={{
            width: progressAnim.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
          }}
        />
      </View>

      <View className="flex-row justify-between items-center mt-2">
        <View className="flex-row items-center">
          <Text className="text-xl mr-2">⏱️</Text>
          <Text className="text-textSecondary text-sm">Estimated wait</Text>
        </View>
        <Text className="text-textPrimary font-bold text-lg">{estimatedWaitMins || '--'} mins</Text>
      </View>
    </View>
  );
};

export default QueueProgress;
