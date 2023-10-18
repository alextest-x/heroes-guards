import { Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, UrlSegment, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

//import { CanActivateFn, CanMatchFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
//un  guard tiene que implementar una inteface


@Injectable({providedIn: 'root'})
export class AuthGuard implements  CanMatch, CanActivate {
  //CanMatch entra a la ruta donde hace match
  //CanActivate activa esa ruta o donde se pone el guard

  constructor(private authService: AuthService,
              private router: Router) { }

  private checkAuthStatus(): boolean | Observable<boolean>{

    return this.authService.checkAuthentication()
    .pipe(
      tap( isAuthenticated => console.log('Authenticated: ', isAuthenticated) ),
      tap( isAuthenticated => {
           if(!isAuthenticated) {  //sino esta autentiicado lo pone en otra pantalla
              this.router.navigate(['/auth/login'])
           }
      }),

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
