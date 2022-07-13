import { LoadingService } from './../../../servicios/loading.service';
import { ExcelService } from './../../../servicios/excel.service';
import { AlertasService } from './../../../servicios/alertas.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from './../../../servicios/rest.service';
import { UsersService } from './../../../servicios/users.service';
<<<<<<< HEAD
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
=======
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
>>>>>>> 3a629026ca5e04e1d05975795fe6b23bf253a8dd
import { Moneda } from './../../../model/moneda.model';
import { DataTableDirective } from 'angular-datatables';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Motivo } from 'src/app/model/motivo.model';
<<<<<<< HEAD
import { LogSysService } from 'src/app/servicios/log-sys.service';
import { LogSys } from 'src/app/model/logSys.model';
=======
>>>>>>> 3a629026ca5e04e1d05975795fe6b23bf253a8dd

@Component({
  selector: 'app-trab-mov-rechazo',
  templateUrl: './trab-mov-rechazo.component.html',
  styleUrls: ['./trab-mov-rechazo.component.css']
})
export class TrabMovRechazoComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  datatableElement?: DataTableDirective;


  loading      : boolean              = true;
  dtOptions    : DataTables.Settings  = {} ;
  tblMotivo    : any                  = {};
  token        : string               = '';
  parametros   : any []               = [];
  carga        : string               = "invisible";
  validCod     : boolean              = false;
  dato         : number               = 0;
  motivo       : Motivo;
<<<<<<< HEAD
  insMot       : UntypedFormGroup;
  upMot        : UntypedFormGroup;
  val          : boolean              = false;

  constructor(private fb          : UntypedFormBuilder,
=======
  insMot       : FormGroup;
  upMot        : FormGroup;
  val          : boolean              = false;

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
      this.motivo   = new Motivo(0,'');

<<<<<<< HEAD
=======

>>>>>>> 3a629026ca5e04e1d05975795fe6b23bf253a8dd
      this.insMot = fb.group({
        motDes : ['' , Validators.compose([
          Validators.required,
         ])]
<<<<<<< HEAD
      });

      this.upMot = fb.group({
        motDes : ['' , Validators.compose([
          Validators.required,
         ])],
      });
=======

      });

      this.upMot = fb.group({

        motDes : ['' , Validators.compose([
          Validators.required,
         ])],

      });

>>>>>>> 3a629026ca5e04e1d05975795fe6b23bf253a8dd
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
<<<<<<< HEAD
=======


>>>>>>> 3a629026ca5e04e1d05975795fe6b23bf253a8dd
  }

  public tblData(){
    this.tblMotivo = {};
    this.serviLoad.sumar.emit(1);
    this.rest.get('trabMotivo' , this.token, this.parametros).subscribe(data => {
        this.tblMotivo = data;
    });
    setTimeout(()=> {
        this.carga = 'visible';
        this.loading = false;
     },3000 );
   }

  public modalIns(content : any ){
    this.modal.open(content);
  }

 public modelUp(content :any , motivo: Motivo ){
  this.motivo.setId(motivo.idMot);

  this.upMot.controls['motDes'].setValue(motivo.motDes);
  this.modal.open(content);
}

<<<<<<< HEAD
public del( motivo : any) : boolean{
=======
public del( extrusion : any) : boolean{
>>>>>>> 3a629026ca5e04e1d05975795fe6b23bf253a8dd
  let url      = 'delMotivo';
  this.carga   = 'invisible';
  this.loading = true;
  this.serviLoad.sumar.emit(1);
<<<<<<< HEAD
   this.rest.post(url ,this.token, motivo).subscribe(resp => {
       resp.forEach((elementx : any)  => {
         if(elementx.error == '0'){
          let des        = 'Grupo eliminado ' + motivo.motDes ;
          let log        = new LogSys(2, '' , 44 , 'ELIMINAR MOTIVO' , des);
          this.serLog.insLog(log);
=======
   this.rest.post(url ,this.token, extrusion).subscribe(resp => {
       resp.forEach((elementx : any)  => {
         if(elementx.error == '0'){
>>>>>>> 3a629026ca5e04e1d05975795fe6b23bf253a8dd
          this.serviLoad.sumar.emit(1);
           this.modal.dismissAll();
           setTimeout(()=>{
             this.tblMotivo = {};
             this.rest.get('trabMotivo' , this.token, this.parametros).subscribe(data => {
                 this.tblMotivo = data;
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

public action(motDes : any  , tipo :string ) : boolean{
  let url      = '';
  this.carga   = 'invisible';
  this.loading = true;
  this.val     = true;
<<<<<<< HEAD
  let motivo   = new Motivo(this.motivo.idMot, motDes );
  let des      = '';
  let lgName   = '';
  let idEtaDes = 0;

  if(tipo =='up'){
     url      = 'updMotivo';
     des      = 'Actualizar motivo ' + motDes;
     lgName   = 'ACTUALIZAR MOTIVO';
     idEtaDes = 43;
  }else{
    url      = 'insMotivo';
    des      = 'Ingreso de motivo ' + motDes;
    lgName   = 'INGRESO MOTIVO';
    idEtaDes = 42;
=======
  let motivo  = new Motivo(this.motivo.idMot, motDes );

  if(tipo =='up'){
     url = 'updMotivo';
  }else{
    url = 'insMotivo';
>>>>>>> 3a629026ca5e04e1d05975795fe6b23bf253a8dd
  }
  this.serviLoad.sumar.emit(1);
 this.rest.post(url, this.token, motivo).subscribe(resp => {
      resp.forEach((elementx : any)  => {
      if(elementx.error == '0'){
<<<<<<< HEAD
        let log        = new LogSys(2, '' , idEtaDes , lgName , des);
        this.serLog.insLog(log);        
=======
>>>>>>> 3a629026ca5e04e1d05975795fe6b23bf253a8dd
        this.serviLoad.sumar.emit(1);
          this.modal.dismissAll();
          setTimeout(()=>{
            this.tblMotivo = {};
            this.rest.get('trabMotivo' , this.token, this.parametros).subscribe(data => {
                this.tblMotivo = data;
            });
            this.datatableElement?.dtInstance.then((dtInstance : DataTables.Api) => {
              dtInstance.destroy().draw();
            });

            this.carga    = 'visible';
            this.loading  = false;
            this.val      = false;
            this.limpiar();
          },1500);

      }else {
        this.carga    = 'visible';
        this.loading  = false;
        this.val      = false;
      }
    });
  });
  this.servicioaler.disparador.emit(this.servicioaler.getAlert());
  return false;
}


public Excel(){
  this.excel.exportAsExcelFile(this.tblMotivo, 'motivo');
   return false;
}


 public limpiar(){
  this.insMot.controls['motDes'].setValue('');

 }
}
