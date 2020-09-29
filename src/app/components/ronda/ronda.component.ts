import { Component, OnInit } from '@angular/core';
import { RondaService } from 'src/app/service/ronda.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ronda',
  templateUrl: './ronda.component.html',
  styleUrls: ['./ronda.component.css']
})
export class RondaComponent implements OnInit {

  rondas = [];
  ingredientes={};
  show: boolean;

  constructor(private rondaService: RondaService, private router: Router) { }

  ngOnInit(): void {

    this.rondaService.activarRonda()
          .subscribe(
            res => {
              this.rondas = res;
            },
            err => console.log(err)
          )

  }

  createRonda(): boolean{
    this.rondaService.createRonda()
        .subscribe(res => {
          this.rondas = res;
        },
        err => console.log(err)
        )
    return false;
  }

  deleteRonda() {
    this.rondaService.deleteRonda()
        .subscribe(res => {
          this.rondaService.activarRonda()
              .subscribe(res => {
                this.rondas = res;
              },
              err => console.log(err)
            )
        },
        err => console.log(err)
      )
  }

  getIng(){
    this.rondaService.getIng()
        .subscribe(res => {
          this.ingredientes = res;
        },
        err => console.log(err))
    this.show = true;
  }

  ocultar(){
    this.show = false;
  }

}