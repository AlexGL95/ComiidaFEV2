// Modules
import { Component } from '@angular/core';
// Services
import { RondaService } from '../../services/ronda.service';
import { UserService } from '../../services/user.service';
// Interfaces
import { IngredientesInterface } from '../../interfaces/ingredientes.interface';
// Icons
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ingredientes',
  templateUrl: './ingredientes.component.html',
  styleUrls: ['./ingredientes.component.css']
})
export class IngredientesComponent {

  // Borrar.
  ingEjemplo = 'Pollo-1pz/Salsa-100ml/Espaggeti-100gr/Crema-100gr/Galletas-50gr/Limon-1pz/QuesoCrema-20gr/Sal/Pimienta';

  // Declaracion de variables
  ingredientesArr: IngredientesInterface[] = [];
  nUsuariosMin = 1;
  nUsuariosMax = 1;
  nUsuarios = 1;
  faPlus = faPlus;
  faMinus = faMinus;

  mensajeIngredientes = false;
  mensajeSinRecetas = true;

  constructor(
    private rondaService: RondaService,
    private userService: UserService
  ) {
    userService.getAll().subscribe( usuariosArr => {
      this.nUsuarios = usuariosArr.length;
      this.nUsuariosMin = ( usuariosArr.length / 2 );
      this.nUsuariosMax = ( 2 * usuariosArr.length );
      this.getIng();
    } );
  }

  getIng(){
    this.rondaService.getIng().subscribe( ingredientes => {
          this.procIng(ingredientes);
          this.mensajeSinRecetas = false;
        },
        err => {
          this.mensajeIngredientes = true;
        } );
  }

  // Metodo de procesado de la lista de ingredientes
  procIng( ing: string ){
    this.ingredientesArr = [];
    // 1.-Se obtienen los ingredientes por separado.
    const ingredientesTemp = ing.split('/');
    // 2.-Se separa cada ingrediente en su nombre, cantidad y unidad.
    for (let m = 0; m < ingredientesTemp.length; m++) {
      const ingrediente = ingredientesTemp[m].split('-');
      // 3.-Si el ingrediente tiene un nombre y unidad = Guarda como ingrediente
      if (ingrediente.length === 2) {
        const cantidad = ingrediente[1];
        // Condicion. Son gramos.
        if ( cantidad.indexOf('gr') >= 0 ) {
          const cantidadTemp = cantidad.split('g');
          const cantidadInt = parseInt( cantidadTemp[0], 10 );
          this.ingredientesArr.push( { nombre: ingrediente[0], cantidad: `${this.nUsuarios * cantidadInt}`, unidad: 'gr'} );
        // Condicion. Son mililitros.
        } else if ( cantidad.indexOf('ml') >= 0 ) {
          const cantidadTemp = cantidad.split('m');
          const cantidadInt = parseInt( cantidadTemp[0], 10 );
          this.ingredientesArr.push( { nombre: ingrediente[0], cantidad: `${this.nUsuarios * cantidadInt}`, unidad: 'ml'} );
        // Condicion. Son piezas.
        } else if ( cantidad.indexOf('pz') >= 0 ) {
          const cantidadTemp = cantidad.split('p');
          const cantidadInt = parseInt( cantidadTemp[0], 10 );
          this.ingredientesArr.push( { nombre: ingrediente[0], cantidad: `${this.nUsuarios * cantidadInt}`, unidad: 'pz'} );
        }
      }
      // 3.-Si el ingrediente solo tiene un nombre = Guarda como condimento
      else if (ingrediente.length === 1) {
        this.ingredientesArr.push( { nombre: ingrediente[0], cantidad: '', unidad: ''} );
      }
    }
  }

  sumarUsuarios() {
    if ( this.nUsuarios < this.nUsuariosMax ) {
      this.nUsuarios += 1;
      this.getIng();
    }
  }

  restarUsuarios() {
    if ( this.nUsuarios > this.nUsuariosMin ) {
      this.nUsuarios -= 1;
      this.getIng();
    }
  }

}
