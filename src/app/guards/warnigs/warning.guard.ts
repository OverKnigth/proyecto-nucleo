import { CanDeactivateFn } from '@angular/router';

export const warningGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return true;
};
