import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { UsuarioModel } from '../models/usuario.model';

import { map } from 'rxjs/operators'
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  endpoint: string = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  apiKey: string = 'AIzaSyAsrDSgBD2wEDcJ1rNSBcyIg2v7kG-9VVA ';

  userToken: string;

  constructor(private http: HttpClient) { }

  login(usuario: UsuarioModel) {

    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.endpoint}signInWithPassword?key=${this.apiKey}`
      , authData).pipe(
        map(resp => {
          this.guardarToken(resp['idToken']);
          // console.log( this.userToken.length );
          return resp;
        }));
  }

  guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
  }

  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  estaAutenticado(): boolean {
    this.leerToken();
    return this.userToken.length > 2;
  }

}
