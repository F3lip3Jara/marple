import { TestBed } from '@angular/core/testing';

import { ProductosServiceService } from './productos-service.service';

describe('ProductosServiceService', () => {
  let service: ProductosServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductosServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
