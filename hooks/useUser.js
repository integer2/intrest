import API from '@/services/api';
import { useEffect, useState } from 'react';
import useSwr from 'swr';
import useAuth from 'use';

export default function useUser() {
  const { token } = useAuth();
  const [user, setUser] = useState(null);

  const { data, error, mutate } = useSwr(
    token ? `/auth/user` : null,
    async (url) => {
      const result = await API.post(url);
      return result.data;
    },
    {
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (data) {
      setUser(data);
    }
    if (error) {
      setUser(null);
    }
  }, [data, error]);

  return { user, mutate };
}
