import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPageComponent } from './login-page.component';
import { Router } from '@angular/router';
import { APP_NAME, GOOGLE_CLIENT_ID } from '@studiz/frontend/constants';
import { AuthService } from '@studiz/frontend/auth';
import { of } from 'rxjs';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginPageComponent
      ],
      providers: [
        // ...socialLoginProvider,
        { provide: APP_NAME, useValue: 'My APP' },
        { provide: Router, useValue: { navigate: jest.fn() } },
        { provide: GOOGLE_CLIENT_ID, useValue: '' },
        {
          provide: AuthService, useValue: { authState$: of({ email: 'test@example.com' }) }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
