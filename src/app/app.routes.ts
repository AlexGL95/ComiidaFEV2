import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { EquipoComponent } from "./components/equipo/equipo.component";
import { RondaComponent } from './components/ronda/ronda.component';
import { RecetaComponent } from './receta/receta.component';

const APP_ROUTES: Routes = [
    {path: 'Login', component: LoginComponent},
    {path: 'Ronda', component: RondaComponent},
    {path: 'Receta', component: RecetaComponent},
    {path: 'Registro', component: RegistroComponent},
    {path: 'Equipo', component: EquipoComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'Login'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
