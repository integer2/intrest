import { Button } from '@/components/button';
import { FormInput, FormText } from '@/components/form-input';
import { useModal } from 'hooks/useModal';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import SelectGender from '../select-gender';

const EditProfileForm = ({ onSubmit, user }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: errors,
  } = useForm({
    defaultValues: {
      name: user.name,
      username: user.username,
      bio: user.bio,
      birthday: user.birthday,
      gender: user.gender,
      email: user.email,
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
          register={register('username')}
          error={errors.username}
        />
        <FormText label={'bio'} isFull register={register('bio')} />
        <FormInput
          type={'date'}
          label={'birthday'}
          isFull
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
          register={register('email')}
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
