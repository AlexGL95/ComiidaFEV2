// tslint:disable: object-literal-shorthand
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { usuariomodel } from 'src/app/Models/Usuario.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  RegistroForm: FormGroup;
  user: usuariomodel;
  patt = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-zd$@$!%*?&].{7,}';
  mensajeInvalido: boolean;
  mensajeRegistro: boolean;
  contra = '';
  contra2 = '';

  singin(nombre: string, pass: string, copass: string){
    if (this.RegistroForm.valid) {

      console.log('Registro');

      this.user = {
      nombre: nombre,
      pass: pass};

      this.auth.registro(this.user)
      .subscribe(resp => {
        if (!resp) {
          this.mensajeRegistro = true;
        }else{
          console.log(resp);
          this.router.navigate(['/Usuarios']);
        }
      },
      err => {
        console.log(err);

      });

    } else {
      this.mensajeInvalido = true;
    }
  
  }

  checkPasswords(formGroup: FormGroup) {
    // here we have the 'passwords' group
    const { value: password } = formGroup.get('password');
    const { value: copassword } = formGroup.get('copassword');
    return password === copassword ? null : { passwordNotMatch: true };
  }

  get usuario(){ return this.RegistroForm.get('usuario'); }
  get password(){ return this.RegistroForm.get('password'); }
  get copassword(){ return this.RegistroForm.get('copassword'); }

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router) {
    this.RegistroForm = this.formBuilder.group(
      {
        usuario: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(15)]),
        password: [
          '',
          Validators.compose([
            Validators.minLength(8),
            Validators.maxLength(15),
            Validators.required,
            Validators.pattern(this.patt),
          ]),
        ],
        copassword: [
          '',
          Validators.compose([
            Validators.minLength(8),
            Validators.maxLength(15),
            Validators.required,
            Validators.pattern(this.patt),
          ]),
        ],
      },
      { Validator: this.checkPasswords.bind(this) }
    );
   }

  ngOnInit(): void {
  }

  // Metodo para redirigir a
  linkBack(){
    this.router.navigate(['/Usuarios']);
  }

  /**/

}
