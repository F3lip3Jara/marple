import { Etapas } from 'src/app/model/etapas.model';
import { Etapasdet } from './../../../model/etapasdet.model';
import { LinksService } from 'src/app/servicios/links.service';
import { EtapasdetService } from './../../../servicios/etapasdet.service';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from 'src/app/servicios/rest.service';
import { UsersService } from 'src/app/servicios/users.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { ExcelService } from 'src/app/servicios/excel.service';

@Component({
  selector: 'app-trab-etapa-detalle',
  templateUrl: './trab-etapa-detalle.component.html',
  styleUrls: ['./trab-etapa-detalle.component.css']
})
export class TrabEtapaDetalleComponent implements OnInit {


  @ViewChild(DataTableDirective, {static: false})
  datatableElement?: DataTableDirective;


  loading      : boolean              = true;
  dtOptions    : DataTables.Settings  = {} ;
  tblEtapas    : any                  = {};
  token        : string               = '';
  parametros   : any []               = [];
  carga        : string               = "invisible";
  etapasDet    : Etapasdet;
  etapas       : Etapas;



  constructor(private fb: FormBuilder,
    private servicio : UsersService,
    private rest : RestService,
    private modal : NgbModal,
    private excel: ExcelService,
    private servicioaler : AlertasService,
    private etapasser : EtapasdetService,
    private servicioLink     : LinksService) {
      this.token     = servicio.getToken();
      this.etapas    = this.etapasser.getEtapa();
      this.etapasDet = new Etapasdet(this.etapas.idEta , this.etapas.etaDes , this.etapas.etaProd, 0 , '' );
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
    this.parametros = [{key :'idEta' ,value: this.etapas.idEta} ];
    this.rest.get('trabEtapasDet' , this.token, this.parametros).subscribe(data => {
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

public modelUp(content :any , etapasx: any){
  this.etapasDet.setEtaDesDes(etapasx.etaDesDes);
  this.etapasDet.setIdEtaDet(etapasx.idEtaDes);
  this.modal.open(content);
}

public Excel(){
  this.excel.exportAsExcelFile(this.tblEtapas, 'roles');
  return false;
}

public delEtapas(etapas : any){
  let url      = 'delEtapasDet';
  this.carga   = 'invisible';
  this.loading = true;

  if(etapas.etaDesDel =='S'){
   this.rest.post(url ,this.token, etapas).subscribe(resp => {
       resp.forEach((elementx : any)  => {
         if(elementx.error == '0'){
           this.modal.dismissAll();
           setTimeout(()=>{
             this.servicioaler.setAlert('','');
             this.tblData();
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
  }else{
    this.carga    = 'visible';
    this.loading  = false;
    this.servicioaler.setAlert('No se puede eliminar','danger');
    this.servicioaler.disparador.emit(this.servicioaler.getAlert());
  }
   return false;
}

public actionEtapaDet( etaDesDes: any  ,tipo :string ){
  let url      = '';
  let etapasx  = new Etapasdet(this.etapasDet.idEta , this.etapasDet.etaDes ,this.etapasDet.etaProd, this.etapasDet.idEtaDes, etaDesDes);
  console.log(etapasx);
  this.carga   = 'invisible';
  this.loading = true;

  if(tipo =='up'){
     url = 'updEtapasDet';
  }else{
    url = 'insEtapasDet';
  }

  this.rest.post(url, this.token, etapasx).subscribe((resp:any) => {
    resp.forEach((elementx : any)  => {
      if(elementx.error == '0'){
        this.modal.dismissAll();
        setTimeout(()=>{
          this.tblEtapas = {};
          this.rest.get('trabEtapasDet' , this.token, this.parametros).subscribe(data => {
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

public volver(){
  const d = 'etapas';
  this.servicioLink.disparador.emit(d);
}


}
