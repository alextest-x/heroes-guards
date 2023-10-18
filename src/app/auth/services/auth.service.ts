// #para crear con el atajo aservice

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from '../../../environments/environments';
//import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl = environments.baseUrl;
  private user?: User;


  constructor(private http: HttpClient) { }

    //en java script pasalos objetos por referencia
    get currentUser():User | undefined {
    //si el usuario no existe entonces retorna un undefined
      if ( !this.user ) return undefined;
      return structuredClone(this.user);
      }

    //se puede poner {... } porque no tiene propiedades ni metodos
    //return { ...this.user};
    //tambien se puede usar structuredClone que es un deepclone desde la version 17
    //return structuredClone(this.user);



   //se puede regresar un void, error, Observable(retorna un valor verdadero o falso y regresa un usario)
   // http://post('login', {email, password});

    login(email: string, password: string ): Observable<User> {
      return this.http.get<User>(`${ this.baseUrl }/users/1`)
       .pipe(
        tap( user => this.user= user),
        tap( user => localStorage.setItem('token', 'alxcweqedqqAX123282') ),
        //tap( user => localStorage.setItem('user', user.user) ),
        );

    }

    checkAuthentication(): Observable<boolean> {


       if(! localStorage.getItem('token') ) return of(false);
       //obtiene el token del localStorage
       const token = localStorage.getItem('token');

       return this.http.get<User>(`${ this.baseUrl }/users/1`)
       .pipe(
        tap(user => this.user = user),
        // (!!) asegura que sea un valor booleano porque user tiene un valor y vuele apreguntar si tiene un valor
        // y nos da un valor booleano con true
        map(user => !!user ),
        catchError(err => of(false))
        );

       //return of(true)

    }


     logout() {
     this.user = undefined;
     localStorage.clear();

     }

  }





/*
//optimizado login(email: string, password: string)
//http.post('login', { email, password });
  this.http.get<User>(`${ this.baseUrl }/user/1`)
    .pipe(
        tap( user => {
        this.user = user;
        //localStorage para almacenar token va traer usuario.id
        localStorage.setItem('token', user.id.toString());
      })
      )

}
}
*/
