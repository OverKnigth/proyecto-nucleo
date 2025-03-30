import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NosotrosComponent } from './pages/nosotros/nosotros.component';
import { LoginComponent } from './pages/login/login.component';
import { OfertaAcademicaComponent } from './pages/oferta-academica/oferta-academica.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { InscribirseComponent } from './pages/inscribirse/inscribirse.component';
import { MisCursosComponent } from './pages/mis-cursos/mis-cursos.component';
import { VideosComponent } from './pages/videos/videos.component';
import { authGuard } from './guards/auth/auth.guard';
import { warningGuard } from './guards/warnigs/warning.guard';

export const routes: Routes = [
    {path:'home', component: HomeComponent},
    {path:'nosotros', component: NosotrosComponent},
    {path:"login", component: LoginComponent},
    {path: "oferta-academica", component: OfertaAcademicaComponent,},
    {path: "videos", component: VideosComponent,
        ...canActivate(() => redirectUnauthorizedTo(["login"]))
    },
    {path: "inscribirse", component: InscribirseComponent,
        ...canActivate(() => redirectUnauthorizedTo(["login"])), canDeactivate: [warningGuard]
    },
    {path: "mis-inscripciones", component: MisCursosComponent},
    { path: 'inscribirse/:id', component: InscribirseComponent },
    {path:'', redirectTo:'home', pathMatch: 'full'},
    {path:'**', component: NotFoundComponent}
];
