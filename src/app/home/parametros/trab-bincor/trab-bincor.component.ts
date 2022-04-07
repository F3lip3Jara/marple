import { AlertasService } from 'src/app/servicios/alertas.service';
import { ExcelService } from 'src/app/servicios/excel.service';
import { RestService } from 'src/app/servicios/rest.service';
import { UsersService } from 'src/app/servicios/users.service';
import { DataTableDirective } from 'angular-datatables';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-trab-bincor',
  templateUrl: './trab-bincor.component.html',
  styleUrls: ['./trab-bincor.component.css']
})
export class TrabBincorComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  datatableElement?: DataTableDirective;


  loading      : boolean              = true;
  dtOptions    : DataTables.Settings  = {} ;
  tblBins   : any                  = {};
  token        : string               = '';
  parametros   : any []               = [];
  carga        : string               = "invisible";


  constructor(
    private servicio : UsersService,
    private rest : RestService,
    private excel: ExcelService,
    private servicioaler : AlertasService
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
    this.tblBins = {};
    this.rest.get('trabBins' , this.token, this.parametros).subscribe(data => {
        this.tblBins = data;
    });
    setTimeout(()=> {
        this.carga = 'visible';
        this.loading = false;
     },1500 );
   }




}
