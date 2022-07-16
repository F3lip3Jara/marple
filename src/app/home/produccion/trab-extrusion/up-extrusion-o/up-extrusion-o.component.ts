import { ExtrusionService } from './../../../../servicios/extrusion.service';
import { LoadingService } from './../../../../servicios/loading.service';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from 'src/app/servicios/users.service';
import { RestService } from 'src/app/servicios/rest.service';
import { LinksService } from 'src/app/servicios/links.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ExtrusionDet } from 'src/app/model/extrusiondet.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-up-extrusion-o',
  templateUrl: './up-extrusion-o.component.html',
  styleUrls: ['./up-extrusion-o.component.css']
})
export class UpExtrusionOComponent implements OnInit {
  spinners                            = false;
  loading      : boolean              = true;
  carga        : string               = "invisible";
  //insExt       : FormGroup;
  inseExt      : FormGroup;
  token        : string               = '';
  sacas        : any ;
  parametros   : any []               = [];
  producto     : any                  = {};
  val          : boolean              = false;
  fechaS       : string               = '';
  config       :any                   = {};
  insdExt      : FormGroup;
  extrusion    : any;
  extrusionx   : any                  = {};
  extrusionDet : any[]                = [];
  maquinas     : any ;
  valGuar      : boolean              = false;
  diaJul       : any;
  isEnabled    : boolean              = true;
  extLotSal    : string               = '';
  idExt        : number               = 0;
  valJul       : boolean              = false;
  etapas       : any                  = {};
  extTurn      : number               = 0;
  aprobExt     :FormGroup;


  constructor( private servicioLink : LinksService ,
               private serviRest    : RestService,
               private servicio     : UsersService,
               private modal        : NgbModal,
               private fg           : FormBuilder ,
               private servicioAlert: AlertasService,
               private serviLoad    : LoadingService,
               private serviExtru   : ExtrusionService
               ) {
                this.sacas        = {};
                this.maquinas     = {};
                this.token        = this.servicio.getToken();
                this.extrusionx   = this.serviExtru.getExtrusion();
                this.idExt        =  this.extrusionx.id;

                  this.inseExt = fg.group({
                    extFor    : ['', Validators.compose([
                    ])],

                    extAnbob    :['', Validators.compose([
                      Validators.required,
                      Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
                    ])] ,
                    idEta      :  ['', Validators.compose([

                    ])] ,

                  });

                  this.insdExt = fg.group({
                    extdHorIni    : ['', Validators.compose([
                        Validators.required,
                      ])],
                    extdHorFin : ['', Validators.compose([
                        Validators.required,
                      ])],
                    extdEsIzq : ['', Validators.compose([
                        Validators.required,
                        Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
                      ])],
                    extdEsCen : ['', Validators.compose([
                        Validators.required,
                        Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
                    ])],
                    extdEsDer : ['', Validators.compose([
                      Validators.required,
                      Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
                  ])],
                  extdObs : ['', Validators.compose([
                  ])]
              });

              
              this.aprobExt = fg.group({
                extObs    : [this.extrusionx.observaciones, Validators.compose([
                  Validators.required,
                  ])],
                  extKilApr : [this.extrusionx.kilos, Validators.compose([
                     Validators.required,
                     Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
                 ])],
                 extKilR : [this.extrusionx.kilos_repro, Validators.compose([
                  Validators.required,
                  Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
              ])],

                });
 }

