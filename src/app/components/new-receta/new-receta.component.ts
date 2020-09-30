import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Receta } from '../../interfaces/Ronda';
import { NewrecetaService } from 'src/app/services/newreceta.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-new-receta',
  templateUrl: './new-receta.component.html',
  styleUrls: ['./new-receta.component.css']
})
export class NewRecetaComponent implements OnInit {

  RecetaForm: FormGroup;

  categorias = ['Entrada', 'Plato Fuerte', 'Acompañamiento', 'Postre', 'Agua', 'Salsa'];
  unidades = ['Kg', 'g', 'L', 'ml', 'pz'];
  mensajeCat = 'Seleccionar Categoria';
  mensajeUni = ['Unidades'];
  ingredientes = [];
  ingredientes2 = [];
  ing = [];
  ing2 = [];
  receta = '';
  nombre = '';
  recetta = {} as Receta;
  camposFaltantes: boolean;

  createFormGroup(){
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }
  

  constructor(private nuevaRecetaService: NewrecetaService,
              private router: Router,
              private authService: AuthService) {
                this.RecetaForm = this.createFormGroup();
                
              }

  ngOnInit(): void {
    this.ingredientes.length = 1;
    this.ingredientes2.length = 1;
  }

  get name(){ return this.RecetaForm.get('name'); }

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
      if(this.ing[i]!==undefined && this.ing2[i]!==0 && this.mensajeUni[i]!== 'Unidades' && this.mensajeCat!== 'Seleccionar Categoria'){
        if(this.ingredientes.length <= 1){
          this.receta = `${this.ing[i]}-${this.ing2[i]}${this.mensajeUni[i]}`
        }else if(i===0){
          this.receta = `${this.ing[i]}-${this.ing2[i]}${this.mensajeUni[i]}`
        }else{
          this.receta = `${this.receta}/${this.ing[i]}-${this.ing2[i]}${this.mensajeUni[i]}`
        }
      } else{
        this.camposFaltantes = true;
        return false;
      }
    }
    if(this.nombre!=='' && this.receta !== ''){
      this.recetta.nombre = this.nombre + "(" + this.authService.leeruser() + ")";
      this.recetta.categoria = this.mensajeCat;
      this.recetta.ingredientes = this.receta;
      this.recetta.activo = false;
      console.log(this.recetta);
      this.nuevaRecetaService.crearReceta(this.recetta)
          .subscribe(res => this.router.navigate(['/Success']),
          err => console.log(err))
      return false
    }
  }

  regreso(){
    this.router.navigate(['/Home']);
  }
  

}
