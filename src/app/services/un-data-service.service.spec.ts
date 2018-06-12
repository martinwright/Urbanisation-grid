import { TestBed, inject } from '@angular/core/testing';

import { UnDataService} from './un-data-service.service';

describe('UnDataService.Service.TsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnDataService]
    });
  });

  it('should be created', inject([UnDataService], (service: UnDataService) => {
    expect(service).toBeTruthy();
  }));
});
