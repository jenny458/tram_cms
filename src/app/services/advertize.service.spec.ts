import { TestBed } from '@angular/core/testing';

import { AdvertizeService } from './advertize.service';

describe('AdvertizeService', () => {
  let service: AdvertizeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvertizeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
