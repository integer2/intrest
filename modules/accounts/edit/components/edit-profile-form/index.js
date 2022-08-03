import { Button } from '@/components/button';
import { FormInput, FormText } from '@/components/form-input';
import formRegister from '@/utils/form-register';
import { useModal } from 'hooks/useModal';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import SelectGender from '../select-gender';

const EditProfileForm = ({ onSubmit, user }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user.name,
      username: user.username,
      bio: user.bio,
      birthday: user.birthday.split('T')[0],
      gender: user.gender,
      email: user.email,
      img_url: user.img_url,
    },
  });

  const modal = useModal();

  const selectGender = () => {
    const onConfirm = (callback) => {
      setValue('gender', callback);
      setGender(getValues('gender'));
      modal.setIsOpen(false);
    };
    modal.setIsOpen(true);

    modal.setContent(
      <SelectGender register={register('gender')} confirmHandle={onConfirm} />
    );
  };

  const [gender, setGender] = useState(getValues('gender'));

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-5">
        <FormInput
          type={'text'}
          label={'name'}
          isFull
          register={register('name')}
          error={errors.name}
        />
        <FormInput
          type={'text'}
          label={'username'}
          isFull
          isRequired
          register={formRegister.username(register)}
          error={errors.username}
        />
        <FormText label={'bio'} isFull register={register('bio')} />
        <FormInput
          type={'date'}
          label={'birthday'}
          isFull
          register={register('birthday')}
          error={errors.birthday}
        />
        <FormInput
          label={'gender'}
          isFull
          register={register('gender')}
          isDisabled
          isButton
          value={gender}
          error={errors.gender}
          onClick={selectGender}
        />
        <FormInput
          type={'email'}
          label={'email'}
          isFull
          isRequired
          register={formRegister.email(register)}
          error={errors.email}
        />
        <div>
          <Button isPrimary>Save</Button>
        </div>
      </div>
    </form>
  );
};

export default EditProfileForm;
