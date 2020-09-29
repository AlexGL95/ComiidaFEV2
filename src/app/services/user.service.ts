import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { usuariomodel } from '../Models/Usuario.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

getOne(idx){
  return this.http.get(`${ this.url}/usuarios/${idx}`);
}

updateusuario(id, data: usuariomodel){
  const Data = { // payload para Actualizacion de usuarios
    ...data
  };
  console.log(id, data);
  return this.http.put(`${this.url}/usuarios/${id}`, Data);
}

getAll(){
return this.http.get(`${this.url}/usuarios`);
}

delete(id){
  return this.http.delete(`${this.url}/usuarios/${id}`);
}

/*
updateusuario(){
    const Data = { // payload para Actualizacion de usuarios
      ...data
    };
    console.log(id,data);
    return this.http.put(`http://localhost:3000/usuarios/1`, {nombre:"Pablo", pass: "hola"});
  }
  */

}
