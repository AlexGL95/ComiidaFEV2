import { Component, OnInit } from '@angular/core';
import { usuariomodel } from 'src/app/Models/Usuario.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuariosarr: any = [];
  auxarr = [] ;
  resultado = false; // control de mensaje si no se encuentran coincidencias
  constructor(
    private user: UserService,
    private route: Router,
  ) {}

  ngOnInit( bus?: string): void {
    this.user.getAll().subscribe(res => {
      let i = 0;
      this.usuariosarr = res;
      this.auxarr = [];
      if (bus) {
        // tslint:disable-next-line: prefer-for-of
        for (let index = 0; index < this.usuariosarr.length; index++) {
          if ((this.usuariosarr[index].nombre.toLowerCase( )).indexOf(bus.toLowerCase()) >= 0) {
            this.auxarr[i] = this.usuariosarr[index];
            i++;
          }
        }
        this.usuariosarr = this.auxarr;
        if (this.usuariosarr.length <= 0) {
          this.resultado = true;
        }else{
          this.resultado = true;
        }
      }
    });
  }

editarusuario(id){
  this.route.navigate(['Edicion_Usuario/', id]);
}
delusuario(id){
  this.user.delete(id).subscribe(res => {
    console.log(res);
    this.ngOnInit();
  });
}
nuevousuario(){
  this.route.navigate(['Registro']);
}
}
