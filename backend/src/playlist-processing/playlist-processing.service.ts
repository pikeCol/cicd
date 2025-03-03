import { Injectable } from '@nestjs/common';
import { CreationRequestDTO } from './dto/creation-request.dto';
import { CreationResponseDTO } from './dto/creation-response.dto';
import { CrawlerService } from '../common/crawler/crawler.service'
import { response } from 'express';

@Injectable()
export class PlaylistProcessingService {
    
    async findLinks(request: CreationRequestDTO):Promise<CreationResponseDTO>{
        var crawler = new CrawlerService

        return crawler.CrawlerService(request)
    }
}
