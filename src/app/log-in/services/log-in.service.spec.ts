import { TestBed } from '@angular/core/testing';

import { LogInService } from './log-in.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LogInService', () => {
  let service: LogInService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LogInService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
