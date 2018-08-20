/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyImageInturnComponent } from './my-image-inturn.component';

describe('MyImageInturnComponent', () => {
  let component: MyImageInturnComponent;
  let fixture: ComponentFixture<MyImageInturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyImageInturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyImageInturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
