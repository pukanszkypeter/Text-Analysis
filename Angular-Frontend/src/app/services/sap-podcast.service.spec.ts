import { TestBed } from '@angular/core/testing';

import { SapPodcastService } from './sap-podcast.service';

describe('SapPodcastService', () => {
  let service: SapPodcastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SapPodcastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
