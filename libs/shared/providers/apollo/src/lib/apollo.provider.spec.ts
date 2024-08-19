import { provideApollo } from './apollo.provider';

// Mock HttpLink class
jest.mock('apollo-angular/http', () => ({
  HttpLink: class {
    create() {
      return {
        request: jest.fn()
      };
    }
  }
}));

// Mock WebSocketLink class
jest.mock('@apollo/client/link/ws', () => ({
  WebSocketLink: class {
    constructor() {
      return {
        request: jest.fn()
      };
    }
  }
}));

describe('ApolloProvider', () => {
  it('should create Apollo options for HTTP', () => {
    const httpLink = new (jest.requireActual('apollo-angular/http').HttpLink)(null);
    const apolloOptions = (provideApollo()[1] as any).useFactory(httpLink);
    expect(apolloOptions.cache).toBeDefined();
    expect(apolloOptions.link).toBeDefined();
    // Add assertions for HTTP link options
  });

  it('should create Apollo options for WebSocket', () => {
    const httpLink = new (jest.requireActual('apollo-angular/http').HttpLink)(null);
    const apolloOptions = (provideApollo()[1] as any).useFactory(httpLink);
    expect(apolloOptions.cache).toBeDefined();
    expect(apolloOptions.link).toBeDefined();
    // Add assertions for WebSocket link options
  });
});
