import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';


import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { DialogConfig } from '@angular/cdk/dialog';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit{

  //formulario reactivo
  //tiene las propiedades que maneje en el formulario
  public heroForm =   new FormGroup({
    id:               new FormControl<string>(''),
    superhero:        new FormControl<string>('', { nonNullable:true }),
    publisher:        new FormControl<Publisher>( Publisher.DCComics),
    alter_ego:        new FormControl(''),  //estos pueden ser null
    first_appearance: new FormControl(''),
    characters:       new FormControl(''),
    alt_img:          new FormControl(''),

});


  public publishers = [
    { id: 'DC Comics',     desc: 'DC - Comics'},
    { id: 'Marvel Comics', desc: 'Marvel - Comics'},
    { id: 'pruebas ',      desc: 'test - x'},
  ];

  constructor(private heroesService: HeroesService,
              private activatedRoute: ActivatedRoute,  //trae los parametros
              private router: Router,
              private snackbar: MatSnackBar,
              private dialog: MatDialog,
              ){}



  //ponemos un getter para obtener el dato
  // y ponemos as para que tome el valor igual porque sino sale error
  // si hay un id entonces actualiza sino crea uno  nuevo
    get currentHero(): Hero {
      const hero = this.heroForm.value as Hero;
      console.log(hero);
      return hero;
}

ngOnInit(): void {
  //sino tiene en el url editar enconce no hace nada
  if( !this.router.url.includes('edit')) return;

  this.activatedRoute.params
  .pipe(
         switchMap( ({ id }) => this.heroesService.getHeroById( id ) ),
       ).subscribe( hero => {

          if ( !hero ) return this.router.navigateByUrl('/');

          this.heroForm.reset(hero);
          return;
         });

}




  onSubmit():void {
    if(this.heroForm.invalid) return; //sino es valido no  hace nada

    //si tiene un id lo actualiza
    if( this.currentHero.id){
      //manda el this.currentHero como argumento y esto es un observador
      //entonces hay que poner un subscribe
      this.heroesService.updateHero(this.currentHero)
      .subscribe(hero => {
        this.showSnackbar(`${ hero.superhero } update!`);

      });
      return;

    }


     //en caso de no tener un id lo crea
     //hay que subcribir para que funcione el observador
      this.heroesService.addHero (this.currentHero)
      .subscribe( hero => {
        // mostrar sanbar y navegar a /heroes/edit/hero.id

        this.router.navigate(['/heroes/edit', hero.id ]);
        this.showSnackbar(`${ hero.superhero } created!`);

      });

    }


   //optimiznado  onDeleteHero()
   onDeleteHero(){
    if( !this.currentHero.id) throw Error('Hero id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.heroForm.value
    });

      //este es un observable entoces podemos poner un pipe

      dialogRef.afterClosed()
        .pipe(
        //filtro es true lo deja pasar
        filter( (result: boolean) => result === true ),
        //tap( result => console.log(result) )
        //ejecutamos el observable
        switchMap( ()=> this.heroesService.deleteHeroById( this.currentHero.id ) ),
        //ponemos el tap para ver el resultado en log
        //tap ( wasDeleted => console.log(wasDeleted) ),
        //si se lo borro lo deja pasar wasDeleted
        filter( (wasDeleted: boolean) => wasDeleted),
        )
        //este subescribe se dispara solo si se elimino
        //() es true
        .subscribe( () => {
        //ponemos la navegacion
        this.router.navigate(['/heroes']);
        });

      }

   /*
     onDeleteHero(){
      if(!this.currentHero.id) throw Error('Hero id is required');
      // DialogOverviewExampleDialog envia a la vista
      //lo cambiamos por componente
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        data: this.heroForm.value
      });

      dialogRef.afterClosed().subscribe(result => {
        if( !result )
        {
        return;
        } else

          {

            this.heroesService.deleteHeroById( this.currentHero.id )
            .subscribe( wasDeleted => {
            if(wasDeleted)
            this.router.navigate(['/heroes']);
             })
          }
      });


        //return;
        //console.log('The dialog was closed');
        //console.log({ result });

        //this.result = result;
        //});

     }

    */

      showSnackbar( message: string ): void {
        this.snackbar.open( message,  'done', {
          duration:2500,
      })
    }
}
