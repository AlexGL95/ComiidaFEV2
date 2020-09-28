import { TestBed } from '@angular/core/testing';

import { NewrecetaService } from './newreceta.service';

describe('NewrecetaService', () => {
  let service: NewrecetaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewrecetaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
