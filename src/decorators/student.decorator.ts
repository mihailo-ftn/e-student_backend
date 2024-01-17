import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
/// <reference path="../../node_modules/.prisma/client/index.d.ts" />
import { Student } from '@prisma/client';

export const GetAuthenticatedUser = createParamDecorator(
  (data, ctx: ExecutionContext): Student => {
    const context = GqlExecutionContext.create(ctx);
    return context.getContext().req;
  },
);
