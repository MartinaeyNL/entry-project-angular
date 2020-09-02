import { TestBed } from '@angular/core/testing';

import { MainLoginService } from './_services/main-login.service';

describe('LoginServiceService', () => {
  let service: MainLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
