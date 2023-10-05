import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveComponent } from './reserve.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CabinsService } from 'src/app/cabins/services/cabins.service';
import { LogInService } from 'src/app/log-in/services/log-in.service';
import { ReserveService } from '../services/reserve.service';
import { TranslateModule } from '@ngx-translate/core'

class ActivatedRouteStub {
  public snapshot = {
    paramMap: {
      get(id: string)
      {
        return "TX";
      }
    }
  }
}

describe('ReserveComponent', () => {
  let component: ReserveComponent;
  let fixture: ComponentFixture<ReserveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReserveComponent],
      imports: [HttpClientTestingModule,TranslateModule.forRoot()],
      providers: [
        {
          provide: ActivatedRoute,
          useClass: ActivatedRouteStub
        },
        MessageService,
        CabinsService,
        LogInService,
        ReserveService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(ReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
