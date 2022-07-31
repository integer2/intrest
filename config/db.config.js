export const config = {
  development: {
    host: 'localhost',
    user: 'intrest',
    password: 'intrest123',
    database: 'intrest',
  },
  production: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
};

export default config[process.env.NODE_ENV];
