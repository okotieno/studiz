import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageInstitutionRequestComponent } from './manage-institution-request.component';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { InstitutionRequestFrontendService } from '@studiz/frontend/institution-request-frontend-service';
import { of } from 'rxjs';
import { AuthService } from '@studiz/frontend/auth';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { addIcons } from 'ionicons';

const authUserServiceMock = {
  user: signal({ email: 'test@example.com' }),
};

describe('ManageInstitutionRequestComponent', () => {
  addIcons({
    house: '<svg></svg>',
    'user-tie': '<svg></svg>',
  });
  let component: ManageInstitutionRequestComponent;
  let fixture: ComponentFixture<ManageInstitutionRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideIonicAngular(),
        provideRouter([]),
        provideNoopAnimations(),
        {
          provide: AuthService,
          useValue: authUserServiceMock,
        },
        {
          provide: InstitutionRequestFrontendService,
          useValue: {
            getInstitutionRequests: () =>
              of({ items: [], meta: { totalItems: 0 } }),
          },
        },
      ],
      imports: [ManageInstitutionRequestComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageInstitutionRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
