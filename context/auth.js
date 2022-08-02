import API from '@/services/api';
import Cookies from 'js-cookie';
import { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  loading: false,
  setLoading: () => {},
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const login = () => {};
  const logout = () => {};

  const getUser = async () => {
    try {
      const { data } = await API().post('/auth/user');
      console.log(data);
      setUser(data);
      setIsAuthenticated(true);
    } catch (error) {}
  };

  useEffect(() => {
    setLoading(true);
    if (Cookies.get('token')) {
      getUser();
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};