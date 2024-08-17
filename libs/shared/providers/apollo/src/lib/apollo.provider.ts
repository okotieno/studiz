import { APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { WebSocketLink } from '@apollo/client/link/ws';
import { ApolloLink, InMemoryCache, split } from '@apollo/client/core';
import { getMainDefinition } from '@apollo/client/utilities';
import { OperationDefinitionNode } from 'graphql/language';
import { inject } from '@angular/core';
import { contextSuccessAlert } from './success-alert.context';
import { multipartFormContext } from './multipart-form.context';

import extractFiles from 'extract-files/extractFiles.mjs';
import isExtractableFile from 'extract-files/isExtractableFile.mjs';
import { ToastController } from '@ionic/angular/standalone';


export const provideApollo = () => ({
    provide: APOLLO_OPTIONS,
    useFactory(httpLink: HttpLink) {
      const toastController = inject(ToastController);
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
        http
      );

      const combinedLink = ApolloLink.from([
        contextSuccessAlert(toastController),
        multipartFormContext(),
        link
      ]);

      return {
        cache: new InMemoryCache(),
        link: combinedLink
      };
    },
    deps: [HttpLink]
  }
);
