import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LinksService } from 'src/app/servicios/links.service';
import { Proveedor } from './../../../../model/proveedor.model';
import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';
import { RestService } from 'src/app/servicios/rest.service';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { UsersService } from 'src/app/servicios/users.service';

@Component({
  selector: 'app-up-proveedor',
  templateUrl: './up-proveedor.component.html',
  styleUrls: ['./up-proveedor.component.css']
})

export class UpProveedorComponent implements OnInit {

  proveedor        : any;
  datPrv           : any;
  insProv          : FormGroup;
  regiones         : any;
  comunas          : any;
  paises           : any;
  ciudades         : any;
  active                                  = 1;
  token            : string               = '';
  parametros       : any []               = [];
  val              : boolean              = false;
  mensaje          : string               = '';
  escliente        : boolean;
  esproveedor      : boolean;
  prvAct           : boolean
  idPai                                  = 0;
  idReg                                  = 0;
  idCom                                  = 0;
  idCiu                                  = 0;


  constructor(private serProveedor : ProveedoresService,
              private rest         : RestService,
              private servicioaler : AlertasService,
              private servicio     : UsersService,
              private servicioLink : LinksService,
              private fg           : FormBuilder,
    ) {

      this.token      = this.servicio.getToken();
      this.proveedor  = serProveedor.getProveedor();
      this.datPrv     = serProveedor.getDatPrv();

      this.datPrv.forEach((element : any) => {
         this.idPai = element.idPai;
         this.idReg = element.idReg;
         this.idCiu = element.idCiu;
         this.idCom = element.idCom;

        console.log(this.idCom);



      });


      if(this.proveedor.es_cliente == 'S'){
          this.escliente = true;
      }else{
          this.escliente = false;
      }

      if(this.proveedor.activado == 'S'){
        this.prvAct = true;
        }else{
            this.prvAct = false;
      }

      if(this.proveedor.es_proveedor == 'S'){
        this.esproveedor = true;
      }else{
        this.esproveedor = false;
      }

      this.insProv = fg.group({
        prvAct : [ this.prvAct  , Validators.compose([

         ])],
        prvNom : [this.proveedor.nombre , Validators.compose([
             Validators.required,
            ])],
       prvNom2 : [this.proveedor.nombre_fantasia , Validators.compose([
            Validators.required,
       ])],
       prvGiro : [this.proveedor.giro , Validators.compose([
         Validators.required,

       ])],
       prvDir : [this.proveedor.direccion , Validators.compose([
         Validators.required,
       ])],
       prvDirNum : [this.proveedor.numero , Validators.compose([
         Validators.required,

       ])],
       idPai : [this.idPai, Validators.compose([
         Validators.required,
       ])],
       idReg : [this.idReg , Validators.compose([
         Validators.required,
       ])],

       idCiu : [this.idCiu, Validators.compose([
         Validators.required,
        ])],
        idCom : [this.idCom, Validators.compose([
          Validators.required,
         ])],
        prvCli : [this.escliente, Validators.compose([
        ])],
        prvPrv: [this.esproveedor , Validators.compose([
        ])],
        prvMail: [this.proveedor.mail , Validators.compose([
         Validators.email,
       ])],
       prvTel: [this.proveedor.telefono , Validators.compose([
         Validators.required,
       ])],
       });

       this.paises   = {};
       this.regiones = {};
       this.ciudades = {};
       this.comunas  = {};
   }

  ngOnInit(): void {
    this.rest.get('trabPais' , this.token, this.parametros).subscribe(data => {
      this.paises = data;
      });

      this.parametros = [{key :'idPai' ,value: this.idPai}];
        this.rest.get('regPai' , this.token, this.parametros).subscribe(data => {
          this.regiones = data;
      });

      this.parametros = [{key :'idReg' ,value: this.idReg} , {key: 'idPai' , value:this.idPai}];
      this.rest.get('regCiu' , this.token, this.parametros).subscribe(data => {
        this.ciudades = data;
      });

      this.parametros = [{key :'idCiu' ,value: this.idCiu} ,{key :'idReg' , value : this.idReg } , {key : 'idPai' , value:  this.idPai} ];
      this.rest.get('ciuCom' , this.token, this.parametros).subscribe(data => {
        this.comunas = data;
      });


      this.insProv.controls['idPai'].valueChanges.subscribe(field => {
        this.regiones = {};
        this.comunas = {};
        this.ciudades = {};
        this.insProv.controls['idReg'].setValue('');
        this.insProv.controls['idCiu'].setValue('');
        this.insProv.controls['idCom'].setValue('');
        this.parametros = [{key :'idPai' ,value: field}];
        this.rest.get('regPai' , this.token, this.parametros).subscribe(data => {
          this.regiones = data;
          });
      });

      this.insProv.controls['idReg'].valueChanges.subscribe(field => {
        if(field > 0){
          this.comunas = {};
          this.ciudades= {};
          this.insProv.controls['idCiu'].setValue('');
          this.insProv.controls['idCom'].setValue('');
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
          this.parametros = [{key :'idCiu' ,value: field} , {key :'idReg' , value : this.insProv.controls['idReg'].value } , {key : 'idPai' , value:  this.insProv.controls['idPai'].value} ];
          this.rest.get('ciuCom' , this.token, this.parametros).subscribe(data => {
            this.comunas = data;
            });
        }
      });





  }

  public volver():boolean{
    const d = 'proveedor';
    this.servicioLink.disparador.emit(d);
    return false;
  }


  public guardar(    prvNom    : string ,
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
                     prvPrv    : any    ,
                     prvAct    : any    ){

    if(prvCli == true){
        prvCli = 'S';
    }else{
        prvCli = 'N';
    }

    if(prvAct == true){
      prvAct = 'S';
    }else{
      prvAct = 'N';
    }

    if(prvPrv == true){
        prvPrv = 'S';
    }else{
        prvPrv = 'N';
    }

    let proveedorx : Proveedor  = new Proveedor(this.proveedor.id,this.proveedor.prvRut, prvNom , prvNom2 , prvGiro , prvDir, prvNum, idPai, idReg, idCom , idCiu , prvMail , prvTel , prvCli , prvPrv , prvAct);
    this.val                   = true;

    this.rest.post('updProveedor', this.token, proveedorx).subscribe(resp => {
      if(resp.error == '0' ){
        this.servicioaler.disparador.emit(this.servicioaler.getAlert());

        setTimeout(()=>{

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



  }


}
