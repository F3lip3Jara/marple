import { LoadingService } from './../../../servicios/loading.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Grupo } from './../../../model/grupo.model';
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
  selector: 'app-trab-grupo',
  templateUrl: './trab-grupo.component.html',
  styleUrls: ['./trab-grupo.component.css']
})
export class TrabGrupoComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  datatableElement?: DataTableDirective;


  loading      : boolean              = true;
  dtOptions    : DataTables.Settings  = {} ;
  tblGrupo     : any                  = {};
  token        : string               = '';
  parametros   : any []               = [];
  carga        : string               = "invisible";
  grupo        : Grupo;
  validCod     : boolean              = false;
  dato         : number               = 0;
  insGrp       : UntypedFormGroup;
  upGrp        : UntypedFormGroup;
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

      this.token    = this.servicio.getToken();
      this.grupo    = new Grupo(0, '' , '');


      this.insGrp = fb.group({
        grpCod : ['' , Validators.compose([
          Validators.required,
         ])],
         grpDes : ['' , Validators.compose([
          Validators.required,
         ])],

      });

      this.upGrp = fb.group({

         grpDes : ['' , Validators.compose([
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


    this.insGrp.controls['grpCod'].valueChanges.pipe(
      filter(text => text.length > 1),
      debounceTime(200),
      distinctUntilChanged()).subscribe(field => {
        this.valGrpCod(field);
      });

  }

  public tblData(){
    this.serviLoad.sumar.emit(1);
    this.tblGrupo = {};
    this.rest.get('trabGrupo' , this.token, this.parametros).subscribe(data => {
        this.tblGrupo = data;
    });
    setTimeout(()=> {
        this.carga = 'visible';
        this.loading = false;
     },3000 );
   }

   public modalIns(content : any ){

    this.modal.open(content);

 }

 public modelUp(content :any , xgrupo: Grupo ){
  this.grupo.setId(xgrupo.idGrp);
  this.grupo.setgrpDes(xgrupo.grpDes);
  this.grupo.setgrpCod(xgrupo.grpCod);
  this.upGrp.controls['grpDes'].setValue(xgrupo.grpDes);
  this.modal.open(content);
}

public del( grupo : any) : boolean{
  let url      = 'delGrupo';
  this.carga   = 'invisible';
  this.loading = true;
  this.serviLoad.sumar.emit(1);
<<<<<<< HEAD
   this.rest.post(url ,this.token, grupo).subscribe(resp => {
       resp.forEach((elementx : any)  => {
         if(elementx.error == '0'){
          let des        = 'Grupo eliminado ' + grupo.grpCod ;
          let log        = new LogSys(2, '' , 30 , 'ELIMINAR GRUPO' , des);
          this.serLog.insLog(log);
=======
   this.rest.post(url ,this.token, color).subscribe(resp => {
       resp.forEach((elementx : any)  => {
         if(elementx.error == '0'){
>>>>>>> 3a629026ca5e04e1d05975795fe6b23bf253a8dd
          this.serviLoad.sumar.emit(1);
           this.modal.dismissAll();
           this.servicioaler.disparador.emit(this.servicioaler.getAlert());

           setTimeout(()=>{
             this.servicioaler.setAlert('','');
             this.tblGrupo = {};
             this.rest.get('trabGrupo' , this.token, this.parametros).subscribe(data => {
                 this.tblGrupo = data;
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

public action(xgrpDes : any , xgrpCod : any , tipo :string ) : boolean{
  let url       = '';
  this.carga    = 'invisible';
  this.loading  = true;
  this.val      = true;
  let grupox    = new Grupo(this.grupo.idGrp , xgrpDes , xgrpCod);
  let des       = '';
  let lgName    = '';
  let idEtaDes  = 0;


  if(tipo =='up'){
     url      = 'updGrupo';
     des      = 'Actualiza grupo ' + xgrpCod;
     lgName   = 'ACTUALIZAR GRUPO';
     idEtaDes = 29;
  }else{
    url       = 'insGrupo';
    des       = 'Ingresa grupo ' + xgrpCod;
    lgName    = 'INGRESO GRUPO';
    idEtaDes  = 28;
  }
  this.serviLoad.sumar.emit(1);
 this.rest.post(url, this.token, grupox).subscribe(resp => {
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
            this.tblGrupo = {};
            this.rest.get('trabGrupo' , this.token, this.parametros).subscribe(data => {
                this.tblGrupo = data;
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
  this.excel.exportAsExcelFile(this.tblGrupo, 'grupo');
   return false;
}

public valGrpCod(grpCod : string){
  this.parametros = [{key :'grpCod' ,value: grpCod.trim()}];
  this.rest.get('valGrpCod' , this.token , this.parametros).subscribe((cant : any)=>{
      this.dato =  cant;
      if(this.dato != 0){
        this.validCod = true;
      }else{
        this.validCod = false;
      }
  });
 }


 public limpiar(){

  this.insGrp.controls['grpDes'].setValue('');
  this.insGrp.controls['grpCod'].setValue('');


 }
}