  ngOnInit(): void {

    let parm : any[]  = [{key :'idExt' ,value: this.extrusionx.id} ];

    this.serviRest.get('indexFil', this.token, parm).subscribe((data: any)=>{
      this.loading      = false;
      this.carga        = "visible";
      let extrusion     = data.extrusion;
      this.extrusionDet = data.extrusionDet;

      extrusion.forEach((element : any) => {
          this.extrusion = element;
          this.producto  = {'idPrd':this.extrusion.extIdPrd , 'prdCod': this.extrusion.extPrdCod , 'prdDes' : this.extrusion.extPrdDes };          this.inseExt.controls['extAnbob'].setValue(this.extrusion.extAnbob);
          this.inseExt.controls['extFor'].setValue(this.extrusion.extFor);
          this.inseExt.controls['idEta'].setValue(this.extrusion.extidEta);
      });
    });

    this.parametros = [{key:'idEta' , value : 4}];

    this.serviRest.get('filEta', this.token , this.parametros).subscribe(data => {
      this.maquinas = data;
    });

    this.serviRest.get('etapasProd' , this.token , this.parametros).subscribe(data =>{
      this.etapas	= data;
  });
  this.serviLoad.sumar.emit(3);
  }

selProducto (event : any){   
    this.producto = event;
  }

  volver(){
    const d = 'extrusion';
    this.servicioLink.disparador.emit(d);
    return false;
  }

  insOt(content : any){
    this.modal.open(content);
  }

  insNotas(content : any){
    this.modal.open(content);
  }
  delPrd(index:any){
    this.extrusionDet.splice(index , 1);
  }

  modConfirmar(extdHorInix: any , extdHorFinx: any , extdEsIzq:any , extdEsCen:any, extdEsDer:any  , extdObs : any){
   let horaI     = extdHorInix.hour;
   let horaF     = extdHorFinx.hour;
   let minI      = extdHorInix.minute;
   let minF      = extdHorFinx.minute;
    if(extdHorInix.hour < 10){
      horaI = '0' + extdHorInix.hour
    }
    if(extdHorFinx.hour  < 10){
      horaF = '0' + extdHorFinx.hour
    }
    if(extdHorInix.minute  < 10){
      minI = '0' + extdHorInix.minute;
    }
    if(extdHorFinx.minute  < 10){
      minF = '0' + extdHorFinx.minute;
    }
    let extdHorIni =  horaI + ':' + minI;
    let extdHorFin =  horaF + ':' + minF;
    let extrusionDet : ExtrusionDet = new ExtrusionDet(extdHorIni , extdHorFin, extdEsIzq , extdEsCen,  extdEsDer , "P", extdObs);
    this.extrusionDet.push(extrusionDet);
    this.modal.dismissAll()
    this.insdExt.reset();
    //console.log(this.extrusionDet);
  }
  
  terminar(extAnbob : any , extFor : any , idEta : any , content:any){
      this.parametros = [];
      this.serviLoad.sumar.emit(1);
      console.log(this.producto);
      this.val = true;
      this.parametros  = [{'extAnbob' : extAnbob , 'extFor' : extFor , 'idExt': this.idExt , 'extrusionDet' : this.extrusionDet , 'idEta' : idEta , 'producto' : this.producto} ];   
      this.serviRest.post('insConfirmaO', this.token , this.parametros).subscribe(data=>{       
        data.forEach((elementx : any)  => {
            if(elementx.error == '0'){
              this.servicioAlert.setAlert('Extrusión caragada manera correcta', 'success');
              this.servicioAlert.disparador.emit(this.servicioAlert.getAlert());
              setTimeout(()=> {
                this.val= false;
                this.modal.dismissAll();
                this.servicioLink.disparador.emit('extrusion');
                },1000 );
            }else{
              this.carga    = 'visible';
              this.loading  = false;
              this.val      = false;
            }
          });
      });
  }
  confirmar(extObs :any,extKilApr:any,extKilR:any){
    let parm   = {id: this.idExt ,  extKilApr : extKilApr , extKilR : extKilR , extObs:extObs};
    this.val   = true;
    this.serviLoad.sumar.emit(1);
    this.serviRest.post('confExtruO' , this.token, parm).subscribe(data => {
      this.val = true;
        data.forEach((elementx : any)  => {
          if(elementx.error == '0'){
              this.servicioLink.disparador.emit('extrusion');
              this.val= false;
              this.modal.dismissAll();           
          }else{
            this.val      = false;
          }
        });
        this.servicioAlert.disparador.emit(this.servicioAlert.getAlert());
    });
  }
}
