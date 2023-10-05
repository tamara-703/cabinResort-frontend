import { TestBed } from '@angular/core/testing';

import { ViewResevationsService } from './view-resevations.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ViewResevationsService', () => {
  let service: ViewResevationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ViewResevationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
