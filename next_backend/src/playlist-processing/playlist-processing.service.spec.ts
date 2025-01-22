import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistProcessingService } from './playlist-processing.service';
import { CreationRequestDTO } from './dto/creation-request.dto';
import { CreationResponseDTO } from './dto/creation-response.dto';
import { CrawlerService } from './crawler/crawler.service';

describe('PlaylistProcessingService', () => {
  let service: PlaylistProcessingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlaylistProcessingService],
    }).compile();

    service = module.get<PlaylistProcessingService>(PlaylistProcessingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
