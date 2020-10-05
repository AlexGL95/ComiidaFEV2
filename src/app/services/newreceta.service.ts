import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Receta, Condimento } from '../interfaces/Ronda'

@Injectable({
  providedIn: 'root'
})
export class NewrecetaService {

  URIrecetas = 'http://localhost:3000/recetas';
  URIcondimento = 'http://localhost:3000/condimento';

  constructor(private http: HttpClient) { }

  crearReceta(receta: Receta){
    return this.http.post(this.URIrecetas, receta);
  }

  crearCondimento(nombre: Condimento){
    return this.http.post(this.URIcondimento, nombre);
  }

  obtenerCondimentos(){
    return this.http.get(this.URIcondimento);
  }

  borrarCondimento(id: number){
    return this.http.delete(`${this.URIcondimento}/${id}`);
  }
}
