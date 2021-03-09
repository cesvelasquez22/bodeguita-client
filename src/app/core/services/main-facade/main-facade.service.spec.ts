import { TestBed } from '@angular/core/testing';

import { MainFacadeService } from './main-facade.service';

describe('MainFacadeService', () => {
  let service: MainFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainFacadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
