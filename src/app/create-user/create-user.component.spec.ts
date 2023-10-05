import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserComponent } from './create-user.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MessageService } from 'primeng/api';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('CreateUserComponent', () => {
  let component: CreateUserComponent;
  let fixture: ComponentFixture<CreateUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateUserComponent],
      imports: [HttpClientTestingModule,RouterTestingModule,TranslateModule.forRoot()],
      providers: [MessageService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(CreateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
