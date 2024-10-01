import { ApolloLink } from '@apollo/client/core';
import { SHOW_LOADER, LOADER_ID } from '@studiz/frontend/constants';

export const
  contextLoader = (loaderStore: any) => new ApolloLink((operation, forward) => {
    const showLoader = operation.getContext()[SHOW_LOADER];
    if (showLoader) {
      loaderStore.startLoader(operation.getContext()[LOADER_ID])
      return forward(operation).map((response) => {
        loaderStore.stopLoader(operation.getContext()[LOADER_ID])
        return response;
      });
    }
    return forward(operation)

  });
