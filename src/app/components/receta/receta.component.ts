//Modules
import { Component } from '@angular/core';
//Services
import { RecetaService } from 'src/app/services/receta.service';
//Interfaces
import { RecetaInterface } from './receta.interface';
//Icons
import { faTrashAlt, faInfo } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent{
  //Icons
  faTrashAlt = faTrashAlt;
  faInfo = faInfo;

  //Declaracion de variables
  recetasArr: RecetaInterface[] = [];
  ingrString: string = "";
  ingrArr: string[] = [];

  //Constructor
  constructor( private recetaService: RecetaService ) {
    //Adquisicion de datos
    this.recetaService.getRecetas().subscribe( recetas => {
      this.recetasArr = recetas;
    } );
  }

  obtenerListaDeIngredientes( posicion: number ) {
    this.ingrString = this.recetasArr[posicion].ingredientes;
    this.ingrArr = this.ingrString.split("/");
    return this.ingrArr;
  }

  borrarReceta(id: number) {
    //Eliminacion de la receta
    this.recetaService.deleteById(id+1).subscribe( () => {
      //Adquisicion de datos
      this.recetaService.getRecetas().subscribe( recetas => {
        this.recetasArr = recetas;
      } );
    } );
  }

}
