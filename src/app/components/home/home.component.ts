//Modules
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Moment } from "moment";
//Services
import { RecetaService } from 'src/app/services/receta.service';
import { AuthService } from 'src/app/services/auth.service';
import { EquipoService } from 'src/app/services/equipo.service';
//Interfaces
import { EquipoInterface } from '../equipo/equipo.interface';
import { EquipoRecetaService } from 'src/app/services/equipo-receta.service';
import { RondaService } from 'src/app/services/ronda.service';
import { Ronda } from 'src/app/interfaces/Ronda';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent{

  //Declaracion de variables
  IS_SUPER: boolean = false;
  equiposArr:EquipoInterface[] = [];
  equipoUsuario: EquipoInterface  = { nombre: "", integrantes_nombres: [], recetas_nombres: [] };
  recetasAsignadas = [];
  recetasArr = []; //Recetas no activas en Db
  recetasElegibles = [];  //Recetas que no an sido seleccionadas por el usuario
  recetasSeleccionadas = [ {idDb: 0 , nombre: "Sel. receta.", ingr: []} ]; //Recetas seleccionadas por el usuario
  mensajeNoHayRonda: boolean = false;
  mensajeHoyNoCocinas: boolean = false;
  mensajeExistenRecetas: boolean = false;
  mensajeEspaciosSinAsignar: boolean = false;
  mensajeRondaEnCurso: boolean = false;
  tiempoRestante = { horas: 8, minutos: 0, segundos: 0 };
  fechaActual: Date = new Date;
  rondaInmediata: Ronda = null;
  segundosAbierto: number = this.fechaActual.getSeconds();
  minutosAbierto: number = this.fechaActual.getMinutes();
  horasAbierto: number = 0;
  cambio: boolean;
  cambio2: boolean;

  constructor(
    private recetaService: RecetaService,
    private authService: AuthService,
    private equipoService: EquipoService,
    private equipoRecetaService: EquipoRecetaService,
    private router: Router,
    private rondasService: RondaService,
    private usuarioService: UserService
  ) {

    this.IS_SUPER = authService.leersuper();

    //Equipo del usuario
    let equipo: string;// = this.authService.leerEquipo();
    usuarioService.getAll().subscribe( usuarios => {
        for (let m = 0; m < usuarios.length; m++) {
          if ( usuarios[m].id.toString() === this.authService.leerid() ) {

            //Condicion. Si fecha de equipo es nulo = No tienes hay actividades programadas
            if ( usuarios[m].equipo === null ) {
              this.mensajeHoyNoCocinas = true;
            }

            //Condicion. Si fecha de equipo no es nulo se envia
            else {
              equipo = usuarios[m].equipo.fecha;
              this.homeInit(equipo);
            }

          }
        }
    } );

    rondasService.getAll().subscribe( rondas => {
      if ( rondas.length === 0 ) {
        this.mensajeNoHayRonda = true;
      }
    } );
  }

  //Metodo de inicializacion.
  homeInit( equipo: string ) {
    this.equipoService.getEquipos().subscribe( equipos => {
      //Adquisicion de equipos
      this.equiposArr = equipos;

        //Arranque del cronometro
        this.cronometroIni();

        //Adquisicion del equipo del usuario
        for (let m = 0; m < this.equiposArr.length; m++) {
          if ( this.equiposArr[m].nombre === equipo ) {
            this.equipoUsuario = this.equiposArr[m];
          }
        }

        //Condicion. Si no hay recetas asignadas al equipo = Puedes asignar recetas
        if( this.equipoUsuario.recetas_nombres.length <= 0 ) {
          //Cambio de bandera
          this.mensajeExistenRecetas = false;
          //Adquisicion de recetas
          this.recetaService.getRecetas().subscribe( recetas => {
            for (let m = 0; m < recetas.length; m++) {
              if ( recetas[m].activo === false ) {
                this.recetasArr.push( {idLocal:m, idDb: m+1, nombre:recetas[m].nombre, elegida:false, ingredientes:recetas[m].ingredientes } );
              }
            }

            //Ciclo para llenado de recetas elegibles
            for (let m = 0; m < this.recetasArr.length; m++) {
              if ( this.recetasArr[m].elegida === false ) {
                this.recetasElegibles.push( { idLocal:m, nombre:this.recetasArr[m].nombre } );
              }
            }
          } );
        }
        //Condicion. Si si hay recetas asignadas al equipo = No puedes asignar recetas
        else {
          //Cambio de bandera
          this.mensajeExistenRecetas = true;
          //Llenado de recetas existentes
          this.recetasAsignadas = this.equipoUsuario.recetas_nombres ;
        }
      }
    );
  }

  //Metodo para modificacion del arreglo recetasSeleccionadas
  nRecetasMod( n: number ) {
    let largoActual: number = this.recetasSeleccionadas.length;
    let largoDeceado: number = n;
    let diferencia: number = largoDeceado - largoActual;
    //Condicion. Hay espacios de menos = Crea espacios nuevos
    if ( diferencia > 0 ) {
      for (let m = 0; m < diferencia; m++) {
       this.recetasSeleccionadas.push( {idDb: 0 , nombre: "Sel. receta.", ingr: []} );
      }
    }
    //Condicion. Hay espacios de mas
    else if ( diferencia < 0 ) {
      //Vuelve la receta en el seleccionable de nuevo
      for (let m = 0; m < this.recetasArr.length; m++) {
        if ( this.recetasArr[m].nombre.indexOf( this.recetasSeleccionadas[n].nombre) >= 0) {
          //Cambio de estado de la receta
          this.recetasArr[m].elegida = false;
          break;
        }
      }
      //Ciclo para llenado de recetas elegibles
      this.recetasElegibles = [];
      for (let m = 0; m < this.recetasArr.length; m++) {
        if ( this.recetasArr[m].elegida === false ) {
          this.recetasElegibles.push( { idLocal:m, nombre:this.recetasArr[m].nombre } );
        }
      }
      //Elimina el ultimo espacio
      this.recetasSeleccionadas.splice((this.recetasSeleccionadas.length-(-1*diferencia)), (-1*diferencia));
    }
  }

  //Metodo para realizar la seleccion de una receta
  selReceta( selector: number, id: number ) {
    //Condicion. Si ya hay una receta seleccionada, primero liberala
    if ( this.recetasSeleccionadas[selector].nombre != "Sel. receta." ) {
      //Vuelve la receta en el seleccionable de nuevo
      for (let m = 0; m < this.recetasArr.length; m++) {
        if ( this.recetasArr[m].nombre.indexOf( this.recetasSeleccionadas[selector].nombre ) >= 0) {
          //Cambio de estado de la receta
          this.recetasArr[m].elegida = false;
          break;
        }
      }
      //Ciclo para llenado de recetas elegibles
      this.recetasElegibles = [];
      for (let m = 0; m < this.recetasArr.length; m++) {
        if ( this.recetasArr[m].elegida === false ) {
          this.recetasElegibles.push( { idLocal:m, nombre:this.recetasArr[m].nombre } );
        }
      }
    }
    //Asignacion de la nueva receta
    this.recetasSeleccionadas[selector] = {idDb: this.recetasArr[id].idDb, nombre: this.recetasArr[id].nombre, ingr: this.recetasArr[id].ingredientes.split("/") };
    //Cambio de estado de la receta
    this.recetasArr[id].elegida = true;
    //Ciclo para llenado de recetas elegibles
    this.recetasElegibles = [];
    for (let m = 0; m < this.recetasArr.length; m++) {
      if ( this.recetasArr[m].elegida === false ) {
        this.recetasElegibles.push( { idLocal:m, nombre:this.recetasArr[m].nombre } );
      }
    }
  }

  //Metodo que hace los cambios necesarios en la base de datos
  asignarRecetasAlEquipo() {
    let espaciosSinAsignar = false;
    //1.-Verificar que no hay espacios no asignados
    for (let m = 0; m < this.recetasSeleccionadas.length; m++) {
      if ( this.recetasSeleccionadas[m].nombre === "Sel. receta." ) {
        espaciosSinAsignar = true;
        break;
      }
    }
    //Condicion. Si hay espacios sin asignar = Muestra el mensaje de error
    if ( espaciosSinAsignar === true ) {
      this.mensajeEspaciosSinAsignar = true;
      this.cambio = false;
    }
    //Condicion. Si todo es correcto = continua
    else {
      this.mensajeEspaciosSinAsignar = false;
      this.cambio = true;
      
    }
  }

  asignarRecetaConfirmada(){
     //2.-Obtener datos del equipo
     let idEquipo: number = parseInt( this.authService.leerIdEquipo() );
     let idRecetas: number[] = [];

     //3.-Cambiar estado de las recetas
     for (let m = 0; m < this.recetasSeleccionadas.length; m++) {
       this.recetaService.changeStateById( this.recetasSeleccionadas[m].idDb ).subscribe();
       idRecetas.push(this.recetasSeleccionadas[m].idDb);
     }
     //4.-Asignarlas al equipo
     this.equipoRecetaService.asignacion(idEquipo, idRecetas).subscribe( () => {
       window.location.reload();
     });
  }

  //Inicializacion del cronometro
  cronometroIni() {
    //Obtencion de una ronda que se active el dia siguiente habil
    this.rondasService.getAll().subscribe( rondas => {
      for (let m = 0; m < rondas.length; m++) {
        let diaAnteriorDeRonda = this.diaAnterior( moment(rondas[m].fecha_inicio, 'MMM Do YY') );
        //Condicional. Si existe ronda inmediata = Abre la seleccion y habilita el cronometro
        if ( moment( diaAnteriorDeRonda ).format('MMM Do YY') === moment(this.fechaActual).format('MMM Do YY') ) {
          this.rondaInmediata = rondas[m];
          this.mensajeRondaEnCurso = false;
          //Calculo de tiempo restante inicial.
          //Crea la hora final
          let horaFinal = parseInt(this.rondaInmediata.hora_de_generacion) + 7;
          if ( horaFinal >= 24 ) {
            horaFinal -= 24;
          }
          //Condicional. Si queda tiempo
          if ( ( parseInt(this.rondaInmediata.hora_de_generacion) + 7 ) > ( this.fechaActual.getHours() + this.horasAbierto ) ) {
            //Calculo de tiempo abierto
            this.segundosAbierto += 1;
            if ( this.segundosAbierto >= 60 ) {
              this.segundosAbierto = 0;
              this.minutosAbierto += 1;
            }
            if ( this.minutosAbierto >= 60 ) {
              this.minutosAbierto = 0;
              this.horasAbierto += 1;
            }
            //Verificar la diferencia de tiempo entre la hora de creacion + 8 horas, con la hora actual
            this.tiempoRestante = {
              horas: (parseInt(this.rondaInmediata.hora_de_generacion) + 7) - this.fechaActual.getHours() - this.horasAbierto,
              minutos: 59 - this.minutosAbierto,
              segundos: 59 - this.segundosAbierto
            }
          }
          //Condicional. Si se agota el tiempo
          else {
            this.mensajeRondaEnCurso = true;
          }
          this.cronometro();
        }
        //Condicional. Si es la ultima ronda y no existe ronda inmediata = Notifica y modifica la vista
        if ( ( m === (rondas.length - 1) ) && (this.rondaInmediata === null) ) {
          this.mensajeRondaEnCurso = true;
        }
      }
    } );
  }

  //Funcion que busca el dia habil anterior.
  diaAnterior( dia: Moment ) {
    let diaAnterior = dia.toDate();
    if ((diaAnterior.getDay()-1)!==0){
      diaAnterior.setDate(diaAnterior.getDate()-1);
    } else{
      diaAnterior.setDate(diaAnterior.getDate()-3);
    }
    return diaAnterior;
  }

  //Cronometro de 1 minuto
  cronometro() {
    //Llamada cada 1 minuto
    setInterval( () => {
      
      //Crea la hora final
      let horaFinal = parseInt(this.rondaInmediata.hora_de_generacion) + 7;
      if ( horaFinal >= 24 ) {
        horaFinal -= 24;
      }
      //Condicional. Si queda tiempo
      if ( ( parseInt(this.rondaInmediata.hora_de_generacion) + 7 ) > ( this.fechaActual.getHours() + this.horasAbierto ) ) {
        //Calculo de tiempo abierto
        this.segundosAbierto += 1;
        if ( this.segundosAbierto >= 60 ) {
          this.segundosAbierto = 0;
          this.minutosAbierto += 1;
        }
        if ( this.minutosAbierto >= 60 ) {
          this.minutosAbierto = 0;
          this.horasAbierto += 1;
        }
        //Verificar la diferencia de tiempo entre la hora de creacion + 8 horas, con la hora actual
        this.tiempoRestante = {
          horas: (parseInt(this.rondaInmediata.hora_de_generacion) + 7) - this.fechaActual.getHours() - this.horasAbierto,
          minutos: 59 - this.minutosAbierto,
          segundos: 59 - this.segundosAbierto
        }
      }
      //Condicional. Si se agota el tiempo
      else {
        this.mensajeRondaEnCurso = true;
      }
    },1000)
  }

  //Metodo para redirigir a nueva receta
  linkNuevaReceta(){
    this.router.navigate(['/NuevaReceta']);
  }

  //Metodo para redirigir a nueva receta
  linkRondas(){
    this.router.navigate(['/Ronda']);
  }

}
