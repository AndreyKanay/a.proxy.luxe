import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email address',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'P@ssw0rd!',
    description: 'Password (8-20 chars, 1 uppercase, 1 number, 1 special)',
    required: true,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}/, {
    message: 'Password too weak',
  })
  password: string;

  @ApiProperty({
    example: 'P@ssw0rd!',
    description: 'Password confirmation',
    required: true,
  })
  @IsString()
  passwordConfirm: string;
}
