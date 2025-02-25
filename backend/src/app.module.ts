import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RootModule } from './root/root.module';
import { PlaylistProcessingModule } from './playlist-processing/playlist-processing.module';
import { DatabaseModuleModule } from './database-module/database-module.module';

@Module({
  imports: [RootModule, PlaylistProcessingModule, DatabaseModuleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
