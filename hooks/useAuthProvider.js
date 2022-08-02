import { useState } from "react";
import useSWR from "swr";

export default function useProviderAuth() {
  const [token, setToken] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const login = token => {
    setIsLogin(true);
    setToken(token);
  }

  const logout = () => {
    setIsLogin(false);
    setToken(null);
  }

  const {data, error, isValidating} = useSWR(
    isLogin ? '' : null
  )
}