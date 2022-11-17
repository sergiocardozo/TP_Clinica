import { Directive, ElementRef, HostBinding, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appResaltarespecialista]'
})
export class ResaltarespecialistaDirective {

  constructor(private element: ElementRef, private render: Renderer2) { }

  @HostBinding('style.backgroundColor') background:string='transparent';
  @HostBinding('style.border') border:string='none';

  @HostListener('mouseenter') mouseenter(){
   // this.background='blue';
    this.border='red 2px solid'
  }

  @HostListener('mouseleave') mouseleave(){
    this.background='transparent';
    this.border='none'
  }
}
