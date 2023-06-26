import { TestBed } from '@angular/core/testing';

import { BriefcaseService } from './briefcase.service';

describe('BriefcaseService', () => {
  let service: BriefcaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BriefcaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
