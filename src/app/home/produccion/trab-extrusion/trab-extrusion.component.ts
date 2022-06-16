import { LoadingService } from './../../../servicios/loading.service';
import { ExtrusionService } from './../../../servicios/extrusion.service';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { ExcelService } from 'src/app/servicios/excel.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from 'src/app/servicios/users.service';
import { RestService } from 'src/app/servicios/rest.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LinksService } from './../../../servicios/links.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trab-extrusion',
  templateUrl: './trab-extrusion.component.html',
  styleUrls: ['./trab-extrusion.component.css']
})
export class TrabExtrusionComponent implements OnInit {

  dtOptions    : DataTables.Settings  = {} ;
  loading      : boolean              = true;
  tblExtrusion : any                  = {};
  token        : string               = '';
  parametros   : any []               = [];
  carga        : string              = "invisible";
  model        : any;
  val          : boolean              = false;
  filtro       : FormGroup;
  rechExt      : FormGroup;
  extProd      : any                  = {};
  extrusion    : any                  = {};
  ver          : string               = '';
  rechazo      : any                  = {};
  aprobExt     :FormGroup;
  isEnabled    : boolean              = true;

  constructor(private linkService  : LinksService,
              private restService  : RestService,
              private userService  : UsersService,
              private modal        : NgbModal,
              private excel        : ExcelService,
              private servicioAlert: AlertasService,
              private fb           : FormBuilder,
              private servicioExtru: ExtrusionService,
              private serviLoad    : LoadingService
                      ) {

          this.filtro = fb.group({
                      lote_salida : ['']
                    });

          this.rechExt = fb.group({
                    extObs    : ['', Validators.compose([
                      Validators.required,
                      ])],
                    idMot : ['', Validators.compose([
                         Validators.required,
                     ])],
                     extKilR : ['', Validators.compose([
                      Validators.required,
                      Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
                      ])],
                      extKilApr : ['', Validators.compose([
                        Validators.required,
                        Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
                    ])]

                    });

             this.aprobExt = fb.group({
                      extObs    : ['', Validators.compose([
                        Validators.required,
                        ])],
                        extKilApr : ['', Validators.compose([
                           Validators.required,
                           Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
                       ])],
                       extKilR : ['', Validators.compose([
                        Validators.required,
                        Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
                    ])],

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

  public tblData(){
    this.tblExtrusion = {};
    this.restService.get('trabMotivo', this.token , this.parametros).subscribe(data =>{
      this.rechazo = data
    });

    this.restService.get('trabExtrusion', this.token , this.parametros).subscribe(data =>{
      this.tblExtrusion = data;

    });

     setTimeout(()=> {
        this.carga = 'visible';
        this.loading = false;
     },3000 );

     this.serviLoad.sumar.emit(2);
  }

  Excel(){
    this.excel.exportAsExcelFile(this.tblExtrusion, 'extrusion');
    return false;
  }

  buscar(lote_salida : string){
    if (lote_salida){
      this.loading      = true;
      let parm : any[]  = [{key :'lote_salida' ,value: lote_salida} ];
      this.tblExtrusion    = {};
      this.serviLoad.sumar.emit(1);
      this.restService.get('filLotSalExt' , this.token, parm).subscribe(respuesta => {
          this.tblExtrusion    = respuesta;
          this.loading      = false;
         });

    }else{
      this.servicioAlert.setAlert('Debe ingresar un filtro', 'warning');
    }
    this.servicioAlert.disparador.emit(this.servicioAlert.getAlert());
  }


  refrescar(){
    this.tblExtrusion = {};
    this.tblData();
  }
  extNuevo(){
    this.linkService.disparador.emit('insExtru');
  }

  autorizar(content : any, extrusion: any , tipo : string){
    this.extProd       = {};
    this.isEnabled     = true;
    this.aprobExt.controls['extObs'].setValue(extrusion.observaciones);
    this.aprobExt.controls['extKilR'].setValue(extrusion.kilos_repro);
    this.aprobExt.controls['extKilApr'].setValue(extrusion.kilos);


    if(extrusion.estado_control == 'PENDIENTE' && tipo == 'A'){
      this.isEnabled     = false;
      this.serviLoad.sumar.emit(1);
      this.extrusion     = extrusion;
      this.ver           = tipo;
      this.parametros    = [{key:'idExt' , value: extrusion.id}];
      this.modal.open(content , { size: 'lg' });
      this.restService.get('extDet' , this.token, this.parametros).subscribe(data=>{
        this.extProd = data;
      });
    }else{
      if(extrusion.estado_control == 'APROBADA' && tipo == 'A'){
        this.servicioAlert.setAlert('Le Extrusión ya fue autorizada', 'danger');
        this.servicioAlert.disparador.emit(this.servicioAlert.getAlert());
      }else{
        if(extrusion.estado_control == "RECHAZADA" && tipo == 'A'){
          this.servicioAlert.setAlert('Le Extrusión ya fue rechazada', 'danger');
          this.servicioAlert.disparador.emit(this.servicioAlert.getAlert());
        }else{
            if( tipo == 'V'){
              this.serviLoad.sumar.emit(1);
              this.extrusion  = extrusion;
              this.ver        = tipo;
              this.parametros = [{key:'idExt' , value: extrusion.id}];
              this.modal.open(content , { size: 'lg' });
              this.restService.get('extDet' , this.token, this.parametros).subscribe(data=>{
                this.extProd = data;
              });
        }
      }
     }
    }
  }
  confirmar(extrusion: any, extObs: any , extKilApr : any , extKilR : any){

    let parm   = {id: extrusion.id , extObs : extObs , extKilApr : extKilApr , extKilR : extKilR};

    this.serviLoad.sumar.emit(1);
    this.restService.post('confExtru' , this.token, parm).subscribe(data => {
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


  upExtrusion(extrusion : any , tipo : string){
    if(extrusion.estado_control == 'APROBADA'){
      this.servicioAlert.setAlert('Le Mezcla ya fue autorizada', 'danger');
      this.servicioAlert.disparador.emit(this.servicioAlert.getAlert());
    }else{
      if(tipo == 'O'){
        this.servicioExtru.setExtrusion(extrusion);
        this.linkService.disparador.emit('upExtruO');
      }else{
        this.servicioExtru.setExtrusion(extrusion);
        this.linkService.disparador.emit('upExtruC');
      }
    }
   }


   rechazar(content : any , extrusion: any ){
    this.extrusion    = {};

    if(extrusion.estado_control == 'PENDIENTE'){
      this.extrusion     = extrusion;
      this.parametros = [{key:'idExt' , value: extrusion.id}];
      this.modal.open(content , { size: 'lg' });
      this.serviLoad.sumar.emit(1);
      this.restService.get('extDet' , this.token, this.parametros).subscribe(data=>{
        this.extProd = data;
      });

    }else{
      if(extrusion.estado_control == 'APROBADA'){
        this.servicioAlert.setAlert('Le Extrusion ya fue autorizada', 'danger');
        this.servicioAlert.disparador.emit(this.servicioAlert.getAlert());
      }else{
        if(extrusion.estado_control == "RECHAZADA"){
          this.servicioAlert.setAlert('Le Extrusion ya fue rechazada', 'danger');
          this.servicioAlert.disparador.emit(this.servicioAlert.getAlert());
        }
      }
     }
    }

  rechExtrusion(idMot : any , extObs: any , extKilR: any , extKilApr: any){
    let extrusion = {'id': this.extrusion.id , 'idMot': idMot ,  'extObs': extObs, 'extKilR': extKilR , 'extKilApr': extKilApr};
    this.val      = true;
    this.serviLoad.sumar.emit(1);
      this.restService.post('rechaExtru' , this.token, extrusion).subscribe(data =>{
        data.forEach((elementx : any)  => {
          if(elementx.error == '0'){
            this.tblData();
            setTimeout(()=> {
              this.val= false;
              this.modal.dismissAll();
              },2000);
          }else{
            this.val      = false;
          }
        });
        this.servicioAlert.disparador.emit(this.servicioAlert.getAlert());
    });



  }

}
