import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShellHomePageComponent } from './shell-home-page.component';

describe('ShellHomePageComponent', () => {
  let component: ShellHomePageComponent;
  let fixture: ComponentFixture<ShellHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShellHomePageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShellHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
