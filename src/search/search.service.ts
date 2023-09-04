import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {

  search(term: string): any {
    return [{
      title: term,
      link: 'link'
    }];
  }
}
