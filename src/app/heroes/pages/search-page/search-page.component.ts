import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {




  //hay que poner en el heroesModule.ts el modulo para formularios
  public searchInput = new FormControl('');
  public heroes: Hero[] = [];
  public selectedHero?: Hero;



  constructor(private heroesService: HeroesService){}

  searchHero(){

    const value: string = this.searchInput.value || '';

    this.heroesService.getSuggestions(value)
    //recibo los heroes y this.heroes  los pongo en el arreglo
    .subscribe (heroes => this.heroes = heroes);


    /*
    //tomamos el valor del intoput de buscar
    const value:string = this.searchInput.value || '';
   // if (value) this.heroes= [];
     console.log({value});
    */

  }


  onSelectedOption(event: MatAutocompleteSelectedEvent):void {
   //console.log(event.option.value);
   if(!event.option.value){
    this.selectedHero = undefined;
    return;
  }


   const hero: Hero = event.option.value;
   this.searchInput.setValue( hero.superhero );
   this.selectedHero= hero;

   //trae el heroe
   //this.heroesService.getHeroById(hero.id);


  }

}
