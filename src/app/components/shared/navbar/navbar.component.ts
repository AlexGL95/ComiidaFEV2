import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  IS_SUPER: boolean = false;

  constructor( private authService: AuthService ) {
    this.IS_SUPER = authService.leersuper();
    console.log(this.IS_SUPER);
    
  }

}
