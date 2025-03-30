import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);  // Inyectamos AuthService
  const router = inject(Router);  // Inyectamos Router

  // Verificar si el usuario está autenticado
  const user = authService.getCurrentUser(); 

  // Si el usuario está autenticado, permitimos el acceso
  if (user) {
    return true;
  } else {
    // Si no está autenticado, redirigimos a la página de login
    router.navigate(['/login']);
    return false;
  }
};
