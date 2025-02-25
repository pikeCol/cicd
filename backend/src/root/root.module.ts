import { Module } from '@nestjs/common';
import { PlaylistProcessingModule } from 'src/playlist-processing/playlist-processing.module';

@Module({
    imports: [PlaylistProcessingModule]
})
export class RootModule {}
