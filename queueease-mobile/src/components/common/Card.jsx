import React from 'react';
import { View } from 'react-native';

/**
 * Shared Card Component
 * Props:
 *   children  - React children to render inside card
 *   style     - Additional ViewStyle override (RN style object)
 *   padding   - NativeWind padding class override (default: 'p-5')
 *   noShadow  - Disable the shadow effect
 */
const Card = ({ children, style, padding = 'p-5', noShadow = false }) => {
  return (
    <View
      className={`bg-white rounded-2xl border border-[#E5E7EB] ${padding} ${noShadow ? '' : 'shadow-sm'}`}
      style={style}
    >
      {children}
    </View>
  );
};

export default Card;
