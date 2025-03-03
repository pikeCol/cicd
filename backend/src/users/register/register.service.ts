import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { isEmail } from 'class-validator';
import {User} from '../../common/objects/user'

@Injectable()
export class RegisterService {
    constructor(private prisma: PrismaService) {}
    
      async validateUser(username: string, email:string, password: string, cpassword: string): Promise<User> {
        // if passwords are different
        if (password != cpassword) {
          throw new UnauthorizedException('Passwords do not match');
        }
    
        // if username already taken
        const usernameExists = await this.prisma.user.findFirst({ 
          where: { 
            username: username,
          }
        });
        
        if (usernameExists) {
          throw new UnauthorizedException('Username already taken');
        }
    
        // if email already taken
        const emailExists = await this.prisma.user.findFirst({ 
          where: { 
            email: email,
          }
        });
    
        if (emailExists) {
          throw new UnauthorizedException('Email already taken');
        }
    
        // if email is not an email
        if (!isEmail(email)){
          throw new UnauthorizedException('Please enter a valid e-mail');
        }
    
        // makes the hashed password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
    
        // creates new user
        const user = await this.prisma.user.create({
          data: {
            username: username,
            email: email,
            password: hashedPassword,
          },
        })
    
        return user;
      }
}
