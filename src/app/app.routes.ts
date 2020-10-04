import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
import { EquipoComponent } from './components/equipo/equipo.component';
import { RondaComponent } from './components/ronda/ronda.component';
import { SuccessComponent } from './components/success/success.component';
import { RecetaComponent } from './components/receta/receta.component';
import { NewRecetaComponent } from './components/new-receta/new-receta.component';
import { HomeComponent } from './components/home/home.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { IngredientesComponent } from './components/ingredientes/ingredientes.component';
import { AuthGuard } from './auth.guard';
import { LogGuard } from './log.guard';

const APP_ROUTES: Routes = [
    {path: 'Edicion_Usuario/:id', component: EditarUsuarioComponent, canActivate: [AuthGuard]},
    {path: 'Equipo', component: EquipoComponent, canActivate: [AuthGuard]},
    {path: 'Login', component: LoginComponent, canActivate:[LogGuard]},
    {path: 'NuevaReceta', component: NewRecetaComponent, canActivate: [AuthGuard]},
    {path: 'Receta', component: RecetaComponent, canActivate: [AuthGuard]},
    {path: 'Registro', component: RegistroComponent, canActivate: [AuthGuard]},
    {path: 'Ronda', component: RondaComponent, canActivate: [AuthGuard]},
    {path: 'Success', component: SuccessComponent, canActivate: [AuthGuard]},
    {path: 'Home', component: HomeComponent, canActivate: [AuthGuard]},
    {path: 'Usuarios', component: UsuariosComponent, canActivate: [AuthGuard]},
    {path: 'Ingredientes', component: IngredientesComponent, canActivate: [AuthGuard]},
    {path: '**', pathMatch: 'full', redirectTo: 'Home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
