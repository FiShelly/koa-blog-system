import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypetagComponent } from './typetag.component';

describe('TypetagComponent', () => {
  let component: TypetagComponent;
  let fixture: ComponentFixture<TypetagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypetagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypetagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
