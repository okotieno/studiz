import { Module } from '@nestjs/common';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: process.env['STUDIZ_ENVIRONMENT'] === 'development',
      typePaths: [
        'libs/backend/graphql/src/lib/schema/shared/*.graphql',
        'libs/backend/graphql/src/lib/schema/admin/*.graphql',
      ],
      context: (ctx: any) => ctx,
      path: 'graphql/admin',
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
    }),
  ],
})
export class GraphqlAdminModule {}
