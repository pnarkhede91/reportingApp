import { Directive , ElementRef, Renderer } from '@angular/core';

@Directive({
  selector: '[appTestDirective]'
})
export class TestDirectiveDirective {

  constructor(el: ElementRef, renderer: Renderer) {  renderer.setElementStyle(el.nativeElement, 'display', 'none');}

}
