import { MainLayout } from '@/components/layout';
import { authPage } from '@/middlewares/authorizationPage';
import HomeModule from '@/modules/home';

export const getServerSideProps = async (ctx) => {
  await authPage(ctx);
  return {
    props: {},
  };
};

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
