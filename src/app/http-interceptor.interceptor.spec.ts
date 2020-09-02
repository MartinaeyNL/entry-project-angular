import { TestBed } from '@angular/core/testing';

import { HTTPINTERCEPTORInterceptor } from './_interceptors/http-interceptor.interceptor';

describe('HTTPINTERCEPTORInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HTTPINTERCEPTORInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HTTPINTERCEPTORInterceptor = TestBed.inject(HTTPINTERCEPTORInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
