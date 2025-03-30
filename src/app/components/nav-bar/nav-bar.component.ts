import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  constructor(private authService: AuthService){}

  getCurrentUser(){
    return this.authService.getCurrentUser();
  }

  logout(){
    this.authService.logout()
    .then(() => {console.log("Logout Exitoso");})
    .catch((err => console.log(err)));
  }

}
