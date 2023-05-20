export default () => ({
  database: {
    development: {
      host: process.env.DATABASE_HOST_DEV,
      port: parseInt(process.env.DATABASE_PORT_DEV, 10) || 5432,
      name: process.env.DATABASE_NAME_DEV,
      user: process.env.DATABASE_USER_DEV,
      password: process.env.DATABASE_PASSWORD_DEV,
    },
    test: {
      host: process.env.DATABASE_HOST_TEST,
      port: parseInt(process.env.DATABASE_PORT_TEST, 10) || 5432,
      name: process.env.DATABASE_NAME_TEST,
      user: process.env.DATABASE_USER_TEST,
      password: process.env.DATABASE_PASSWORD_TEST,
    },
    production: {
      host: process.env.DATABASE_HOST_PROD,
      port: parseInt(process.env.DATABASE_PORT_PROD, 10) || 5432,
      name: process.env.DATABASE_NAME_PROD,
      user: process.env.DATABASE_USER_PROD,
      password: process.env.DATABASE_PASSWORD_PROD,
    },
  },
});
