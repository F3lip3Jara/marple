import { Proveedor } from './../model/proveedor.model';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { RestService } from './rest.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  private proveedor : any    = null;
  private datPrv    : any    = null;


  @Output() disparador :EventEmitter <any> = new EventEmitter();

  constructor( ) {

   }

   setProveedor(proveedor : any) : any {
      this.proveedor = proveedor ;
      return this.proveedor;
   }


   getProveedor() : any {
         return this.proveedor;
   }

   setDatPrv(datPrv : any) : any {
    this.datPrv = datPrv ;
    return this.datPrv;
 }


   getDatPrv() : any {


      return this.datPrv;
   }

}
