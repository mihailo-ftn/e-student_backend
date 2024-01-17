import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Student } from '@prisma/client';

export const GetAuthenticatedUser = createParamDecorator(
  (data, ctx: ExecutionContext): Student => {
    const context = GqlExecutionContext.create(ctx);
    return context.getContext().req;
  },
);
