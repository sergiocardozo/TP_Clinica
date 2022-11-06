import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-miperfil',
  templateUrl: './miperfil.component.html',
  styleUrls: ['./miperfil.component.css']
})
export class MiperfilComponent implements OnInit {

  img1: boolean = true;
  img2: boolean = false;
  user: any = '';
  constructor() {
    let ls = localStorage.getItem('usuario-clinica');
    if(ls != null) {
      this.user = JSON.parse(ls);
      console.log(this.user);
    }
   }

  ngOnInit(): void {
  }

  cambiarImagen() {
    if(this.img2 === true) {
      this.img1 = true;
      this.img2 = false;
    } else {
      this.img2 = true;
      this.img1 = false;

    }
  }
}
