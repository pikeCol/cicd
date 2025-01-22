import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RootModule } from './root/root.module';
import { PlaylistProcessingModule } from './playlist-processing/playlist-processing.module';

@Module({
  imports: [RootModule, PlaylistProcessingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
