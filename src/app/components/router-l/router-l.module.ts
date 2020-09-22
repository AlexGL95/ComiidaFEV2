import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

//Declaracion de rutas
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'rondas', component: RondasComponent },
  { path: 'equipos', component: EquiposComponent }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [RouterModule]
})
export class RouterLModule { }
