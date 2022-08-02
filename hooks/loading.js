import { useState } from 'react';

export default function useLoading(isLoading) {
  const [loading, setLoading] = useState(isLoading);
  return [loading, setLoading];
}
