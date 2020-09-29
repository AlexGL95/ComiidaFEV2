import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule} from '@angular/forms';
import { FormsModule } from '@angular/forms';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

// RUTAS
import { APP_ROUTING } from './app.routes';

// SERVICIOS


// COMPONENTES
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { RondaComponent } from './components/ronda/ronda.component';
import { EquipoComponent } from './components/equipo/equipo.component';
import { RegistroComponent } from './components/registro/registro.component';
import { SuccessComponent } from './components/success/success.component';
import { NewRecetaComponent } from './components/new-receta/new-receta.component';
import { EditarUsuarioComponent } from './components/editar-usuario/editar-usuario.component';
import { HomeComponent } from './components/home/home.component';
import { RecetaComponent } from 'src/app/components/receta/receta.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    RegistroComponent,
    SuccessComponent,
    RondaComponent,
    EquipoComponent,
    EditarUsuarioComponent,
    RecetaComponent,
    HomeComponent,
    NewRecetaComponent,
    UsuariosComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
    APP_ROUTING,
    NgbModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
