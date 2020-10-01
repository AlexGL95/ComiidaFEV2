import { Component, OnInit } from '@angular/core';
import { RondaService } from 'src/app/services/ronda.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-ronda',
  templateUrl: './ronda.component.html',
  styleUrls: ['./ronda.component.css']
})
export class RondaComponent implements OnInit {

  rondas = [];
  ingredientes={};
  show: boolean;
  mensajeCreaRonda: boolean = false;
  mensajeRondaActiva: boolean;
  mensajeCrearRonda: boolean;
  mensajeBorrarRonda: boolean;
  mensajeIngredientes: boolean;

  constructor(private rondaService: RondaService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {

    this.rondaService.activarRonda()
          .subscribe(
            res => {
              //Condicional. ¿Existe al menos una ronda?
              if ( res.length === 0 ) {
                this.mensajeCreaRonda = true;
              }
              this.rondas = res;
            },
            err => this.mensajeRondaActiva = true
          )

  }

  createRonda(): boolean{
    this.rondaService.createRonda()
        .subscribe(res => {
          this.mensajeCreaRonda = false; //Al crear una ronda, ya existe al menos una
          this.rondas = res;
        },
        err => this.mensajeCrearRonda = true
        )
    return false;
  }

  deleteRonda() {
    this.rondaService.deleteRonda()
        .subscribe(res => {
          this.rondaService.activarRonda()
              .subscribe(res => {
                //Condicional. ¿Existe al menos una ronda?
                if ( res.length === 0 ) {
                  this.mensajeCreaRonda = true;
                }
                this.rondas = res;
              },
              err => this.mensajeRondaActiva = true
            )
        },
        err => this.mensajeBorrarRonda = true
      )
  }

  getIng(){
    this.rondaService.getIng()
        .subscribe(res => {
          this.ingredientes = res;
        },
        err => this.mensajeIngredientes = true)
    this.show = true;
  }

  ocultar(){
    this.show = false;
  }

}