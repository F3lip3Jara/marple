import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubGrupo } from './../../../model/subGrupo.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { UsersService } from 'src/app/servicios/users.service';
import { RestService } from 'src/app/servicios/rest.service';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { ExcelService } from 'src/app/servicios/excel.service';
import { Alert } from 'src/app/model/alert.model';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-trab-sub-grupo',
  templateUrl: './trab-sub-grupo.component.html',
  styleUrls: ['./trab-sub-grupo.component.css']
})
export class TrabSubGrupoComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  datatableElement?: DataTableDirective;


  loading      : boolean              = true;
  dtOptions    : DataTables.Settings  = {} ;
  tblSubGrupo  : any                  = {};
  token        : string               = '';
  parametros   : any []               = [];
  carga        : string               = "invisible";
  subGrupo     : SubGrupo;
  grupos        : any;
  insSubGrupo  : FormGroup;
  upSubGrupo   : FormGroup;
  val          : boolean              = false;
  dato         : number               = 0;
  validCod     : boolean              = false;

  constructor(private fb: FormBuilder,
    private servicio : UsersService,
    private rest : RestService,
    private modal : NgbModal,
    private servicioaler: AlertasService,
    private excel: ExcelService) {

      this.token    = this.servicio.getToken();
      this.subGrupo   = new SubGrupo(0,'','', 0, '', '');

      this.insSubGrupo = fb.group({
        idGrp : ['' , Validators.compose([
          Validators.required,
         ])],
         grpsCod : ['' , Validators.compose([
          Validators.required,
         ])],
         grpsDes : ['' , Validators.compose([
          Validators.required,
         ])],
      });

      this.upSubGrupo = fb.group({
        upgrpsDes : ['' , Validators.compose([
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

      this.rest.get('trabGrupo' , this.token, this.parametros).subscribe(data => {
        this.grupos = data;
        });

      this.insSubGrupo.controls['grpsCod'].valueChanges.pipe(
        filter(text => text.length > 1),
        debounceTime(200),
        distinctUntilChanged()).subscribe(field => {
          this.validaSubGrupo(field);
        });

      this.tblData();
  }

  public tblData(){
    this.tblSubGrupo = {};
    this.rest.get('trabSubGrupo' , this.token, this.parametros).subscribe(data => {
        this.tblSubGrupo = data;
    });
    setTimeout(()=> {
        this.carga = 'visible';
        this.loading = false;
     },3000 );
   }

   public modalIns(content : any ){
    this.modal.open(content);
 }

 public modelUp(content :any , xsubGrupo : SubGrupo ){
  this.subGrupo.setId(xsubGrupo.idGrp);
  this.subGrupo.setgrpDes(xsubGrupo.grpDes);
  this.subGrupo.setgrpCod(xsubGrupo.grpCod);
  this.subGrupo.setgrpsDes(xsubGrupo.grpsDes);
  this.subGrupo.setgrpsCod(xsubGrupo.grpsCod);
  this.subGrupo.setidSubGrp(xsubGrupo.idSubGrp);
  this.upSubGrupo.controls['upgrpsDes'].setValue(xsubGrupo.grpsDes);
  this.modal.open(content);
}

public delRegion (subGrupo : any) : boolean{
  let url      = 'delSubGrupo';
  this.carga   = 'invisible';
  this.loading = true;

   this.rest.post(url ,this.token, subGrupo ).subscribe(resp => {
       resp.forEach((elementx : any)  => {
         if(elementx.error == '0'){
           this.modal.dismissAll();
           this.servicioaler.disparador.emit(this.servicioaler.getAlert());

           setTimeout(()=>{
             this.servicioaler.setAlert('','');
             this.tblSubGrupo = {};
             this.rest.get('trabSubGrupo' , this.token, this.parametros).subscribe(data => {
                 this.tblSubGrupo = data;
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

public action(xidGrp : any , xgrpsDes: any , xgrpsCod : any ,  tipo :string ) : boolean{
  let url      = '';
  this.carga   = 'invisible';
  this.loading = true;
  let paisx    = new SubGrupo(this.subGrupo.idSubGrp , xgrpsDes , xgrpsCod , xidGrp , this.subGrupo.grpDes, this.subGrupo.grpCod);
  this.val     = true;

  if(tipo =='up'){
     url = 'updSubGrupo';
  }else{
    url = 'insSubGrupo';
  }

 this.rest.post(url, this.token, paisx).subscribe(resp => {
      resp.forEach((elementx : any)  => {
      if(elementx.error == '0'){
          this.modal.dismissAll();

          setTimeout(()=>{
            this.servicioaler.setAlert('','');
            this.tblSubGrupo = {};

            this.rest.get('trabSubGrupo' , this.token, this.parametros).subscribe(data => {
                this.tblSubGrupo = data;
            });

            this.datatableElement?.dtInstance.then((dtInstance : DataTables.Api) => {
              dtInstance.destroy().draw();
            });

            this.insSubGrupo.controls['grpsCod'].setValue('');
            this.insSubGrupo.controls['grpsDes'].setValue('');

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

  let alerta : Alert = this.servicioaler.getAlert();
  this.servicioaler.disparador.emit(alerta);
  return false;
}


public Excel(){
  this.excel.exportAsExcelFile(this.tblSubGrupo, 'region');
   return false;
}


public validaSubGrupo(grpsCod : string){
  this.parametros = [{key :'grpsCod' ,value: grpsCod.trim()}];
  this.rest.get('valCodSubGrp' , this.token , this.parametros).subscribe((cant : any)=>{
      this.dato =  cant;
      if(this.dato != 0){

        this.validCod = true;
      }else{
        this.validCod = false;
      }

  });
 }
}
