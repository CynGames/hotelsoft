import { PaginationQueryParamsDto } from '../../../common/pagination.query.args';
import { ArgsType, Field } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

@ArgsType()
export class UserQueryParamsDto extends PaginationQueryParamsDto {
  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  firstName?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsOptional()
  lastName?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsEmail()
  @IsOptional()
  email?: string;

  @Field(() => String, { nullable: true })
  @IsString()
  @IsPhoneNumber()
  @IsOptional()
  phoneNumber?: string;

  @Field(() => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
  //
  // @Field(() => [ValidRoles], { nullable: true })
  // @IsEnum(ValidRoles)
  // @IsOptional()
  // roles?: ValidRoles[];
}
