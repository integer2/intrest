import { AuthLayout } from '@/components/layout';
import ForgotPasswordModule from '@/modules/auth/forgot-password';
import React from 'react';

const ForgotPasswordPage = () => {
  return (
    <AuthLayout isBackButton>
      <div className="w-full max-w-[554px]">
        <ForgotPasswordModule />
      </div>
    </AuthLayout>
  );
};
export default ForgotPasswordPage;
