import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { RecetaService } from 'src/app/services/receta.service';
import { EquipoService } from 'src/app/services/equipo.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  IS_SUPER: boolean = false;
  mensajeSinEquipos: boolean = false;
  mensajeSinRecetas: boolean = false;

  constructor(
    private authService: AuthService,
    private equiposService: EquipoService,
    private recetasService: RecetaService
    ) {

      //Condicion. ¿Es un super usuario?
      this.IS_SUPER = authService.leersuper();

      //Condicion. ¿Hay equipos en la Db?
      this.equiposService.getEquipos().subscribe( equipos => {
        if ( equipos === null) {
          this.mensajeSinEquipos = true;
        }
      } );

      //Condicion. ¿Hay recetas en la Db?
      this.recetasService.getRecetas().subscribe( recetas => {
        if ( recetas === null ) {
          this.mensajeSinRecetas = true;
        }
      });

  }

}
