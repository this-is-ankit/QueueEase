import React from 'react';
import { View, Text, TextInput } from 'react-native';

/**
 * Shared Input Component
 * Props:
 *   label          - Field label rendered above
 *   placeholder    - Placeholder text in field
 *   value          - Controlled value
 *   onChangeText   - Change handler
 *   icon           - Emoji or text rendered on left (optional)
 *   secureTextEntry - Masks input for passwords
 *   error          - String error message; turns border red
 *   keyboardType   - e.g. 'email-address', 'phone-pad'
 *   ...rest        - Any extra TextInput props
 */
const Input = ({
  label,
  placeholder,
  value,
  onChangeText,
  icon,
  secureTextEntry = false,
  error,
  keyboardType = 'default',
  ...rest
}) => {
  const borderColor = error ? 'border-error' : 'border-[#E5E7EB]';

  return (
    <View className="mb-4">
      {/* Label */}
      {label && (
        <Text className="text-sm font-medium text-textSecondary mb-2">{label}</Text>
      )}

      {/* Field Row */}
      <View className={`flex-row items-center bg-[#F9FAFB] rounded-xl px-4 h-14 border ${borderColor}`}>
        {icon && (
          <Text className="text-textSecondary mr-2 text-base">{icon}</Text>
        )}
        <TextInput
          className="flex-1 text-textPrimary text-base"
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize="none"
          {...rest}
        />
      </View>

      {/* Error Message */}
      {error && (
        <Text className="text-error text-xs mt-1 ml-1">{error}</Text>
      )}
    </View>
  );
};

export default Input;
