import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPublishComponent } from './post-publish.component';

describe('PostPublishComponent', () => {
  let component: PostPublishComponent;
  let fixture: ComponentFixture<PostPublishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostPublishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
