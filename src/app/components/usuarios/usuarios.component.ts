import { Component, OnInit } from '@angular/core';
import { usuariomodel } from 'src/app/Models/Usuario.model';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
//Icons
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  usuariosarr: any = [];
  auxarr = [] ;
  resultado = false; // control de mensaje si no se encuentran coincidencias
  confirmar: boolean;
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  tamu = 0;

  const;
  constructor(
    private user: UserService,
    private route: Router,
  ) {}

  ngOnInit( bus?: string): void {
    this.user.getAll().subscribe(res => {
      let i = 0;
      this.usuariosarr = res;
      this.auxarr = [];
      this.tamu = res.length;
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
          this.resultado = false;
        }
      }
    });
  }

editarusuario(id){
  this.route.navigate(['Edicion_Usuario/', id]);
}
delusuario(id){
  this.user.delete(id).subscribe(res => {
    this.ngOnInit();
    window.location.reload();
  });
}
nuevousuario(){
  this.route.navigate(['Registro']);
}

}
