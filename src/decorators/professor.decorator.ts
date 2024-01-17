import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Professor, Student } from '@prisma/client';

export const GetAuthenticatedProfessor = createParamDecorator((data, ctx: ExecutionContext): Professor => {
  const context = GqlExecutionContext.create(ctx);
  return context.getContext().req;
});
