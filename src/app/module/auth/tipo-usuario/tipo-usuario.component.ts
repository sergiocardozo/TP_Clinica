import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tipo-usuario',
  templateUrl: './tipo-usuario.component.html',
  styleUrls: ['./tipo-usuario.component.css']
})
export class TipoUsuarioComponent implements OnInit {

  noMostrar = false;  
  displayOption = true;
  displayRegistro = false;
  tipoUsuario = '';
  displayReg = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  seleccionarTipo(tipo: string) {

    this.displayOption = false;
    this.displayRegistro = true;
    this.tipoUsuario = tipo;

  }
  eventLaunc(){
    this.displayOption = true;
    this.displayReg = false;
  }
}
