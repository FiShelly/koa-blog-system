import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalImageSelectComponent } from './modal-image-select.component';

describe('ModalImageSelectComponent', () => {
  let component: ModalImageSelectComponent;
  let fixture: ComponentFixture<ModalImageSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalImageSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalImageSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
