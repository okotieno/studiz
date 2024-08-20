import { Module } from '@nestjs/common';

import { DbModule } from '@studiz/backend/db';
import { GraphqlModule } from '@studiz/backend/graphql';

import { PermissionModule } from '@studiz/backend/permission';

import { UserModule } from '@studiz/backend/user-backend';
import { RoleModule } from '@studiz/backend/role';
import { join } from 'path';
import { EventEmitterModule } from '@nestjs/event-emitter';

import {
  AcceptLanguageResolver,
  GraphQLWebsocketResolver,
  HeaderResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { InstitutionModule } from '@studiz/backend/institution';

import { AuthBackendModule } from '@studiz/backend/auth';
import { InstitutionRequestModule } from '@studiz/backend/institution-request';
import { TranslationModule } from '@studiz/backend/translation';
import { EmailModule } from '@studiz/backend/email-service';

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
  ]
})
export class AppModule {}
