import { TestBed } from '@angular/core/testing';

import { OneTimePasswordService } from './one-time-password.service';

describe('OneTimePasswordService', () => {
  let service: OneTimePasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OneTimePasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
