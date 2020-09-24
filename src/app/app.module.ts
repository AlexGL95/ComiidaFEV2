import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule} from '@angular/forms';

import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
// RUTAS
import { APP_ROUTING } from './app.routes';

// SERVICIOS


// COMPONENTES
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { RondaComponent } from './components/ronda/ronda.component';
import { RecetaComponent } from './receta/receta.component';
import { EquipoComponent } from './components/equipo/equipo.component';
import { RegistroComponent } from './components/registro/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegistroComponent,
    EquipoComponent
    RondaComponent,
    RecetaComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    APP_ROUTING
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
