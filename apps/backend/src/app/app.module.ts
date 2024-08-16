import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from '@studiz/db-backend';
import { GraphqlAdminModule, GraphqlModule } from '@studiz/graphql-backend';
import { InstitutionBackendModule } from '@studiz/backend/institution';

@Module({
  imports: [
    GraphqlAdminModule,
  ],
})
export class AdminAppModule {
}

@Module({
  imports: [
    GraphqlModule,
    InstitutionBackendModule
  ],
})
export class ClientAppModule {
}


@Module({
  imports: [
    DbModule,
    ClientAppModule,
    AdminAppModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
