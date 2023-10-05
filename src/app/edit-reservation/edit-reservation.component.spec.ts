import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditReservationComponent } from './edit-reservation.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

class ActivatedRouteStub {
  public snapshot = {
    paramMap: {
      get(id: string)
      {
        return '1';
      }
    }
  }
}

describe('EditReservationComponent', () => {
  let component: EditReservationComponent;
  let fixture: ComponentFixture<EditReservationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditReservationComponent],
      imports: [HttpClientTestingModule,TranslateModule.forRoot()],
      providers: [
        {
          provide: ActivatedRoute,
          useClass: ActivatedRouteStub
        },
        MessageService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(EditReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
