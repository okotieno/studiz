import { SequelizeOptions } from 'sequelize-typescript';

export const dbConfig = {
  dialect: process.env[
    'STUDIZ_DATABASE_DIALECT'
    ] as SequelizeOptions['dialect'],
  host: process.env['STUDIZ_DATABASE_HOST'],
  port: Number(process.env['STUDIZ_DATABASE_PORT']),
  username: process.env['STUDIZ_DATABASE_USERNAME'],
  password: process.env['STUDIZ_DATABASE_PASSWORD'],
  database: process.env['STUDIZ_DATABASE_DATABASE']
};
