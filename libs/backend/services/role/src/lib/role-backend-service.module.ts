import { Module } from '@nestjs/common';
import { RoleBackendService } from './services/role-backend.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { RoleModel, RoleUserModel } from '@studiz/backend/db';

@Module({
  imports: [SequelizeModule.forFeature([
    RoleModel,
    RoleUserModel
  ])],
  providers: [RoleBackendService],
  exports: [RoleBackendService],
})
export class RoleBackendServiceModule {}
