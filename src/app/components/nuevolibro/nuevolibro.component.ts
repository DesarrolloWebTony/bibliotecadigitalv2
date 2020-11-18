import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import 'firebase/storage';

import { Observable } from 'rxjs';
import { finalize, delay, map, last, switchMap } from 'rxjs/operators';

import { CrudService } from '../../services/crud.service';

import{ LibroModel } from '../../models/libro.model';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-nuevolibro',
  templateUrl: './nuevolibro.component.html',
  styles: [
  ]
})
export class NuevolibroComponent implements OnInit {

  libro: LibroModel;
  uploadURL: string;
  procesoSubidaImg: Observable<number>;

  constructor( private crud: CrudService, 
               private storage: AngularFireStorage ) { }

  ngOnInit(): void {
    this.libro = new LibroModel();
  }

  upload( event ){

    const archivo = event.target.files[0];
    // console.log( archivo );
    const idAleatorio = Math.random().toString(36).substring(2);
    console.log( idAleatorio );
    this.libro.indexImg = idAleatorio;
    const rutaArchivo = `imgLibros/${idAleatorio}`;
    const fileRef = this.storage.ref( rutaArchivo );
    const task = this.storage.upload( rutaArchivo, archivo );

    this.procesoSubidaImg = task.percentageChanges();

    // task.snapshotChanges().pipe(
    //   finalize(() => this.uploadURL2 = fileRef.getDownloadURL())
    // ).subscribe( resp => {
    //     console.log(resp)
    // });

    task.snapshotChanges().pipe(
      last(),
      switchMap(() => fileRef.getDownloadURL())
    ).subscribe(resp => {
      this.uploadURL = resp;
      this.libro.urlImg = this.uploadURL;
      console.log(this.uploadURL);
      Swal.fire({
        icon: 'success',
        title: 'Imagen almacenada',
        showConfirmButton: false,
        timer: 1500
      });
    });
    
  }
  
  
  guardar( form:NgForm ){

    if( form.invalid ){
        return;
    }

    if( this.libro.id){
      this.crud.actualizarLibro( this.libro )
               .subscribe( resp =>{
                  console.log( resp );
                  Swal.fire({
                    icon: 'success',
                    title: 'Libro actualizado',
                    showConfirmButton: false,
                    timer: 1500
                  });
               });   
    }
    else{
      this.crud.crearLibro( this.libro )
      .subscribe( resp =>{
         console.log( resp );
         Swal.fire({
          icon: 'success',
          title: 'Libro creado',
          showConfirmButton: false,
          timer: 1500
        });
      });   
    }

      // console.log( form );
      console.log("nuevo libro" + this.libro );
      console.log(this.libro.urlImg);
  }

}
