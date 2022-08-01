import React from 'react';
import { AuthLayout } from '@/components/layout';
import RegisterModule from '@/modules/auth/register';

const RegisterPage = () => {
  return (
    <AuthLayout isBackButton>
      <div className="w-full max-w-[554px]">
        <RegisterModule />
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
