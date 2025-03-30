import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  constructor(private authService: AuthService, private router: Router){}

  getCurrentUser(){
    return this.authService.getCurrentUser();
  }

  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['/home']);
    }).catch(error => {
      console.error('Error al cerrar sesión: ', error);
    });
  }

}
