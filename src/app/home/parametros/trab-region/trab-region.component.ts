import { LoadingService } from './../../../servicios/loading.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormControl } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { RestService } from 'src/app/servicios/rest.service';
import { UsersService } from 'src/app/servicios/users.service';
import { Region } from 'src/app/model/region.model';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { ExcelService } from 'src/app/servicios/excel.service';
import { Alert } from 'src/app/model/alert.model';
import { Pais } from 'src/app/model/pais.model';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-trab-region',
  templateUrl: './trab-region.component.html',
  styleUrls: ['./trab-region.component.css']
})
export class TrabRegionComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  datatableElement?: DataTableDirective;


  loading      : boolean              = true;
  dtOptions    : DataTables.Settings  = {} ;
  tblRegion    : any                  = {};
  token        : string               = '';
  parametros   : any []               = [];
  carga        : string               = "invisible";
  region       : Region;
  paises       : any                  ={};
  insRegion    : UntypedFormGroup;
  upRegion     : UntypedFormGroup;
  val          : boolean              = false;
  dato         : number               = 0;
  validCod     : boolean              = false;

  constructor(private fb          : UntypedFormBuilder,
              private servicio    : UsersService,
              private rest        : RestService,
              private modal       : NgbModal,
              private servicioaler: AlertasService,
              private excel       : ExcelService,
              private serviLoad   : LoadingService) {

      this.token    = this.servicio.getToken();
      this.region   = new Region(0,'','', 0, '', '');

      this.insRegion = fb.group({
        idPai : ['' , Validators.compose([
          Validators.required,
         ])],
         regCod : ['' , Validators.compose([
          Validators.required,
         ])],
         regDes : ['' , Validators.compose([
          Validators.required,
         ])],
      });

      this.upRegion = fb.group({
         upregDes : ['' , Validators.compose([
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
      this.serviLoad.sumar.emit(1);
      this.rest.get('trabPais' , this.token, this.parametros).subscribe(data => {
        this.paises = data;
        });

      this.insRegion.controls['regCod'].valueChanges.pipe(
        filter(text => text.length > 1),
        debounceTime(200),
        distinctUntilChanged()).subscribe(field => {
          this.validaRegion(field);
        });

      this.tblData();
  }

  public tblData(){
    this.serviLoad.sumar.emit(1);
    this.tblRegion = {};
    this.rest.get('trabRegion' , this.token, this.parametros).subscribe(data => {
        this.tblRegion = data;
    });
    setTimeout(()=> {
        this.carga = 'visible';
        this.loading = false;
     },3000 );
   }

   public modalIns(content : any ){
    this.modal.open(content);
 }

 public modelUp(content :any , xregion : Region ){
  this.region.setId(xregion.idPai);
  this.region.setPaiDes(xregion.paiDes);
  this.region.setPaicod(xregion.paiCod);
  this.region.setregDes(xregion.regDes);
  this.region.setregCod(xregion.regCod);
  this.region.setIdReg(xregion.idReg);
  this.upRegion.controls['upregDes'].setValue(xregion.regDes);
  this.modal.open(content);
}

public delRegion (region : any) : boolean{
  let url      = 'delRegion';
  this.carga   = 'invisible';
  this.loading = true;
  this.serviLoad.sumar.emit(1);
   this.rest.post(url ,this.token, region ).subscribe(resp => {
       resp.forEach((elementx : any)  => {
         if(elementx.error == '0'){
          this.serviLoad.sumar.emit(1);
           this.modal.dismissAll();
           setTimeout(()=>{
             this.tblRegion = {};
             this.rest.get('trabRegion' , this.token, this.parametros).subscribe(data => {
                 this.tblRegion = data;
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

public action(xidPai : any , xregDes: any , xregCod : any ,  tipo :string ) : boolean{
  let url      = '';
  this.carga   = 'invisible';
  this.loading = true;
  let paisx    = new Region(this.region.idReg , xregDes , xregCod , xidPai , this.region.paiDes, this.region.paiCod);
  this.val     = true;

  if(tipo =='up'){
     url = 'updRegion';
  }else{
    url = 'insRegion';
  }
  this.serviLoad.sumar.emit(1);
 this.rest.post(url, this.token, paisx).subscribe(resp => {
      resp.forEach((elementx : any)  => {
      if(elementx.error == '0'){
        this.serviLoad.sumar.emit(1);
          this.modal.dismissAll();
          setTimeout(()=>{
            this.tblRegion = {};
            this.rest.get('trabRegion' , this.token, this.parametros).subscribe(data => {
                this.tblRegion = data;
            });
            this.datatableElement?.dtInstance.then((dtInstance : DataTables.Api) => {
              dtInstance.destroy().draw();
            });
            this.insRegion.controls['regDes'].setValue('');
            this.insRegion.controls['regCod'].setValue('');
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
  this.servicioaler.disparador.emit(this.servicioaler.getAlert());
  return false;
}


public Excel(){
  this.excel.exportAsExcelFile(this.tblRegion, 'region');
   return false;
}


public validaRegion(regCod : string){
  this.parametros = [{key :'regCod' ,value: regCod.trim()}];
  this.rest.get('valCodReg' , this.token , this.parametros).subscribe((cant : any)=>{
      this.dato =  cant;
      if(this.dato != 0){

        this.validCod = true;
      }else{
        this.validCod = false;
      }

  });
 }

}
