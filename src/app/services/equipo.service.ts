import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

//Interfaces
import { EquipoInterface } from "../components/equipo/equipo.interface";

@Injectable({
  providedIn: 'root'
})
export class EquipoService {
  
  constructor( private http: HttpClient ) {
    console.log("Equipo service is working!");
  }

  getEquipos() {
    return this.http.get<EquipoInterface[]>('http://localhost:3000/equipos');
  }

}
