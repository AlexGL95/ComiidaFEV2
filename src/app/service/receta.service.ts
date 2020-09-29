import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Receta } from '../interfaces/Ronda'

@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  URIrecetas = 'http://localhost:3000/recetas'

  constructor(private http: HttpClient) { }

  crearReceta(receta: Receta){
    return this.http.post(this.URIrecetas, receta);
  }
}
