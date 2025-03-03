import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { RegisterRequestDTO } from './dto/register-request.dto';
import { RegisterService } from './register/register.service';
import { Response } from 'express';

@Controller('users')
export class UsersController {
      constructor(private readonly playlistProcessor: RegisterService) {}
    
    @Post('register')
        async register(
          @Body() input: RegisterRequestDTO,
          @Res() res: Response,
        ) {
          try {
            const user = await this.playlistProcessor.validateUser(
              input.username,
              input.email,
              input.password,
              input.cpassword,
            );
      
            return res.status(HttpStatus.OK).json({
              message: 'Signup successful',
              userId: user.id,
              email: user.email,
            });
          } catch (error) {
            return res
              .status(HttpStatus.UNAUTHORIZED)
              .json({ message: error.message });
          }
}
}