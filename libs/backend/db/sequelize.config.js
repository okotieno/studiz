const config = {

  development: { dialect: process.env['STUDIZ_DATABASE_DIALECT'],
    host: process.env['STUDIZ_DATABASE_HOST'],
    port: Number(process.env['STUDIZ_DATABASE_PORT']),
    username: process.env['STUDIZ_DATABASE_USERNAME'],
    password: process.env['STUDIZ_DATABASE_PASSWORD'],
    database: process.env['STUDIZ_DATABASE_DATABASE'],
    paranoid: true
  },
  production: {
    // Production database configuration
  },
};

module.exports = config;
