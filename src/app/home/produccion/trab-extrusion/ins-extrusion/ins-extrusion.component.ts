import { Loading } from './../../../../model/loading';
import { LoadingService } from './../../../../servicios/loading.service';
import { AlertasService } from './../../../../servicios/alertas.service';
import { NgbModal, NgbDateParserFormatter, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from 'src/app/servicios/users.service';
import { RestService } from './../../../../servicios/rest.service';
import { LinksService } from './../../../../servicios/links.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ExtrusionDet } from 'src/app/model/extrusiondet.model';
import { min } from 'rxjs/operators';

@Component({
  selector: 'app-ins-extrusion',
  templateUrl: './ins-extrusion.component.html',
  styleUrls: ['./ins-extrusion.component.css']
})
export class InsExtrusionComponent implements OnInit {


  spinners                            = false;
  loading      : boolean              = true;
  carga        : string               = "invisible";
  insExt       : FormGroup;
  inseExt      : FormGroup;
  token        : string               = '';
  sacas        : any ;
  parametros   : any []               = [];
  producto     : any                  = {};
  val          : boolean              = false;
  fechaS       : string               = '';
  config       :any                   = {};
  insdExt      : FormGroup;
  extursion    : any                  = {};
  extrusionDet : any[]                = [];
  maquinas     : any ;
  valGuar      : boolean              = false;
  diaJul       : any;
  isEnabled    : boolean              = false;
  extLotSal    : string               = '';
  idExt        : number               = 0;
  valJul       : boolean              = false;
  etapas       : any                  = {};
  aprobExt     :FormGroup;

  constructor( private servicioLink : LinksService ,
               private serviRest    : RestService,
               private servicio     : UsersService,
               private modal        : NgbModal,
               private fg           : FormBuilder ,
               private servicioAlert: AlertasService,
               private serviLoad    : LoadingService

               ) {
                this.sacas        = {};
                this.maquinas     = {};
                this.token        = this.servicio.getToken();

                this.insExt = fg.group({
                    extTurn    : ['', Validators.compose([
                    Validators.required,
                    ])],
                    extMaq : ['', Validators.compose([
                      Validators.required,
                      ])],

                    extMez : ['', Validators.compose([
                          Validators.required,
                          ])],

                  });

                  this.inseExt = fg.group({
                    extFor    : ['', Validators.compose([
                    ])],
                    extAnbob    : ['', Validators.compose([
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


   }

  ngOnInit(): void {
    this.serviRest.get('diaJul', this.token , this.parametros).subscribe(data => {
      this.diaJul = data;
        if(this.diaJul =='0'){
          this.valJul = true;
        }else{
          this.loading = false;
          this.carga   = 'visible';
        }
    });

    this.serviRest.get('getSaca', this.token , this.parametros).subscribe(data => {
      this.sacas = data;
    });

    this.parametros = [{key:'idEta' , value : 4}];
    this.serviRest.get('filEta', this.token , this.parametros).subscribe(data => {
      this.maquinas = data;
    });

    this.serviRest.get('etapasProd' , this.token , this.parametros).subscribe(data =>{
      this.etapas	= data;
   });


    this.serviLoad.sumar.emit(4);

  }

  insExtrusion(extTurn:any , extMaq:any, extMez:any ){
      this.serviLoad.sumar.emit(1);
      this.parametros  = [];
      this.parametros  = [{'extTurn' : extTurn , 'extMaq' : extMaq , 'extMez': extMez , 'diaJul' : this.diaJul} ] ;
      this.serviRest.post('insExtrusion', this.token, this.parametros).subscribe(resp => {
        this.val = true;
        resp.forEach((elementx : any)  => {
        if(elementx.error == '0'){
            this.isEnabled  = true;
            console.log(elementx.data);
            let datos       = elementx.data;

            datos.forEach((element : any) => {
                console.log(element);
                this.extLotSal = element.extLotSal;
                this.idExt     = element.idExt;
            });

            setTimeout(()=> {
              this.val= false;
              },1000 );

          }else{
            this.carga    = 'visible';
            this.loading  = false;
            this.val      = false;
          }
       });
      });
      this.servicioAlert.disparador.emit(this.servicioAlert.getAlert());

  }

  selProducto (event : any){
    console.log(event);

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

  modConfirmar(extdHorInix: any , extdHorFinx: any , extdEsIzq:any , extdEsCen:any, extdEsDer:any , extdObs:any ){

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
    let extrusionDet : ExtrusionDet = new ExtrusionDet(extdHorIni , extdHorFin, extdEsIzq , extdEsCen,  extdEsDer , 'P', extdObs);
    this.extrusionDet.push(extrusionDet);
    this.modal.dismissAll()
    this.insdExt.reset();
  }

  terminar(extAnbob : any , extFor : any , idEta : any , content:any){
      this.parametros = [];
      this.serviLoad.sumar.emit(1);
      this.parametros  = [{'extAnbob' : extAnbob , 'extFor' : extFor , 'idExt': this.idExt , 'extrusionDet' : this.extrusionDet , 'idEta' : idEta , 'producto' : this.producto} ] ;
      this.serviRest.post('insConfirma', this.token , this.parametros).subscribe(data=>{
        this.val = true;
        data.forEach((elementx : any)  => {
            if(elementx.error == '0'){
              this.servicioAlert.setAlert('Extrusión caragada manera correcta', 'success');
              this.servicioAlert.disparador.emit(this.servicioAlert.getAlert());
              setTimeout(()=> {
                this.val= false;
                this.modal.dismissAll();
               // this.servicioLink.disparador.emit('extrusion');
               this.modal.open(content);
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
    let parm   = {id: this.idExt ,  extKilApr : extKilApr , extKilR : extKilR , extObs: extObs};
    this.val   = true;
    this.serviLoad.sumar.emit(1);
    this.serviRest.post('confExtruO' , this.token, parm).subscribe(data => {
      this.val = true;
        data.forEach((elementx : any)  => {
          if(elementx.error == '0'){
            setTimeout(()=> {
              this.val= false;
              this.modal.dismissAll();
              this.servicioLink.disparador.emit('extrusion');
              },2000 );
          }else{
            this.val      = false;
          }
        });
        this.servicioAlert.disparador.emit(this.servicioAlert.getAlert());
    });
  }



}
