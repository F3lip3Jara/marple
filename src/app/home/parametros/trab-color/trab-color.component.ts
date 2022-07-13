import { LoadingService } from './../../../servicios/loading.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Color } from 'src/app/model/color.model';
import { UsersService } from 'src/app/servicios/users.service';
import { RestService } from 'src/app/servicios/rest.service';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { ExcelService } from 'src/app/servicios/excel.service';
import { Alert } from 'src/app/model/alert.model';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { LogSysService } from 'src/app/servicios/log-sys.service';
import { LogSys } from 'src/app/model/logSys.model';

@Component({
  selector: 'app-trab-color',
  templateUrl: './trab-color.component.html',
  styleUrls: ['./trab-color.component.css']
})
export class TrabColorComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  datatableElement?: DataTableDirective;


  loading      : boolean              = true;
  dtOptions    : DataTables.Settings  = {} ;
  tblColor     : any                  = {};
  token        : string               = '';
  parametros   : any []               = [];
  carga        : string               = "invisible";
  color        : Color;
  validCod     : boolean              = false;
  dato         : number               = 0;
  insCol       : UntypedFormGroup;
  upCol        : UntypedFormGroup;
  val          : boolean              = false;

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

      this.token     = this.servicio.getToken();
      this.color     = new Color(0, '' , '');

      this.insCol    = fb.group({
        colCod : ['' , Validators.compose([
          Validators.required,
         ])],
         colDes : ['' , Validators.compose([
          Validators.required,
         ])],
      });

      this.upCol = fb.group({
         colDes : ['' , Validators.compose([
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

    this.insCol.controls['colCod'].valueChanges.pipe(
      filter(text => text.length > 2),
      debounceTime(200),
      distinctUntilChanged()).subscribe(field => {
        this.valColCod(field);
      });

  }

  public tblData(){
    this.serviLoad.sumar.emit(1);
    this.tblColor = {};
    this.rest.get('trabColor' , this.token, this.parametros).subscribe(data => {
        this.tblColor = data;
    });
    setTimeout(()=> {
        this.carga = 'visible';
        this.loading = false;
     },3000 );
   }

   public modalIns(content : any ){

    this.modal.open(content);

 }

 public modelUp(content :any , xcolor: Color ){
  this.color.setId(xcolor.idCol);
  this.color.setcolDes(xcolor.colDes);
  this.color.setcolCod(xcolor.colCod);
  this.upCol.controls['colDes'].setValue(xcolor.colDes);
  this.modal.open(content);
}

public del( color : any) : boolean{
  let url      = 'delColor';
  this.carga   = 'invisible';
  this.loading = true;
  this.serviLoad.sumar.emit(1);
   this.rest.post(url ,this.token, color).subscribe(resp => {
       resp.forEach((elementx : any)  => {
         if(elementx.error == '0'){
           this.modal.dismissAll();
           this.serviLoad.sumar.emit(1);
<<<<<<< HEAD
           let des        = 'Color eliminado ' + color.colCod ;
           let log        = new LogSys(2, '' , 27 , 'ELIMINAR COLOR' , des);
           this.serLog.insLog(log);
=======
>>>>>>> 3a629026ca5e04e1d05975795fe6b23bf253a8dd
           setTimeout(()=>{
             this.tblColor = {};
             this.rest.get('trabColor' , this.token, this.parametros).subscribe(data => {
                 this.tblColor = data;
             });

             this.datatableElement?.dtInstance.then((dtInstance : DataTables.Api) => {
               dtInstance.destroy().draw();
             });

             this.carga    = 'visible';
             this.loading  = false;
           },1500);

         }else{
           this.carga    = 'visible';
           this.loading  = false;  }
       });
   });

   this.servicioaler.disparador.emit(this.servicioaler.getAlert());
   return false;
}

public action(xcolDes : any , xcolCod : any , tipo :string ) : boolean{
  let url      = '';
  this.carga   = 'invisible';
  this.loading = true;
  this.val     = true;
  let colorx   = new Color(this.color.idCol , xcolDes , xcolCod);
  let des      = '';
  let lgName   = '';
  let idEtaDes = 0;


  if(tipo =='up'){
     url      = 'updColor';
     des      = 'Actualizar color ' + xcolCod;
     lgName   = 'ACTUALIZAR COLOR';
     idEtaDes = 26;
  }else{
    url      = 'insColor';
    des      = 'Ingreso color ' + xcolCod;
    lgName   = 'INGRESO COLOR';
    idEtaDes = 25;
  }
  this.serviLoad.sumar.emit(1);
<<<<<<< HEAD
 this.rest.post(url, this.token, colorx).subscribe(resp => {
      resp.forEach((elementx : any)  => {
      if(elementx.error == '0'){
        this.serviLoad.sumar.emit(1);
        let log        = new LogSys(2, '' , idEtaDes , lgName , des);
        this.serLog.insLog(log);        
=======
 this.rest.post(url, this.token, monedax).subscribe(resp => {
      resp.forEach((elementx : any)  => {
      if(elementx.error == '0'){
        this.serviLoad.sumar.emit(1);
>>>>>>> 3a629026ca5e04e1d05975795fe6b23bf253a8dd
          this.modal.dismissAll();
          setTimeout(()=>{
            this.tblColor = {};
            this.rest.get('trabColor' , this.token, this.parametros).subscribe(data => {
                this.tblColor = data;
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
  this.excel.exportAsExcelFile(this.tblColor, 'color');
   return false;
}

public valColCod(colCod : string){
  this.parametros = [{key :'colCod' ,value: colCod.trim()}];
  this.rest.get('valColCod' , this.token , this.parametros).subscribe((cant : any)=>{
      this.dato =  cant;
      if(this.dato != 0){
        this.validCod = true;
      }else{
        this.validCod = false;
      }
  });
 }


 public limpiar(){

  this.insCol.controls['colDes'].setValue('');
  this.insCol.controls['colCod'].setValue('');


 }

}
