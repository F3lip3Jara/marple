import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { AlertasService } from './../../../../servicios/alertas.service';
import { NgbDate, NgbDateParserFormatter, NgbModal, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from './../../../../servicios/users.service';
import { RestService } from './../../../../servicios/rest.service';
import { LinksService } from './../../../../servicios/links.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ins-extursion',
  templateUrl: './ins-extursion.component.html',
  styleUrls: ['./ins-extursion.component.css']
})


export class InsExtursionComponent implements OnInit {


  spinners                            = false;
  loading      : boolean              = true;
  carga        : string               = "visible";
  insExt       : FormGroup;
  token        : string               = '';
  sacas         : any ;
  parametros   : any []               = [];
  producto     : any                  = {};
  val          : boolean              = false;
  fechaS       : string               = '';
  config       :any                   = {};
  insdExt      : FormGroup;
  extursion    : any                  = {};
  extursionDet : any  []              = [];
  meridian = true;

  constructor( private servicioLink : LinksService ,
               private serviRest    : RestService,
               private servicio     : UsersService,
               private modal        : NgbModal,
               private fg           : FormBuilder ,
               private servicioAlert: AlertasService,
               public formatter     : NgbDateParserFormatter,
               private calendar     : NgbCalendar

               ) {
                this.sacas        = {};
                this.token        = this.servicio.getToken();


                this.insExt = fg.group({
                  extTurn    : ['', Validators.compose([
                    Validators.required,
                    ])],
                    extMaq : ['', Validators.compose([
                      Validators.required,
                      ])],

                    extForm : ['', Validators.compose([
                          Validators.required,
                          ])],
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
                      ])],
                    extdEsCen : ['', Validators.compose([
                        Validators.required,
                    ])],
                    extdEsDer : ['', Validators.compose([
                      Validators.required,
                  ])],
              });


   }

  ngOnInit(): void {


    this.serviRest.get('getSaca', this.token , this.parametros).subscribe(data => {
      this.sacas = data;
    });
  }





  selProducto (event : any){
    this.producto = event;
  }

  volver(){
    const d = 'extursion';
    this.servicioLink.disparador.emit(d);
    return false;
  }

  insOt(content : any){
    this.modal.open(content);
  }

  Notas(content : any){
    this.modal.open(content);
  }

  modConfirmar(extdHorInix: any , extdHorFinx: any , extdEsIzq:any , extdEsCen:any, extdEsDer:any  ){
     let extdHorIni = extdHorInix.hour + ':' + extdHorInix.minute;
     let extdHorFin = extdHorFinx.hour + ':' + extdHorFinx.minute;

     this.extursionDet.push(
           [ {key:'extdHorIni' , value:extdHorIni} ,
            {key:'extdHorFin' , value:extdHorFin} ,
            {key:'extdEsIzq'  , value:extdEsIzq } ,
            {key:'extdEsCen'  , value:extdEsCen } ,
            {key:'extdEsDer'  , value:extdEsDer }]
            );
      console.log(this.extursionDet);


  }
}
