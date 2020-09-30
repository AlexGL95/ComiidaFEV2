import { Component, OnInit } from '@angular/core';
import { RondaService } from 'src/app/service/ronda.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ronda',
  templateUrl: './ronda.component.html',
  styleUrls: ['./ronda.component.css']
})
export class RondaComponent implements OnInit {

  rondas = [];
  ingredientes={};
  show: boolean;
  mensajeRondaActiva: boolean;
  mensajeCrearRonda: boolean;
  mensajeBorrarRonda: boolean;
  mensajeIngredientes: boolean;

  constructor(private rondaService: RondaService, private router: Router) { }

  ngOnInit(): void {

    this.rondaService.activarRonda()
          .subscribe(
            res => {
              this.rondas = res;
            },
            err => this.mensajeRondaActiva = true
          )

  }

  createRonda(): boolean{
    this.rondaService.createRonda()
        .subscribe(res => {
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