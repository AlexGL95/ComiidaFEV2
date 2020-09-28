// tslint:disable: no-string-literal
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { usuariomodel } from '../Models/Usuario.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:3000';
  usertoken: string;
  super: boolean;
  user: string;
  id: string;
  // Autenticacion
  // /singin


  constructor(private http: HttpClient) { }

  logout(){}

  login( usuario: usuariomodel){
    const authData = { // payload para Log in de usuarios
      ...usuario,
      returnsecuretoken: true
    };

    return this.http.post(
      `${ this.url}/auth/singin`,
      authData
    ).pipe(
      map(resp => {
        console.log('Entro a map');
        this.storetoken( resp['token']);
        this.storeuser( resp ['nombre']);
        this.storesuper( resp['super']);
        this.storeid( resp['iduser']);
        console.log(resp);
        return resp;
      })
    );

  }

  registro(usuario: usuariomodel){

    const authData = { // payload para creacion de usuarios
      ...usuario,
      returnsecuretoken: true
    };

    return this.http.post(
      `${ this.url}/usuarios`,
      authData
    );
  }

  private storetoken( idtoken: string){

    this.usertoken = idtoken;
    localStorage.setItem('token', idtoken);

  }
  private storeuser( username: string){

    this.user = username;
    localStorage.setItem('nombre', username);

  }
  private storesuper( sup: boolean){

    this.super = sup;
    localStorage.setItem('super', sup + '');

  }

  private storeid( id: string){

    this.id = id;
    localStorage.setItem('id', id);

  }
  leertoker(){
    if (localStorage.getItem('token')){
      this.usertoken = localStorage.getItem('token');
    }else{
      this.usertoken = '';
    }
    return this.usertoken;
  }

  leeruser(){
    if (localStorage.getItem('nombre')){
      this.user = localStorage.getItem('nombre');
    }else{
      this.user = '';
    }
    return this.user;
  }

  leersuper(){
    if (localStorage.getItem('token')){
      this.super = JSON.parse(localStorage.getItem('token'));
    }else{
      this.super = false;
    }
    return this.super;
  }

  leerid(){
    if (localStorage.getItem('id')){
      this.id = localStorage.getItem('id');
    }else{
      this.id = null;
    }
    return this.id;
  }


}
