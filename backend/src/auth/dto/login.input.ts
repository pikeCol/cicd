import { MinLength } from 'class-validator';

export class LoginInput {
  username: string;

  @MinLength(8)
  password: string;
}