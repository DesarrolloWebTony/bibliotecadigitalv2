import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/storage';

import { from } from 'rxjs';
import { Observable } from 'rxjs';
import { finalize, delay, last, switchMap } from 'rxjs/operators';

import { LibroModel } from '../models/libro.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor( private http: HttpClient,
               private storage: AngularFireStorage ) { }

  crearLibro(libro: LibroModel) {

    return this.http.post(
      'https://bibliotecadigital-77a9e.firebaseio.com/libros.json',
      libro)
      .pipe(map((resp: any) => {
        libro.id = resp.name
        return libro;
      }));
  }

  actualizarLibro(libro: LibroModel) {

    const libroTemp = {
      ...libro
    };

    delete libroTemp.id;

    return this.http.put(`https://bibliotecadigital-77a9e.firebaseio.com/libros/${libro.id}.json`,
      libroTemp
    );

  }

  obtenerLibros(){
    return this.http.get("https://bibliotecadigital-77a9e.firebaseio.com/libros.json")
                    .pipe(
                      map( resp => this.crearArreglo( resp ))
                    );
  }

  borrarLibro( id:string, indexImg:string ){

    const rutaArchivo = `gs://bibliotecadigital-77a9e.appspot.com/imgLibros/${indexImg}`; 
    const fileRefDel = this.storage.storage.refFromURL(rutaArchivo).delete();
    // el metodo delete devuelve una promesa para poder ser resuelta se tiene que ejecutar el the()
    fileRefDel.then()
    // Implementar el catch

    return this.http.delete(`https://bibliotecadigital-77a9e.firebaseio.com/libros/${ id }.json`)
  }

  private crearArreglo( libroObj: object ){

    const libros: LibroModel[] = [];
    if( libroObj === null ){
      return [];
    }

    Object.keys( libroObj ).forEach(
      key => {
          const libro: LibroModel = libroObj[key];
          libro.id = key;
          
          libros.push( libro );
      });

      return libros
  }

}
