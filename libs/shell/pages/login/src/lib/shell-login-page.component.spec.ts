import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShellLoginPageComponent } from './shell-login-page.component';

describe('ShellLoginPageComponent', () => {
  let component: ShellLoginPageComponent;
  let fixture: ComponentFixture<ShellLoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShellLoginPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShellLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
