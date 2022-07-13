import { LoadingService } from './../../../../servicios/loading.service';
import { Producto } from 'src/app/model/producto.model';
import { LinksService } from 'src/app/servicios/links.service';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { RestService } from 'src/app/servicios/rest.service';
import { UsersService } from 'src/app/servicios/users.service';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { LogSysService } from 'src/app/servicios/log-sys.service';
import { LogSys } from 'src/app/model/logSys.model';

@Component({
  selector: 'app-ins-productos',
  templateUrl: './ins-productos.component.html',
  styleUrls: ['./ins-productos.component.css']
})
export class InsProductosComponent implements OnInit {

  insProd      : UntypedFormGroup;
  loading      : boolean              = true;
  medidas      :any;
  monedas      :any;
  grupos       :any;
  subgrupos    :any;
  colores      :any;
  carga        : string               = "invisible";
  val          : boolean              = false;
  token        : string               = '';
  parametros   : any []               = [];
  valCod       : any;
  valEan       : any;
  mensaje      : string               = '';


  constructor(private fg            : UntypedFormBuilder,
              private servicio      : UsersService,
              private rest          : RestService,
              private servicioaler  : AlertasService,
              private servicioLink  : LinksService,
              private serviLoad     : LoadingService,
              private serLog        : LogSysService
              ) {

      this.medidas       = {};
      this.monedas       = {};
      this.grupos        = {};
      this.subgrupos     = {};
      this.colores       = {};

      this.token     = this.servicio.getToken();


      this.insProd = fg.group({
        prdCod : ['', Validators.compose([
          Validators.required
          ])],
          prdInv : ['', Validators.compose([
            ])],

          prdDes : ['', Validators.compose([
            Validators.required
            ])],

          prdObs : ['', Validators.compose([
           ])],

           prdEan : ['', Validators.compose([
             Validators.required ,
             Validators.pattern('^-?[0-9]\\d*?$')
            ])],

            idUn : ['', Validators.compose([
              Validators.required
            ])],

            idGrp : ['', Validators.compose([
              Validators.required
            ])],

            idSubGrp : ['', Validators.compose([
              Validators.required
            ])],

            prdTip : ['', Validators.compose([
              Validators.required
            ])],

            idCol : ['', Validators.compose([
              Validators.required
            ])],

            idMon : ['', Validators.compose([
              Validators.required
            ])],

            prdCost : ['', Validators.compose([
              Validators.required ,
              Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')
            ])],

            prdNet : ['', Validators.compose([
              Validators.required,
              Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')
            ])],

            prdBrut : ['', Validators.compose([
              Validators.required,
              Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')
            ])],

            prdPes : ['', Validators.compose([
              Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,2})?$')
            ])],

            prdMin : ['', Validators.compose([
              Validators.required,
              Validators.pattern('^-?[0-9]\\d*?$')
            ])],


      });

     }

  ngOnInit(): void {

    this.rest.get('trabUnidad' , this.token,this.parametros).subscribe(data => {
          this.medidas = data;
    });

    this.rest.get('trabGrupo' , this.token,this.parametros).subscribe(data => {
        this.grupos = data;
    });

    this.rest.get('trabColor' , this.token,this.parametros).subscribe(data => {
      this.colores = data;
    });

    this.rest.get('trabMoneda' , this.token,this.parametros).subscribe(data => {
      this.monedas = data;
      this.loading =  false;
      this.carga = 'visible';
  });

  this.insProd.controls['idGrp'].valueChanges.subscribe(field => {
    this.subgrupos = {};
    this.parametros = [{key :'idGrp' ,value: field}];
    this.rest.get('subGrp' , this.token, this.parametros).subscribe(data => {
      this.subgrupos = data;
      });
  });

  this.insProd.controls['prdCod'].valueChanges.pipe(
    filter(text => text.length > 1),
    debounceTime(200),
    distinctUntilChanged()).subscribe(field => {
    this.parametros = [{key :'prdCod' ,value: field}];
     this.rest.get('valPrdCod', this.token , this.parametros).subscribe( (data : any) => {
        if(data != 0){
          this.valCod = true;
          this.mensaje= 'El código ya existe';
        }else{
          this.valCod = false;
          this.mensaje='';
       }
      });
  });

 this.insProd.controls['prdEan'].valueChanges.pipe(
  filter(text => text.length > 1),
  debounceTime(200),
  distinctUntilChanged()).subscribe(field => {
    this.parametros = [{key :'prdEan' ,value: field}];
      this.rest.get('valPrdEan', this.token , this.parametros).subscribe( (data : any) => {
          if(data != 0){
            this.valEan = true;
            this.mensaje= 'El código ya existe';
          }else{
            this.valEan = false;
            this.mensaje='';
        }
      });

    });
    this.serviLoad.sumar.emit(4);
  }


  public guardar(
    prdDes: string,
    prdCod: string,
    prdObs: string,
    prdEan: number,
    prdTip: string,
    prdCost: any,
    prdNet: any,
    prdBrut: any,
    prdInv: any,
    prdPes: number,
    prdMin: number,
    idGrp: number,
    idSubGrp: number,
    idCol: number,
    idMon: number,
    idUn : number){


   if(prdInv == true){
        prdInv = 'S';
    }else{
        prdInv = 'N';
    }

    let producto : Producto  = new Producto(0, prdDes , prdCod , prdObs, '', prdEan , prdTip , prdCost , prdNet , prdBrut , prdInv , prdPes , prdMin , idGrp , idSubGrp , idCol , idMon , idUn )
    this.val                 = true;
    this.serviLoad.sumar.emit(1);
    this.rest.post('insProducto', this.token, producto).subscribe(resp => {
     resp.forEach((elementx : any)  => {
          if(elementx.error == '0' ){
            let des        = 'Ingreso material/producto ' + prdCod;
            let log        = new LogSys(2, '' , 34 , 'INGRESO MATERIAL' , des);
            this.serLog.insLog(log);    
            this.servicioaler.disparador.emit(this.servicioaler.getAlert());
            setTimeout(()=>{
              const d = 'productos';
              this.servicioLink.disparador.emit(d);
              this.servicioaler.setAlert('','');
            },1500);
          }else{
            this.servicioaler.disparador.emit(this.servicioaler.getAlert());
            setTimeout(()=>{
              this.servicioaler.setAlert('','');
            },1500);
            this.val=false;
          }
      });
    });
  }

  volver(){
    const d = 'productos';
    this.servicioLink.disparador.emit(d);
    return false;
  }
}
