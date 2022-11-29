import { TestBed } from '@angular/core/testing';

import { HomeTrainsListService } from './home-trains-list.service';

describe('HomeTrainsListService', () => {
  let service: HomeTrainsListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeTrainsListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
