import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { addIcons } from 'ionicons';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { AuthService } from '@studiz/frontend/auth';
import { signal } from '@angular/core';

const authUserService = {
  user: signal({ email: 'test@example.com' })
};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    addIcons({
      'house': '<svg></svg>',
      'user-tie': '<svg></svg>',
      'bars': '<svg></svg>'
    });
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideIonicAngular(),
        { provide: AuthService, useValue: authUserService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
