import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

//Interfaces
import { EquipoInterface, UpdateDateDto } from "../components/equipo/equipo.interface";

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  constructor( private http: HttpClient ) {}

  URL_API_EQUIPOS = 'http://localhost:3000/equipos';

  getEquipos() {
    return this.http.get<EquipoInterface[]>(this.URL_API_EQUIPOS);
  }

  updateDate( fechaMod: UpdateDateDto ) {
    return this.http.put(this.URL_API_EQUIPOS, fechaMod );
  }

}
