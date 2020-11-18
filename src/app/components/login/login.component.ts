import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

import { UsuarioModel } from '../../models/usuario.model'

import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;
  
  constructor( private auth:AuthService, private router:Router ) { }

  ngOnInit(): void {
    this.usuario = new UsuarioModel();
    // this.usuario.email = 'tonilume@hotmail.com';
  }

  login( form:NgForm ){

    if( form.invalid ){
      return;
    }

    this.auth.login( this.usuario )
             .subscribe(
                resp =>{
                      // console.log(this.auth.estaAutenticado());
                      console.log( resp );
                      this.router.navigateByUrl('admin');
                },(err) => {
                    Swal.fire({
                      icon: 'error',
                      title: 'Algo ocurrio mal',
                      text: err.error.error.message,
                    })
                });

    // console.log('formulario enviado');
    // console.log( this.usuario );
    // console.log( form );
  }

}
