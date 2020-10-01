import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  IS_SUPER: boolean = false;

  constructor( private authService: AuthService, private router: Router ) {
    this.IS_SUPER = authService.leersuper(); 
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['Login']);
  }

}
