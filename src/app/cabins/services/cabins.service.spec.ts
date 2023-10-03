import { TestBed } from '@angular/core/testing';

import { CabinsService } from './cabins.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CabinsService', () => {
  let service: CabinsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CabinsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
