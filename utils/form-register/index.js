const formRegister = {
  email: (register) => {
    return register(
      'email',
      {
        required: {
          value: true,
          message: 'Email is required',
        },
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: 'Invalid email address',
        }
      }
    )
  },
  password: (register) => {
    return register(
      'password',
      {
        required: {
          value: true,
          message: 'Password is required',
        },
        minLength: {
          value: 8,
          message: 'Password must be at least 8 characters',
        }
      }
    )
  }
}

export default formRegister;