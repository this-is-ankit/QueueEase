import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Toast from 'react-native-toast-message';

import { getHistory } from '../../api/verifier.api';

const VerifierHistoryScreen = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchHistory = async () => {
    try {
      const res = await getHistory();
      // Handle res, res.data, or res.data.history
      const list = res?.history || res?.data?.history || res || [];
      setHistory(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error(err);
      Toast.show({ type: 'error', text1: 'Error', text2: 'Could not load verification history.' });
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const onRefresh = () => {
    setIsRefreshing(true);
    fetchHistory();
  };

  const renderItem = ({ item }) => (
    <View className="bg-white rounded-2xl p-4 border border-[#E5E7EB] mb-4 shadow-sm">
      <View className="flex-row justify-between items-start mb-2">
        <View className="flex-1">
          <Text className="font-bold text-lg text-textPrimary" numberOfLines={1}>
            {item.clinic?.name || 'Unknown Clinic'}
          </Text>
          <Text className="text-textSecondary text-xs uppercase tracking-wider">
            {item.clinic?.city || 'Location unknown'}
          </Text>
        </View>
        <View className={`px-2 py-1 rounded border ${item.status === 'APPROVED' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
           <Text className={`text-[10px] font-bold uppercase ${item.status === 'APPROVED' ? 'text-green-700' : 'text-red-700'}`}>
             {item.status}
           </Text>
        </View>
      </View>
      
      {item.notes && (
        <Text className="text-textSecondary text-sm mb-3 italic" numberOfLines={2}>
          "{item.notes}"
        </Text>
      )}

      <View className="flex-row justify-between items-center pt-2 border-t border-gray-50">
         <Text className="text-textSecondary text-[10px]">
           Verified on {new Date(item.createdAt).toLocaleDateString()}
         </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F9FAFB]">
      <StatusBar style="dark" />
      
      <View className="px-6 py-6 border-b border-[#E5E7EB] bg-white">
        <Text className="text-2xl font-bold text-textPrimary">Verification History</Text>
         <Text className="text-textSecondary font-medium">Logs of your physical visits</Text>
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#2563EB" />
        </View>
      ) : (
        <FlatList
          data={history}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 24 }}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} colors={['#2563EB']} />}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center pt-20">
              <Text className="text-4xl mb-4">📜</Text>
              <Text className="text-lg font-bold text-textPrimary text-center">No history yet</Text>
              <Text className="text-textSecondary text-center mt-2">Your verified clinics will appear here.</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default VerifierHistoryScreen;
