import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableShownListComponent } from './table-shown-list.component';

describe('TableShownListComponent', () => {
  let component: TableShownListComponent;
  let fixture: ComponentFixture<TableShownListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableShownListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableShownListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
