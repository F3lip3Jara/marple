import { Injectable, EventEmitter, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosServiceService {

  private productos : any    = null;
  private datPrd    : any    = null;


  @Output() disparador :EventEmitter <any> = new EventEmitter();

  constructor( ) {

   }

   setProductos(productos : any) : any {
      this.productos = productos ;
      return this.productos;
   }


   getProductos() : any {
         return this.productos;
   }

   setDatPrd(datPrd : any) : any {
    this.datPrd = datPrd ;
    return this.datPrd;
 }


   getDatPrd() : any {
      return this.datPrd;
   }

}
