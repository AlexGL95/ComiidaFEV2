import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RondaComponent } from './components/ronda/ronda.component';

const APP_ROUTES: Routes = [
    {path: 'ronda', component: RondaComponent},
    {path: 'login', component: LoginComponent},
    
    {path: '**', pathMatch: 'full', redirectTo: 'Login'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
