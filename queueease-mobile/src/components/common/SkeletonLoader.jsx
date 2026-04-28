import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

/**
 * SkeletonLoader Component — animated shimmer placeholder
 * Props:
 *   width        - number or '100%' string
 *   height       - number
 *   borderRadius - number (default: 12)
 */
const SkeletonLoader = ({ width = '100%', height = 80, borderRadius = 12 }) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 750,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <Animated.View
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: '#E5E7EB',
        opacity,
      }}
    />
  );
};

export default SkeletonLoader;
