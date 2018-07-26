import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamplePagesComponent } from './sample-pages.component';

describe('SamplePagesComponent', () => {
  let component: SamplePagesComponent;
  let fixture: ComponentFixture<SamplePagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamplePagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamplePagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
