import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styles: [
  ]
})
export class CursosComponent implements OnInit {

  galeria: string[] = ['assets/marilia-castelli-unsplash-robot.jpg',
                       'assets/thisisengineering-raeng-unsplash-compu.jpg', 
                       'assets/alexis-brown-unsplash.jpg',
                      'assets/marilia-castelli-unsplash-robot.jpg'];

  i: number = 0;

  urlImg:string =  'assets/marilia-castelli-unsplash-robot.jpg'; 

  constructor() { }

  ngOnInit(): void {
  }

  siguiente(){
    if(this.i >= this.galeria.length-1){
      this.i = 0;
    }
    console.log(this.urlImg = this.galeria[this.i += 1]);
  }

  atras(){
    if(this.i = 0){
      this.i = 3;
    }
    console.log(this.i);
    console.log(this.urlImg = this.galeria[this.i += 1]);
  }

}
