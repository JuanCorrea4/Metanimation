import { TestBed } from '@angular/core/testing';

import { ApiPodcastService } from './apiPodcast.service';

describe('ApiPodcastService', () => {
  let service: ApiPodcastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPodcastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
