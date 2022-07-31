const formRegister = {
  username: (register) => {
    return register('username', {
      required: {
        value: true,
        message: 'Username is required',
      },
      maxLength: {
        value: 24,
        message: 'Username must be at most 20 characters',
      },
    });
  },
  email: (register) => {
    return register('email', {
      required: {
        value: true,
        message: 'Email is required',
      },
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        message: 'Invalid email address',
      },
    });
  },
  password: (register) => {
    return register('password', {
      required: {
        value: true,
        message: 'Password is required',
      },
      minLength: {
        value: 8,
        message: 'Password must be at least 8 characters',
      },
    });
  },
  confirmPassword: (register, getValue) => {
    return register('confirmPassword', {
      required: {
        value: true,
        message: 'Confirm password is required',
      },
      validate: (value) => {
        return value === getValue('password') || 'Passwords do not match';
      },
    });
  },
};

export default formRegister;
