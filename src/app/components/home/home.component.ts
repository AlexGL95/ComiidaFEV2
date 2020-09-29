//Modules
import { Component } from '@angular/core';
import { Router } from '@angular/router';
//Services
import { RecetaService } from 'src/app/services/receta.service';
import { AuthService } from 'src/app/services/auth.service';
import { EquipoService } from 'src/app/services/equipo.service';
//Interfaces
import { EquipoInterface } from '../equipo/equipo.interface';
import { EquipoRecetaService } from 'src/app/services/equipo-receta.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  //Declaracion de variables
  equiposArr:EquipoInterface[] = [];
  equipoUsuario: EquipoInterface  = { nombre: "", integrantes_nombres: [], recetas_nombres: [] };
  recetasAsignadas = [];
  recetasArr = []; //Recetas no activas en Db
  recetasElegibles = [];  //Recetas que no an sido seleccionadas por el usuario
  recetasSeleccionadas = [ {idDb: 0 , nombre: "Sel. receta.", ingr: []} ]; //Recetas seleccionadas por el usuario
  mensajeHoyNoCocinas: boolean = false;
  mensajeExistenRecetas: boolean = false;
  mensajeEspaciosSinAsignar: boolean = false;

  constructor(
    private recetaService: RecetaService,
    private authService: AuthService,
    private equipoService: EquipoService,
    private equipoRecetaService: EquipoRecetaService,
    private router: Router
  ) {
    //Adquisicion de equipos
    equipoService.getEquipos().subscribe( equipos => {
      this.equiposArr = equipos;
      let equipo = this.authService.leerEquipo();

      //Condicion. Si equipo id es nulo = no cocinas
      if (equipo === 'undefined') {
        this.mensajeHoyNoCocinas = true;
      }

      //Condicion. Si equipo id tiene un valor = cocinas
      else {
        this.mensajeHoyNoCocinas = false;
        //Adquisicion del equipo del usuario
        for (let m = 0; m < this.equiposArr.length; m++) {
          if ( this.equiposArr[m].nombre === equipo ) {
            this.equipoUsuario = this.equiposArr[m];
          }
        }

        //Condicion. Si no hay recetas asignadas al equipo = Puedes asignar recetas
        if( this.equipoUsuario.recetas_nombres.length <= 0 ) {
          //Cambio de bandera
          this.mensajeExistenRecetas = false;
          //Adquisicion de recetas
          this.recetaService.getRecetas().subscribe( recetas => {
            for (let m = 0; m < recetas.length; m++) {
              if ( recetas[m].activo === false ) {
                this.recetasArr.push( {idLocal:m, idDb: m+1, nombre:recetas[m].nombre, elegida:false, ingredientes:recetas[m].ingredientes } );
              }
            }

            //Ciclo para llenado de recetas elegibles
            for (let m = 0; m < this.recetasArr.length; m++) {
              if ( this.recetasArr[m].elegida === false ) {
                this.recetasElegibles.push( { idLocal:m, nombre:this.recetasArr[m].nombre } );
              }
            }
          } );
        }
        //Condicion. Si si hay recetas asignadas al equipo = No puedes asignar recetas
        else {
          //Cambio de bandera
          this.mensajeExistenRecetas = true;
          //Llenado de recetas existentes
          this.recetasAsignadas = this.equipoUsuario.recetas_nombres ;
        }
      }
    } );
  }

  //Metodo para modificacion del arreglo recetasSeleccionadas
  nRecetasMod( n: number ) {
    let largoActual: number = this.recetasSeleccionadas.length;
    let largoDeceado: number = n;
    let diferencia: number = largoDeceado - largoActual;
    //Condicion. Hay espacios de menos = Crea espacios nuevos
    if ( diferencia > 0 ) {
      for (let m = 0; m < diferencia; m++) {
       this.recetasSeleccionadas.push( {idDb: 0 , nombre: "Sel. receta.", ingr: []} );
      }
    }
    //Condicion. Hay espacios de mas
    else if ( diferencia < 0 ) {
      //Vuelve la receta en el seleccionable de nuevo
      for (let m = 0; m < this.recetasArr.length; m++) {
        if ( this.recetasArr[m].nombre.indexOf( this.recetasSeleccionadas[n].nombre) >= 0) {
          //Cambio de estado de la receta
          this.recetasArr[m].elegida = false;
          break;
        }
      }
      //Ciclo para llenado de recetas elegibles
      this.recetasElegibles = [];
      for (let m = 0; m < this.recetasArr.length; m++) {
        if ( this.recetasArr[m].elegida === false ) {
          this.recetasElegibles.push( { idLocal:m, nombre:this.recetasArr[m].nombre } );
        }
      }
      //Elimina el ultimo espacio
      this.recetasSeleccionadas.splice((this.recetasSeleccionadas.length-(-1*diferencia)), (-1*diferencia));
    }
  }

  //Metodo para realizar la seleccion de una receta
  selReceta( selector: number, id: number ) {
    //Condicion. Si ya hay una receta seleccionada, primero liberala
    if ( this.recetasSeleccionadas[selector].nombre != "Sel. receta." ) {
      //Vuelve la receta en el seleccionable de nuevo
      for (let m = 0; m < this.recetasArr.length; m++) {
        if ( this.recetasArr[m].nombre.indexOf( this.recetasSeleccionadas[selector].nombre ) >= 0) {
          //Cambio de estado de la receta
          this.recetasArr[m].elegida = false;
          break;
        }
      }
      //Ciclo para llenado de recetas elegibles
      this.recetasElegibles = [];
      for (let m = 0; m < this.recetasArr.length; m++) {
        if ( this.recetasArr[m].elegida === false ) {
          this.recetasElegibles.push( { idLocal:m, nombre:this.recetasArr[m].nombre } );
        }
      }
    }
    //Asignacion de la nueva receta
    this.recetasSeleccionadas[selector] = {idDb: this.recetasArr[id].idDb, nombre: this.recetasArr[id].nombre, ingr: this.recetasArr[id].ingredientes.split("/") };
    //Cambio de estado de la receta
    this.recetasArr[id].elegida = true;
    //Ciclo para llenado de recetas elegibles
    this.recetasElegibles = [];
    for (let m = 0; m < this.recetasArr.length; m++) {
      if ( this.recetasArr[m].elegida === false ) {
        this.recetasElegibles.push( { idLocal:m, nombre:this.recetasArr[m].nombre } );
      }
    }
  }

  //Metodo para redirigir a nueva receta
  linkNuevaReceta(){
    this.router.navigate(['/NuevaReceta']);
  }

  //Metodo que hace los cambios necesarios en la base de datos
  asignarRecetasAlEquipo() {
    let espaciosSinAsignar = false;
    //1.-Verificar que no hay espacios no asignados
    for (let m = 0; m < this.recetasSeleccionadas.length; m++) {
      if ( this.recetasSeleccionadas[m].nombre === "Sel. receta." ) {
        espaciosSinAsignar = true;
        break;
      }
    }
    //Condicion. Si hay espacios sin asignar = Muestra el mensaje de error
    if ( espaciosSinAsignar === true ) {
      this.mensajeEspaciosSinAsignar = true;
    }
    //Condicion. Si todo es correcto = continua
    else {
      this.mensajeEspaciosSinAsignar = false;

      //2.-Obtener datos del equipo
      let idEquipo: number = parseInt( this.authService.leerIdEquipo() );
      let idRecetas: number[] = [];

      //3.-Cambiar estado de las recetas
      for (let m = 0; m < this.recetasSeleccionadas.length; m++) {
        this.recetaService.changeStateById( this.recetasSeleccionadas[m].idDb ).subscribe();
        idRecetas.push(this.recetasSeleccionadas[m].idDb);
      }
      //4.-Asignarlas al equipo
      this.equipoRecetaService.asignacion(idEquipo, idRecetas).subscribe( () => {
        window.location.reload();
      });
    }
  }

}
