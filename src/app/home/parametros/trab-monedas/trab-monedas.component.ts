import { LoadingService } from './../../../servicios/loading.service';
import { Moneda } from './../../../model/moneda.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { UsersService } from 'src/app/servicios/users.service';
import { RestService } from 'src/app/servicios/rest.service';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { ExcelService } from 'src/app/servicios/excel.service';
import { Alert } from 'src/app/model/alert.model';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { LogSysService } from 'src/app/servicios/log-sys.service';
import { LogSys } from 'src/app/model/logSys.model';

@Component({
  selector: 'app-trab-monedas',
  templateUrl: './trab-monedas.component.html',
  styleUrls: ['./trab-monedas.component.css']
})
export class TrabMonedasComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  datatableElement?: DataTableDirective;


  loading      : boolean              = true;
  dtOptions    : DataTables.Settings  = {} ;
  tblMoneda    : any                  = {};
  token        : string               = '';
  parametros   : any []               = [];
  carga        : string               = "invisible";
  moneda       : Moneda;
  validCod     : boolean              = false;
  dato         : number               = 0;
  insMon       : FormGroup;
  upMon        : FormGroup;
  val          : boolean              = false;

  constructor(private fb          : FormBuilder,
              private servicio    : UsersService,
              private rest        : RestService,
              private modal       : NgbModal,
              private servicioaler: AlertasService,
              private excel       : ExcelService,
              private serviLoad   : LoadingService,
              private serLog      : LogSysService) {

      this.token    = this.servicio.getToken();
      this.moneda = new Moneda(0, '' , '');


      this.insMon = fb.group({
        monCod : ['' , Validators.compose([
          Validators.required,
         ])],
         monDes : ['' , Validators.compose([
          Validators.required,
         ])],

      });

      this.upMon = fb.group({

         monDes : ['' , Validators.compose([
          Validators.required,
         ])],

      });

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
    this.insMon.controls['monCod'].valueChanges.pipe(
      filter(text => text.length > 1),
      debounceTime(200),
      distinctUntilChanged()).subscribe(field => {
        this.validaMon(field);
      });

  }

  public tblData(){
    this.tblMoneda = {};
    this.serviLoad.sumar.emit(1);
    this.rest.get('trabMoneda' , this.token, this.parametros).subscribe(data => {
        this.tblMoneda = data;
    });
    setTimeout(()=> {
        this.carga = 'visible';
        this.loading = false;
     },3000 );
   }

  public modalIns(content : any ){
    this.modal.open(content);
  }

 public modelUp(content :any , xmoneda: Moneda ){
  this.moneda.setId(xmoneda.idMon);
  this.moneda.setmonDes(xmoneda.monDes);
  this.moneda.setmonCod(xmoneda.monCod);
  this.upMon.controls['monDes'].setValue(xmoneda.monDes);
  this.modal.open(content);
}

public del( moneda : any) : boolean{
  let url      = 'delMoneda';
  this.carga   = 'invisible';
  this.loading = true;
  this.serviLoad.sumar.emit(1);
   this.rest.post(url ,this.token, moneda).subscribe(resp => {
       resp.forEach((elementx : any)  => {
         if(elementx.error == '0'){
          this.serviLoad.sumar.emit(1);
           this.modal.dismissAll();
           let des        = 'Moneda eliminada ' + moneda.monCod ;
           let log        = new LogSys(2, '' , 19 , 'ELIMINAR MONEDA' , des);
           this.serLog.insLog(log);

           setTimeout(()=>{
             this.tblMoneda = {};
             this.rest.get('trabMoneda' , this.token, this.parametros).subscribe(data => {
                 this.tblMoneda = data;
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

public action(xmonDes : any , xmonCod : any , tipo :string ) : boolean{
  let url      = '';
  this.carga   = 'invisible';
  this.loading = true;
  this.val     = true;
  let monedax  = new Moneda(this.moneda.idMon , xmonDes  , xmonCod );
  let des      = '';
  let lgName   = '';
  let idEtaDes = 0;

  if(tipo =='up'){
     url      = 'updMoneda';
     des      = 'Actualiza moneda ' + xmonCod;
     lgName   = 'ACTUALIZAR MONEDA';
     idEtaDes = 18;
  }else{
    url       = 'insMoneda';
    des       = 'Ingreso de moneda ' + xmonCod;
     lgName   = 'INGRESO MONEDA';
     idEtaDes = 17;
  }
  this.serviLoad.sumar.emit(1);
 this.rest.post(url, this.token, monedax).subscribe(resp => {
      resp.forEach((elementx : any)  => {
      if(elementx.error == '0'){
        this.serviLoad.sumar.emit(1);
          this.modal.dismissAll();
          setTimeout(()=>{
            this.tblMoneda = {};
            this.rest.get('trabMoneda' , this.token, this.parametros).subscribe(data => {
                this.tblMoneda = data;
            });
            this.datatableElement?.dtInstance.then((dtInstance : DataTables.Api) => {
              dtInstance.destroy().draw();
            });
            
            let log        = new LogSys(2, '' , idEtaDes , lgName , des);
            this.serLog.insLog(log);
 

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
  this.excel.exportAsExcelFile(this.tblMoneda, 'moneda');
   return false;
}

public validaMon(monCod : string){
  this.parametros = [{key :'monCod' ,value: monCod.trim()}];
  this.rest.get('valMonCod' , this.token , this.parametros).subscribe((cant : any)=>{
      this.dato =  cant;
      if(this.dato != 0){
        this.validCod = true;
      }else{
        this.validCod = false;
      }
  });
 }


 public limpiar(){
  this.insMon.controls['monDes'].setValue('');
  this.insMon.controls['monCod'].setValue('');
 }
}
