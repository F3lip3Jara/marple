
import { LogSysService } from './../../../servicios/log-sys.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LogServiciosService } from 'src/app/servicios/log-servicios.service';
import { UsersService } from 'src/app/servicios/users.service';
import { RestService } from 'src/app/servicios/rest.service';
import { ExcelService } from 'src/app/servicios/excel.service';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { LoadingService } from 'src/app/servicios/loading.service';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-trab-log',
  templateUrl: './trab-log.component.html',
  styleUrls: ['./trab-log.component.css']
})
export class TrabLogComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  datatableElement?: DataTableDirective;


  loading      : boolean              = true;
  dtOptions    : DataTables.Settings  = {} ;
  tblLog       : any                  = {};
  token        : string               = '';
  parametros   : any []               = [];
  carga        : string               = "invisible";


  constructor(private servicio      : UsersService,
              private rest          : RestService,
              private excel         : ExcelService,
              private servicioaler  : AlertasService,
              private serviLoad     : LoadingService
    ) {
            this.token = this.servicio.getToken();
    }

  ngOnInit(): void {
    this.tblData();
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
  }

  public tblData(){
    this.serviLoad.sumar.emit(1);
    this.tblLog = {};
    this.rest.get('trabLogSys' , this.token, this.parametros).subscribe(data => {
        this.tblLog = data;
    });
    setTimeout(()=> {
        this.carga = 'visible';
        this.loading = false;
     },1500 );
   }
}
