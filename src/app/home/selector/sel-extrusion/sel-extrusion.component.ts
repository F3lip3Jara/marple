import { UsersService } from 'src/app/servicios/users.service';
import { RestService } from './../../../servicios/rest.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-sel-extrusion',
  templateUrl: './sel-extrusion.component.html',
  styleUrls: ['./sel-extrusion.component.css']
})
export class SelExtrusionComponent implements OnInit {

  extrusiones  : any;
  carga        : string               = "";
  dtOptions    : DataTables.Settings  = {} ;
  parametros   : any []               = [];
  token        :string                = '';
  extLotSal    :string                = '';


  @Output() onItemAdded: EventEmitter<any>;

  constructor(
    private modal        : NgbModal,
    private rest         : RestService,
    private servicio     : UsersService,
  ) {
    this.extrusiones = {};
    this.token       = this.servicio.getToken();
    this.onItemAdded = new EventEmitter();

    $("#modal").show();
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
      this.parametros = [{key:'idEta' , value: '5'}];
      this.rest.get('extruDis' , this.token , this.parametros).subscribe(data => {
            this.extrusiones = data;
      })
  }

  extrusion(content : any){
    this.modal.open(content , { size: 'lg' });
  }

  cambio(extrusion : any){
    this.onItemAdded.emit(extrusion);
    $("#modal").hide();
    this.extLotSal = extrusion.extLotSal;
    return false;
  }


}
