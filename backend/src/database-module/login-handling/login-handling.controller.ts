import { Controller, Post, Body, Get } from '@nestjs/common';
import { LoginHandlingService } from './login-handling.service';
import { GeneralLoginRequestDTO } from './dto/general-login-request.dto';


@Controller('login-handling')
export class LoginHandlingController {
  constructor(private readonly loginHandlingService: LoginHandlingService) {}
    
    @Get()
    getHello(): string {
        return "Hello! from the Login Controller!!";
    }
          
    @Post('general-login')
    async processPlaylist(@Body() input: GeneralLoginRequestDTO) {
    // Call the service to process the data



    return // whatever you want to return. Should be at least a confirmation and should be a dto i think
    }  
  
}

