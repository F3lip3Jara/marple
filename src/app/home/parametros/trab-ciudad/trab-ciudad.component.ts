import { LoadingService } from './../../../servicios/loading.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ciudad } from './../../../model/ciudad.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { UsersService } from 'src/app/servicios/users.service';
import { RestService } from 'src/app/servicios/rest.service';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { ExcelService } from 'src/app/servicios/excel.service';
import { Alert } from 'src/app/model/alert.model';
import { map } from 'jquery';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-trab-ciudad',
  templateUrl: './trab-ciudad.component.html',
  styleUrls: ['./trab-ciudad.component.css']
})
export class TrabCiudadComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  datatableElement?: DataTableDirective;


  loading      : boolean              = true;
  dtOptions    : DataTables.Settings  = {} ;
  tblCiudad    : any                  = {};
  token        : string               = '';
  parametros   : any []               = [];
  carga        : string               = "invisible";
  regiones     : any;
  paises       : any;
  comunas      : any;
  ciudad       : Ciudad;
  insCiudad    : FormGroup;
  updCiudad    : FormGroup;
  val          : boolean              = false;
  dato         : number               = 0;
  validCod     : boolean              = false;

  constructor(private fb          : FormBuilder,
              private servicio    : UsersService,
              private rest        : RestService,
              private modal       : NgbModal,
              private servicioaler: AlertasService,
              private excel       : ExcelService,
              private serviLoad   : LoadingService) {

      this.token     = this.servicio.getToken();

      this.insCiudad = fb.group({
         idPai : ['' , Validators.compose([
          Validators.required,
         ])],
         idReg : ['' , Validators.compose([
          Validators.required,
         ])],

         ciuCod : ['' , Validators.compose([
          Validators.required,
         ])],
         ciuDes : ['' , Validators.compose([
          Validators.required,
         ])],

      });

      this.updCiudad = fb.group({
          upciuDes : ['' , Validators.compose([
          Validators.required,
         ])]

      });
      this.regiones = {};
      this.paises   = {};
      this.comunas  = {};
      this.ciudad = new Ciudad(0,'','',0,'','',0,'','');

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
      this.serviLoad.sumar.emit(1);
      this.rest.get('trabPais' , this.token, this.parametros).subscribe(data => {
        this.paises = data;
        });

        this.insCiudad.controls['idPai'].valueChanges.subscribe(field => {
          this.regiones = {};
          this.parametros = [{key :'idPai' ,value: field}];
          this.rest.get('regPai' , this.token, this.parametros).subscribe(data => {
            this.regiones = data;
            });
        });

        this.insCiudad.controls['ciuCod'].valueChanges.pipe(
          filter(text => text.length > 1),
          debounceTime(200),
          distinctUntilChanged()).subscribe(field => {
          this.validaCiudad(field);
        });
      this.tblData();
  }

  public tblData(){
    this.tblCiudad = {};
    this.rest.get('trabCiudad' , this.token, this.parametros).subscribe(data => {
        this.tblCiudad = data;
    });
    setTimeout(()=> {
        this.carga = 'visible';
        this.loading = false;
     },3000 );
   }

   public modalIns(content : any ){
    this.modal.open(content);
 }

 public modelUp(content :any , xciudad : Ciudad ){
  this.ciudad.setId(xciudad.idPai);
  this.ciudad.setPaiDes(xciudad.paiDes);
  this.ciudad.setPaicod(xciudad.paiCod);
  this.ciudad.setregDes(xciudad.regDes);
  this.ciudad.setIdReg(xciudad.idReg);
  this.ciudad.setciuCod(xciudad.ciuCod);
  this.ciudad.setidCiu(xciudad.idCiu);
  this.updCiudad.controls['upciuDes'].setValue(xciudad.ciuDes);
  this.modal.open(content);
}

public delComuna (ciudad : any) : boolean{
  let url      = 'delCiudad';
  this.carga   = 'invisible';
  this.loading = true;
  this.serviLoad.sumar.emit(1);
   this.rest.post(url ,this.token, ciudad ).subscribe(resp => {
       resp.forEach((elementx : any)  => {
         if(elementx.error == '0'){
          this.serviLoad.sumar.emit(1);
           this.modal.dismissAll();
           setTimeout(()=>{
            this.tblCiudad = {};
             this.rest.get('tblCiudad' , this.token, this.parametros).subscribe(data => {
                 this.tblCiudad = data;
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

   setTimeout(()=>{
    this.servicioaler.disparador.emit( this.servicioaler.getAlert());
    },1500);

   return false;
}

public action(xidPai : any , xidReg : any ,  xciuCod : any , xciuDes : any , tipo : string ) : boolean{
  let url      = '';
  this.carga   = 'invisible';
  this.loading = true;
  let xciudad  = new Ciudad(this.ciudad.idCiu , xciuDes , xciuCod, xidPai , '','',xidReg , '' , '' );
  this.val     = true;

  if(tipo =='up'){
     url = 'updCiudad';
  }else{
    url = 'insCiudad';
  }
  this.serviLoad.sumar.emit(1);
 this.rest.post(url, this.token, xciudad).subscribe(resp => {
      resp.forEach((elementx : any)  => {
      if(elementx.error == '0'){
          this.modal.dismissAll();
          this.serviLoad.sumar.emit(1);
          setTimeout(()=>{
            this.tblCiudad = {};
            this.rest.get('trabCiudad' , this.token, this.parametros).subscribe(data => {
                this.tblCiudad = data;
            });

            this.datatableElement?.dtInstance.then((dtInstance : DataTables.Api) => {
              dtInstance.destroy().draw();
            });

           this.insCiudad.controls['ciuDes'].setValue('');
           this.insCiudad.controls['ciuCod'].setValue('');

            this.carga    = 'visible';
            this.loading  = false;
            this.val      = false;
          },1500);
      }else {
        this.carga    = 'visible';
        this.loading  = false;
        this.val      = false;
      }
    });
  });

  setTimeout(()=>{
    this.servicioaler.disparador.emit( this.servicioaler.getAlert());
  },1500);

  return false;
}


public Excel(){
  this.excel.exportAsExcelFile(this.tblCiudad, 'ciudad');
   return false;
}


public validaCiudad(ciuCod : string){
  this.parametros = [{key :'ciuCod' ,value: ciuCod.trim()}];
  this.rest.get('valCodCiudad' , this.token , this.parametros).subscribe((cant : any)=>{
      this.dato =  cant;
      if(this.dato != 0){

        this.validCod = true;
      }else{
        this.validCod = false;
      }

  });
 }

}
