import { Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Observable } from 'rxjs';
import {
  Router,
  CanActivate,
} from '@angular/router';


@Injectable({ providedIn: 'root' })
export class LogGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AuthService
  ) {}

  aut: boolean;

canActivate(){
  let user = this.auth.leeruser();

  if (user) {
    this.router.navigate(['/Home']);
    return false;
  } else {
    return true;
  }

}
}
