import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { EquipoComponent } from "./components/equipo/equipo.component";

const APP_ROUTES: Routes = [
    {path: 'Login', component: LoginComponent},
    {path: 'Registro', component: RegistroComponent},
    {path: 'Equipo', component: EquipoComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'Login'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
