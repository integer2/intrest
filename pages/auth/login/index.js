import React from 'react';
import { AuthLayout } from '@/components/layout';
import LoginModule from '@/modules/auth/login';
import { unauthPage } from '@/middlewares/authorizationPage';

export const getServerSideProps = async (ctx) => {
  await unauthPage(ctx);
  return {
    props: {},
  };
};

const LoginPage = () => {
  return (
    <AuthLayout isBackButton>
      <div className="w-full max-w-[554px]">
        <LoginModule />
      </div>
    </AuthLayout>
  );
};

export default LoginPage;
