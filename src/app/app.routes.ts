import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
import { EquipoComponent } from './components/equipo/equipo.component';
import { RondaComponent } from './components/ronda/ronda.component';
import { SuccessComponent } from './components/success/success.component';
import { RecetaComponent } from './components/receta/receta.component';
import { NewRecetaComponent } from './components/new-receta/new-receta.component';
import { HomeComponent } from "./components/home/home.component";
import { UsuariosComponent } from './components/usuarios/usuarios.component';


const APP_ROUTES: Routes = [
    {path: 'Edicion_Usuario/:id', component: EditarUsuarioComponent},
    {path: 'Equipo', component: EquipoComponent},
    {path: 'Login', component: LoginComponent},
    {path: 'NuevaReceta', component: NewRecetaComponent},
    {path: 'Receta', component: RecetaComponent},
    {path: 'Registro', component: RegistroComponent},
    {path: 'Ronda', component: RondaComponent},
    {path: 'Success', component: SuccessComponent},
    {path: 'Home', component: HomeComponent},
    {path: 'Usuarios', component: UsuariosComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'Login'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
