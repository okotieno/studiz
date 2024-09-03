import { Module } from '@nestjs/common';

import { DbModule } from '@studiz/backend/db';
import { GraphqlModule } from '@studiz/backend/graphql';

import { PermissionModule } from '@studiz/backend/permission';

import { UserModule } from '@studiz/backend/user-backend';
import { RoleModule } from '@studiz/backend/role';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { InstitutionModule } from '@studiz/backend/institution';

import { AuthBackendModule } from '@studiz/backend/auth';
import { InstitutionRequestModule } from '@studiz/backend/institution-request';
import { TranslationModule } from '@studiz/backend/translation';
import { FileUploadModule } from '@studiz/backend/file-upload';

@Module({
  imports: [
    EventEmitterModule.forRoot({
      wildcard: false,
      delimiter: '.',
      newListener: false,
      removeListener: false,
      maxListeners: 10,
      verboseMemoryLeak: false,
      ignoreErrors: false,
    }),

    TranslationModule,
    DbModule,
    InstitutionRequestModule,
    AuthBackendModule,
    InstitutionModule,
    RoleModule,
    UserModule,
    PermissionModule,
    GraphqlModule,
    FileUploadModule
  ]
})
export class AppModule {}
