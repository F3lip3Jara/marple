import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { unMed } from './../../../model/unMed.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { UsersService } from 'src/app/servicios/users.service';
import { RestService } from 'src/app/servicios/rest.service';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { ExcelService } from 'src/app/servicios/excel.service';
import { Alert } from 'src/app/model/alert.model';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-trab-unidad-medida',
  templateUrl: './trab-unidad-medida.component.html',
  styleUrls: ['./trab-unidad-medida.component.css']
})
export class TrabUnidadMedidaComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  datatableElement?: DataTableDirective;


  loading      : boolean              = true;
  dtOptions    : DataTables.Settings  = {} ;
  tblUnidad    : any                  = {};
  token        : string               = '';
  parametros   : any []               = [];
  carga        : string               = "invisible";
  unMed         : unMed;
  validCod     : boolean              = false;
  dato         : number               = 0;
  insUn       : FormGroup;
  upUn        : FormGroup;
  val          : boolean              = false;

  constructor(private fb: FormBuilder,
    private servicio    : UsersService,
    private rest        : RestService,
    private modal       : NgbModal,
    private servicioaler: AlertasService,
    private excel       : ExcelService) {

      this.token    = this.servicio.getToken();
      this.unMed = new unMed(0, '' , '');


      this.insUn = fb.group({
        unCod : ['' , Validators.compose([
          Validators.required,
         ])],
         unDes : ['' , Validators.compose([
          Validators.required,
         ])],

      });

      this.upUn = fb.group({

         unDes : ['' , Validators.compose([
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


    this.insUn.controls['unCod'].valueChanges.pipe(
      filter(text => text.length > 1),
      debounceTime(200),
      distinctUntilChanged()).subscribe(field => {
        this.validaUnCod(field);
      });

  }

  public tblData(){
    this.tblUnidad = {};
    this.rest.get('trabUnidad' , this.token, this.parametros).subscribe(data => {
        this.tblUnidad = data;
    });
    setTimeout(()=> {
        this.carga = 'visible';
        this.loading = false;
     },3000 );
   }

   public modalIns(content : any ){

    this.modal.open(content);

 }

 public modelUp(content :any , xunidad: unMed ){
  this.unMed.setId(xunidad.idUn);
  this.unMed.setunDes(xunidad.unDes);
  this.unMed.setunCod(xunidad.unCod);
  this.upUn.controls['unDes'].setValue(xunidad.unDes);
  this.modal.open(content);
}

public del( moneda : any) : boolean{
  let url      = 'delUnidad';
  this.carga   = 'invisible';
  this.loading = true;

   this.rest.post(url ,this.token, moneda).subscribe(resp => {
       resp.forEach((elementx : any)  => {
         if(elementx.error == '0'){
           this.modal.dismissAll();
           this.servicioaler.disparador.emit(this.servicioaler.getAlert());

           setTimeout(()=>{
             this.servicioaler.setAlert('','');
             this.tblUnidad = {};
             this.rest.get('trabUnidad' , this.token, this.parametros).subscribe(data => {
                 this.tblUnidad = data;
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
           this.servicioaler.disparador.emit(this.servicioaler.getAlert());

           setTimeout(()=>{
             this.servicioaler.setAlert('','');
           },1500);
         }
       });
   });
   return false;
}

public action(xunDes : any , xunCod : any , tipo :string ) : boolean{
  let url      = '';
  this.carga   = 'invisible';
  this.loading = true;
  this.val     = true;
  let unidadx  = new unMed(this.unMed.idUn , xunDes  , xunCod );

  if(tipo =='up'){
     url = 'updUnidad';
  }else{
    url = 'insUnidad';
  }
 this.rest.post(url, this.token, unidadx).subscribe(resp => {
      resp.forEach((elementx : any)  => {
      if(elementx.error == '0'){
          this.modal.dismissAll();
          setTimeout(()=>{
            this.servicioaler.setAlert('','');
            this.tblUnidad = {};
            this.rest.get('trabUnidad' , this.token, this.parametros).subscribe(data => {
                this.tblUnidad = data;
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

  let alerta : Alert = this.servicioaler.getAlert();
  this.servicioaler.disparador.emit(alerta);
  return false;
}


public Excel(){
  this.excel.exportAsExcelFile(this.tblUnidad, 'moneda');
   return false;
}

public validaUnCod(unCod : string){
  this.parametros = [{key :'unCod' ,value: unCod.trim()}];
  this.rest.get('valUnCod' , this.token , this.parametros).subscribe((cant : any)=>{
      this.dato =  cant;
      if(this.dato != 0){
        this.validCod = true;
      }else{
        this.validCod = false;
      }
  });
 }


 public limpiar(){

  this.insUn.controls['unDes'].setValue('');
  this.insUn.controls['unCod'].setValue('');


 }

}
