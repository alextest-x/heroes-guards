import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'heroesApp';


  constructor(private authService: AuthService){}



  /*
  // aqui validad toda la aplicacion cuando se logea  y carga toda la informacion
  //se comenta porque hay que ponerlo en otro lugar para solo que muestre pantalla al usuario lo que deba ver y no todo
  ngOnInit(): void {
     this.authService.checkAuthentication().subscribe( ()=> {
      console.log('checkAuthentication finished')
      })
    }

  */

}

