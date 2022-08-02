import { authPage } from '@/middlewares/authorizationPage';
import React from 'react';

export const getServerSideProps = async (ctx) => {
  const auth = await authPage(ctx);

  console.log(auth)

  return {
    props: {},
  };
};

const AccountPage = () => {
  return <div>AccountPage</div>;
};

export default AccountPage;
