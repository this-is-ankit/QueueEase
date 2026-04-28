import React, { useRef } from 'react';
import { TouchableOpacity, Text, ActivityIndicator, Animated } from 'react-native';

/**
 * Shared Button Component
 * Props:
 *   label     - Button text
 *   onPress   - Handler function
 *   variant   - 'primary' | 'secondary' | 'danger' (default: primary)
 *   loading   - Shows spinner instead of label
 *   disabled  - Disables interaction
 *   fullWidth - Fills parent width
 */
const Button = ({
  label,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  fullWidth = true,
}) => {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.96,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 40,
      bounciness: 6,
    }).start();
  };

  // Determine container style based on variant
  const containerStyle = {
    primary: 'bg-primary rounded-xl h-14 justify-center items-center shadow-sm',
    secondary: 'bg-white rounded-xl h-14 justify-center items-center border-2 border-primary shadow-sm',
    danger: 'bg-error rounded-xl h-14 justify-center items-center shadow-sm',
  }[variant];

  const textStyle = {
    primary: 'text-white font-semibold text-lg',
    secondary: 'text-primary font-semibold text-lg',
    danger: 'text-white font-semibold text-lg',
  }[variant];

  const spinnerColor = variant === 'secondary' ? '#2563EB' : '#FFFFFF';

  return (
    <Animated.View style={{ transform: [{ scale }], width: fullWidth ? '100%' : 'auto' }}>
      <TouchableOpacity
        className={`${containerStyle} ${(disabled || loading) ? 'opacity-60' : ''}`}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled || loading}
        activeOpacity={0.9}
      >
        {loading ? (
          <ActivityIndicator color={spinnerColor} />
        ) : (
          <Text className={textStyle}>{label}</Text>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Button;
