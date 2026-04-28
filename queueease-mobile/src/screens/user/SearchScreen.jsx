import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import { getClinics } from '../../api/clinic.api';
import ClinicCard from '../../components/clinic/ClinicCard';
import SkeletonLoader from '../../components/common/SkeletonLoader';
import { normalizeClinic, unwrapApiData } from '../../utils/helpers';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 350);

    return () => clearTimeout(timer);
  }, [query]);

  const fetchClinics = useCallback(async (searchTerm = '') => {
    try {
      setError('');
      const response = await getClinics({
        search: searchTerm || undefined,
        limit: 30,
      });
      const data = unwrapApiData(response);
      const list = Array.isArray(data?.clinics)
        ? data.clinics
        : Array.isArray(response?.clinics)
          ? response.clinics
          : [];

      setClinics(list.map(normalizeClinic).filter(Boolean));
    } catch (err) {
      console.error(err);
      setError('Could not load clinics right now.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchClinics(debouncedQuery);
  }, [debouncedQuery, fetchClinics]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchClinics(debouncedQuery);
  }, [debouncedQuery, fetchClinics]);

  const renderSkeleton = () => (
    <View className="px-6 pt-6">
      <View className="mb-4"><SkeletonLoader width="100%" height={108} /></View>
      <View className="mb-4"><SkeletonLoader width="100%" height={108} /></View>
      <View className="mb-4"><SkeletonLoader width="100%" height={108} /></View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />

      <View className="px-6 pt-4 pb-3 border-b border-[#E5E7EB] bg-white">
        <Text className="text-2xl font-bold text-textPrimary mb-4">Search Clinics</Text>
        <View className="flex-row items-center bg-[#F9FAFB] rounded-xl px-4 h-12 border border-[#E5E7EB]">
          <Text className="mr-2 opacity-50">🔍</Text>
          <TextInput
            className="flex-1 text-base text-textPrimary"
            placeholder="Search by clinic, doctor, or specialization"
            placeholderTextColor="#9CA3AF"
            value={query}
            onChangeText={setQuery}
            autoCapitalize="none"
          />
        </View>
      </View>

      {loading ? (
        renderSkeleton()
      ) : (
        <FlatList
          data={clinics}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="px-6 pt-4">
              <ClinicCard clinic={item} />
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 96 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#2563EB']} />}
          ListHeaderComponent={
            error ? (
              <View className="px-6 pt-6">
                <Text className="text-error font-medium">{error}</Text>
              </View>
            ) : null
          }
          ListEmptyComponent={
            <View className="px-6 pt-24 items-center">
              <Text className="text-4xl mb-3">🔎</Text>
              <Text className="text-lg font-bold text-textPrimary mb-1">No clinics found</Text>
              <Text className="text-textSecondary text-center">
                Try a different clinic name, doctor name, or specialization.
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default SearchScreen;
