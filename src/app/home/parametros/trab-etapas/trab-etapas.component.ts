import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Etapas } from 'src/app/model/etapas.model';
import { ExcelService } from 'src/app/servicios/excel.service';
import { RestService } from 'src/app/servicios/rest.service';
import { UsersService } from 'src/app/servicios/users.service';

@Component({
  selector: 'app-trab-etapas',
  templateUrl: './trab-etapas.component.html',
  styleUrls: ['./trab-etapas.component.css']
})
export class TrabEtapasComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  datatableElement?: DataTableDirective;

  loading      : boolean              = true;
  dtOptions    : DataTables.Settings  = {} ;
  //filtroRol    : FormGroup;
  tblEtapas    : any                  = {};
  token        : string               = '';
  parametros   : any []               = [];
  carga        : string               = "invisible";
  etapas       : Etapas;

  constructor(private fb: FormBuilder,
    private servicio : UsersService,
    private rest : RestService,
    private modal : NgbModal,
    private excel: ExcelService) {

      this.token = servicio.getToken();
      this.etapas= new Etapas(0, '');
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
    this.tblEtapas = {};
    this.rest.get('trabEtapas' , this.token, this.parametros).subscribe(data => {
        this.tblEtapas = data;
    });
    setTimeout(()=> {
        this.carga = 'visible';
        this.loading = false;
     },3000 );
   }

  public modalIns(content : any ){
      this.modal.open(content);
  }

  public modelUp(content :any){

    this.modal.open(content);
  }

  public Excel(){
  this.excel.exportAsExcelFile(this.tblEtapas, 'roles');
  return false;
  }

  public delEtapas(etapas : any){
    let url = 'delEtapas';
    this.rest.post(url ,this.token, etapas).subscribe(resp => {
      if(resp == 'OK'){
        this.modal.dismissAll();
        this.loading      = true;
        this.tblEtapas     = {};
        this.rest.get('tblEtapas' , this.token, this.parametros).subscribe(respuesta => {
          this.tblEtapas = respuesta;
          this.carga    = 'visible';
          this.loading  = false;
        });

      this.datatableElement?.dtInstance.then((dtInstance : DataTables.Api) => {
        dtInstance.destroy().draw();
      });
    }
    });
  }

  public actionEtapa(etapas : any , tipo :string ){
    let url = '';
    let rolesx = new Etapas(this.etapas.idEta , etapas);

    if(tipo =='up'){
       url = 'updEtapas';
    }else{
      url = 'insEtapas';
    }
    this.rest.post(url, this.token, rolesx).subscribe(resp => {
        if(resp == 'OK'){
          this.modal.dismissAll();
          this.loading      = true;
          this.tblEtapas     = {};
          this.rest.get('trabEtapas' , this.token, this.parametros).subscribe(respuesta => {
            this.tblEtapas = respuesta;
              this.carga = 'visible';
              this.loading = false;

          });

        this.datatableElement?.dtInstance.then((dtInstance : DataTables.Api) => {
          dtInstance.destroy().draw();
        });
      }
    });
  }

}
