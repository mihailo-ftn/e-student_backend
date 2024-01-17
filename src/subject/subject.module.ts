import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path'
import { PrismaService } from 'src/prisma.service';
import { SubjectResolver } from './subject.resolver';

@Module({
    imports: [
        // GraphQLModule.forRoot<ApolloDriverConfig>({
        //     driver: ApolloDriver,
        //     installSubscriptionHandlers: true,
        //     autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        //     cors:{}
        //   }),
    ],
    controllers: [],
    providers: [SubjectResolver,PrismaService],
})
export class SubjectModule {}
