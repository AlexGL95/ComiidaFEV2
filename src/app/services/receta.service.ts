import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

//Interfaces
import { RecetaInterface } from "../components/receta/receta.interface";

@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  constructor( private http: HttpClient ) {}

  URL_API_RECETAS = 'http://localhost:3000/recetas';

  getRecetas() {
    return this.http.get<RecetaInterface[]>(this.URL_API_RECETAS);
  }

  deleteById( id:number ) {
    return this.http.delete(this.URL_API_RECETAS + `/${id}`);
  }

}
