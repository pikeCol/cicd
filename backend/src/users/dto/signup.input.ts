import { MinLength, IsEmail } from 'class-validator';

export class SignupInput {
  username: string;

  @IsEmail()
  email: string;

  @MinLength(8)
  password: string;

  @MinLength(8)
  cpassword: string;
}