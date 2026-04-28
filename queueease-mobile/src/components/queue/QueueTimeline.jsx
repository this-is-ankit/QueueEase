import React, { useEffect, useRef } from 'react';
import { View, Text, Animated } from 'react-native';

const QueueTimeline = ({ status, currentToken, userToken }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 0.5, duration: 800, useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 800, useNativeDriver: true })
      ])
    ).start();
  }, []);

  // Determine State
  const normalizedStatus = (status || '').toUpperCase();
  const isStarted = currentToken > 0 || normalizedStatus === 'SERVING';
  const isWaiting = isStarted && currentToken < userToken && normalizedStatus !== 'CANCELLED';
  const isMyTurn = currentToken === userToken && normalizedStatus !== 'DONE' && normalizedStatus !== 'CANCELLED';
  const isDone = normalizedStatus === 'DONE' || normalizedStatus === 'COMPLETED' || currentToken > userToken;
  const isCancelled = normalizedStatus === 'CANCELLED';

  const steps = [
    { label: 'Appointment Booked', isCompleted: true, isActive: false },
    { label: 'Queue Started', isCompleted: isStarted, isActive: false },
    { label: 'Waiting Your Turn', isCompleted: isMyTurn || isDone, isActive: isWaiting },
    { label: isCancelled ? 'Cancelled' : 'Your Turn', isCompleted: isDone || isCancelled, isActive: isMyTurn },
    { label: isCancelled ? 'Cancelled' : 'Consultation Done', isCompleted: isDone || isCancelled, isActive: false },
  ];

  return (
    <View className="bg-white rounded-2xl border border-[#E5E7EB] p-5 shadow-sm mt-6">
      <Text className="text-lg font-bold text-textPrimary mb-4">Tracking Status</Text>

      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;

        return (
          <View key={index} className="flex-row">
            {/* Indicator Column */}
            <View className="items-center mr-4">
              <View className="w-6 h-6 justify-center items-center">
                {step.isCompleted ? (
                  <View className="w-5 h-5 bg-[#10B981] rounded-full justify-center items-center">
                    <Text className="text-white text-[10px] font-bold">✓</Text>
                  </View>
                ) : step.isActive ? (
                  <Animated.View style={{ opacity: pulseAnim }} className="w-5 h-5 bg-primary/20 rounded-full justify-center items-center">
                    <View className="w-2.5 h-2.5 bg-primary rounded-full" />
                  </Animated.View>
                ) : (
                  <View className="w-5 h-5 border-2 border-gray-300 rounded-full bg-white" />
                )}
              </View>
              {/* Vertical Connecting Line */}
              {!isLast && (
                <View className={`w-0.5 h-10 my-1 ${step.isCompleted ? 'bg-[#10B981]' : 'bg-gray-200'}`} />
              )}
            </View>

            {/* Label Column */}
            <View className="pt-0.5">
              <Text className={`text-base font-semibold ${
                step.isCompleted ? 'text-textPrimary' : 
                step.isActive ? 'text-primary' : 'text-gray-400'
              }`}>
                {step.label}
              </Text>
              {step.isActive && <Text className="text-xs text-textSecondary mt-0.5">We're actively monitoring the line.</Text>}
              {step.isCompleted && step.label === 'Your Turn' && <Text className="text-xs text-[#10B981] mt-0.5">Please proceed to the doctor.</Text>}
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default QueueTimeline;
