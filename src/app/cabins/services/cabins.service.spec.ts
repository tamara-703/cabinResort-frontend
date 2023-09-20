import { TestBed } from '@angular/core/testing';

import { CabinsService } from './cabins.service';

describe('CabinsService', () => {
  let service: CabinsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CabinsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
