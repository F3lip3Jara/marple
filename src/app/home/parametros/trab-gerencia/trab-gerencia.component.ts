import { LoadingService } from './../../../servicios/loading.service';
import { Alert } from 'src/app/model/alert.model';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { RestService } from 'src/app/servicios/rest.service';
import { UsersService } from 'src/app/servicios/users.service';
import { Gerencia } from 'src/app/model/gerencia.model';
import { DataTableDirective } from 'angular-datatables';
import { ExcelService } from 'src/app/servicios/excel.service';
import { LogSysService } from 'src/app/servicios/log-sys.service';
import { LogSys } from 'src/app/model/logSys.model';

@Component({
  selector: 'app-trab-gerencia',
  templateUrl: './trab-gerencia.component.html',
  styleUrls: ['./trab-gerencia.component.css']
})
export class TrabGerenciaComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  datatableElement?: DataTableDirective;


  loading      : boolean              = true;
  dtOptions    : DataTables.Settings  = {} ;
  tblGerencia  : any                  = {};
  token        : string               = '';
  parametros   : any []               = [];
  carga        : string               = "invisible";
  gerencia     : Gerencia;

<<<<<<< HEAD
  constructor(private fb          : UntypedFormBuilder,
=======
  constructor(private fb          : FormBuilder,
>>>>>>> 3a629026ca5e04e1d05975795fe6b23bf253a8dd
              private servicio    : UsersService,
              private rest        : RestService,
              private modal       : NgbModal,
              private servicioaler: AlertasService,
              private excel       : ExcelService,
<<<<<<< HEAD
              private serviLoad   : LoadingService,
              private serLog      : LogSysService) {
=======
              private serviLoad   : LoadingService) {
>>>>>>> 3a629026ca5e04e1d05975795fe6b23bf253a8dd

      this.token    = this.servicio.getToken();
      this.gerencia = new Gerencia(0, '');
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

      this.tblData();
  }

  public tblData(){
    this.serviLoad.sumar.emit(1);
    this.tblGerencia = {};
    this.rest.get('trabGerencia' , this.token, this.parametros).subscribe(data => {
        this.tblGerencia = data;
    });
    setTimeout(()=> {
        this.carga = 'visible';
        this.loading = false;
     },3000 );
   }

   public modalIns(content : any ){
    this.modal.open(content);
 }

 public modelUp(content :any , xgerencia: Gerencia ){
  this.gerencia.setId(xgerencia.gerId);
  this.gerencia.setGerDes(xgerencia.gerDes);
  console.log(this.gerencia);
  this.modal.open(content);
}

public delGerencia( gerencia : any) : boolean{
  let url      = 'delGerencia';
  this.carga   = 'invisible';
  this.loading = true;
  this.serviLoad.sumar.emit(1);
   this.rest.post(url ,this.token, gerencia).subscribe(resp => {
       resp.forEach((elementx : any)  => {
         if(elementx.error == '0'){
           this.modal.dismissAll();
           let des        = 'Gerencia eliminada ' + gerencia.gerDes ;
           let log        = new LogSys(2, '' , 16 , 'ELIMINAR GERENCIA' , des);
           this.serLog.insLog(log);
           this.servicioaler.disparador.emit(this.servicioaler.getAlert());
           setTimeout(()=>{
            this.serviLoad.sumar.emit(1);
             this.tblGerencia = {};
             this.rest.get('trabGerencia' , this.token, this.parametros).subscribe(data => {
                 this.tblGerencia = data;
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

public action(gerDesx : any , tipo :string ) : boolean{
  let url       = '';
  this.carga    = 'invisible';
  this.loading  = true;
  let gerenciax = new Gerencia(this.gerencia.gerId , gerDesx  );
  let des       = '';
  let lgName    = '';
  let idEtaDes  = 0;

  if(tipo =='up'){
     url      = 'updGerencia';
     des      = 'Actualiza gerencia ' + gerDesx;
     lgName   = 'ACTUALIZAR GERENCIA';
     idEtaDes = 15;

  }else{
    url      = 'insGerencia';
    des      = 'Ingreso gerencia ' + gerDesx;
    lgName   = 'INGRESO GERENCIA';
    idEtaDes = 14;
  }

 this.serviLoad.sumar.emit(2);
 this.rest.post(url, this.token, gerenciax).subscribe(resp => {
      resp.forEach((elementx : any)  => {
      if(elementx.error == '0'){
          let log        = new LogSys(2, '' , idEtaDes , lgName , des);
          this.serLog.insLog(log);
          this.modal.dismissAll();
          setTimeout(()=>{
            this.tblGerencia = {};
            this.rest.get('trabGerencia' , this.token, this.parametros).subscribe(data => {
                this.tblGerencia = data;
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


public Excel(){
  this.excel.exportAsExcelFile(this.tblGerencia, 'roles');
   return false;
}

}
