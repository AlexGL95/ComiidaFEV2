//Modules
import { Component } from '@angular/core';
//Services
import { RecetaService } from 'src/app/services/receta.service';
//Interfaces
import { RecetaInterface } from "../receta/receta.interface";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  //Declaracion de variables  
  recetasArr = []; //Recetas no activas en Db
  recetasElegibles = [];  //Recetas que no an sido seleccionadas por el usuario
  recetasSeleccionadas = [ {nombre: "Sel. receta.", ingr: []} ]; //Recetas seleccionadas por el usuario

  constructor( private recetaService: RecetaService ) { 
    //Adquisicion de datos
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

  //Metodo para modificacion del arreglo recetasSeleccionadas
  nRecetasMod( n: number ) {
    let largoActual: number = this.recetasSeleccionadas.length;
    let largoDeceado: number = n;
    let diferencia: number = largoDeceado - largoActual;
    //Condicion. Hay espacios de menos = Crea espacios nuevos
    if ( diferencia > 0 ) {
      for (let m = 0; m < diferencia; m++) {
       this.recetasSeleccionadas.push( {nombre: "Sel. receta.", ingr: []} );
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
    this.recetasSeleccionadas[selector] = {nombre: this.recetasArr[id].nombre, ingr: this.recetasArr[id].ingredientes.split("/") };
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

}
