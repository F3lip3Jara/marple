import { LoadingService } from './../../../../servicios/loading.service';
import { LinksService } from './../../../../servicios/links.service';
import { Proveedor } from './../../../../model/proveedor.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/servicios/users.service';
import { RestService } from 'src/app/servicios/rest.service';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-ins-proveedores',
  templateUrl: './ins-proveedores.component.html',
  styleUrls: ['./ins-proveedores.component.css']
})
export class InsProveedoresComponent implements OnInit {
  insProv      : FormGroup;
  regiones     : any;
  comunas      : any;
  paises       : any;
  ciudades     : any;
  loading      : boolean              = true;
  token        : string               = '';
  parametros   : any []               = [];
  carga        : string               = "invisible";
  val          : boolean              = false;
  valRut       : boolean              = false;
  mensaje      : string               = '';

  constructor( private fg                 : FormBuilder,
              private servicio            : UsersService,
              private rest                : RestService,
              private servicioaler        : AlertasService,
              private servicioLink        : LinksService,
              private serviLoad           : LoadingService
  ) {

  this.insProv = fg.group({
     prvRut : [ '',Validators.compose([
      Validators.required,
      Validators.pattern('^[0-9]+-[0-9kK]{1}')
        ])],
     prvNom : ['' , Validators.compose([
          Validators.required,
         ])],
    prvNom2 : ['' , Validators.compose([
         Validators.required,
    ])],
    prvGiro : ['' , Validators.compose([
      Validators.required,

    ])],
    prvDir : ['' , Validators.compose([
      Validators.required,
    ])],
    prvDirNum : ['' , Validators.compose([
      Validators.required,

    ])],
    idPai : ['' , Validators.compose([
      Validators.required,
    ])],
    idReg : ['' , Validators.compose([
      Validators.required,
    ])],
    idCom : ['' , Validators.compose([
      Validators.required,
     ])],
    idCiu : ['' , Validators.compose([
      Validators.required,
     ])],
     prvCli : ['' , Validators.compose([

     ])],

     prvPrv: ['' , Validators.compose([

     ])],

     prvMail: ['' , Validators.compose([
      Validators.email,
    ])],

    prvTel: ['' , Validators.compose([
      Validators.required,
    ])],

    });

    this.paises   = {};
    this.regiones = {};
    this.comunas  = {};
    this.ciudades = {};

    this.token     = this.servicio.getToken();
   }

  ngOnInit(): void {
    this.serviLoad.sumar.emit(1);
    this.rest.get('trabPais' , this.token, this.parametros).subscribe(data => {
      this.paises = data;
      });

      this.insProv.controls['idPai'].valueChanges.subscribe(field => {
        this.regiones = {};
        this.comunas = {};
        this.ciudades = {};
        this.insProv.controls['idReg'].setValue('');
        this.insProv.controls['idCom'].setValue('');
        this.insProv.controls['idCiu'].setValue('');
        this.serviLoad.sumar.emit(1);
        this.parametros = [{key :'idPai' ,value: field}];
        this.rest.get('regPai' , this.token, this.parametros).subscribe(data => {
          this.regiones = data;
          });
      });

      this.insProv.controls['idReg'].valueChanges.subscribe(field => {
        if(field > 0){

          this.ciudades= {};
          this.comunas = {};
          this.insProv.controls['idCom'].setValue('');
          this.insProv.controls['idCiu'].setValue('');
          this.serviLoad.sumar.emit(1);
          this.parametros = [{key :'idReg' ,value: field} , {key : 'idPai' , value:  this.insProv.controls['idPai'].value}];
          this.rest.get('regCiu' , this.token, this.parametros).subscribe(data => {
          this.ciudades = data;

        });
        }
      });

      this.insProv.controls['idCiu'].valueChanges.subscribe(field => {
        if(field > 0){
          this.comunas = {};
          this.insProv.controls['idCom'].setValue('');
          this.serviLoad.sumar.emit(1);
          this.parametros = [{key :'idCiu' ,value: field} , {key :'idReg' , value : this.insProv.controls['idReg'].value } , {key : 'idPai' , value:  this.insProv.controls['idPai'].value} ];
          this.rest.get('ciuCom' , this.token, this.parametros).subscribe(data => {
            this.comunas = data;
            });
        }

      });

      this.insProv.controls['prvRut'].valueChanges.pipe(
        filter(text => text.length > 7),
        debounceTime(200),
        distinctUntilChanged()).subscribe(field => {
          this.parametros = [{key :'prvRut' ,value: field.trim()}];
          this.rest.get('valPrvRut', this.token , this.parametros).subscribe( (data : any) => {
            data.forEach((elementx : any)  => {
                if(elementx.error == 1  ){
                  this.valRut = false;
                  this.mensaje= '';
                  this.servicioaler.setAlert('','');
                }else {
                   this.valRut = true;
                   this.mensaje= elementx.mensaje;
                   this.servicioaler.setAlert('','');
                }
            });
          });
      });
  }

 public guarPrv(prvRut    : string ,
                prvNom    : string ,
                prvNom2   : string ,
                prvGiro   : string ,
                prvDir    : string ,
                prvNum    : string ,
                idPai     : number ,
                idReg     : number ,
                idCom     : number ,
                idCiu     : number ,
                prvMail   : string ,
                prvTel    : string ,
                prvCli    : any    ,
                prvPrv    : any
  ){

    if(prvCli == true){
        prvCli = 'S';
    }else{
        prvCli = 'N';
    }

    if(prvPrv == true){
        prvPrv = 'S';
    }else{
        prvPrv = 'N';
    }
    let proveedor : Proveedor  = new Proveedor(0,prvRut, prvNom , prvNom2 , prvGiro , prvDir, prvNum, idPai, idReg, idCom , idCiu , prvMail , prvTel , prvCli , prvPrv , true);
    this.val                   = true;
    this.serviLoad.sumar.emit(1);
    this.rest.post('insProveedor', this.token, proveedor).subscribe(resp => {
     resp.forEach((elementx : any)  => {
          if(elementx.error == '0' ){
            this.servicioaler.disparador.emit(this.servicioaler.getAlert());
            setTimeout(()=>{
              const d = 'proveedor';
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
public volver():boolean{
    const d = 'proveedor';
    this.servicioLink.disparador.emit(d);
    return false;
  }


}
