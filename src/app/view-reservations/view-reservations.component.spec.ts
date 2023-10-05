import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReservationsComponent } from './view-reservations.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('ViewReservationsComponent', () => {
  let component: ViewReservationsComponent;
  let fixture: ComponentFixture<ViewReservationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewReservationsComponent],
      imports: [HttpClientTestingModule],
      providers: [MessageService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(ViewReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
