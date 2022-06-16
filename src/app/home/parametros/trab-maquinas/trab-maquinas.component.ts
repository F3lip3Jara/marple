import { LoadingService } from './../../../servicios/loading.service';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from 'src/app/servicios/rest.service';
import { UsersService } from 'src/app/servicios/users.service';
import { Maquinas } from './../../../model/maquinas.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { FormBuilder } from '@angular/forms';
import { ExcelService } from 'src/app/servicios/excel.service';

@Component({
  selector: 'app-trab-maquinas',
  templateUrl: './trab-maquinas.component.html',
  styleUrls: ['./trab-maquinas.component.css']
})
export class TrabMaquinasComponent implements OnInit {


  @ViewChild(DataTableDirective, {static: false})
  datatableElement?: DataTableDirective;


  loading      : boolean              = true;
  dtOptions    : DataTables.Settings  = {} ;
  tblMaquinas  : any                  = {};
  token        : string               = '';
  parametros   : any []               = [];
  carga        : string               = "invisible";
  maquina     : Maquinas;
  etapas       : any;


  constructor(private fb          : FormBuilder,
              private servicio    : UsersService,
              private rest        : RestService,
              private modal       : NgbModal,
              private excel       : ExcelService,
              private servicioaler: AlertasService,
              private serviLoad   : LoadingService) {

      this.token     = servicio.getToken();
      this.maquina  = new Maquinas(0,'','',0,'' , '' , '');
      this.serviLoad.sumar.emit(1);
      this.rest.get('etapasProd' , this.token, this.parametros).subscribe(data => {
            this.etapas   = data;
       });
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
    this.tblMaquinas = {};
    this.serviLoad.sumar.emit(1);
    this.rest.get('trabMaquinas' , this.token, this.parametros).subscribe(data => {
        this.tblMaquinas = data;
    });

    setTimeout(()=> {
        this.carga = 'visible';
        this.loading = false;
     },1500 );
   }



 public modalIns(content : any ){
    this.modal.open(content);
  }

public modelUp(content :any , maquinas: any){
  this.maquina.setIdEta(maquinas.idEta);
  this.maquina.setEtaDes(maquinas.etaDes);
  this.maquina.setidMaq(maquinas.idMaq);
  this.maquina.setMaqDes(maquinas.maqDes);
  this.maquina.setMaqCod(maquinas.maqCod);
  this.modal.open(content);
}

public Excel(){
  this.excel.exportAsExcelFile(this.tblMaquinas, 'maquinas');
  return false;
}

public delEtapas(maquina : any){
  let url      = 'delMaquinas';
  this.carga   = 'invisible';
  this.loading = true;
  this.serviLoad.sumar.emit(1);
   this.rest.post(url ,this.token, maquina).subscribe(resp => {
       resp.forEach((elementx : any)  => {
         if(elementx.error == '0'){
          this.serviLoad.sumar.emit(1);
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
   return false;
}

public actionMaq(  idEta : any , idMaq : any , maqDes: any   ,tipo :string , maqCod : string , maqTip: string ){
  let url      = '';
  let maquinax = new Maquinas(idEta , '', '', idMaq , maqDes,maqCod , maqTip) ;
  this.carga   = 'invisible';
  this.loading = true;

  if(tipo =='up'){
     url = 'updMaquinas';
  }else{
    url = 'insMaquinas';
  }
  this.serviLoad.sumar.emit(1);
  this.rest.post(url, this.token, maquinax).subscribe((resp:any) => {
    resp.forEach((elementx : any)  => {
      if(elementx.error == '0'){
        this.modal.dismissAll();
        setTimeout(()=>{
          this.serviLoad.sumar.emit(1);
          this.tblMaquinas = {};
          this.rest.get('trabMaquinas' , this.token, this.parametros).subscribe(data => {
              this.tblMaquinas = data;
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


}
