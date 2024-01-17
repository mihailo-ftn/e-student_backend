import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { PrismaService } from 'src/prisma.service';
import { GradeResolver } from './grade.resolver';

@Module({
  imports: [],
  controllers: [],
  providers: [GradeResolver, PrismaService],
})
export class GradeModule {}
