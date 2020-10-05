import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Receta, Condimento } from '../../interfaces/Ronda';
import { NewrecetaService } from 'src/app/services/newreceta.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { RecetaService } from 'src/app/services/receta.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-new-receta',
  templateUrl: './new-receta.component.html',
  styleUrls: ['./new-receta.component.css']
})
export class NewRecetaComponent implements OnInit {

  RecetaForm: FormGroup;

  categorias = ['Entrada', 'Plato Fuerte', 'Acompañamiento', 'Postre', 'Bebida', 'Salsa'];
  unidades = ['Kg', 'gr', 'Lt', 'ml', 'pz'];
  mensajeCat = 'Seleccionar Categoría';
  mensajeUni = ['Unidades'];
  ingredientes = [];
  ingredientes2 = [];
  check = [];
  ing = [];
  ing2 = [];
  condimentos: any = [];
  receta = '';
  nombre = '';
  recetta = {} as Receta;
  condimento = {} as Condimento;
  condi = '';
  camposFaltantes: boolean;
  cambio: boolean;
  cambio2: boolean;
  nombreValido = false;
  mensajeRecetaRepetida = false;
  mensajeCondimento = false;
  mensajeCondimento2 = false;
  canti = 0;
  checkbox: HTMLInputElement;
  checkbox2: HTMLInputElement;
  checkbox3: HTMLInputElement;
  condimentado = '';
  createFormGroup(){
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }
  

  constructor(private nuevaRecetaService: NewrecetaService,
              private router: Router,
              private recetaserv: RecetaService,
              private authService: AuthService){
                
              }

  ngOnInit(): void {
    this.ingredientes.length = 1;
    this.ingredientes2.length = 1;
    this.nuevaRecetaService.obtenerCondimentos()
      .subscribe(res => {
      this.condimentos = res;
      console.log(this.condimentos);
      },
      err => this.mensajeCondimento = true);
  }

  get name(){ return this.RecetaForm.get('name'); }

  selecCategoria(i:number){
    this.mensajeCat = this.categorias[i];
  }

  selecUnidades(i:number, unidad: string){
    this.mensajeUni[i] = unidad;
  }

  nuevoIng(): void{ 
    if(this.ingredientes.length < 10 && this.ing[this.ingredientes.length-1] && this.ing2[this.ingredientes2.length-1] && this.mensajeUni[this.ingredientes.length-1]!=='Unidades' && this.mensajeCat!=='Seleccionar Categoría'){
      this.mensajeUni[this.ingredientes.length] = 'Unidades';
      this.ingredientes.length ++;
      this.ingredientes2.length ++;
      this.camposFaltantes = false;
    } else {
      this.camposFaltantes = true;
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
    this.condimentado = '';
    for(let i = 0; i < this.ingredientes.length; i++){
      if(this.ing[i]!==undefined && this.ing[i]!=='' && this.ing2[i]!==0 && this.mensajeUni[i]!== 'Unidades' && this.mensajeCat!== 'Seleccionar Categoría'){
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

    for(let y = 0; y < this.condimentos.length; y++){
      this.checkbox3 = <HTMLInputElement> document.getElementById(`customCheck.${y}`);
      if(this.checkbox3.checked === true){
        this.receta = `${this.receta}/${this.condimentos[y].nombre}`
      }
    }

    if(this.nombre!=='' && this.receta !== ''){
      this.recetta.nombre = this.nombre + "(" + this.authService.leeruser() + ")";
      this.recetta.categoria = this.mensajeCat;
      this.recetta.ingredientes = this.receta;
      this.recetta.activo = false;
      //this.verificaruni();
      console.log(this.recetta);
    }
  }

  verificaruni(){
    this.nuevaRecetaService.crearReceta(this.recetta).subscribe( res => {
      console.log(res);
      if (res === null) {
        this.mensajeRecetaRepetida = true;
      } else if (res !== null) {
        this.router.navigate(['/Success']);
        this.mensajeRecetaRepetida = false;
      }
    },
    err => console.log(err)
    );
  }

  regreso(){
    this.router.navigate(['/Home']);
  }

  borrarIng(i: number){
    this.ing[i] = "";
    this.ing2[i]= 0;
    for(let z = i; z<this.ing.length; z++){
      this.ing[z] = this.ing[z+1];
      this.ing2[z] = this.ing2[z+1];
      this.mensajeUni[z] = this.mensajeUni[z+1];
    }
    this.ingredientes.length --;
    this.ingredientes2.length --;

  }

  crearCondimento(): boolean{
    if(this.condi !== undefined && this.condi !== ''){
      this.condimento.nombre = this.condi;
      this.nuevaRecetaService.crearCondimento(this.condimento)
          .subscribe( res => {
            this.nuevaRecetaService.obtenerCondimentos()
                .subscribe(res => {
                this.condimentos = res;
                console.log(this.condimentos);
                },
                err => this.mensajeCondimento = true);
          },
          err => this.mensajeCondimento = true );
      return false;
    } else{
      this.mensajeCondimento2 = true;
    }
    
    
  }

  borrarCondimento(id: number){
    this.nuevaRecetaService.borrarCondimento(id)
        .subscribe(res => {
          this.nuevaRecetaService.obtenerCondimentos()
              .subscribe(res => {
              this.condimentos = res;
              console.log(this.condimentos);
              },
              err => this.mensajeCondimento = true);
        },
        err => this.mensajeCondimento = true);
  }
  
  checkFluency(i){
    this.checkbox = <HTMLInputElement> document.getElementById(`customCheck.${i}`);
    if(this.checkbox.checked === true){
      this.canti ++;
    } else {
      this.canti --
    }

    if(this.canti > 2){
      for(let h = 0; h < this.condimentos.length; h++){
        this.checkbox2 = <HTMLInputElement> document.getElementById(`customCheck.${h}`);
        if(this.checkbox2.checked !== true){
          this.checkbox2.disabled = true;
        }
      }
    }else{
      for(let h = 0; h < this.condimentos.length; h++){
        this.checkbox2 = <HTMLInputElement> document.getElementById(`customCheck.${h}`);
        if(this.checkbox2.checked !== true){
          this.checkbox2.disabled = false;
        }
      }
    }
  }

}
