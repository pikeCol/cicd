import { Test, TestingModule } from '@nestjs/testing';
import { PlaylistProcessingController } from './playlist-processing.controller';

describe('PlaylistProcessingController', () => {
  let controller: PlaylistProcessingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlaylistProcessingController],
    }).compile();

    controller = module.get<PlaylistProcessingController>(PlaylistProcessingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
