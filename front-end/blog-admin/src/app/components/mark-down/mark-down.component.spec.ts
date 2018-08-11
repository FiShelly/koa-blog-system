import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkDownComponent } from './mark-down.component';

describe('MarkDownComponent', () => {
  let component: MarkDownComponent;
  let fixture: ComponentFixture<MarkDownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkDownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
