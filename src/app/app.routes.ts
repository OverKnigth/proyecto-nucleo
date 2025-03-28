import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    {path:'home', component: HomeComponent},
    {path:'nosotros', component: NosotrosComponent},
    {path:"login", component: LoginComponent},
    {path:'', redirectTo:'home', pathMatch: 'full'},
    {path:'**', component: NotFoundComponent}
];
