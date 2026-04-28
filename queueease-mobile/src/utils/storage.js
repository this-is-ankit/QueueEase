import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'token';
const USER_KEY = 'user';

// ─── Token helpers ─────────────────────────────────────────────────────────────
export const getToken = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('[Storage] getToken failed:', error);
    return null;
  }
};

export const setToken = async (token) => {
  if (!token) throw new Error('Missing token');
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token.toString());
  } catch (error) {
    console.error('[Storage] setToken failed:', error);
    throw error;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('[Storage] removeToken failed:', error);
    throw error;
  }
};

// ─── User data helpers ─────────────────────────────────────────────────────────
export const getUserData = async () => {
  try {
    const raw = await AsyncStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error('[Storage] getUserData failed:', error);
    return null;
  }
};

export const setUserData = async (user) => {
  try {
    await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('[Storage] setUserData failed:', error);
    throw error;
  }
};

export const removeUserData = async () => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error('[Storage] removeUserData failed:', error);
    throw error;
  }
};

// ─── Convenience: clear everything on logout ───────────────────────────────────
export const clearAll = async () => {
  await Promise.all([removeToken(), removeUserData()]);
};
