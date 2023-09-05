import { Controller, Get, Query } from '@nestjs/common';
import { SearchResponse } from './interfaces/search-response.interface';
import { SearchService } from './search.service';

@Controller('/')
export class SearchController {

  constructor(
    private readonly searchService: SearchService
  ) {}

  @Get()
  search(
    @Query('search') searchTerm: string,
    @Query('offset') offset?: number
  ): Promise<SearchResponse[]> {
    return this.searchService.search(searchTerm, offset);
  }
}
