import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EtapasdetService {

  private etapa : any    = null;

  @Output() disparador :EventEmitter <any> = new EventEmitter();

  constructor( ) {

   }

   setEtapa(etapa : any) : any {
      this.etapa = etapa ;
      return this.etapa;
   }


   getEtapa() : any {
         return this.etapa;
   }


}
