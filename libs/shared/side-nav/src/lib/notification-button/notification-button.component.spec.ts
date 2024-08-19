import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationButtonComponent } from './notification-button.component';
import { AuthService } from '@studiz/frontend/auth';
import { signal } from '@angular/core';
import { addIcons } from 'ionicons';

if (!window.matchMedia) {
  window.matchMedia = (() => {
    //
  }) as any;
}
jest.spyOn(window as any, 'matchMedia').mockReturnValue({
    matches: false,
    media: '',
    onchange: null,
    addEventListener: () => {
    }
  }
);

describe('SideNavComponent', () => {
  let component: NotificationButtonComponent;
  let fixture: ComponentFixture<NotificationButtonComponent>;

  beforeEach(async () => {
    addIcons({
      'user-tie': '<svg></svg>'
    });
    await TestBed.configureTestingModule({
      imports: [NotificationButtonComponent],
      providers: [
        {
          provide: AuthService,
          useValue: {
            user: signal({})
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
