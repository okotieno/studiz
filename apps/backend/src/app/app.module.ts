import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
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
  QueryResolver
} from 'nestjs-i18n';

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
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        GraphQLWebsocketResolver,
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
        new HeaderResolver(['x-lang']),
      ],
    }),
    DbModule,
    RoleModule,
    UserModule,
    PermissionModule,
    GraphqlModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
