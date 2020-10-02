// tslint:disable: prefer-for-of
// tslint:disable: no-string-literal
// tslint:disable: object-literal-shorthand
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { usuariomodel } from 'src/app/Models/Usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  patt = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-zd$@$!%*?&].{7,}';
  RegistroForm: FormGroup;
  user: usuariomodel;
  usuariosarr: any = [];
  usu: any;
  idx;
  i = 0;
  mensajeUpdate: boolean;
  mensajeInv: boolean;

  update(nombre: string, pass: string, copass: string){
    this.usrse.getAll().subscribe(res => {
          this.usuariosarr = res;
          for (let index = 0; index < this.usuariosarr.length; index++) {
            if ((this.usuariosarr[index].nombre.toLowerCase() == nombre.toLowerCase())) {
              this.i++;
              console.log(this.i);
            }
          }
          if (this.RegistroForm.valid || ((this.password.value <= 0) && (this.copassword.value <= 0)) ) {
              if (this.password.valid && this.copassword.valid) {
                this.user = {
                  nombre: nombre,
                  pass: pass};
                console.log('Coincidencias', this.i);
                if (this.i > 0) {
                      this.mensajeUpdate = true;
                    }else{
                      this.userservice.updateusuario(this.idx, this.user).subscribe(res => 
                        {}, err => {this.mensajeUpdate = true; });
                      this.router.navigate(['/Usuarios']);
                    }
              } else {
                this.user = {
                  nombre: nombre
                };
                console.log('aqui solo el nombre' + this.user);
                console.log('Coincidencias', this.i);
                if (this.i > 0) {
                  this.mensajeUpdate = true;
                } else {
                  this.userservice.updateusuario(this.idx, this.user).subscribe(res => 
                  console.log(res),
                  err => this.mensajeUpdate = true);
                }

              }
                /*this.auth.registro(this.user)
                .subscribe(resp => {
                  console.log(resp);
                });*/
            } else {
                this.mensajeInv = true;
            }

        });

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

    constructor(
      private formBuilder: FormBuilder,
      private userservice: UserService,
      private activatedRoute: ActivatedRoute,
      private auth: AuthService,
      private usrse: UserService,
      private router: Router) {
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
                  Validators.pattern(this.patt),
                ]),
              ],
              copassword: [
                '',
                Validators.compose([
                  Validators.minLength(8),
                  Validators.maxLength(15),
                  Validators.pattern(this.patt),
                ]),
              ],
            },
            { Validator: this.checkPasswords.bind(this) }
            );
          }

          ngOnInit(): void {
            this.activatedRoute.params.subscribe((params) => {
              this.idx = params['id'];
            });
            console.log(this.idx);
            this.userservice.getOne(this.idx)
            .pipe(first())
            .subscribe((comp) => {
              this.usu = comp;
              this.RegistroForm.patchValue({
                usuario: this.usu.nombre,
              });
            });

          }

          //Metodo para redirigir a 
          linkBack(){
            this.router.navigate(['/Usuarios']);
          }

}
