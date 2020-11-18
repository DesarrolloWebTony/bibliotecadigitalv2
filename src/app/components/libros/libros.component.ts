import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { LibroModel } from 'src/app/models/libro.model';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styles: [
  ]
})
export class LibrosComponent implements OnInit {
  
  libros: LibroModel[] = [];

  constructor( private crud: CrudService ) { }

  ngOnInit(){

    this.crud.obtenerLibros()
             .subscribe( resp =>{
                console.log( resp );
                this.libros = resp;
             });   

  }

}
