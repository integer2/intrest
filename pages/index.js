import { MainLayout } from '@/components/layout';
import useAuth from 'hooks/useAuth';

const HomePage = () => {
  const auth = useAuth()

  return (
    <div>
      <MainLayout></MainLayout>
    </div>
  );
};

export default HomePage;
