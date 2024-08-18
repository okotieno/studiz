import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListPageComponent } from './list-page.component';
import { of } from 'rxjs';
import { Component } from '@angular/core';
import { ITableColumn } from '../list-page.interface';
import { addIcons } from 'ionicons';

@Component({
  standalone: true,
  template: ''
})
export class TestComponent extends ListPageComponent<{ name: string }> {
  allColumns: ITableColumn<{ name: string; }>[] = [];

  constructor() {
    super();
  }

  getItemsFn = () => of({ meta: { totalItems: 0 }, items: [{ name: 'Item 1' }] });
}

describe('ListPageComponent', () => {
  addIcons({
    'forward-fast': '<svg></svg>',
    'forward-step': '<svg></svg>',
    'backward-fast': '<svg></svg>',
    'backward-step': '<svg></svg>',
    'arrow-up-arrow-down': '<svg></svg>',
  })
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [TestComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('ngOnInit should set contents loading to true and call getItems', () => {
    const contentsLoadingSpy = jest.spyOn(component.contentsLoading, 'set');
    const getItemsFnSpy = jest.spyOn(component, 'getItemsFn');
    component.ngOnInit();

    expect(contentsLoadingSpy).toHaveBeenCalledWith(true);
    expect(getItemsFnSpy).toHaveBeenCalled();
  });

  it('getItems should update items and itemsCount on successful response', () => {
    const mockData = { meta: { totalItems: 10 }, items: [{ name: 'Item 1' }] };

    jest.spyOn(component, 'getItemsFn').mockReturnValue(of(mockData));
    component.getItems();

    expect(component.itemsCount()).toBe(10);
    expect(component.items()).toEqual([mockData.items[0]]);
  });

  it('presentPopover should set isOpen to true and update collapsedBreadcrumbs', () => {
    const mockPopover: any = jest.fn();
    const mockEvent = new CustomEvent('detail', { detail: { collapsedBreadcrumbs: ['crumb1', 'crumb2'] } });
    component.popover = mockPopover;

    component.presentPopover(mockEvent);

    expect(component.isBreadcrumbPopoverOpen()).toBe(true);
    expect(component.collapsedBreadcrumbs).toEqual(['crumb1', 'crumb2']);
  });
});
