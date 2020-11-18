import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//Firebase config
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import 'firebase/storage';

import { AppComponent } from './app.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LibrosComponent } from './components/libros/libros.component';
import { CursosComponent } from './components/cursos/cursos.component';
import { AcercaComponent } from './components/acerca/acerca.component';
import { LoginComponent } from './components/login/login.component';

import { APP_ROUTING } from './app.routes';
import { CrudComponent } from './components/crud/crud.component';
import { NuevolibroComponent } from './components/nuevolibro/nuevolibro.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HomeComponent,
    LibrosComponent,
    CursosComponent,
    AcercaComponent,
    LoginComponent,
    CrudComponent,
    NuevolibroComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
