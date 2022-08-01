import React from 'react';
import { AuthLayout } from '@/components/layout';
import RegistrationModule from '@/modules/auth/registration';

const RegisterPage = () => {
  return (
    <AuthLayout isBackButton>
      <div className="w-full max-w-[554px]">
        <RegistrationModule />
      </div>
    </AuthLayout>
  );
};

export default RegisterPage;
