import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideNavComponent } from './side-nav.component';
import { provideRouter } from '@angular/router';
import { Component, signal } from '@angular/core';
import { AuthService } from '@studiz/frontend/auth';
import { addIcons } from 'ionicons';

@Component({
  standalone: true,
  imports: [
    SideNavComponent
  ],

  template: `
    <div class="ion-page" id="main-content">
    </div>
    <studiz-side-nav></studiz-side-nav>`
})
class TestComponent {
}

describe('SideNavComponent', () => {
  addIcons({
    'house': '<svg></svg>',
    'user-tie': '<svg></svg>'
  })
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: {
            user: signal({})
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
