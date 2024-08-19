import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CountrySelectComponent } from './country-select.component';
import { AuthService } from '@studiz/frontend/auth';
import { signal } from '@angular/core';

describe('SideNavComponent', () => {
  let component: CountrySelectComponent;
  let fixture: ComponentFixture<CountrySelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountrySelectComponent],
      providers: [
        {
          provide: AuthService,
          useValue: {
            user: signal({})
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CountrySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
