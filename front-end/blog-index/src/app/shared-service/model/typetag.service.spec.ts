import { TestBed, inject } from '@angular/core/testing';

import { TypetagService } from './typetag.service';

describe('TypetagService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TypetagService]
    });
  });

  it('should be created', inject([TypetagService], (service: TypetagService) => {
    expect(service).toBeTruthy();
  }));
});
