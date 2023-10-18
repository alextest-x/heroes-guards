import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, map, tap } from 'rxjs';


@Injectable({providedIn: 'root'})
export class PublicGuard implements CanMatch, CanActivate {

  constructor( private authService: AuthService,
               private  router: Router ) { }

              private checkAuthStatus(): boolean | Observable<boolean>{

                return this.authService.checkAuthentication()
                .pipe(
                  tap( isAuthenticated => console.log('Authenticated: ', isAuthenticated) ),
                  tap( isAuthenticated => {
                       if(isAuthenticated) {  //sino esta autentiicado lo pone en otra pantalla
                          this.router.navigate(['./'])
                       }
                  }),

                  //aqui no es necesario que este autenticado aqui puede pasar
                  // porque sino no puedo entrar al login
                  map( isAuthenticated => !isAuthenticated)

                )

              }

//es una funcion que regresa un booleano o emite un booleano
 // si es true lo deja pasar
 canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {

  //console.log('Can Match');
  //console.log({route, segments});
  //return false;
  return this.checkAuthStatus();
}
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {

  //console.log('Can Activate');
  //console.log({ route, state });
  //return false;
    return this.checkAuthStatus();

}

}
