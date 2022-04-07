import { TestBed } from '@angular/core/testing';

import { EtapasdetService } from './etapasdet.service';

describe('EtapasdetService', () => {
  let service: EtapasdetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EtapasdetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
