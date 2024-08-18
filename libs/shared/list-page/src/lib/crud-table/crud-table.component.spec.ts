import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrudTableComponent } from './crud-table.component';
import { of } from 'rxjs';
import { addIcons } from 'ionicons';

describe('CrudTableComponent', () => {
  let component: CrudTableComponent;
  let fixture: ComponentFixture<CrudTableComponent>;

  beforeEach(async () => {
    addIcons({
      'forward-fast': '<svg></svg>',
      'forward-step': '<svg></svg>',
      'backward-fast': '<svg></svg>',
      'backward-step': '<svg></svg>',
      'arrow-up-arrow-down': '<svg></svg>',
      'filters': '<svg></svg>',
    })
    await TestBed.configureTestingModule({
      imports: [CrudTableComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CrudTableComponent);
    component = fixture.componentInstance;
    component.getItemsFn = () => of({ items: [], meta: { totalItems: 0 } });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
