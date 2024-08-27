import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompleteGetStartedComponent } from './complete-get-started.component';

describe('WebsiteCompleteGetStartedComponent', () => {
  let component: CompleteGetStartedComponent;
  let fixture: ComponentFixture<CompleteGetStartedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompleteGetStartedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CompleteGetStartedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
