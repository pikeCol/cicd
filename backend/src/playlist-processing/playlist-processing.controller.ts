import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreationRequestDTO } from './dto/creation-request.dto';
import { PlaylistProcessingService } from './playlist-processing.service';

@Controller('playlist-processing')
export class PlaylistProcessingController {

  constructor(private readonly playlistProcessor: PlaylistProcessingService) {}

    @Get()
    getHello(): string {
        return "Hello! from the PLaylist Controller!!";
      }
      
    @Post('create-playlist')
    async processPlaylist(@Body() input: CreationRequestDTO) {

    // Call the service to process the data
    return this.playlistProcessor.findLinks(input)
    }
}
