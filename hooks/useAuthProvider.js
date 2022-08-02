import API from '@/services/api';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export default function useProviderAuth() {
  const [token, setToken] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = (token) => {
    setIsLogin(true);
    setToken(token);
  };

  const logout = () => {
    setIsLogin(false);
    setToken(null);
  };

  const { data, error, isValidating } = useSWR(
    isLogin ? `/auth/refresh` : null,
    async (url) => {
      const result = await API.post(url);
      return result.data;
    },
    {
      // refresh interval 5 minutes
      revalidate: 60 * 5 * 1000,
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (data) {
      login(data.token);
    }
    if (error) {
      logout();
    }
    setIsLoading(isValidating);
  }, [data, error, isValidating]);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      login(token);
    }
  }, []);

  return { token, login, logout, isLogin, isLoading };
}
