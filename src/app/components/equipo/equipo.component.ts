import { Component, OnInit } from '@angular/core';
import { EquipoService } from 'src/app/services/equipo.service';
import { EquipoInterface, UpdateDateDto } from './equipo.interface';

@Component({
  selector: 'app-equipo',
  templateUrl: './equipo.component.html',
  styleUrls: ['./equipo.component.css']
})
export class EquipoComponent {

  equiposArr: EquipoInterface[] = [];
  fechasArr: string[] = [];
  equiposModificados: UpdateDateDto[];
  envioValido: Boolean;
  mensajeError: Boolean = false;
  mensajeEnviado: Boolean = false;

  constructor( private equipoService: EquipoService ) {
    //Adquisicion de datos
    this.equipoService.getEquipos().subscribe( equipo => {
      this.equiposArr = equipo;
      for (let m = 0; m < this.equiposArr.length; m++) {
        this.fechasArr[m] = this.equiposArr[m].nombre;
      }
    });
  }

  //Metodo que modifica el arreglo de fechas mostradas
  modFechasArr( index: number, fecha: string ) {
    this.fechasArr[index] = fecha;
    this.mensajeError = false;
    this.mensajeEnviado = false;
  }

  //Metodo que verifica cambios en las fechas y realiza su envio
  envioCambios() {
    //Config
    this.envioValido = true;
    this.equiposModificados = [];
    
    //1.-Recorre las fechas del arreglo de fechas comparandolas
    for (let m = 0; m < this.fechasArr.length; m++) {
      for (let n = 0; n < this.fechasArr.length; n++) {
        //Condicion. Si dos fechas son iguales, y no son la misma = no es un envio valido
        //Condicion. Si dos el envio ya es invalido, termina el loop
        if ( ((this.fechasArr[m] === this.fechasArr[n]) && (m != n)) || (this.envioValido === false) ) {
          this.envioValido = false;
          break;
        }
      }
    }
    
    //2.-Si el envio es valido
    if ( this.envioValido === true ) {
      //3.-Analiza que equipos fueron modificados
      for (let m = 0; m < this.equiposArr.length; m++) {
        if ( this.equiposArr[m].nombre != this.fechasArr[m] ) {
          this.equiposModificados.push( { id: m+1, fechaNueva: this.fechasArr[m] } );
        }
      }
      //4.- Hace el mismo numero de peticiones la API cambio de fecha, iniciando por la que tenga el id mas alto en la DB
      for (let m = 0; m < this.equiposModificados.length; m++) {
        this.equipoService.updateDate(this.equiposModificados[m]).subscribe();
      }
      //5.-Se actualiza el arreglo de equipos
      this.equipoService.getEquipos().subscribe( equipo => {
        this.equiposArr = equipo;
      });
      //6.-Se imprime el el mensaje envio exitoso
      this.mensajeEnviado = true;
    }
    //Si no, envia un mensaje en pantalla
    else {
      this.mensajeError = true;
    }
  }

}
