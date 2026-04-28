import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

/**
 * useAuth hook
 * Convenience wrapper around AuthContext.
 * Returns: { user, token, role, loading, login, logout }
 *
 * login(token, user)  → saves to AsyncStorage via AuthContext
 * logout()            → clears AsyncStorage + resets user state
 */
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return {
    user: context.user,
    token: context.token,
    role: context.user?.role || null,
    isLoading: context.loading,
    login: context.login,
    logout: context.logout,
  };
};

export default useAuth;
