import { Directive , ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appReceptor]'
})
export class ReceptorDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }


}
