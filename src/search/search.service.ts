import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { SearchResponse } from './interfaces/search-response.interface';

@Injectable()
export class SearchService {

  private readonly GOOGLE_SEARCH_URL: string = 'https://google.com.br/search';

  async search(searchTerm: string, offset?: number): Promise<SearchResponse[]> {
    const googleResponse = await this.googleSearch(searchTerm, offset);
    const finalData = this.extractData(googleResponse);

    return finalData;
  }

  private async googleSearch(searchTerm, offset: number = 0): Promise<string> {
    try {
      const response = await axios
        .get(`${this.GOOGLE_SEARCH_URL}`, {
          responseEncoding: 'latin1',
          params: {
            q: searchTerm,
            start: offset,
          }
        });

      return response.data;
    } catch(err) {
      console.error(err);
    }
  }

  private extractData(googleResponse: string): SearchResponse[] {
    const $ = cheerio.load(googleResponse, { decodeEntities: false });
    const data: SearchResponse[] = [];
    
    $('.egMi0.kCrYT')
      .each((index: number, element: any) => {
        const elem = $(element);
        const href = elem.find('a').attr('href');
        const title = elem.find('.BNeawe.vvjwJb.AP7Wnd').text();

        data.push({
          title: title,
          link: this.parseUrl(href),
        });
      });

    return data;
  }

  private parseUrl(rawUrl: string): string {
    return decodeURIComponent(rawUrl)
      .replace(/^\/url\?q=/, '')
      .replace(/&sa=.+/, '');
  }
}
