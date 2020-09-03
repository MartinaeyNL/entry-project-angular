import { TestBed } from '@angular/core/testing';

import { AuthloginredirectInterceptor } from './_interceptors/authloginredirect.interceptor';

describe('AuthredirectInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthloginredirectInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AuthloginredirectInterceptor = TestBed.inject(AuthloginredirectInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
