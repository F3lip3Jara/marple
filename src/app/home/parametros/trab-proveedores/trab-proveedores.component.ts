import { LoadingService } from './../../../servicios/loading.service';

import { Proveedor } from './../../../model/proveedor.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LinksService } from 'src/app/servicios/links.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { UsersService } from 'src/app/servicios/users.service';
import { RestService } from 'src/app/servicios/rest.service';
import { ExcelService } from 'src/app/servicios/excel.service';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { Router } from '@angular/router';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';

@Component({
  selector: 'app-trab-proveedores',
  templateUrl: './trab-proveedores.component.html',
  styleUrls: ['./trab-proveedores.component.css']
})
export class TrabProveedoresComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  datatableElement?: DataTableDirective;


  loading         : boolean              = true;
  dtOptions       : DataTables.Settings  = {} ;
  carga           : string               = "invisible";
  token           : string               = '';
  parametros      : any []               = [];
  archivos        : any []               = [];
  rol             : any;
  gerencia        : any;
  insProv         : FormGroup;
  valGuar         : boolean              = false;
  tblProveedor    : any                  = {};
  regiones        : any;
  comunas         : any;
  paises          : any;
  ciudades        : any;
  val             : boolean                = false;
  proveedor       : Proveedor;

  constructor(
    private servicio        : UsersService,
    private rest            : RestService,
    private servicioLink    : LinksService,
    private excel           : ExcelService,
    private modal           : NgbModal,
    private alertas         : AlertasService,
    private fg              : FormBuilder,
    private router          : Router,
    private serProveedor    : ProveedoresService,
    private serviLoad       : LoadingService
    )
     {
    this.token = this.servicio.getToken();
    this.paises   = {};
    this.regiones = {};
    this.comunas  = {};
    this.ciudades = {};

    this.insProv = fg.group({


     prvDir : ['' , Validators.compose([
       Validators.required,
     ])],
     prvNum : ['' , Validators.compose([
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
      ])]

     });

     this.proveedor = new Proveedor(0,'','','','','','',0,0,0,0,'','',true, true , true);

   }



  ngOnInit(): void {

   this.tblData();

   this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 20,
      lengthMenu : [20,50,100, 200],
      processing: true,
      language: {
        emptyTable: '',
        zeroRecords: 'No hay coincidencias',
        lengthMenu: 'Mostrar _MENU_ elementos',
        search: 'Buscar:',
        info: 'De _START_ a _END_ de _TOTAL_ elementos',
        infoEmpty: 'De 0 a 0 de 0 elementos',
        infoFiltered: '(filtrados de _MAX_ elementos totales)',
        paginate: {
          first: 'Prim.',
          last: 'Últ.',
          next: 'Sig.',
          previous: 'Ant.'
        }
      }}
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
            this.comunas = {};
            this.ciudades= {};
            this.insProv.controls['idCom'].setValue('');
            this.insProv.controls['idCiu'].setValue('');
            this.parametros = [{key :'idReg' ,value: field} , {key : 'idPai' , value:  this.insProv.controls['idPai'].value}];
            this.serviLoad.sumar.emit(1);
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
            this.serviLoad.sumar.emit(1);
            this.rest.get('ciuCom' , this.token, this.parametros).subscribe(data => {
              this.comunas = data;
              });
          }

        });



  }

  public tblData(){
    this.tblProveedor = {};
    this.serviLoad.sumar.emit(1);
    this.rest.get('trabProveedor' , this.token, this.parametros).subscribe(data => {
      this.tblProveedor = data;
    });
    setTimeout(()=> {
        this.carga = 'visible';
        this.loading = false;
     },1500 );
   }

    public prvNuevo(){
      const d = 'insProveedor';
      this.servicioLink.disparador.emit(d);
   }


   public Excel(){
   this.excel.exportAsExcelFile(this.tblProveedor, 'proveedores');
   return false;
  }

  public modalIns(content : any  , proveedor : any){
    this.proveedor.setidPrv(proveedor.id);
    this.proveedor.setPrvRut(proveedor.rut);
    this.proveedor.setPrvNom(proveedor.nombre);
    this.modal.open(content, { size: 'xl' });
 }

 public insDir(idPrv : any , prvDir : any , prvNum : any , idPai : any , idReg : any , idCom : any , idCiu: any){

  let proveedorx : Proveedor = new Proveedor(idPrv, '' , '' , '','',prvDir, prvNum , idPai , idReg , idCom , idReg , '' , '' ,'','', true);
  this.serviLoad.sumar.emit(1);
  this.rest.post('insPrvDes', this.token , proveedorx).subscribe(
    resp => {
      resp.forEach((elementx : any)  => {
      if(elementx.error == '0'){
          this.modal.dismissAll();
          setTimeout(()=>{
            this.insProv.controls['prvDir'].setValue('');
            this.insProv.controls['prvNum'].setValue('');
            this.val      = false;
          },1500);
      }else {
          this.val      = false;
      }
    });
  });

 }

 modelUp(proveedorx : any){
      const proveedor = proveedorx;
      this.serProveedor.setProveedor(proveedor);
      this.parametros = [{key :'idPrv' ,value: proveedorx.id}];
      this.serviLoad.sumar.emit(1);
      this.rest.get('datPrv' , this.token, this.parametros).subscribe(data => {
        this.serProveedor.setDatPrv(data);
        setTimeout(()=>{
          this.servicioLink.disparador.emit('upProveedor');
        },200);
      });

    }



}

