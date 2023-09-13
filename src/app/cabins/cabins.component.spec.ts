import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabinsComponent } from './cabins.component';

describe('CabinsComponent', () => {
  let component: CabinsComponent;
  let fixture: ComponentFixture<CabinsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CabinsComponent]
    });
    fixture = TestBed.createComponent(CabinsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
