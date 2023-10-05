import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinsComponent } from './cabins.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

describe('CabinsComponent', () => {
  let component: CabinsComponent;
  let fixture: ComponentFixture<CabinsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CabinsComponent],
      imports: [HttpClientTestingModule,TranslateModule.forRoot()],
      providers: [MessageService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
    fixture = TestBed.createComponent(CabinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
