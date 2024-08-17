import { Module } from '@nestjs/common';
import { PermissionBackendService } from './services/permission.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { PermissionModel } from '@studiz/backend/db';

@Module({
  imports: [
    SequelizeModule.forFeature([PermissionModel])
  ],
  providers: [
    PermissionBackendService
  ],
  exports: [
    PermissionBackendService
  ],
})
export class PermissionBackendServiceModule {}
