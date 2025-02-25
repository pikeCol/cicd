import { Module } from '@nestjs/common';
import { PlaylistProcessingController } from './playlist-processing.controller';
import { PlaylistProcessingService } from './playlist-processing.service';
import { CrawlerService } from './crawler/crawler.service';


@Module({
  imports: [],
  controllers: [PlaylistProcessingController],
  providers: [PlaylistProcessingService,CrawlerService]
})
export class PlaylistProcessingModule {}

