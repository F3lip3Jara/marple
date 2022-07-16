import { LoadingService } from './../../../../servicios/loading.service';
import { AlertasService } from './../../../../servicios/alertas.service';
import { Mezcla } from './../../../../model/mezcla.model';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from 'src/app/servicios/users.service';
import { RestService } from 'src/app/servicios/rest.service';
import { LinksService } from 'src/app/servicios/links.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ins-mezcla',
  templateUrl: './ins-mezcla.component.html',
  styleUrls: ['./ins-mezcla.component.css']
})

export class InsMezclaComponent implements OnInit {

  dtOptions    : DataTables.Settings  = {} ;
  loading      : boolean              = true;
  tblOrdenPrd  : any                  = {};
  producto     : any                  = {};
  token        : string               = '';
  parametros   : any []               = [];
  etapas       : any ;
  carga        : string               = "invisible";
  model        : any;
  ot           : any []               = [];
  val          : boolean              = false;
  valPor       : boolean              = false;
  productos    : any ;
  valcod       : boolean              = false;
  valMezBase   : boolean              = false;
  valSelMezBase: boolean              = false;
  maquinas     : any ;
  materiaP     : any;
  insProd      : UntypedFormGroup;
  insPMez      : UntypedFormGroup;
  insMez       : UntypedFormGroup;
  calJul       : any;
  valJul       : boolean              = false;
  mezProd      : any []               = [];
  isEnabled    : boolean              = false;
  mezLotSal    : string               = '';
  mezcla?       : Mezcla;

  constructor(private servicioLink : LinksService ,
              private serviRest    : RestService,
              private servicio     : UsersService,
              private modal        : NgbModal,
              private fg           : UntypedFormBuilder ,
              private servicioAlert: AlertasService,
              private serviLoad    : LoadingService
            ) {

              this.etapas       = {};
              this.materiaP     = {};
              this.maquinas     = {};
              this.token        = this.servicio.getToken();

              this.insProd = fg.group({
                idPrd    : ['', Validators.compose([
                  Validators.required,
                  ])],
                mezdKil   : ['', Validators.compose([
                    Validators.required,
                    Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
                ])],
                mezLotIng : ['', Validators.compose([
                  Validators.required,
              ])],
                mezdUso   : ['', Validators.compose([
                Validators.required,
                 Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
                 Validators.max(100),
                 Validators.maxLength(4) ])],

               mezdManual   : [false, Validators.compose([
                  ])],
              });


              this.insPMez = fg.group({
               mezTurn    : ['', Validators.compose([
                Validators.required,
                  ])],
               mezMaq     : ['', Validators.compose([
                Validators.required,
                ])],
                mezTip    : ['', Validators.compose([
                  Validators.required,
                  ])],
              });

              this.insMez = fg.group({
                idEta    : ['', Validators.compose([
                 Validators.required,
                   ])],
                mezKil : ['',  Validators.compose([
                  Validators.required,
                  Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
                    ])],

               });
  }

  ngOnInit(): void {

    this.serviLoad.sumar.emit(5);

    this.serviRest.get('diaJul', this.token , this.parametros).subscribe(data =>{
     this.calJul = data;

      if(this.calJul =='0'){
        this.valJul = true;
      }else{
        this.loading = false;
        this.carga   = 'visible';
      }
    });

    this.parametros = [{key:'idEta' , value : 3}];

    this.serviRest.get('filEta', this.token , this.parametros).subscribe(data => {
      this.maquinas = data;
    })

    this.serviRest.get('datPrdMtP', this.token , this.parametros).subscribe(data=>{
      this.materiaP = data;
    });

    this.serviRest.get('etapasProd' , this.token , this.parametros).subscribe(data =>{
        this.etapas	= data;
    });

    this.insProd.controls['idPrd'].valueChanges.subscribe(field => {
      let manual          = this.insProd.controls['mezdManual'].value;
      let  valBase        = 0;

      this.insProd.controls['mezLotIng'].setValue('');
      this.insProd.controls['mezdUso'].setValue('');
      this.insProd.controls['mezdKil'].setValue('0');

      if(manual == true){
         this.isEnabled     = false;
         valBase            = 0;
         this.valSelMezBase = false;
      }else{
        let producto : any  =  this.insProd.controls['idPrd'].value;
         if(producto.prdTip =='B'){
          valBase            = 0;
          this.isEnabled     = false;
          this.valSelMezBase = false;
        }else{
          this.isEnabled     = true;
          valBase            = 1;

          this.mezProd.forEach((element : any) => {
                if(element.prdTip =='B'){
                  valBase = 0;
                }
         });

         if(valBase == 1){
           this.valSelMezBase   = true;//se debe ingresar material base
         }else{
           this.valSelMezBase   = false;
         }

       }
      }
    });


    this.insProd.controls['mezdManual'].valueChanges.subscribe(field => {
      this.insProd.controls['mezLotIng'].setValue('');
      this.insProd.controls['mezdUso'].setValue('');
      this.insProd.controls['mezdKil'].setValue('0');
      this.valSelMezBase = false;
      let producto         = this.insProd.controls['idPrd'].value;
      let  valBase         = 0;
      if(field == true){
          this.isEnabled     = false;
          this.valSelMezBase = false;
      }else{
        if(producto.prdTip !='B'){
            valBase        = 1;

            this.mezProd.forEach(element => {
                if(element.prdTip =='B'){
                  valBase        = 0;
                }
            });
            console.log(valBase);
            if(valBase == 1){
              this.valSelMezBase   = true;//se debe ingresar material base
            }else{
              this.valSelMezBase   = false;
            }
           }
        }
    });


  }

