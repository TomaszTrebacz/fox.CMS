import { Module } from '@nestjs/common';
import { GATEWAY_BUILD_SERVICE, GraphQLGatewayModule } from '@nestjs/graphql';
import { RemoteGraphQLDataSource } from '@apollo/gateway';
import { ConfigModule } from '@nestjs/config';

class AuthenticatedDataSource extends RemoteGraphQLDataSource {
  async willSendRequest({ request, context }) {
    if (context.Authorization) {
      request.http.headers.set('Authorization', context.Authorization);
    }
  }
}

@Module({
  providers: [
    {
      provide: AuthenticatedDataSource,
      useValue: AuthenticatedDataSource,
    },
    {
      provide: GATEWAY_BUILD_SERVICE,
      useFactory: AuthenticatedDataSource => {
        return ({ name, url }) => new AuthenticatedDataSource({ url });
      },
      inject: [AuthenticatedDataSource],
    },
  ],
  exports: [GATEWAY_BUILD_SERVICE],
})
class BuildServiceModule {}

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLGatewayModule.forRootAsync({
      useFactory: async () => ({
        gateway: {
          serviceList: [
            { name: 'users', url: process.env.USER_URL },
            { name: 'posts', url: process.env.BLOG_URL },
          ],
        },
        server: {
          context: ({ req }) => ({
            Authorization: req.headers.authorization || null,
          }),
        },
      }),
      imports: [BuildServiceModule],
      inject: [GATEWAY_BUILD_SERVICE],
    }),
  ],
})
export class AppModule {}
