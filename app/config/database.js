module.exports = {
  development: {
    dialect: 'sqlite',
    storage: 'db_yesno.sqlite',
  },
  production: process.env.DATABASE_URL,
};
