// tslint:disable: no-string-literal
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { usuariomodel } from '../Models/Usuario.model';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = 'http://localhost:3000';
  usertoken: string;
  super: boolean;
  user: string;
  idEquipo: string;
  fechaDeEquipo: string;
  id: string;
  // Autenticacion
  // /singin


  constructor(private http: HttpClient) { }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    localStorage.removeItem('super');
    localStorage.removeItem('id');
    localStorage.removeItem('id_equipo');
    localStorage.removeItem('fecha_equipo');
  }

  verify(): Observable<boolean> {
    const TOKEN = this.leertoker();
    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${TOKEN}`)
    };
    return this.http.get<{ autorized: boolean; }>(`${this.url}/auth`, header).pipe(map(
      () => true), catchError( async () => false ));
  }

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
        this.storeIdEquipo( resp['idequipo'] );
        this.storeFechaDeEquipo( resp['fechaDeEquipo']);
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

  private storeIdEquipo( idEq: string){
    this.idEquipo = idEq;
    localStorage.setItem('id_equipo', idEq);
  }

  private storeFechaDeEquipo( feEq: string){

    this.fechaDeEquipo = feEq;
    localStorage.setItem('fecha_equipo', feEq);

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
    if (localStorage.getItem('super')){
      this.super = JSON.parse(localStorage.getItem('super'));
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

  leerEquipo(){
    if (localStorage.getItem('fecha_equipo')){
      this.fechaDeEquipo = localStorage.getItem('fecha_equipo');
    }else{
      this.fechaDeEquipo = null;
    }
    return this.fechaDeEquipo;
  }

  leerIdEquipo() {
    if (localStorage.getItem('id_equipo')){
      this.idEquipo = localStorage.getItem('id_equipo');
    } else {
      this.idEquipo = null;
    }
    return this.idEquipo;
  }

}
