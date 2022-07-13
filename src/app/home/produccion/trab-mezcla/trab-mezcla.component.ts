import { LoadingService } from './../../../servicios/loading.service';
import { UntypedFormGroup, UntypedFormBuilder } from '@angular/forms';
import { AlertasService } from './../../../servicios/alertas.service';
import { ExcelService } from './../../../servicios/excel.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from './../../../servicios/users.service';
import { RestService } from './../../../servicios/rest.service';
import { LinksService } from 'src/app/servicios/links.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';

@Component({
  selector: 'app-trab-mezcla',
  templateUrl: './trab-mezcla.component.html',
  styleUrls: ['./trab-mezcla.component.css']
})
export class TrabMezclaComponent implements OnInit {

  dtOptions    : DataTables.Settings  = {} ;
  loading      : boolean              = true;
  tblMezcla    : any                  = {};
  producto     : any                  = {};
  token        : string               = '';
  parametros   : any []               = [];
  carga        : string              = "invisible";
  model        : any;
  val          : boolean              = false;
  mezcla       : any;
  mezProd      : any                  = {};
  ver          : string               = '';
  filtro       : UntypedFormGroup;

  constructor( private linkService  : LinksService,
               private restService  : RestService,
               private userService  : UsersService,
               private modal        : NgbModal,
               private excel        : ExcelService,
               private servicioAlert: AlertasService,
               private fb           : UntypedFormBuilder,
               private serviLoad    : LoadingService){
            this.filtro = fb.group({
              lote_salida : ['']
            });

            this.token = userService.getToken();
  }

  ngOnInit(): void {
      this.tblData();
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 50,
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

  public mezNuevo (){
      this.linkService.disparador.emit('insMezcla')
  }

  public tblData(){
    this.serviLoad.sumar.emit(1);
    this.tblMezcla = {};

    this.restService.get('trabMezcla', this.token , this.parametros).subscribe(data =>{
      this.tblMezcla = data;

    });

     setTimeout(()=> {
        this.carga = 'visible';
        this.loading = false;
     },3000 );
  }

  autorizar(content : any, mezcla: any , tipo : string){
    this.mezProd    = {};
    if(mezcla.estado_control == 'PENDIENTE' && tipo == 'A'){
      this.serviLoad.sumar.emit(1);
      this.mezcla     = mezcla;
      this.ver        = tipo;
      this.parametros = [{key:'idMez' , value: mezcla.id}];      
      this.modal.open(content , { size: 'lg' });
      this.restService.get('mezclaDet' , this.token, this.parametros).subscribe(data=>{
        this.mezProd = data;
      });
    }else{
      if(mezcla.estado_control == 'APROBADA' && tipo == 'A'){
        this.servicioAlert.setAlert('Le Mezcla ya fue autorizada', 'danger');
        this.servicioAlert.disparador.emit(this.servicioAlert.getAlert());
      }else{
        if(mezcla.estado_control == "RECHAZADA" ){
          this.servicioAlert.setAlert('Le Mezcla ya fue rechazada', 'danger');
          this.servicioAlert.disparador.emit(this.servicioAlert.getAlert());
        }else{
            if( tipo == 'V'){
              this.serviLoad.sumar.emit(1);
              this.mezcla     = mezcla;
              this.ver        = tipo;
              this.parametros = [{key:'idMez' , value: mezcla.id}];
              this.modal.open(content , { size: 'lg' });
              this.restService.get('mezclaDet' , this.token, this.parametros).subscribe(data=>{
                this.mezProd = data;
              });
        }
      }
     }
    }
  }

  Excel(){
    this.excel.exportAsExcelFile(this.tblMezcla, 'mezcla');
    return false;
  }

  confirmar(mezcla: any){
    this.restService.post('confMezcla' , this.token, mezcla).subscribe(data => {
      this.val = true;
        data.forEach((elementx : any)  => {
          if(elementx.error == '0'){
            this.tblData();
            setTimeout(()=> {
              this.val= false;
              this.modal.dismissAll();
              },2000 );
          }else{
            this.val      = false;
          }
        });
        this.servicioAlert.disparador.emit(this.servicioAlert.getAlert());
    });
  }

  buscar(lote_salida : string){
    if (lote_salida){
      this.loading      = true;
      let parm : any[]  = [{key :'lote_salida' ,value: lote_salida} ];
      this.tblMezcla    = {};

      this.restService.get('filLotSal' , this.token, parm).subscribe(respuesta => {
          this.tblMezcla    = respuesta;
          this.loading      = false;
         });

    }else{
      this.servicioAlert.setAlert('Debe ingresar un filtro', 'warning');
    }
    this.servicioAlert.disparador.emit(this.servicioAlert.getAlert());
  }

  refrescar(){
    this.tblMezcla = {};
    this.tblData();
  }

  rechazar(content : any , mezcla: any){
    if(mezcla.estado_control == "APROBADA"){
      this.servicioAlert.setAlert('Le Mezcla ya fue autorizada', 'danger');
      this.servicioAlert.disparador.emit(this.servicioAlert.getAlert());
    }else{
        if(mezcla.estado_control == "RECHAZADA"){
          this.servicioAlert.setAlert('Le Mezcla ya fue rechazada', 'danger');
          this.servicioAlert.disparador.emit(this.servicioAlert.getAlert());
        }else{
          this.mezcla     = {};
          this.mezcla     = mezcla;
          this.parametros = [{key:'idMez' , value: mezcla.id}];
          this.modal.open(content , { size: 'lg' });
          this.restService.get('mezclaDet' , this.token, this.parametros).subscribe(data=>{
             this.mezProd = data;
          });
        }
    }
  }

  confRechazar(mezcla: any , obs : any){
      mezcla.observaciones = obs;
      this.val             = true;
      this.restService.post('rechaMezcla' , this.token, mezcla).subscribe(data =>{
        data.forEach((elementx : any)  => {
          if(elementx.error == '0'){
            this.tblData();
            setTimeout(()=> {
              this.val= false;
              this.modal.dismissAll();
              },2000 );
          }else{
            this.val      = false;
          }
        });
        this.servicioAlert.disparador.emit(this.servicioAlert.getAlert());
    });


  }

}
