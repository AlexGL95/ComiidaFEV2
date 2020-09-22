import {RouterModule, Routes} from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const APP_ROUTES: Routes = [
    {path: 'Login', component: LoginComponent},
    {path: '**', pathMatch: 'full', redirectTo: 'Login'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
