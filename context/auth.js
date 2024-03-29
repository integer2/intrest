import API from '@/services/api';
import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  loading: false,
  setLoading: () => {},
  login: Promise,
  logout: () => {},
  getUser: Promise,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const login = async (data) => {
    const result = await API().post('/auth/login', data);
    Cookies.set('token', result.data.token, { expires: 7 });
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    Cookies.remove('token');
  };

  const getUser = async () => {
    try {
      const { data } = await API().post('/auth/user');
      setUser(data);
      setIsAuthenticated(true);
    } catch (error) {
      Cookies.remove('token');
    }
  };

  useEffect(() => {
    setLoading(true);
    if (Cookies.get('token')) {
      getUser();
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    if (Cookies.get('token')) {
      getUser();
    }
    setLoading(false);
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        loading,
        setLoading,
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
