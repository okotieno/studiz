import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewInstitutionRequestComponent } from './view-institution-request.component';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { InstitutionRequestFrontendService } from '@studiz/frontend/institution-request-frontend-service';
import { AuthService } from '@studiz/frontend/auth';
import { signal } from '@angular/core';
import { addIcons } from 'ionicons';

const institutionRequestServiceMock = {
  getItems: jest.fn(),
  getItemWithId: jest.fn(),
  deleteItem: jest.fn(),
};

institutionRequestServiceMock.getItems.mockReturnValue({
  items: [],
  meta: { totalItems: 0 },
});
institutionRequestServiceMock.getItemWithId.mockReturnValue({
  message: 'Successfully deleted item',
});

const authUserService = {
  user: signal({ email: 'test@example.com' }),
};
describe('ViewInstitutionRequestComponent', () => {
  addIcons({
    house: '<svg></svg>',
    'user-tie': '<svg></svg>',
  });
  let component: ViewInstitutionRequestComponent;
  let fixture: ComponentFixture<ViewInstitutionRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewInstitutionRequestComponent],
      providers: [
        provideIonicAngular(),
        provideRouter([]),
        {
          provide: InstitutionRequestFrontendService,
          useValue: institutionRequestServiceMock,
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                institutionRequest: { name: 'test@example.com' },
              },
            },
          },
        },
        { provide: AuthService, useValue: authUserService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewInstitutionRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
