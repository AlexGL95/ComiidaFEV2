import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Receta } from '../../interfaces/Ronda';
import { RecetaService } from '../../service/receta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {

  categorias = ['Entrada', 'Plato Fuerte', 'Acompañamiento', 'Postre'];
  unidades = ['Kg', 'mg', 'g', 'L', 'ml', 'pz'];
  mensajeCat = 'Seleccionar Categoria';
  mensajeUni = ['Unidades'];
  ingredientes = [];
  ingredientes2 = [];
  ing = [];
  ing2 = [];
  receta = '';
  nombre = '';
  recetta = {} as Receta;
  

  constructor(private recetaService: RecetaService,
              private router: Router) { }

  ngOnInit(): void {
    this.ingredientes.length = 1;
    this.ingredientes2.length = 1;
  }

  selecCategoria(i:number){
    this.mensajeCat = this.categorias[i];
  }

  selecUnidades(i:number, unidad: string){
    this.mensajeUni[i] = unidad;
  }

  nuevoIng(): void{ 
    if(this.ingredientes.length < 10 && this.ing[this.ingredientes.length-1] && this.ing2[this.ingredientes2.length-1] && this.mensajeUni[this.ingredientes.length-1]!=='Unidades' && this.mensajeCat!=='Seleccionar Categoria'){
      this.mensajeUni[this.ingredientes.length] = 'Unidades';
      this.ingredientes.length ++;
      this.ingredientes2.length ++;
    }
  }

  quitarIng(){
    if (this.ingredientes.length > 1){
      this.ingredientes.length --;
      this.ingredientes2.length --;
    }
  }

  guardar(): boolean{
    this.receta = '';
    for(let i = 0; i < this.ingredientes.length; i++){
      this.receta = `${this.receta}-${this.ing[i]}-${this.ing2[i]}-${this.mensajeUni[i]}/` 
    }
    if(this.nombre!==''){
      this.recetta.nombre = this.nombre;
      this.recetta.categoria = this.mensajeCat;
      this.recetta.ingredientes = this.receta;
      this.recetta.activo = true;
      console.log(this.recetta);
      this.recetaService.crearReceta(this.recetta)
          .subscribe(res => this.router.navigate(['/Success']),
          err => console.log(err))
      return false
    }
   
  }

}
