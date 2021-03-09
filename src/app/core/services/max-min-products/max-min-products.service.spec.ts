import { TestBed } from '@angular/core/testing';

import { MaxMinProductsService } from './max-min-products.service';

describe('MaxMinProductsService', () => {
  let service: MaxMinProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaxMinProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
