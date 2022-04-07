import { LinksService } from 'src/app/servicios/links.service';
import { EtapasdetService } from './../../../servicios/etapasdet.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Alert } from 'src/app/model/alert.model';
import { Etapas } from 'src/app/model/etapas.model';
import { AlertasService } from 'src/app/servicios/alertas.service';
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
  tblEtapas    : any                  = {};
  token        : string               = '';
  parametros   : any []               = [];
  carga        : string               = "invisible";
  etapas       : Etapas;

  constructor(private fb: FormBuilder,
    private servicio : UsersService,
    private rest : RestService,
    private modal : NgbModal,
    private excel: ExcelService,
    private servicioaler : AlertasService,
    private etapasser : EtapasdetService,
    private servicioLink     : LinksService) {

      this.token = servicio.getToken();
      this.etapas= new Etapas(0, '' , '');
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
     },1500 );
   }

  public modalIns(content : any ){
      this.modal.open(content);
  }

  public modelUp(content :any , etapasx: Etapas){
    this.etapas.setIdEta(etapasx.idEta);
    this.etapas.setEtaDes(etapasx.etaDes);
    this.etapas.setEtProd(etapasx.etaProd);
    this.modal.open(content);
  }

  public Excel(){
  this.excel.exportAsExcelFile(this.tblEtapas, 'roles');
  return false;
  }

  public delEtapas(etapas : any){
    let url      = 'delEtapas';
    this.carga   = 'invisible';
    this.loading = true;

     this.rest.post(url ,this.token, etapas).subscribe(resp => {
         resp.forEach((elementx : any)  => {
           if(elementx.error == '0'){
             this.modal.dismissAll();
             setTimeout(()=>{
               this.servicioaler.setAlert('','');
               this.tblEtapas = {};
               this.rest.get('trabEtapas' , this.token, this.parametros).subscribe(data => {
                   this.tblEtapas = data;
               });

               this.datatableElement?.dtInstance.then((dtInstance : DataTables.Api) => {
                 dtInstance.destroy().draw();
               });
               this.carga    = 'visible';
               this.loading  = false;
             },1500);

           }else{
             this.carga    = 'visible';
             this.loading  = false;
           }
         });
     });
     this.servicioaler.disparador.emit(this.servicioaler.getAlert());
     return false;
  }

  public actionEtapa(etapas : any , etaProd: any, tipo :string ){
    let url      = '';
    let etapasx  = new Etapas(this.etapas.idEta , etapas , etaProd );
    this.carga   = 'invisible';
    this.loading = true;

    if(tipo =='up'){
       url = 'updEtapas';
    }else{
      url = 'insEtapas';
    }

    this.rest.post(url, this.token, etapasx).subscribe((resp:any) => {
      resp.forEach((elementx : any)  => {
        if(elementx.error == '0'){
          this.modal.dismissAll();

          setTimeout(()=>{
            this.tblEtapas = {};
            this.rest.get('trabEtapas' , this.token, this.parametros).subscribe(data => {
                this.tblEtapas = data;
            });
            this.datatableElement?.dtInstance.then((dtInstance : DataTables.Api) => {
              dtInstance.destroy().draw();
            });
            this.carga    = 'visible';
            this.loading  = false;
          },1500);
      }else {
        this.carga    = 'visible';
        this.loading  = false;
      }
        });
    });
    this.servicioaler.disparador.emit(this.servicioaler.getAlert());
    return false;
  }

  public desEtapa( etapasx : any) {
    this.etapasser.setEtapa(etapasx);
    this.servicioLink.disparador.emit('insEtapasDet');
  }

}
