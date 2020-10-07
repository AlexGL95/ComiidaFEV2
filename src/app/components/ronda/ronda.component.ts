import { Component, OnInit } from '@angular/core';
import { RondaService } from 'src/app/services/ronda.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
// Icons
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ronda',
  templateUrl: './ronda.component.html',
  styleUrls: ['./ronda.component.css']
})
export class RondaComponent implements OnInit {

  rondas = [];
  tr = 0;
  show: boolean;
  mensajeCreaRonda = false;
  mensajeCrearRonda: boolean;
  mensajeBorrarRonda: boolean;
  mensajeUsuariosInsuficientes = false;
  faTimes = faTimes;
  faCheck = faCheck;

  constructor(private rondaService: RondaService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.rondaService.getAll()
          .subscribe(
            res => {
              this.tr = res.length;
              // Condicional. ¿Existe al menos una ronda?
              if ( res.length === 0 ) {
                this.mensajeCreaRonda = true;
                
              }
              this.rondas = res;
            },
            err => console.log(err)
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
          this.mensajeCreaRonda = false; // Al crear una ronda, ya existe al menos una
          this.rondas = res;
          this.showmodalsuccess();
        },
        err => {this.mensajeCrearRonda = true;}
        );
    return false;
  }

  deleteRonda() {
    this.rondaService.deleteRonda()
        .subscribe(res => {
          this.rondaService.getAll()
              .subscribe(res => {
                // Condicional. ¿Existe al menos una ronda?
                if ( res.length === 0 ) {
                  this.mensajeCreaRonda = true;
                  window.location.reload();
                }
                this.rondas = res;
              },
              err => console.log(err)
            );
        },
        err => this.mensajeBorrarRonda = true
      );
  }

  // Metodo para redirigir a usuarios
  linkUsuarios(){
    this.router.navigate(['/Usuarios']);
  }

  showmodalsuccess() {
    console.log(this.tr);
    if (this.tr <= 0) {
      window.location.reload();
      console.log(this.tr);
    }
  }
}
