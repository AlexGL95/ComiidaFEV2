import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ronda } from '../../interfaces/Ronda';

@Injectable({
  providedIn: 'root'
})
export class RondaService {

  URI = 'http://localhost:3000/rondas'

  constructor(private http: HttpClient) { }

  createRonda(){
    return this.http.get<Ronda>(`${this.URI}/ronda`);
  }
}
