import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { User } from '../../common/objects/user'; 
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
    constructor(
      private prisma: PrismaService,
      private jwtService: JwtService
    ) {}
    
      async validateLocalUser(username: string, password: string): Promise<{ access_token: string }> {
        const user = await this.prisma.user.findFirst({ 
          where: { 
            username: username,
            provider: 'local' 
          }
        });
        
        if (!user || !(await bcrypt.compare(password, user.password))) {
          throw new UnauthorizedException('Invalid credentials');
        }
        const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
      }
    
      // for spotify logins
      /*
      async handleSpotifyLogin(code: string): Promise<User> {
        const { access_token, refresh_token } = await this.exchangeSpotifyCode(code);
        const spotifyUser = await this.getSpotifyUser(access_token);
        
        let user = await this.prisma.user.findFirst({
          where: { spotifyId: spotifyUser.id }
        });
    
        if (!user) {
          user = await this.prisma.user.create({
            data: {
              spotifyId: spotifyUser.id,
              provider: 'spotify',
              spotifyAccessToken: access_token,
              spotifyRefreshToken: refresh_token
            }
          });
        } else {
          user = await this.prisma.user.update({
            where: { id: user.id },
            data: {
              spotifyAccessToken: access_token,
              spotifyRefreshToken: refresh_token
            }
          });
        }
    
        return user;
      }
    
      private async exchangeSpotifyCode(code: string): Promise<{ access_token: string; refresh_token: string }> {
        // Implementation...
      }
    
      private async getSpotifyUser(accessToken: string): Promise<{ id: string }> {
        // Implementation...
      }
      */
}
