import { Injectable, ExecutionContext } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

@Injectable()
export class isAuth {
  getRequest(context: ExecutionContext,next) {
    const ctx = GqlExecutionContext.create(context);
    if(!ctx.getContext().req.session.studentID){
        throw new Error('ER002')
    };
    return next();
  }
}