import { TestBed } from '@angular/core/testing';

import { ApiStrategiesService } from './bellumgens-api.strategies.service';

describe('ApiStrategiesService', () => {
  let service: ApiStrategiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiStrategiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
