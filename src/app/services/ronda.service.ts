import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ronda } from '../interfaces/Ronda';

@Injectable({
  providedIn: 'root'
})
export class RondaService {

  URIrondas = 'http://localhost:3000/rondas'
  URIrecetas = 'http://localhost:3000/recetas'

  constructor(private http: HttpClient) { }

  createRonda(){
    return this.http.get<Ronda[]>(`${this.URIrondas}/ronda`);
  }
  
  activarRonda(){
    return this.http.get<Ronda[]>(`${this.URIrondas}/activa`);
  }

  deleteRonda(){
    return this.http.delete(`${this.URIrondas}`);
  }

  getIng(){
    return this.http.get(`${this.URIrecetas}/ing`);
  }

  getAll() {
    return this.http.get<Ronda[]>(this.URIrondas);
  }

}