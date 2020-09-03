import { TestBed } from '@angular/core/testing';

import { HttpheadersInterceptor } from './_interceptors/httpheaders.interceptor';

describe('HttpheadersInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      HttpheadersInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: HttpheadersInterceptor = TestBed.inject(HttpheadersInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
