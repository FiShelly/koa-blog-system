import { TestBed, inject } from '@angular/core/testing';

import { CgiService } from './cgi.service';

describe('CgiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CgiService]
    });
  });

  it('should be created', inject([CgiService], (service: CgiService) => {
    expect(service).toBeTruthy();
  }));
});
