import { Module } from '@nestjs/common';
import { InstitutionRequestBackendService } from './services/institution-request-backend.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { InstitutionRequestModel } from '@studiz/backend/db';

@Module({
  imports: [SequelizeModule.forFeature([InstitutionRequestModel])],
  providers: [InstitutionRequestBackendService],
  exports: [InstitutionRequestBackendService],
})
export class InstitutionRequestBackendServiceModule {}
