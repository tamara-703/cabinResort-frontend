// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { ExternalRedirectComponent } from './external-redirect.component';
// import { ActivatedRoute } from '@angular/router';

// describe('ExternalRedirectComponent', () => {
//   let component: ExternalRedirectComponent;
//   let fixture: ComponentFixture<ExternalRedirectComponent>;

//   class ActivatedRouteStub {
//     public snapshot = {
//       paramMap: {
//         get(mapUrl: string)
//         {
//           return "linktomap";
//         }
//       }
//     }
//   }

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [ExternalRedirectComponent],
//       providers: [
//         {
//           provide: ActivatedRoute,
//           useClass: ActivatedRouteStub
//         }
//       ]
//     });
//     fixture = TestBed.createComponent(ExternalRedirectComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     spyOn(component, 'redirect');
//     expect(component.redirect).toHaveBeenCalled();
//   });
// });

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { ExternalRedirectComponent } from './external-redirect.component';
import { of } from 'rxjs';

describe('ExternalRedirectComponent', () => {
  let component: ExternalRedirectComponent;
  let fixture: ComponentFixture<ExternalRedirectComponent>;
  let activatedRouteMock: any;
  let routerMock: any;

  beforeEach(() => {
    activatedRouteMock = {
      queryParams: of({ mapUrl: 'https://example.com' }),
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    TestBed.configureTestingModule({
      declarations: [ExternalRedirectComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    fixture = TestBed.createComponent(ExternalRedirectComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to the external URL', () => {
    spyOn(window.location, 'assign'); // Spy on window.location.assign

    fixture.detectChanges(); // Trigger ngOnInit

    expect(window.location.assign).toHaveBeenCalledWith('https://example.com');
  });
});
