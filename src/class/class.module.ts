import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { PrismaService } from 'src/prisma.service';
import { ClassResolver } from './class.resolver';

@Module({
  imports: [],
  controllers: [],
  providers: [ClassResolver, PrismaService],
})
export class ClassModule {}


// GraphQLModule.forRoot<ApolloDriverConfig>({
//   driver: ApolloDriver,
//   installSubscriptionHandlers: true,
//   autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
// }),

