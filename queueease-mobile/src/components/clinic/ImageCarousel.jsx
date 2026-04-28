import React, { useState } from 'react';
import { View, ScrollView, Image, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const ImageCarousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event) => {
    const slide = Math.ceil(event.nativeEvent.contentOffset.x / event.nativeEvent.layoutMeasurement.width);
    if (slide !== activeIndex) {
      setActiveIndex(slide);
    }
  };

  // Fallback if no images provided
  const displayImages = images && images.length > 0 
    ? images 
    : ['https://via.placeholder.com/600x400?text=No+Image+Available'];

  return (
    <View className="relative">
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className="h-64"
      >
        {displayImages.map((imgUrl, index) => (
          <Image
            key={index}
            source={{ uri: imgUrl }}
            style={{ width }}
            className="h-64 bg-gray-200"
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View className="absolute bottom-4 left-0 right-0 justify-center flex-row">
        {displayImages.map((_, index) => (
          <View
            key={index}
            className={`h-2.5 rounded-full mx-1 ${
              index === activeIndex ? 'bg-primary w-6' : 'bg-white/60 w-2.5'
            }`}
          />
        ))}
      </View>
    </View>
  );
};

export default ImageCarousel;
