import { LinksService } from './../../../../servicios/links.service';
import { AlertasService } from './../../../../servicios/alertas.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from 'src/app/servicios/rest.service';
import { UsersService } from 'src/app/servicios/users.service';

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-ins-orden-produccion',
  templateUrl: './ins-orden-produccion.component.html',
  styleUrls: ['./ins-orden-produccion.component.css']
})
export class InsOrdenProduccionComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  datatableElement?: DataTableDirective;

  insPrd       : FormGroup;
  insOrd       : FormGroup;
  token        :string                = '';
  proveedores  : any;
  carga        : string               = "";
  val          : boolean              = false;
  loading      : boolean              = false;
  dtOptions    : DataTables.Settings  = {} ;
  parametros   : any []               = [];
  prvNom       :string                = '';
  idPrv        :number                = 0;
  productos    : any ;
  ordenes      : any []               = [];
  valcod       : boolean              = false;
  orpdTotP     : number               = 0;
  valprod                             = false;
  valproddet                          = false;

  constructor(
    private servicio     : UsersService,
    private fb           : FormBuilder,
    private rest         : RestService,
    private modal        : NgbModal,
    private servicioaler : AlertasService,
    private servicioLink : LinksService) {

      this.token    = this.servicio.getToken();

      this.insPrd = fb.group({
        prdCod : ['' , Validators.compose([
          Validators.required,
         ])],
         orpdCant: ['' , Validators.compose([
          Validators.required,
          Validators.pattern('^-?[0-9]\\d*?$')
         ])],
         orpdCantDis: ['' , Validators.compose([
          Validators.required,
          Validators.pattern('^-?[0-9]\\d*?$')
         ])],
         orpdObs: ['' , Validators.compose([

         ])],

      });

      this.insOrd = fb.group({
        orpFech : ['' , Validators.compose([
          Validators.required,
         ])],
         orpNumOc : ['' , Validators.compose([
          Validators.required,
         ])],

         orpObs : ['' , Validators.compose([

         ])],

         orpNumRea : ['' , Validators.compose([
          Validators.required,
         ])]

        });



  }

  ngOnInit(): void {
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


      this.insPrd.controls['prdCod'].valueChanges.pipe(
        filter(text => text != null &&  text.length >= 2
          ),
        debounceTime(200),
        distinctUntilChanged()
      ).subscribe( field => {
        this.valproddet   = false;
        let parm : any[]  = [{key :'prdCod' ,value: field} ];
        let error ;
        this.rest.get('valPrdOrd' , this.token, parm).subscribe(data =>{
             error = data ;
             if(error == 2){
                this.rest.get('filPrdCod' , this.token, parm).subscribe(data =>{
                   this.productos = data;
                });
                this.valprod      = true;
              }else{
                this.productos = [];
                this.valprod      = false;
              }
            this.ordenes.forEach(element => {
              if(element.prdCod == field){
                this.valproddet= true;
              }else{
                this.valproddet= false;

              }
          });

          })
      });

      this.insPrd.controls['orpdCant'].valueChanges.pipe(
        filter(text => text != null && text.length >= 0),
        debounceTime(200),
        distinctUntilChanged()).subscribe(field => {
            this.valprod = false;
            let parm : any[]  = [{key :'prdCod' ,value: this.insPrd.controls['prdCod'].value} ];
            this.rest.get('valPrdOrd' , this.token, parm).subscribe(data =>{
                  if(data == 2){
                      this.valprod = true;
                  }else{
                    this.valprod = false;
                    this.rest.get('filPrdCod' , this.token, parm).subscribe((data : any) =>{
                      let elemprdCod = <HTMLInputElement> document.getElementById('prdCod');
                      let elemprdDes = <HTMLInputElement> document.getElementById('prdDes');
                      data.forEach((element: any) => {
                        elemprdCod.value = element.cod_pareo;
                        elemprdDes.value = element.descripcion;
                        console.log(element.cod_pareo);
                        this.productos   = [];
                        this.insPrd.controls['prdCod'].setValue( element.cod_pareo);
                    });

                   });
                  }
            });

        });

      this.insOrd.controls['orpNumRea'].valueChanges.pipe(
        filter(text => text.length > 1),
        debounceTime(200),
        distinctUntilChanged()).subscribe(field => {
          this.validaNumRea(field);
        });



  }

  proveedor(content : any){
    this.valcod    = false;
    this.productos = [];
    this.valproddet= false;
    this.modal.open(content);
    this.tblData();
  }

  public tblData(){
    this.proveedores = {};
    this.rest.get('selCliente' , this.token, this.parametros).subscribe(data => {
        this.proveedores = data;
    });
    setTimeout(()=> {
        this.carga = 'visible';
        this.loading = false;
     },3000 );
   }

   cambio(xproveedor: any){
      this.idPrv = xproveedor.id;
      this.prvNom= xproveedor.nombre
      this.modal.dismissAll();
   }

   agregar(prdCod : string , prdDes : string , orpdCant: any , orpdCantDis  : any , orpdObs:any){

     this.orpdTotP = orpdCant - orpdCantDis;

    if(this.orpdTotP <= 0){
      this.servicioaler.setAlert('Revisar cantidades no se puede producir cantidades en negativo','warning');
      this.servicioaler.disparador.emit(this.servicioaler.getAlert());

      setTimeout(()=>{
        this.servicioaler.setAlert('','');
      },2000);

    }else{
      this.ordenes.push({
        'prdCod'      : prdCod,
        'prdDes'      : prdDes,
        'orpdCant'    : orpdCant,
        'orpdCantDis' : orpdCantDis,
        'orpdTotP'    : this.orpdTotP,
        'orpdObs'     : orpdObs
    });
    this.insPrd.reset();
    this.modal.dismissAll();
    }


   }


   selPrd(selprd: any){
      this.modal.open(selprd);
   }

   selectorPrd(xproducto:any){
     let elemprdCod = <HTMLInputElement> document.getElementById('prdCod');
     let elemprdDes = <HTMLInputElement> document.getElementById('prdDes');

     elemprdCod.value = xproducto.cod_pareo;
     elemprdDes.value = xproducto.descripcion;
     this.productos   = [];
     this.insPrd.controls['prdCod'].setValue( xproducto.cod_pareo);
   }

   delPrd(index:any){
     this.ordenes.splice(index , 1);
   }

   generaOP(orpFech: any ,orpNumOc : any , orpNumRea: any  , orpObs : any ){

       let ordenPrd : any [] = [];
       this.val              = true;
      ordenPrd.push({
          'orpFech'  : orpFech,
          'orpNumOc' : orpNumOc,
          'orpNumRea': orpNumRea,
          'orpObs'   : orpObs,
          'idPrv'    : this.idPrv,
          'ordenes'  : this.ordenes
      });

      this.rest.post('insOrd', this.token, ordenPrd).subscribe(resp => {
       resp.forEach((elementx : any)  => {

        this.servicioaler.disparador.emit(this.servicioaler.getAlert());
        if(elementx.error == '0'){
            setTimeout(()=>{
              this.servicioaler.setAlert('','');
              this.val        = false;
              this.valproddet = false;

            },2000);
            this.insOrd.reset();
            this.prvNom = '';
            this.idPrv  = 0;
            this.ordenes=[];
            this.insPrd.reset();
        }else {
          this.val      = false;
        }
      });
    });

   }

   public validaNumRea(field : any){
    this.parametros = [{key :'orpNumRea' ,value: field.trim()}];
    this.rest.get('valCodNumRea' , this.token , this.parametros).subscribe((cant : any)=>{
        if(cant != 0){
          this.valcod = true;
        }else{
          this.valcod = false;
        }
    });

   }

  public volver(){
     const d = 'op';
    this.servicioLink.disparador.emit(d);
    return false;
  }
}
