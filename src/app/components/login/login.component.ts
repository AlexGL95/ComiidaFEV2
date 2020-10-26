import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { usuariomodel } from '../../Models/Usuario.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
//Icons
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  LoginForm: FormGroup;
  faEyeSlash = faEyeSlash;
  user: usuariomodel;
  mensajeError: boolean = false;
  mensajeDatoInvalido: boolean = false;

  createFormGroup(){
    return new FormGroup({
      usuario: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]),
    });
  }


  singup( nombre: string, pass: string){
    if (this.LoginForm.valid) { 
        this.user = {
        nombre,
        pass
      };
        this.auth.login(this.user).subscribe(
          (resp) => {
            this.router.navigate(['/Home']);
          },
          (err) => {this.mensajeError = true;}
          );
    } else {
      this.mensajeDatoInvalido = true;
    }
  }

  constructor(
    private auth: AuthService,
    private router: Router,
  ){
    this.LoginForm = this.createFormGroup();
  }

  ngOnInit(): void {
  }

  get usuario(){ return this.LoginForm.get('usuario'); }
  get password(){ return this.LoginForm.get('password'); }

}
