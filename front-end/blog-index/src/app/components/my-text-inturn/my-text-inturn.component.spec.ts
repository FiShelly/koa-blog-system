/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyTextInturnComponent } from './my-text-inturn.component';

describe('MyTextInturnComponent', () => {
  let component: MyTextInturnComponent;
  let fixture: ComponentFixture<MyTextInturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTextInturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTextInturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
