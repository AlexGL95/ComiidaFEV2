import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { EquipoComponent } from "./components/equipo/equipo.component";
import { RondaComponent } from './components/ronda/ronda.component';
import { SuccessComponent } from './components/success/success.component';
import { RecetaComponent } from "./components/receta/receta.component";
import { NewRecetaComponent } from './components/new-receta/new-receta.component';


const APP_ROUTES: Routes = [
    {path: 'Login', component: LoginComponent},
    {path: 'Ronda', component: RondaComponent},
    {path: 'Receta', component: RecetaComponent},
    {path: 'NuevaReceta', component: NewRecetaComponent},
    {path: 'Success', component: SuccessComponent},
    {path: 'Registro', component: RegistroComponent},
    {path: 'Equipo', component: EquipoComponent},
    {path: 'Receta', component: RecetaComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'Login'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
