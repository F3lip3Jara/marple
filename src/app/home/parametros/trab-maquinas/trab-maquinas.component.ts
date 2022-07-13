import { LoadingService } from './../../../servicios/loading.service';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from 'src/app/servicios/rest.service';
import { UsersService } from 'src/app/servicios/users.service';
import { Maquinas } from './../../../model/maquinas.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { UntypedFormBuilder } from '@angular/forms';
import { ExcelService } from 'src/app/servicios/excel.service';
import { LogSysService } from 'src/app/servicios/log-sys.service';
import { LogSys } from 'src/app/model/logSys.model';

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
  etapas       : any                  = {};


<<<<<<< HEAD
  constructor(private fb          : UntypedFormBuilder,
=======
  constructor(private fb          : FormBuilder,
>>>>>>> 3a629026ca5e04e1d05975795fe6b23bf253a8dd
              private servicio    : UsersService,
              private rest        : RestService,
              private modal       : NgbModal,
              private excel       : ExcelService,
              private servicioaler: AlertasService,
<<<<<<< HEAD
              private serviLoad   : LoadingService,
              private serLog      : LogSysService) {
=======
              private serviLoad   : LoadingService) {
>>>>>>> 3a629026ca5e04e1d05975795fe6b23bf253a8dd

      this.token     = servicio.getToken();
      this.maquina  = new Maquinas(0,'','',0,'' , '' , '');
      this.serviLoad.sumar.emit(1);
<<<<<<< HEAD
    
=======
      this.rest.get('etapasProd' , this.token, this.parametros).subscribe(data => {
            this.etapas   = data;
       });
>>>>>>> 3a629026ca5e04e1d05975795fe6b23bf253a8dd
    }

  ngOnInit(): void {
    
    this.rest.get('etapasProd' , this.token, this.parametros).subscribe(data => {
      this.etapas   = data;
    });

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
<<<<<<< HEAD
          let des        = 'Maquina eliminada ' + maquina.maqCod ;
          let log        = new LogSys(2, '' , 41 , 'ELIMINAR MAQUINA' , des);
          this.serLog.insLog(log);
=======
>>>>>>> 3a629026ca5e04e1d05975795fe6b23bf253a8dd
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
  let des      = '';
  let lgName   = '';
  let idEtaDes = 0;

  if(tipo =='up'){
    url      = 'updMaquinas';
    des      = 'Actualizar mquina ' + maqCod;    
    lgName   = 'ACTUALIZAR MAQUINA';
    idEtaDes = 40;
  }else{
    url      = 'insMaquinas';
    des      = 'Ingreso maquina ' + maqCod;
    lgName   = 'INGRESO MAQUINA';
    idEtaDes = 39;
  }
  this.serviLoad.sumar.emit(1);
  this.rest.post(url, this.token, maquinax).subscribe((resp:any) => {
    resp.forEach((elementx : any)  => {
      if(elementx.error == '0'){
        let log        = new LogSys(2, '' , idEtaDes , lgName , des);
        this.serLog.insLog(log);       
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
