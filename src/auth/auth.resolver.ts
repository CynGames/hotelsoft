import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ValidRoles } from '@prisma/client';
import { CurrentUser } from './decorators/current.user.decorator';

import { User } from '../users/entities/user.entity';
import { AuthResponse } from './types/auth.response.type';
import { AuthService } from './auth.service';

import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { LoginInput, SignupInput } from './dto/inputs';

@Resolver(() => AuthResponse)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'signup' })
  signup(@Args('signupInput') signupInput: SignupInput): Promise<AuthResponse> {
    return this.authService.signup(signupInput);
  }

  @Mutation(() => AuthResponse, { name: 'login' })
  login(@Args('login') loginInput: LoginInput): Promise<AuthResponse> {
    return this.authService.login(loginInput);
  }

  @Query(() => AuthResponse, { name: 'revalidate' })
  @UseGuards(JwtAuthGuard)
  revalidateToken(@CurrentUser([ValidRoles.Admin]) user: User): AuthResponse {
    return this.authService.revalidateToken(user);
  }
}
