import { Button } from '@/components/button';
import React, { useEffect } from 'react';

const SelectGender = ({ register, confirmHandle }) => {
  const onConfirm = () => {
    const value = document.querySelector('input[name="gender"]:checked').value;
    confirmHandle(value);
  };
  return (
    <div className="flex flex-col bg-white rounded-lg min-w-[420px] p-4">
      <div className="text-xl font-medium border-b p-2 text-center">Gender</div>
      <div className="space-y-2 p-2">
        <div className="space-x-2 text-base">
          <input type="radio" id="male" value={'male'} {...register} />
          <label htmlFor="male" className="cursor-pointer text-lg">
            Male
          </label>
        </div>
        <div className="space-x-2 text-base cursor-pointer">
          <input type="radio" id="female" value={'female'} {...register} />
          <label htmlFor="female" className="cursor-pointer text-lg">
            Female
          </label>
        </div>
        <div className="space-x-2 text-base cursor-pointer">
          <input type="radio" id="unknown" value={'unknown'} {...register} />
          <label htmlFor="unknown" className="cursor-pointer text-lg">
            Unknown
          </label>
        </div>
        <div className="py-2">
          <Button isPrimary isFull isSmall type={'button'} onClick={onConfirm}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectGender;
