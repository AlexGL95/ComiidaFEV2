import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RondaService } from 'src/app/service/ronda/ronda.service';

@Component({
  selector: 'app-ronda',
  templateUrl: './ronda.component.html',
  styleUrls: ['./ronda.component.css']
})
export class RondaComponent implements OnInit {

  rondas = {}

  constructor(private rondaService: RondaService,
              private router: Router) { }

  ngOnInit(): void {
  }

  createRonda(): boolean{
    this.rondaService.createRonda()
        .subscribe(res => {this.rondas = res}),
        err => console.log(err)
    return false;
  }

}