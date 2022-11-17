import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appEstadoResaltado]'
})
export class EstadoResaltadoDirective {

  @Input() color: string;
  @Input('appEstadoResaltado') resaltarColor: string;

  constructor(private element: ElementRef) { }

  ngOnInit() {
    this.resaltar();
  }

  resaltar() {
    if (this.resaltarColor == "Habilitado") {
      this.element.nativeElement.style.backgroundColor = '#F64C08';

    } else if (this.resaltarColor == "Deshabilitado") {
      this.element.nativeElement.style.backgroundColor = '#F60813';


    } else {
      this.element.nativeElement.style.backgroundColor = '#F60813'; 

    }
  }

}
