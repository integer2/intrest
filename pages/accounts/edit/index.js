import { MainLayout } from '@/components/layout';
import { authPage } from '@/middlewares/authorizationPage';
import React from 'react';
import EditAccountsModule from '@/modules/accounts/edit';
import { useAuth } from 'context/auth';

export const getServerSideProps = async (ctx) => {
  await authPage(ctx);
  return {
    props: {},
  };
};

const AccountPage = () => {
  const { loading, user } = useAuth();
  if (!loading && user)
    return (
      <MainLayout>
        <EditAccountsModule />
      </MainLayout>
    );
};

export default AccountPage;
