module.exports = {
  development: {
    dialect: 'sqlite',
    storage: 'db_yesno.sqlite',
    logging: false,
  },
  production: process.env.DATABASE_URL,
};
