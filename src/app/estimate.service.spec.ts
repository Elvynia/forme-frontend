import { TestBed, inject } from '@angular/core/testing';

import { EstimateService } from './estimate.service';

describe('EstimateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EstimateService]
    });
  });

  it('should be created', inject([EstimateService], (service: EstimateService) => {
    expect(service).toBeTruthy();
  }));
});
