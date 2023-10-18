import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {

  constructor( private authService: AuthService,
               //para navegar a otra pantalla
               private router: Router){}

  onLogin(): void{

    //es un observable entonces le ponemos subscribe
    this.authService.login('alex@gmail.com', 'AQSWDEZAXSCD' )
     .subscribe(user => {
      this.router.navigate(['/']);
    });

  }

}
