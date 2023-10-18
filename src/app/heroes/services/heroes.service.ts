import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environments } from 'src/environments/environments';
import { Hero } from '../interfaces/hero.interface';

@Injectable({providedIn: 'root'})

export class HeroesService {

  private baseUrl: string = environments.baseUrl;

  constructor(private http: HttpClient) { }


  getHeroes(): Observable<Hero[]> {

    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes`);
  }

getHeroById( id: string ) : Observable <Hero | undefined> {
  return this.http.get<Hero>(`${ this.baseUrl }/heroes/${ id }`)
  .pipe(
    catchError( error => of(undefined) )
  );
  }


  getSuggestions( query: string ): Observable<Hero[]> {
   return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${ query } &_limit=6`);

   }




   addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(`${this.baseUrl }/heroes`, hero);
   }


   updateHero( hero: Hero): Observable<Hero>{
    if(!hero.id) throw Error ('Hero id is required')
    return this.http.patch<Hero>(`${this.baseUrl }/heroes/${hero.id}`, hero);
   }


   //optimizado
   deleteHeroById( id: string): Observable<boolean>{
    return this.http.delete(`${this.baseUrl}/heroes/${ id }`)
    .pipe(
      map( resp => true),             // no tiene error entra aqui
      catchError(err => of(false) ),  //no exite el recurso false no se borro
      );
   }




   /*
   deleteHeroById( id: string): Observable<boolean>{
    return this.http.delete(`${this.baseUrl}/heroes/${ id }`)
    //poniendo el estatus del error con le pipe catchError
    .pipe(
      //regresa un nuevo observable con el operador of con el valor de false idicando que o se borro
      //si hay un error en la conexion o no esta el recurso
       catchError(err => of(false) ),  //hay un error

       //map tranforma la respuesta no importa la respuesta que se tenga
       map( resp => true)  // si lleha hasta aqui no hay error


    );
   }
*/

   }
