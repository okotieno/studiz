import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SendLoginLinkFormComponent } from './send-login-link-form.component';

describe('ShellLoginPageComponent', () => {
  let component: SendLoginLinkFormComponent;
  let fixture: ComponentFixture<SendLoginLinkFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendLoginLinkFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SendLoginLinkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
