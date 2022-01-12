import { Module } from '@nestjs/common';
import { GraphQLFederationModule } from '@nestjs/graphql';

import { UserModule } from './users/user.module';
import { join } from 'path';

@Module({
  imports: [
    UserModule,
    GraphQLFederationModule.forRootAsync({
      useFactory: async () => {
        return {
          debug: false,
          autoSchemaFile: join(`${process.cwd()}/schema.gql`),
          playground: true,
        };
      },
    }),
  ],
})
export class V1Module {}
