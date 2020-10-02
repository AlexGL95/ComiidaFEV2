import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterLinkActive } from '@angular/router';
import { RecetaService } from 'src/app/services/receta.service';
import { EquipoService } from 'src/app/services/equipo.service';
import { RondaService } from 'src/app/services/ronda.service';
//Icons
import { faSignOutAlt, faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  faSignOutAlt = faSignOutAlt;
  faHome = faHome;
  IS_SUPER: boolean = false;
  mensajeSinEquipos: boolean = false;
  mensajeSinRecetas: boolean = false;
  mensajeSinRondas: boolean = false;

  constructor(
    private authService: AuthService,
    private equiposService: EquipoService,
    private recetasService: RecetaService,
    private rondaService: RondaService,
    private router: Router
    ) {

      // Condicion. ¿Es un super usuario?
      this.IS_SUPER = authService.leersuper();

      // Condicion. ¿Hay equipos en la Db?
      this.equiposService.getEquipos().subscribe( equipos => {
        if ( equipos === null) {
          this.mensajeSinEquipos = true;
        }
      } );

      // Condicion. ¿Hay recetas en la Db?
      this.recetasService.getRecetas().subscribe( recetas => {
        if ( recetas === null ) {
          this.mensajeSinRecetas = true;
        }
      });

      // Condicion. ¿Hay rondas en la Db?
      this.rondaService.getAll().subscribe( rondas => {
        if ( rondas.length === 0 ) {
          this.mensajeSinRondas = true;
        }
      });

  }
  logout(){
    this.authService.logout();
    this.router.navigate(['Login']);
  }
}
