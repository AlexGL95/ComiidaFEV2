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
  show: boolean;
  mensajeCreaRonda: boolean = false;
  mensajeRondaActiva: boolean;
  mensajeCrearRonda: boolean;
  mensajeBorrarRonda: boolean;
  mensajeUsuariosInsuficientes: boolean = false;

  constructor(private rondaService: RondaService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {

    this.rondaService.activarRonda()
          .subscribe(
            res => {
              // Condicional. ¿Existe al menos una ronda?
              if ( res.length === 0 ) {
                this.mensajeCreaRonda = true;
              }
              this.rondas = res;
            },
            err => this.mensajeRondaActiva = true
          );
    this.userService.getAll().subscribe( usuarios => {
      if ( usuarios.length < 4 ) {
        this.mensajeUsuariosInsuficientes = true;
      }
    } );
  }

  createRonda(): boolean{
    this.rondaService.createRonda()
        .subscribe(res => {
          this.mensajeCreaRonda = false; //Al crear una ronda, ya existe al menos una
          this.rondas = res;
          window.location.reload();
        },
        err => {this.mensajeCrearRonda = true}
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
                  window.location.reload();
                }
                this.rondas = res;
              },
              err => this.mensajeRondaActiva = true
            )
        },
        err => this.mensajeBorrarRonda = true
      )
  }

  //Metodo para redirigir a usuarios
  linkUsuarios(){
    this.router.navigate(['/Usuarios']);
  }

}