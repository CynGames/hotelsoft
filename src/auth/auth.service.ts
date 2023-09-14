import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

import { AuthResponse } from './types/auth.response.type';
import { UsersService } from '../users/users.service';
import { LoginInput, SignupInput } from './dto/inputs';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private getJwtToken(id: string) {
    return this.jwtService.sign({ id });
  }

  async signup(signupInput: SignupInput): Promise<AuthResponse> {
    const user = await this.usersService.create(signupInput);
    const token = this.getJwtToken(user.userID);

    return {
      token,
      user,
    };
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const { email, password } = loginInput;

    const user = await this.usersService.findOneByEmail(email);
    const token = this.getJwtToken(user.userID);

    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException('Email / Password do not match');
    }

    return {
      token,
      user,
    };
  }

  async validateUser(userID: string): Promise<User> {
    const user = await this.usersService.findOneByID(userID);

    if (!user.isActive) {
      throw new UnauthorizedException(
        `User ${user.firstName} ${user.lastName} is blocked.`,
      );
    }

    delete user.password;

    return user;
  }

  revalidateToken(user: User): AuthResponse {
    const token = this.getJwtToken(user.userID);

    return {
      token,
      user,
    };
  }
}