  volver(){
    const d = 'mezcla';
    this.servicioLink.disparador.emit(d);
    return false;
  }

  selPrd(modal : any){

    this.modal.open(modal);
  }

  selProducto (event : any){
    this.producto = event;
  }

  agregar(idPrd : any , mezLotIng : any ,  mezdKil:any ,  mezdUso: any  , mezdManual:any ){
      let prdCod         = idPrd.prdCod;
      let prdDes         = idPrd.prdDes;
      let prdTip         = idPrd.prdTip;
      let mezdManualx    = '';
      let mezdKilx: any  = 0.0 ;

      if(mezdManual == false){
        mezdManualx = 'N';
      }else{
        mezdManualx = 'S';
      }
      console.log(prdTip);
      console.log(mezdManual);

      if(prdTip !='B' && mezdManual == false){
        let usoTot  : any  = 0.0 ;
        let kilotot : any  = 0.0 ;

        this.mezProd.forEach(element => {
          console.log(element);

          if(element.mezdManual == 'N'){
            usoTot  = usoTot  + parseFloat(element.mezdUso);
            kilotot = kilotot + parseFloat(element.mezdKil);
          }
        });

        try{
          mezdKilx =(kilotot * mezdUso)/ usoTot;
          mezdKilx =  Math.round(mezdKilx*100)/100;
          console.log(kilotot);
          console.log(mezdUso);
          console.log(usoTot);
          console.log(mezdKilx);

        }catch(error){
          mezdKilx = 0;
        }

         this.mezProd.push({
          'idPrd'      : idPrd,
          'prdCod'     : prdCod,
          'prdDes'     : prdDes,
          'mezLotIng'  : mezLotIng,
          'mezdKil'    : mezdKilx,
          'mezdUso'    : mezdUso,
          'prdTip'     : prdTip,
          'mezdManual' : mezdManualx
          });

      }else{

        mezdKilx = Math.round(mezdKil*100)/100;
        this.mezProd.push({
          'idPrd'      : idPrd,
          'prdCod'     : prdCod,
          'prdDes'     : prdDes,
          'mezLotIng'  : mezLotIng,
          'mezdKil'    : mezdKilx,
          'mezdUso'    : mezdUso,
          'prdTip'     : prdTip,
          'mezdManual' : mezdManualx
          });
      }
      let totUso        = 0.0;
      let materia_b     = 'N';
      let manual        = 'N';

      this.mezProd.forEach(element => {
          totUso  = totUso  +   parseFloat(element.mezdUso);
          if(element.prdTip  == 'B'){
              materia_b = 'S';
          }
          if(element.mezdManual == 'S'){
              manual        = 'S';
          }
      });


      if(materia_b == 'N' && manual == 'N'){
        this.valMezBase = true;
      }else{
        this.valMezBase = false;
      }

      if(totUso > 100){
          this.valPor = true;
      }else{
        this.valPor = false;
      }
      this.modal.dismissAll();
      this.insProd.controls['idPrd'].setValue('');
      this.insProd.controls['mezdKil'].setValue('');
      this.insProd.controls['mezLotIng'].setValue('');
      this.insProd.controls['mezdUso'].setValue('');
      this.insProd.controls['mezdManual'].setValue(false);


  }

  delPrd(index:any){
    this.mezProd.splice(index , 1);
    let totUso  : any = 0.0;
    let materia_b     = 'N';
    let manual        = 'N';
    this.valMezBase   = true;

    this.mezProd.forEach(element => {
        totUso  = totUso  +   parseFloat(element.mezdUso);
        if(element.prdTip  == 'B'){
            materia_b = 'S';
        }
        if(element.mezdManual == 'S'){
            manual        = 'S';
        }
    });


    if(materia_b == 'N' && manual == 'N'){
      this.valMezBase = true;
      this.mezProd    = [];
    }else{
      this.valMezBase = false;
    }

    if(totUso > 100){
        this.valPor = true;
    }else{
      this.valPor = false;
    }

  }

  modConfirmar(mezTurn : any , mezMaq : any , mezTip : any, modal: any){
    this.modal.open(modal);    
    if(mezTip == 'S'){
      this.mezLotSal = mezMaq + '0' + mezTurn + this.calJul;
    }    
    this.mezcla = new Mezcla(mezTurn , mezMaq , mezTip , this.mezProd, this.mezLotSal , [] , 0 , '');
    this.mezcla.setProducto(this.producto);
  }

  confirmar(etapa : any , mezKil : any){
    this.val = true;
    this.mezcla?.setEta(etapa);
    this.mezcla?.setmezdKil(mezKil);
    this.serviRest.post('insMezcla', this.token, this.mezcla).subscribe(resp=>{
        resp.forEach((elementx : any)  => {
          if(elementx.error == '0'){
             this.servicioAlert.setAlert('Mezcla caragada manera correcta', 'success');
             this.servicioAlert.disparador.emit(this.servicioAlert.getAlert());
            setTimeout(()=> {
              this.val= false;
              this.modal.dismissAll();
              this.servicioLink.disparador.emit('mezcla');
              },2000 );
          }else{
            this.carga    = 'visible';
            this.loading  = false;
            this.val      = false;
          }
        });
    });
    this.serviLoad.sumar.emit(1);
  }

}
