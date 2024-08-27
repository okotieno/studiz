import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminInfoComponent } from './admin-info.component';

describe('WebsiteCompleteGetStartedComponent', () => {
  let component: AdminInfoComponent;
  let fixture: ComponentFixture<AdminInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
