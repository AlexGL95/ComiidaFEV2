import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// RUTAS
import { APP_ROUTING } from './app.routes';

// SERVICIOS


// COMPONENTES
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
