import { TestBed } from '@angular/core/testing';

import { ReserveService } from './reserve.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

/*
private route: ActivatedRoute,
              private cabinService: CabinsService,
              private router: Router,
              private reserveService: ReserveService,
              private logInService: LogInService,
              private messageService: MessageService,
              private formBuilder: FormBuilder
*/


describe('ReserveService', () => {
  let service: ReserveService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {params: {id: '24fkzrw3487943uf358lovd'}}
          }
        }
      ]
    });
    service = TestBed.inject(ReserveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
