import { Test, TestingModule } from '@nestjs/testing';
import { SearchService } from './search.service';
import axios from 'axios';
import { SearchResponse } from './interfaces/search-response.interface';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const simpleRawGoogleHtml = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>
  <body>
    <div class="egMi0 kCrYT">
      <a href="/url?q=http://www.maringa.pr.gov.br/&amp;sa=U&amp;ved=2ahUKEwjdlKHooJGBAxXLLrkGHXabAFwQFnoECAQQAg&amp;usg=AOvVaw3E_6wKPdlFDwuR8nqamh--" jsname="ACyKwe" data-ved="2ahUKEwjdlKHooJGBAxXLLrkGHXabAFwQFnoECAQQAg">
        <div class="DnJfK">
          <div class="j039Wc">
            <h3 class="zBAuLc l97dzf">
              <div class="BNeawe vvjwJb AP7Wnd">Prefeitura Municipal de Maringá</div>
            </h3>
          </div>
          <div class="sCuL3">
            <div class="BNeawe UPmit AP7Wnd lRVwie">www.maringa.pr.gov.br</div>
          </div>
        </div>
      </a>
    </div>
  </body>
  </html>
`;

describe('SearchService', () => {
  let service: SearchService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchService],
    }).compile();

    service = module.get<SearchService>(SearchService);
  });

  describe('googleSearch', () => {
    it('should request google search with the search term provided', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: [] });

      const response = await service['googleSearch']('maringa');

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        'https://google.com.br/search',
        {
          responseEncoding: 'latin1',
          params: {
            q: 'maringa',
            start: 0,
          }
        }
      );
      expect(response).toEqual([]);
    });
  });

  describe('parseUrl', () => {
    it('should receive an url on the google response format and return a clean url', () => {
      const googleURLFormat = '/url?q=http://www.maringa.pr.gov.br/&sa=U&ved=2ahUKEwj9wJG9tJGBAxVzArkGHaNlASYQFnoECAoQAg&usg=AOvVaw0n3YMdyhcqK-SxwqaDk0MT';
      const expectedOutputFormat = 'http://www.maringa.pr.gov.br/';

      const result = service['parseUrl'](googleURLFormat);

      expect(result).toEqual(expectedOutputFormat);
    });
  });

  describe('extractData', () => {
    it('should receive the raw google html and extract the data needed', () => {
      const expected: SearchResponse[] = [{
        'title': 'Prefeitura Municipal de Maringá',
        'link': 'http://www.maringa.pr.gov.br/',
      }];

      const result = service['extractData'](simpleRawGoogleHtml);

      expect(result).toEqual(expected);
    });
  });
});
