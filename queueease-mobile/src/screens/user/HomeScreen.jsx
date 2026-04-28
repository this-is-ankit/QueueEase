import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, TextInput, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { StatusBar } from 'expo-status-bar';

import { AuthContext } from '../../context/AuthContext';
import { getNearbyClinics, getClinics } from '../../api/clinic.api';
import ClinicCard from '../../components/clinic/ClinicCard';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import { normalizeClinic, unwrapApiData } from '../../utils/helpers';

const CATEGORIES = ['All', 'Clinics', 'Barbers', 'LPG', 'Hospitals'];

const HomeScreen = () => {
  const { user } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [coords, setCoords] = useState(null);
  const [locationNotice, setLocationNotice] = useState('');
  
  const [nearbyClinics, setNearbyClinics] = useState([]);
  const [topRatedClinics, setTopRatedClinics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Request location on mount
  useEffect(() => {
    let isMounted = true;

    const requestLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
          if (!isMounted) return;
          setLocationNotice('Location permission denied. Showing clinics near New Delhi.');
          setCoords({ lat: 28.6139, lng: 77.2090 });
          return;
        }

        const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
        if (isMounted && position?.coords) {
          setCoords({ lat: position.coords.latitude, lng: position.coords.longitude });
        }
      } catch (err) {
        console.error('Location error', err);
        if (isMounted) {
          setLocationNotice('Could not fetch GPS. Showing clinics near New Delhi.');
          setCoords({ lat: 28.6139, lng: 77.2090 });
        }
      }
    };

    requestLocation();
    return () => { isMounted = false; };
  }, []);

  const fetchData = useCallback(async () => {
    if (!coords) return;
    try {
      setError(null);
      const { lat, lng } = coords;
      const [nearbyRes, topRatedRes] = await Promise.all([
        getNearbyClinics(lat, lng, 20),
        getClinics({
          limit: 10,
          search: debouncedQuery || undefined,
          specialization: activeCategory !== 'All' ? activeCategory : undefined,
        })
      ]);

      const normalizeList = (res) => {
        const data = unwrapApiData(res);
        const list = Array.isArray(data?.clinics)
          ? data.clinics
          : Array.isArray(res?.clinics)
            ? res.clinics
            : Array.isArray(data)
              ? data
              : [];

        return list.map(normalizeClinic).filter(Boolean);
      };

      setNearbyClinics(normalizeList(nearbyRes)); 
      setTopRatedClinics(normalizeList(topRatedRes));
    } catch (err) {
      console.error(err);
      setError('Could not load clinics. Tap to retry.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [coords, debouncedQuery, activeCategory]);

  // Fetch when search/category changes, or on initial load
  useEffect(() => {
    if (!coords) return;
    setIsLoading(true);
    fetchData();
  }, [coords, debouncedQuery, activeCategory, fetchData]);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchData();
  }, [fetchData]);

  const renderSkeleton = () => (
    <View className="px-6 py-4">
      <View className="mb-4"><SkeletonLoader width="100%" height={100} /></View>
      <View className="mb-4"><SkeletonLoader width="100%" height={100} /></View>
      <View className="mb-4"><SkeletonLoader width="100%" height={100} /></View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <View className="flex-1">
        {/* Header */}
        <View className="px-6 pt-4 pb-2 flex-row justify-between items-center">
          <View>
            <Text className="text-sm text-textSecondary font-medium">Good Morning,</Text>
            <Text className="text-xl font-bold text-textPrimary">{user?.name || 'User'} 👋</Text>
          </View>
          <TouchableOpacity className="w-10 h-10 bg-cardBg rounded-full justify-center items-center border border-[#E5E7EB]">
            <Text className="text-lg">🔔</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View className="px-6 my-4">
          <View className="flex-row items-center bg-[#F9FAFB] rounded-xl px-4 h-12 border border-[#E5E7EB]">
            <Text className="mr-2 opacity-50">🔍</Text>
            <TextInput
              className="flex-1 text-base text-textPrimary"
              placeholder="Search clinics or services..."
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {!!locationNotice && (
          <View className="px-6 mb-2">
            <Text className="text-xs text-textSecondary">{locationNotice}</Text>
          </View>
        )}

        {/* Category Chips */}
        <View className="mb-4">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24 }}>
            {CATEGORIES.map((cat, index) => (
              <TouchableOpacity 
                key={index}
                onPress={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full mr-2 border ${
                  activeCategory === cat ? 'bg-primary border-primary' : 'bg-white border-[#E5E7EB]'
                }`}
              >
                <Text className={`font-medium text-sm ${activeCategory === cat ? 'text-white' : 'text-textSecondary'}`}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {error ? (
          <TouchableOpacity onPress={fetchData} className="flex-1 justify-center items-center">
            <Text className="text-error font-medium">{error}</Text>
          </TouchableOpacity>
        ) : isLoading ? (
          renderSkeleton()
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} colors={['#2563EB']} />}
          >
            {nearbyClinics?.length === 0 && topRatedClinics?.length === 0 ? (
              <View className="items-center justify-center py-24 px-6">
                <Text className="text-4xl mb-3">🙁</Text>
                <Text className="text-textPrimary font-bold text-lg mb-1">No clinics found near you</Text>
                <Text className="text-textSecondary text-center">Try refreshing or widening your search.</Text>
              </View>
            ) : (
              <>
                {/* Nearby Clinics (Horizontal) */}
                {nearbyClinics?.length > 0 && (
                  <View className="mt-2 mb-6">
                    <Text className="text-lg font-bold text-textPrimary px-6 mb-3">Nearby Clinics</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24 }}>
                      {nearbyClinics.map((clinic) => (
                         <View key={clinic.id || clinic._id} className="w-[280px] mr-4">
                           <ClinicCard clinic={clinic} />
                         </View>
                      ))}
                    </ScrollView>
                  </View>
                )}

                {/* Top Rated Clinics (Vertical) */}
                <View className="px-6 pb-20">
                  <Text className="text-lg font-bold text-textPrimary mb-3">Top Rated</Text>
                  {topRatedClinics?.length > 0 ? (
                    topRatedClinics.map((clinic) => (
                      <ClinicCard key={clinic.id || clinic._id} clinic={clinic} />
                    ))
                  ) : (
                    <Text className="text-textSecondary mt-4 text-center">No clinics found matching your search.</Text>
                  )}
                </View>
              </>
            )}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
