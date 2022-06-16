import { LoadingService } from './../../../../servicios/loading.service';
import { ProductosServiceService } from './../../../../servicios/productos-service.service';
import { LinksService } from './../../../../servicios/links.service';
import { AlertasService } from './../../../../servicios/alertas.service';
import { RestService } from './../../../../servicios/rest.service';
import { UsersService } from './../../../../servicios/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Producto } from 'src/app/model/producto.model';

@Component({
  selector: 'app-up-productos',
  templateUrl: './up-productos.component.html',
  styleUrls: ['./up-productos.component.css']
})
export class UpProductosComponent implements OnInit {

  insProd      : FormGroup;
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
  idPrd        : number               = 0;

  constructor(private fg          : FormBuilder,
              private servicio    : UsersService,
              private rest        : RestService,
              private servicioaler: AlertasService,
              private servicioLink: LinksService,
              private servicioPrd : ProductosServiceService,
              private serviLoad   : LoadingService
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



    let productox  =  this.servicioPrd.getDatPrd();
    let prdcodx    = '';
    let prdEanx    = '';
    productox.forEach((element : any) => {
      this.insProd.controls['prdCod'].setValue(element.prdCod);
      prdcodx = element.prdCod;
      prdEanx = element.prdEan;
      if(element.prdInv == 'S'){
        this.insProd.controls['prdInv'].setValue(true);
      }else{
        this.insProd.controls['prdInv'].setValue(false);
      }
      this.insProd.controls['prdDes'].setValue(element.prdDes);
      this.insProd.controls['prdObs'].setValue(element.prdObs);
      this.insProd.controls['prdEan'].setValue(element.prdEan);
      this.insProd.controls['idUn'].setValue(element.idUn);
      this.insProd.controls['idGrp'].setValue(element.idGrp);
      this.insProd.controls['idSubGrp'].setValue(element.idSubGrp);
      this.insProd.controls['prdTip'].setValue(element.prdTip);
      this.insProd.controls['idCol'].setValue(element.idCol);
      this.insProd.controls['idMon'].setValue(element.idMon);
      this.insProd.controls['prdCost'].setValue(element.prdCost);
      this.insProd.controls['prdNet'].setValue(element.prdNet);
      this.insProd.controls['prdBrut'].setValue(element.prdBrut);
      this.insProd.controls['prdPes'].setValue(element.prdPes);
      this.insProd.controls['prdMin'].setValue(element.prdMin);
      this.idPrd  = element.idPrd;

    });




    this.insProd.controls['prdCod'].valueChanges.pipe(
      filter(text => text.length > 1),
      debounceTime(200),
      distinctUntilChanged()).subscribe(field => {
      this.parametros = [{key :'prdCod' ,value: field}];
      if(field == prdcodx){
        this.valCod = false;
        this.mensaje='';
      }else{
        this.rest.get('valPrdCod', this.token , this.parametros).subscribe( (data : any) => {
          if(data != 0){
            this.valCod = true;
            this.mensaje= 'El código ya existe';
          }else{
            this.valCod = false;
            this.mensaje='';
          }

        });
      }



      });

     this.insProd.controls['prdEan'].valueChanges.pipe(
      filter(text => text.length > 1 ),
      debounceTime(200),
      distinctUntilChanged()).subscribe(field => {
      if(field == prdEanx){
        this.valEan = false;
        this.mensaje='';
      }else{
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
      }
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

    let producto : Producto  = new Producto(this.idPrd, prdDes , prdCod , prdObs, '', prdEan , prdTip , prdCost , prdNet , prdBrut , prdInv , prdPes , prdMin , idGrp , idSubGrp , idCol , idMon , idUn )

    console.log(producto);
    this.val                 = true;
    this.rest.post('updProducto', this.token, producto).subscribe(resp => {
     resp.forEach((elementx : any)  => {
          if(elementx.error == '0' ){
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
