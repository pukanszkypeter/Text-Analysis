import { TestBed } from '@angular/core/testing';

import { PythonPodcastService } from './python-podcast.service';

describe('PythonPodcastService', () => {
  let service: PythonPodcastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PythonPodcastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
