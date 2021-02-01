import { Logger } from '@nestjs/common';
import { Plugin } from '@nestjs/graphql';
import { ApolloServerPlugin } from 'apollo-server-plugin-base';

@Plugin()
export class LoggingPlugin implements ApolloServerPlugin {
  serverWillStart() {
    Logger.log('GraphQL server started');
  }
}
