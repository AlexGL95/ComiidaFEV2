import { Component, OnInit } from '@angular/core';
import { EquipoService } from 'src/app/services/equipo.service';
import { EquipoInterface } from './equipo.interface';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent implements OnInit {

  equiposArr: EquipoInterface[];

  constructor( private equipoService: EquipoService ) { 
    this.equipoService.getEquipos().subscribe( equipo => {
      this.equiposArr = equipo;
      console.log(this.equiposArr);
    });
  }

  ngOnInit(): void {
  }

}