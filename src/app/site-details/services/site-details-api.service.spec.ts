import { TestBed } from '@angular/core/testing';

import { SiteDetailsApiService } from './site-details-api.service';

describe('SiteDetailsApiService', () => {
  let service: SiteDetailsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteDetailsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
