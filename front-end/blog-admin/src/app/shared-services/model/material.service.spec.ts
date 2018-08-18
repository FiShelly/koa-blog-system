import { TestBed, inject } from '@angular/core/testing';

import { MaterialService } from './material.service';

describe('MateritalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MaterialService]
    });
  });

  it('should be created', inject([MaterialService], (service: MaterialService) => {
    expect(service).toBeTruthy();
  }));
});
