import { TestBed } from '@angular/core/testing';

import { ProgressBarInterceptor } from './progress-bar.interceptor';

describe('ProgressBarInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      ProgressBarInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: ProgressBarInterceptor = TestBed.inject(ProgressBarInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
