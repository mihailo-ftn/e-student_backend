import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
/// <reference path="../../node_modules/.prisma/client/index.d.ts" />
import { Professor, Student } from '@prisma/client';

export const GetAuthenticatedProfessor = createParamDecorator((data, ctx: ExecutionContext): Professor => {
  const context = GqlExecutionContext.create(ctx);
  return context.getContext().req;
});
