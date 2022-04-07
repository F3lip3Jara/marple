import { AlertasService } from './../../../../servicios/alertas.service';
import { Mezcla } from './../../../../model/mezcla.model';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  valMezBase   : boolean              = true;
  valSelMezBase: boolean              = false;
  maquinas     : any ;
  materiaP     : any;
  insProd      : FormGroup;
  insPMez      : FormGroup;
  insMez       : FormGroup;
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
              private fg           : FormBuilder ,
              private servicioAlert: AlertasService,
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
                 Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$'),
                 Validators.max(100),
                 Validators.maxLength(4) ])]
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

    this.serviRest.get('diaJul', this.token , this.parametros).subscribe(data =>{
     this.calJul = data;

      if(this.calJul =='0'){
        this.valJul = true;
      }else{
        this.loading = false;
        this.carga   = 'visible';
      }
    });
/*    this.serviRest.get('diaJul' , this.token , this.parametros).subscribe(data=> {
    if(this.calJul =='0'){
        this.valJul = true;
      }else{
        this.loading = false;
        this.carga   = 'visible';
      }
      console.log(data);

    });
*/
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
      let id = field;
      this.insProd.controls['mezdKil'].setValue('');
      this.insProd.controls['mezLotIng'].setValue('');
      this.insProd.controls['mezdUso'].setValue('');
      if(this.materiaP.length > 0){
        this.materiaP.forEach((element:any) => {
          if(element.idPrd == id){
            if(element.prdTip == 'Z'){
              this.isEnabled = true;
              this.insProd.controls['mezdKil'].setValue('0');
              }else{
                this.insProd.controls['mezdKil'].setValue('');
                this.isEnabled     = false;
                this.valMezBase    = false;
                this.valSelMezBase = false;
              }
          }
      });

      }

    });

    this.insProd.controls['mezdUso'].valueChanges.pipe(
      filter(text => text != null),
      debounceTime(200),
      distinctUntilChanged()
    ).subscribe(field => {
      let usoTot = 0.0;

      this.mezProd.forEach(element => {
        if(element.prdTip != 'Z'){
          usoTot  = usoTot  +   parseFloat(element.mezdUso);
         }
      });

      let id = this.insProd.controls['idPrd'].value;
      this.parametros = [{key :'idPrd' ,value: id }];
      let tipo = '';

      this.serviRest.get('datPrd',this.token, this.parametros).subscribe((data : any)=>{
               data.forEach((element :any) => {
                  tipo = element.prdTip
               });
               if(tipo == 'Z' && usoTot == 0){
                this.valSelMezBase = true;
              }
        });
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

  agregar(idPrd : any , mezLotIng : any ,  mezdKil:any ,  mezdUso: any  ){
    let prdCod : any;
    let prdDes : any;
    let prdTip : any;

    this.parametros = [{key :'idPrd' ,value: idPrd }];

    this.serviRest.get('datPrd',this.token, this.parametros).subscribe((data : any)=>{
        data.forEach((element :any) => {
           prdCod = element.prdCod;
           prdDes = element.prdDes;
           prdTip = element.prdTip;
        });

        if(prdTip =='Z'){
          let usoTot : any  = 0.0 ;
          let kilotot: any  = 0.0 ;
          let mezdKilx: any = 0.0 ;

          this.mezProd.forEach(element => {
              usoTot  = usoTot  + parseFloat(element.mezdUso);
              kilotot = kilotot + parseFloat(element.mezdKil);
          });
          try{
            mezdKilx =(kilotot * mezdUso)/ usoTot;
            mezdKilx =  Math.round(mezdKilx*100)/100;
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
            'prdTip'     : prdTip
            });

        }else{
          let mezdKilx = Math.round(mezdKil*100)/100;
          this.mezProd.push({
            'idPrd'      : idPrd,
            'prdCod'     : prdCod,
            'prdDes'     : prdDes,
            'mezLotIng'  : mezLotIng,
            'mezdKil'    : mezdKilx,
            'mezdUso'    : mezdUso,
            'prdTip'     : prdTip
            });
        }

        let totUso  : any = 0.0;

        this.mezProd.forEach(element => {
            totUso  = totUso  +   parseFloat(element.mezdUso);
            if(element.prdTip  != 'Z'){
              this.valMezBase = false;
            }
        });

        if(totUso > 100){
            this.valPor = true;
        }else{
          this.valPor = false;
        }
    });

    this.modal.dismissAll();
    this.insProd.controls['idPrd'].setValue('');
    this.insProd.controls['mezdKil'].setValue('');
    this.insProd.controls['mezLotIng'].setValue('');
    this.insProd.controls['mezdUso'].setValue('');
  }

  delPrd(index:any){
    this.mezProd.splice(index , 1);
    let totUso  : any = 0.0;

    this.mezProd.forEach(element => {
        totUso  = totUso  +   parseFloat(element.mezdUso);
        if(element.prdTip  != 'Z'){
          this.valMezBase = false;
        }else{
          this.valMezBase = true;
        }
    });

    if(this.valMezBase){
      this.mezProd    = [];
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

    this.mezcla?.setEta(etapa);
    this.mezcla?.setmezdKil(mezKil);
    this.serviRest.post('insMezcla', this.token, this.mezcla).subscribe(resp=>{
        this.val = true;
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

  }

}
