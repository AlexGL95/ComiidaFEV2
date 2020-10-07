//Modules
import { Component } from '@angular/core';
//Services
import { RecetaService } from 'src/app/services/receta.service';
import { AuthService } from 'src/app/services/auth.service';
//Interfaces
import { RecetaInterface } from './receta.interface';
//Icons
import { faTrashAlt, faInfo } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent{
  //Icons
  faTrashAlt = faTrashAlt;
  faInfo = faInfo;

  // Declaracion de variables
  IS_SUPER: boolean = false;
  recetasDb:  RecetaInterface[] = [];
  recetasArr: RecetaInterface[] = [];
  ingrString: string = "";
  ingrArr: string[] = [];
  const = 0;
  mensajeNoHayCoincidencias: boolean = false;

  // Constructor
  constructor(
    private recetaService: RecetaService,
    private authService: AuthService,
    private router: Router
  ) {
    // Adquisicion de datos
    this.IS_SUPER = authService.leersuper();
    this.recetaService.getRecetas().subscribe( recetas => {
      this.recetasDb = recetas;
      this.buscador("");
    } );
  }

  obtenerListaDeIngredientes( posicion: number ) {
    this.ingrString = this.recetasArr[posicion].ingredientes;
    this.ingrArr = this.ingrString.split("/");
    return this.ingrArr;
  }

  borrarReceta(id: number) {
    //Eliminacion de la receta
    let idDb: number;
    for (let m = 0; m < this.recetasArr.length; m++) {
      if ( this.recetasArr[id] === this.recetasDb[m] ) {
        idDb = this.recetasDb[m].id;
        break;
      }
    }
    console.log(id);
    
    this.recetaService.deleteById(idDb).subscribe( () => {
      //Recarga
      window.location.reload();
    } );
  }

  //Llena el arreglo de recetas locales
  buscador( texto: string ) {
    this.recetasArr = [];
    for (let m = 0; m < this.recetasDb.length; m++) {
      //Si el texto coincide con una receta, almacenala en el arreglo local
      if ( this.recetasDb[m].nombre.toLowerCase().indexOf(texto.toLowerCase()) >= 0 ) {
        this.recetasArr.push(this.recetasDb[m]);
        this.mensajeNoHayCoincidencias = false;
      }
    }
    //Si no hay ninguna coincidencia retorna no coincidencias
    if ( this.recetasArr.length == 0) {
      this.mensajeNoHayCoincidencias = true;
    }
  }

    //Metodo para redirigir a nueva receta
    linkNuevaReceta(){
      this.router.navigate(['/NuevaReceta']);
    }

}
