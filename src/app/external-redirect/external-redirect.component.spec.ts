import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalRedirectComponent } from './external-redirect.component';
import { ActivatedRoute } from '@angular/router';

describe('ExternalRedirectComponent', () => {
  let component: ExternalRedirectComponent;
  let fixture: ComponentFixture<ExternalRedirectComponent>;

  class ActivatedRouteStub {
    public snapshot = {
      paramMap: {
        get(mapUrl: string)
        {
          return "linktomap";
        }
      }
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExternalRedirectComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useClass: ActivatedRouteStub
        }
      ]
    });
    fixture = TestBed.createComponent(ExternalRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(component, 'redirect');
    expect(component.redirect).toHaveBeenCalled();
  });
});
