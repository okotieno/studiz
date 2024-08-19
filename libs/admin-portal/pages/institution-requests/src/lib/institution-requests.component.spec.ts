import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstitutionRequestsComponent } from './institution-requests.component';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { InstitutionRequestFrontendService } from '@studiz/frontend/institution-request-frontend-service';
import { of } from 'rxjs';
import { signal } from '@angular/core';
import { AuthService } from '@studiz/frontend/auth';
import { provideRouter } from '@angular/router';
import { addIcons } from 'ionicons';

const authUserServiceMock = {
  user: signal({ email: 'test@example.com' }),
};

describe('InstitutionRequestsComponent', () => {
  addIcons({
    house: '<svg></svg>',
    'user-tie': '<svg></svg>',
    'forward-fast': '<svg></svg>',
    'backward-fast': '<svg></svg>',
    'backward-step': '<svg></svg>',
    'forward-step': '<svg></svg>',
    plus: '<svg></svg>',
    filters: '<svg></svg>',
    'arrow-up-arrow-down': '<svg></svg>',
  });
  let component: InstitutionRequestsComponent;
  let fixture: ComponentFixture<InstitutionRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstitutionRequestsComponent],
      providers: [
        provideIonicAngular(),
        provideRouter([]),
        {
          provide: InstitutionRequestFrontendService,
          useValue: {
            getItems: () => of({ items: [], meta: { totalItems: 0 } }),
            deleteItem: () => of({ message: 'Successfully deleted item' }),
          },
        },
        {
          provide: AuthService,
          useValue: authUserServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InstitutionRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
