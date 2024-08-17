import { Module } from '@nestjs/common';
import { UserBackendService } from './services/user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  UserModel,
} from '@studiz/backend/db';

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel])
  ],
  providers: [
    UserBackendService
  ],
  exports: [UserBackendService]
})
export class UserBackendServiceModule {
}
