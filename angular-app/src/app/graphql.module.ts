import { Injector, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache, ApolloLink } from '@apollo/client/core';
import { setContext } from '@apollo/client/link/context';
import { environment } from 'src/environments/environment';
import { decrypt, encrypt } from './helpers/crypto';
import { onError } from '@apollo/client/link/error';
import { fromPromise } from 'apollo-link';

const uri = environment.backendUrl;
const unAuthenticatedMessage = 'jwt expired';

export function createApollo(httpLink: HttpLink) {
  let isRefreshing = false;
  let pendingRequests = [];

  const resolvePendingRequests = () => {
    pendingRequests.map((callback) => callback());
    pendingRequests = [];
  };

  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        for (let err of graphQLErrors) {
          switch (err.message) {
            case unAuthenticatedMessage:
              let forward$;
              let oldRefreshToken = decrypt(
                localStorage.getItem('refreshtoken')
              );

              if (!isRefreshing) {
                isRefreshing = true;
                forward$ = fromPromise(
                  fetch(uri, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      query: `mutation($currentRefreshToken: String) {
                        refreshToken(refreshToken: $currentRefreshToken) {
                          accessToken
                          refreshToken
                        }
                      }`,
                      variables: { currentRefreshToken: oldRefreshToken },
                    }),
                  })
                    .then((response) => response.json())
                    .then((data) => {
                      const newHeaders = `Bearer ${data.data.refreshToken.accessToken}`;
                      const encryptedAccessToken = encrypt(
                        data.data.refreshToken.accessToken
                      );
                      const encryptedRefreshToken = encrypt(
                        data.data.refreshToken.refreshToken
                      );

                      localStorage.setItem('accesstoken', encryptedAccessToken);
                      localStorage.setItem(
                        'refreshtoken',
                        encryptedRefreshToken
                      );

                      operation.setContext({
                        headers: {
                          Authorization: newHeaders,
                        },
                      });
                    })
                    .then(() => {
                      resolvePendingRequests();
                      return true;
                    })
                    .catch(() => {
                      pendingRequests = [];
                      return false;
                    })
                    .finally(() => {
                      isRefreshing = false;
                    })
                );
              }

              return forward$.flatMap(() => forward(operation));
            default:
              console.log(
                `[GraphQL error]: Message: ${err.message}, Location: ${err.locations}, Path: ${err.path}`
              );
          }
        }
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    }
  );

  const basic = setContext((operation, context) => ({
    headers: {
      Accept: 'charset=utf-8',
    },
  }));

  const auth = setContext((operation, context) => {
    const accesstoken = localStorage.getItem('accesstoken');

    if (accesstoken) {
      const decryptedJWT = decrypt(accesstoken);
      return {
        headers: {
          Authorization: `Bearer ${decryptedJWT}`,
        },
      };
    } else {
      return null;
    }
  });

  const link = ApolloLink.from([
    errorLink,
    basic,
    auth,
    httpLink.create({ uri }),
  ]);
  const cache = new InMemoryCache();

  return {
    link,
    cache,
  };
}

@NgModule({
  exports: [HttpClientModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
