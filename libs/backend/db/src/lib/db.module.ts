import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { dbConfig } from './config/db.config';
import {
  PermissionModel,
  UserModel,
  RoleModel, InstitutionModel, InstitutionRequestModel
} from './models';
@Module({
  imports: [
    SequelizeModule.forRoot({
      ...dbConfig,
      logging: false,
      models: [
        PermissionModel,
        RoleModel,
        UserModel,
        InstitutionModel,
        InstitutionRequestModel
      ],
      sync: {
        force: process.env['STUDIZ_ENVIRONMENT'] === 'development',
        alter: process.env['STUDIZ_ENVIRONMENT'] === 'development',
      },
      synchronize: process.env['STUDIZ_ENVIRONMENT'] === 'development',
      autoLoadModels: process.env['STUDIZ_ENVIRONMENT'] === 'development',
    }),
  ],
})
export class DbModule {}
