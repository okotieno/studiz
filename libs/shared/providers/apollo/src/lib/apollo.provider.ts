import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { WebSocketLink } from '@apollo/client/link/ws';
import { ApolloLink, InMemoryCache, split } from '@apollo/client/core';
import { getMainDefinition } from '@apollo/client/utilities';
import { OperationDefinitionNode } from 'graphql/language';
import { EnvironmentProviders, importProvidersFrom, inject, InjectionToken } from '@angular/core';
import { contextSuccessAlert } from './success-alert.context';
import { multipartFormContext } from './multipart-form.context';

import extractFiles from 'extract-files/extractFiles.mjs';
import isExtractableFile from 'extract-files/isExtractableFile.mjs';
import { AlertController, LoadingController, ToastController } from '@ionic/angular/standalone';
import { contextErrorAlert } from './error-alert.context';
import { contextLoader } from './loader.context';


export const provideApollo: () => [EnvironmentProviders, {
  provide: InjectionToken<any>;
  useFactory(httpLink: HttpLink): { cache: InMemoryCache; link: ApolloLink };
  deps: HttpLink[]
}] = () => [
  importProvidersFrom([
    ApolloModule
  ]),
  {
    provide: APOLLO_OPTIONS,
    useFactory(httpLink: HttpLink) {
      const loadingController = inject(LoadingController);
      const toastController = inject(ToastController);
      const alertController = inject(AlertController);
      const http = httpLink.create({
        uri: `${process.env?.['STUDIZ_BACKEND_URL'] ?? ''}/graphql`,
        extractFiles: (body) => extractFiles(body, isExtractableFile) as any
      });

      const ws = new WebSocketLink({
        uri: `${process.env?.['STUDIZ_BACKEND_URL']?.replace('http', 'ws') ?? ''}/graphql`,
        options: {
          reconnect: true
        }
      });

      const link = split(
        ({ query }) => {
          const { kind, operation } = getMainDefinition(query) as OperationDefinitionNode;
          return kind === 'OperationDefinition' && operation === 'subscription';
        },
        ws,
        http as any
      );

      const combinedLink = ApolloLink.from([
        contextLoader(loadingController),
        contextSuccessAlert(toastController),
        contextErrorAlert(alertController),
        multipartFormContext(),
        link
      ]);

      return {
        cache: new InMemoryCache({
          addTypename: false
        }),
        link: combinedLink
      };
    },
    deps: [HttpLink as any]
  }
];
