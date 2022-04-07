import { UsersService } from 'src/app/servicios/users.service';
import { RestService } from './../../../servicios/rest.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';
import { getParsedCommandLineOfConfigFile } from 'typescript';

@Component({
  selector: 'app-sel-producto',
  templateUrl: './sel-producto.component.html',
  styleUrls: ['./sel-producto.component.css']
})
export class SelProductoComponent implements OnInit {
  productos    : any;
  carga        : string               = "";
  dtOptions    : DataTables.Settings  = {} ;
  parametros   : any []               = [];
  token        :string                = '';
  prdcod       :string                = '';

  @Output() onItemAdded: EventEmitter<any>;

  constructor(
    private modal        : NgbModal,
    private rest         : RestService,
    private servicio     : UsersService,
  ) {
    this.productos = {};
    this.token    = this.servicio.getToken();
    this.onItemAdded = new EventEmitter();
   }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 20,
      lengthMenu : [20,50,100, 200],
      processing: true,
      language: {
        emptyTable: '',
        zeroRecords: 'No hay coincidencias',
        lengthMenu: 'Mostrar _MENU_ elementos',
        search: 'Buscar:',
        info: 'De _START_ a _END_ de _TOTAL_ elementos',
        infoEmpty: 'De 0 a 0 de 0 elementos',
        infoFiltered: '(filtrados de _MAX_ elementos totales)',
        paginate: {
          first: 'Prim.',
          last: 'Últ.',
          next: 'Sig.',
          previous: 'Ant.'
        }
      }}

      this.rest.get('prodTerm' , this.token , this.parametros).subscribe(data => {
            this.productos = data;
      })
  }

  proveedor(modalSelPrv : any){
    this.modal.open(modalSelPrv , { size: 'lg' });
  }

  cambio(producto : any){
    this.onItemAdded.emit(producto);
    this.modal.dismissAll();
    this.prdcod = producto.prdCod;
    return false;
  }

}
