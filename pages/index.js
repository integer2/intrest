import { MainLayout } from '@/components/layout';
import HomeModule from '@/modules/home';
import { useAuth } from 'context/auth';

const HomePage = (props) => {
  return (
    <div>
      <MainLayout>
        <HomeModule />
      </MainLayout>
    </div>
  );
};

export default HomePage;
