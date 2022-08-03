import { Button } from '@/components/button';
import { FormInput } from '@/components/form-input';
import React from 'react';

const EditPasswordFrom = () => {
  return (
    <form className="w-full">
      <div className="flex flex-col gap-5">
        <FormInput label={'old password'} isFull isRequired />
        <FormInput label={'new password'} isFull isRequired />
        <FormInput label={'confirm password'} isFull isRequired />
        <div>
          <Button isPrimary isDisabled>
            Change Password
          </Button>
        </div>
      </div>
    </form>
  );
};

export default EditPasswordFrom;
