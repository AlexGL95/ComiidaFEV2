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
  recetasSel: string[] = [""];
  recetasArr: RecetaInterface[] = [];
  recetasElegibles = [];

  constructor( private recetaService: RecetaService ) { 
    //Adquisicion de datos
    this.recetaService.getRecetas().subscribe( recetas => {
      this.recetasArr = recetas;
      for (let m = 0; m < this.recetasArr.length; m++) {
        if ( this.recetasArr[m].activo === false ) {
          this.recetasElegibles.push( { id: m+1, nombre:this.recetasArr[m].nombre } );
        }
      }
    } );
  }

  nRecetasMod( n: number ) {
    let largoActual: number = this.recetasSel.length;
    let largoDeceado: number = n;
    let diferencia: number = largoDeceado - largoActual;
    //Condicion. Hay espacios de menos = Crea espacios nuevos
    if ( diferencia > 0 ) {
      for (let m = 0; m < diferencia; m++) {
       this.recetasSel.push("");  
      }
    }
    //Condicion. Hay espacios de mas = elimina espacios
    else {
      this.recetasSel.splice((this.recetasSel.length-(-1*diferencia)), (-1*diferencia));
    }
  }

}
