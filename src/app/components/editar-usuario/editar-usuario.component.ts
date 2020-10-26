// tslint:disable: prefer-for-of
// tslint:disable: no-string-literal
// tslint:disable: object-literal-shorthand
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { usuariomodel } from 'src/app/Models/Usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {
  faEyeSlash = faEyeSlash;
  patt = '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9d$@$!%*?&].{7,}';
  RegistroForm: FormGroup;
  user: usuariomodel;
  usuariosarr: any = [];
  usu: any;
  idx;
  i = 0;
  mensajeUpdate: boolean;
  mensajeUpdate2 = false;
  mensajeUpdate3 = false;
  pass = false;
  mensajeInv: boolean;
  contra = '';
  contra2 = '';

  update(nombre: string, pass: string, copass: string){
    this.i = 0;
    this.usrse.getAll().subscribe(res => {
          this.usuariosarr = res;
          for (let index = 0; index < this.usuariosarr.length; index++) {
            if ((this.usuariosarr[index].nombre.toLowerCase() == nombre.toLowerCase())) {
              this.i++;
            }
          }
          if (this.RegistroForm.valid || ((this.password.value <= 0) && (this.copassword.value <= 0)) ) {
              if (this.password.valid && this.copassword.valid) {
                this.user = {
                  nombre: nombre,
                  pass: pass};
                if (this.i > 1) {
                      this.mensajeUpdate2 = true;
                  }else{
                      this.userservice.updateusuario(this.idx, this.user).subscribe(res =>
                        {}, err => {this.mensajeUpdate = true; });
                      this.showmodalsuccess();
                  }

              } else {
                this.user = {
                  nombre: nombre
                };
                if (this.i > 0) {
                  this.mensajeUpdate3 = true;
                } else {
                  this.userservice.updateusuario(this.idx, this.user).subscribe( res => {
                    this.showmodalsuccess();
                    //this.router.navigate(['/Usuarios']);
                  },
                  (err) => this.mensajeUpdate = true);
                }

              }
            } else {
                this.mensajeInv = true;
            }

        });

  }

    get usuario(){ return this.RegistroForm.get('usuario'); }
    get password(){ return this.RegistroForm.get('password'); }
    get copassword(){ return this.RegistroForm.get('copassword'); }
    get f(){ return this.RegistroForm.controls; }

    constructor(
      private formBuilder: FormBuilder,
      private userservice: UserService,
      private activatedRoute: ActivatedRoute,
      private auth: AuthService,
      private usrse: UserService,
      private router: Router) {
        // parcheador de nombres
        this.activatedRoute.params.subscribe((params) => {
          this.idx = params['id'];
        });
        this.userservice.getOne(this.idx)
        .pipe(first())
        .subscribe((comp) => {
          this.usu = comp;
          this.RegistroForm.patchValue({
            usuario: this.usu.nombre,
          });
        });

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
            }
            );
          }

          checkPasswords(formGroup: FormGroup): ValidatorFn {
            // here we have the 'passwords' group
            const { value: password } = formGroup.get('password');
            const { value: copassword } = formGroup.get('copassword');
            return (control: AbstractControl): { [key: string]: any } | null =>
            password === copassword ? null : { passwordNotMatch: true };
          }

          ngOnInit(): void {

          }

          //Metodo para redirigir a 
          linkBack(){
            this.router.navigate(['/Usuarios']);
          }

          showmodalsuccess() {
            Swal.fire({
              icon: 'success',
              title: 'Éxito!',
              text: 'Usuario Editado correctamente',
            });
            this.router.navigate(['/Usuarios']);
          }

}
