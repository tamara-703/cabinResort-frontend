import { TestBed } from '@angular/core/testing';

import { ViewResevationsService } from './view-resevations.service';

describe('ViewResevationsService', () => {
  let service: ViewResevationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewResevationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
