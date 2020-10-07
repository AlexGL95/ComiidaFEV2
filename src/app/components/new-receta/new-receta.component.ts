import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Receta, Condimento } from '../../interfaces/Ronda';
import { NewrecetaService } from 'src/app/services/newreceta.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { RecetaService } from 'src/app/services/receta.service';
import Swal from 'sweetalert2';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-new-receta',
  templateUrl: './new-receta.component.html',
  styleUrls: ['./new-receta.component.css']
})
export class NewRecetaComponent implements OnInit {

  RecetaForm: FormGroup;

  categorias = ['Entrada', 'Plato Fuerte', 'Acompañamiento', 'Postre', 'Bebida', 'Salsa'];
  unidades = ['gr', 'ml', 'pz'];
  mensajeCat = 'Seleccionar Categoría';
  mensajeUni = ['pz'];
  ingredientes = [0];
  ingredientes2 = [0];
  check = [];
  ing = [];
  ing2 = [];
  condimentos: any = [];
  condarray = [];
  receta = '';
  nombre = '';
  condi = '';
  condimentado = '';
  recetta = {} as Receta;
  condimento = {} as Condimento;
  camposFaltantes: boolean;
  cambio: boolean;
  cambio2: boolean;
  SUPER: boolean = false;
  nombreValido = false;
  mensajeRecetaRepetida = false;
  mensajeCondimento = false;
  mensajeCondimento2 = false;
  mensajeCondimentoRepetido: boolean;
  canti = 0;
  checkbox: HTMLInputElement;
  checkbox2: HTMLInputElement;
  checkbox3: HTMLInputElement;
  checkbox4: HTMLInputElement;
  input = ['Pollo'];
  input2 = ['1'];
  
  createFormGroup(){
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }
  

  constructor(private nuevaRecetaService: NewrecetaService,
              private router: Router,
              private recetaserv: RecetaService,
              private authService: AuthService){
               this.SUPER = this.authService.leersuper(); 
              }

  ngOnInit(bus?: string, ): void {
    
    this.nuevaRecetaService.obtenerCondimentos()
      .subscribe(res => {
      this.condimentos = res;
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
    if(this.ingredientes.length < 10){
      
      this.mensajeUni[this.ingredientes.length] = 'pz';
      this.ingredientes.length ++;
      this.ingredientes2.length ++;
      this.camposFaltantes = false;
      for(let o = 1; o < this.ingredientes.length; o++){
        this.input[o]='Nuevo ingrediente';
        this.input2[o]='Cantidad';
      }
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
      if(this.ing[i]!==undefined && this.ing[i]!=='' && this.ing2[i]!==0 && this.ing2[i]!==undefined && this.ing2[i]!=='' && this.mensajeUni[i]!== 'Unidades'){
        if(this.ingredientes.length <= 1){
          this.receta = `${this.ing[i]}-${this.ing2[i]}${this.mensajeUni[i]}`
        }else if(this.receta === ''){
          this.receta = `${this.ing[i]}-${this.ing2[i]}${this.mensajeUni[i]}`
        }else{
          this.receta = `${this.receta}/${this.ing[i]}-${this.ing2[i]}${this.mensajeUni[i]}`
        }
      }
    }

    if(this.receta != ''){
      for(let y = 0; y < this.condimentos.length; y++){
        this.checkbox3 = <HTMLInputElement> document.getElementById(`customCheck.${y}`);
        if(this.checkbox3.checked === true){
          this.receta = `${this.receta}/${this.condimentos[y].nombre}`
        }
      }
    }

    if(this.nombre!=='' && this.receta !== '' && this.mensajeCat!== 'Seleccionar Categoría'){
      this.recetta.nombre = this.nombre + "(" + this.authService.leeruser() + ")";
      this.recetta.categoria = this.mensajeCat;
      this.recetta.ingredientes = this.receta;
      this.recetta.activo = false;
      this.verificaruni();
    } else {
      this.camposFaltantes = true;
        return false;
    }
  }

  verificaruni(){
    this.nuevaRecetaService.crearReceta(this.recetta).subscribe( res => {
      if (res === null) {
        this.mensajeRecetaRepetida = true;
      } else if (res !== null) {
        this.showmodalsuccess();
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

  crearCondimento(){
    if(this.condi !== undefined && this.condi !== ''){
      this.condimento.nombre = this.condi;
      
      this.verificarcondi();
      
    } else{
      this.mensajeCondimento2 = true;
    }
    
  }

  verificarcondi(){
    this.nuevaRecetaService.crearCondimento(this.condimento).subscribe( res => {
      if (res === null) {
        this.mensajeCondimentoRepetido = true;
      } else if (res !== null) {
        this.mensajeCondimentoRepetido = false;
        this.nuevaRecetaService.obtenerCondimentos()
                .subscribe(res => {
                this.condimentos = res;
                this.canti = 0
                for(let h = 0; h < this.condimentos.length; h++){
                  this.checkbox2 = <HTMLInputElement> document.getElementById(`customCheck.${h}`);
                  this.checkbox2.checked = true;
                }
              },
                err => this.mensajeCondimento = true);
      }
      
    },
    err => this.mensajeCondimentoRepetido = true
    );
  }

  borrarCondimento(id: number){
    this.nuevaRecetaService.borrarCondimento(id)
        .subscribe(res => {
          this.nuevaRecetaService.obtenerCondimentos()
              .subscribe(res => {
              this.condimentos = res;
              this.canti = 0
                for(let h = 0; h < this.condimentos.length; h++){
                  this.checkbox2 = <HTMLInputElement> document.getElementById(`customCheck.${h}`);
                  this.checkbox2.checked = true;
                }
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

    if(this.canti > 9){
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

  showmodalsuccess() {
    Swal.fire({
      icon: 'success',
      title: 'Éxito!',
      text: 'Receta creada correctamente',
    });
    this.router.navigate(['/Home']);
  }
}
