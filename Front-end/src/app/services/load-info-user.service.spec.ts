import { TestBed } from '@angular/core/testing';

import { LoadInfoUserService } from '../services/load-info-user.service';

describe('LoadInfoUserService', () => {
  let service: LoadInfoUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadInfoUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
