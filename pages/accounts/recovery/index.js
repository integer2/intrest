import { AuthLayout } from '@/components/layout';
import RecoveryAccountModule from '@/modules/accounts/recovery';
import React from 'react';

const RecoveryAccountPage = () => {
  return (
    <AuthLayout isBackButton>
      <div className="w-full max-w-[554px]">
        <RecoveryAccountModule />
      </div>
    </AuthLayout>
  );
};

export default RecoveryAccountPage;
