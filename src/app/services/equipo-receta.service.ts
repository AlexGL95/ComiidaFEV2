import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EquipoRecetaService {

  constructor( private http: HttpClient ) { }

  URL_API_EQUIPO_RECETAS = 'http://localhost:3000/equipo_receta';

  asignacion( idEquipo: number, idRecetas: number[] ) {
    return this.http.put(this.URL_API_EQUIPO_RECETAS, { idEquipo: idEquipo, idRecetas: idRecetas });
  }

}
