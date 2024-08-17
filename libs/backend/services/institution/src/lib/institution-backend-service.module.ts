import { Module } from '@nestjs/common';
import { InstitutionBackendService } from './services/institution-backend.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { InstitutionModel } from '@studiz/backend/db';

@Module({
  imports: [SequelizeModule.forFeature([InstitutionModel])],
  providers: [InstitutionBackendService],
  exports: [InstitutionBackendService],
})
export class InstitutionBackendServiceModule {}
