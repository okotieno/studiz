import { ApolloLink } from '@apollo/client/core';
import { effect, WritableSignal } from '@angular/core';

export const
  multipartFormContext = (trackProgress: WritableSignal<number>) => () => new ApolloLink((operation, forward) => {

    const fetchOptions = operation.getContext()['fetchOptions'];

    const useMultipart = operation.getContext()['useMultipart'];
    if (useMultipart) {
      fetchOptions.onUploadProgress(trackProgress)

      operation.setContext({
        ...operation.getContext(),
        headers: {
          'Apollo-Require-Preflight': 'true'
        }
      });
    }
    return forward(operation);
  });
