import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPromptComponent } from './modal-prompt.component';

describe('ModalPromptComponent', () => {
  let component: ModalPromptComponent;
  let fixture: ComponentFixture<ModalPromptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPromptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
