import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller('/')
export class SearchController {

  constructor(
    private readonly searchService: SearchService
  ) {}

  @Get()
  search(@Query('search') searchTerm: string) {
    return this.searchService.search(searchTerm);
  }
}
