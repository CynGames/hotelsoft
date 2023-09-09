import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ValidRoles } from '../enums/valid.roles.enum';

export const CurrentUser = createParamDecorator(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  (role: ValidRoles, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;

    if (!user) {
      throw new InternalServerErrorException(
        'No user inside the request. Use AuthGuard.',
      );
    }

    if (user.role === role) return user;

    throw new ForbiddenException(
      `User ${user.fullName} needs the role of [${role}] to access this resource.`,
    );
  },
);
