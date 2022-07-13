import { TareasService } from './../../../../../servicios/tareas.service';
import { LoadingService } from './../../../../../servicios/loading.service';
import { AlertasService } from './../../../../../servicios/alertas.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from 'src/app/servicios/users.service';
import { RestService } from './../../../../../servicios/rest.service';
import { LinksService } from './../../../../../servicios/links.service';
<<<<<<< HEAD
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
=======
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
>>>>>>> 3a629026ca5e04e1d05975795fe6b23bf253a8dd
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-ins-termoformado',
  templateUrl: './ins-termoformado.component.html',
  styleUrls: ['./ins-termoformado.component.css']
})
export class InsTermoformadoComponent implements OnInit {


  spinners                            = false;
  loading      : boolean              = true;
  carga        : string               = "invisible";
<<<<<<< HEAD
=======
  //insTerm      : FormGroup;
  //inseTerm     : FormGroup;
>>>>>>> 3a629026ca5e04e1d05975795fe6b23bf253a8dd
  token        : string               = '';
  sacas        : any ;
  parametros   : any []               = [];
  producto     : any                  = {};
  val          : boolean              = false;
  fechaS       : string               = '';
  config       :any                   = {};
<<<<<<< HEAD
=======
  //insdExt      : FormGroup;
  extursion    : any                  = {};
  extrusionDet : any[]                = [];
>>>>>>> 3a629026ca5e04e1d05975795fe6b23bf253a8dd
  maquinas     : any ;
  valGuar      : boolean              = false;
  diaJul       : any;
  isEnabled    : boolean              = false;
  extLotSal    : string               = '';
  idExt        : number               = 0;
  valJul       : boolean              = false;
  etapas       : any                  = {};
  today        : Date                 = new Date();
  pipe                                = new DatePipe('en-US');
  todayWithPipe: any;
  insumos      : any;
  orden_trabajo: any;
<<<<<<< HEAD
  peso         : string               = '';
  ancho        : string               = '';
  espesor      : string               = '';
=======
>>>>>>> 3a629026ca5e04e1d05975795fe6b23bf253a8dd

  constructor( private servicioLink : LinksService,
               private serviRest    : RestService,
               private servicio     : UsersService,
               private modal        : NgbModal,
<<<<<<< HEAD
               private fg           : UntypedFormBuilder,
=======
               private fg           : FormBuilder,
>>>>>>> 3a629026ca5e04e1d05975795fe6b23bf253a8dd
               private servicioAlert: AlertasService,
               private serviLoad    : LoadingService,
               private serTareas    : TareasService

               ) {
<<<<<<< HEAD
                this.sacas         = {};
                this.insumos       = {};
                this.maquinas      = {};
                this.token         = this.servicio.getToken();
=======
                this.sacas        = {};
                this.insumos      = {};
                this.maquinas     = {};
                this.token        = this.servicio.getToken();
>>>>>>> 3a629026ca5e04e1d05975795fe6b23bf253a8dd
                this.orden_trabajo = this.serTareas.getExtrusion();

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

    this.todayWithPipe = this.pipe.transform(Date.now(), 'dd-MM-yyyy');

    this.parametros = [{key:'idEta' , value : 5}];
    this.serviRest.get('filEta', this.token , this.parametros).subscribe(data => {
      this.maquinas = data;
    });


    this.serviRest.get('prodInsumo', this.token , this.parametros).subscribe(data => {
      this.insumos = data;
    });


    this.serviLoad.sumar.emit(4);

  }

  insExtrusion(extTurn:any , extMaq:any, extMez:any ){


  }

  selProducto (event : any){
<<<<<<< HEAD
=======
    console.log(event);
>>>>>>> 3a629026ca5e04e1d05975795fe6b23bf253a8dd
    this.producto = event;
  }

  volver(){
    const d = 'extrusion';
    this.servicioLink.disparador.emit(d);
    return false;
  }

  insCtlProd(modalInsCtl : any){
    this.modal.open(modalInsCtl , {size:'lg'});
<<<<<<< HEAD
    this.peso    = '';
    this.ancho   = '';
    this.espesor = '';

=======
>>>>>>> 3a629026ca5e04e1d05975795fe6b23bf253a8dd
  }

  selExtrusion(extrusion : any){
    console.log(extrusion);
<<<<<<< HEAD
    
    this.peso    = extrusion.extKilApr;
    this.ancho   = extrusion.extAnbob ;
    this.espesor = extrusion.extFor;
=======

>>>>>>> 3a629026ca5e04e1d05975795fe6b23bf253a8dd
  }





}
