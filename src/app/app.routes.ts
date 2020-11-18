import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LibrosComponent } from './components/libros/libros.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { AcercaComponent } from './components/acerca/acerca.component';
import { LoginComponent } from './components/login/login.component';
import { CrudComponent } from './components/crud/crud.component';
import{ NuevolibroComponent } from './components/nuevolibro/nuevolibro.component';

import { AuthGuard } from './guards/auth.guard';

const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'libros', component: LibrosComponent },
    { path: 'cursos', component: CursosComponent },
    { path: 'acerca', component: AcercaComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: CrudComponent, canActivate: [AuthGuard] },
    { path:'nuevolibro', component:NuevolibroComponent },
    { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {

    onSameUrlNavigation: "ignore",
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled'

});