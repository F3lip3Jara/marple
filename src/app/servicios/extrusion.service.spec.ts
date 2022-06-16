import { TestBed } from '@angular/core/testing';

import { ExtrusionService } from './extrusion.service';

describe('ExtrusionService', () => {
  let service: ExtrusionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExtrusionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
