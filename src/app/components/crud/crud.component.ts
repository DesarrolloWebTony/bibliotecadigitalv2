import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { LibroModel } from 'src/app/models/libro.model';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styles: [
  ]})
export class CrudComponent implements OnInit {

  libros: LibroModel[] = [];

  constructor( private crud: CrudService) { }

  ngOnInit(){
    this.crud.obtenerLibros()
             .subscribe( resp =>{
                  console.log( resp );
                  this.libros = resp;
             });
  }

  borrarLibro( libro: LibroModel, i: number ){

    this.libros.splice(i,1);
    this.crud.borrarLibro( libro.id, libro.indexImg )
              .subscribe();
  }
  

}
