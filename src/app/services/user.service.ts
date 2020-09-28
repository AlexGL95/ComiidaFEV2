import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { usuariomodel } from '../Models/Usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:3000';

  constructor(
    private http: HttpClient,

  ) { }

getOne(idx){
  return this.http.get(`${ this.url}/usuarios/${idx}`);
}

updateusuario(id, data: usuariomodel){
/*  const Data = { // payload para Actualizacion de usuarios
    ...data
  };
  console.log(id,data);*/
  this.http.put(`${this.url}/usuarios/${id}`, {nombre: "pablo"});
}

}
