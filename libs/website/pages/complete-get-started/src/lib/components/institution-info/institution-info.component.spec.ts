import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstitutionInfoComponent } from './institution-info.component';

describe('WebsiteCompleteGetStartedComponent', () => {
  let component: InstitutionInfoComponent;
  let fixture: ComponentFixture<InstitutionInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstitutionInfoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InstitutionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
