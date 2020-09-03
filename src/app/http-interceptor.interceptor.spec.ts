import { TestBed } from '@angular/core/testing';

import { HttpBaseUrlInterceptor } from './_interceptors/httpbaseurl.interceptor';

describe('HTTPINTERCEPTORInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpBaseUrlInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpBaseUrlInterceptor = TestBed.inject(HttpBaseUrlInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
