import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appResaltarestado]'
})
export class ResaltarestadoDirective {

  @Input() color: string;
  @Input('appResaltarestado') resaltarColor: string;  

  constructor(private element: ElementRef) { }

  ngOnInit() {
    this.resaltar();
  }

  resaltar() {
    if(this.resaltarColor == "Pendiente"){
      this.element.nativeElement.style.backgroundColor = '#F64C08'; 
   
    }else if(this.resaltarColor == "Cancelado"){ 
        this.element.nativeElement.style.backgroundColor = '#F60813'; 
    
     
    }else if(this.resaltarColor == "Aceptado"){
      this.element.nativeElement.style.backgroundColor = '#046606'; 
    
    }else if(this.resaltarColor == "Finalizado"){
      this.element.nativeElement.style.backgroundColor = '#0370A4'; 
     
    }
    else{
      this.element.nativeElement.style.backgroundColor = '#F60813'; //rosa
     
    } 
  }

}
