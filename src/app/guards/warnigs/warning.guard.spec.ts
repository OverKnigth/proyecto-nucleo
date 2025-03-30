import { TestBed } from '@angular/core/testing';
import { CanDeactivateFn } from '@angular/router';

import { warningGuard } from './warning.guard';

describe('warningGuard', () => {
  const executeGuard: CanDeactivateFn<unknown> = (...guardParameters) => 
      TestBed.runInInjectionContext(() => warningGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
