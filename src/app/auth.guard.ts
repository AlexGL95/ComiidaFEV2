import { Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import {
  Router,
  CanActivate,
} from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { async } from '@angular/core/testing';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  aut: boolean;

canActivate(){
 return this.auth.verify().pipe(map((res) => {
    if (res) {
        return true;
    } else {
      this.auth.logout();
      this.router.navigate(['/Login']);
      return false;
    }
    }));

}

canLoad(){
  let user = this.auth.leeruser();

  if (user) {
    this.router.navigate(['/Home']);
    return false;
  } else {
    return true;
  }
}

}
