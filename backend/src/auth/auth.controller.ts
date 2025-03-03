import { Controller, Post, Body, Res, HttpStatus, UseGuards, Get } from '@nestjs/common';
import { LoginService } from './login/login.service';
import { GeneralLoginRequestDTO } from './dto/general-login-request.dto';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly loginHandlingService: LoginService) {}
    
      @Post('login')
      async generalLogin(
        @Body() input: GeneralLoginRequestDTO,
        @Res() res: Response,
      ) {
        try {
          const user = await this.loginHandlingService.validateLocalUser(
            input.username,
            input.password,
          );
    
          return res.status(HttpStatus.OK).json({
            message: 'Login successful',
            access_token: user.access_token
          });
        } catch (error) {
          return res
            .status(HttpStatus.UNAUTHORIZED)
            .json({ message: error.message });
        }
        
      }

      @UseGuards(AuthGuard)
      @Get('secure_message')
      sercure_message(){
        return "Jack is goated at following docs";
      }
     
}
