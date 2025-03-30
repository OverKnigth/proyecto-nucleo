import { CanDeactivateFn } from '@angular/router';
import { InscribirseComponent } from '../../pages/inscribirse/inscribirse.component';

export const warningGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  const currentComponent = component as InscribirseComponent;

  if(currentComponent.inscripcionForm.invalid && currentComponent.inscripcionForm.dirty) {
    return window.confirm('Desea salir sin guardar?');
  }
  return true;
};
