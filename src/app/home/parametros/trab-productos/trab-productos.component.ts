import { LoadingService } from './../../../servicios/loading.service';
import { ProductosServiceService } from './../../../servicios/productos-service.service';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { LinksService } from 'src/app/servicios/links.service';
import { debounceTime, distinctUntilChanged, filter, map } from 'rxjs/operators';
import { Observable, OperatorFunction, merge } from 'rxjs';
import { Subject } from 'rxjs';
import { NgbTypeahead, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { UsersService } from 'src/app/servicios/users.service';
import { RestService } from 'src/app/servicios/rest.service';
import { ExcelService } from 'src/app/servicios/excel.service';

@Component({
  selector: 'app-trab-productos',
  templateUrl: './trab-productos.component.html',
  styleUrls: ['./trab-productos.component.css']
})
export class TrabProductosComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  datatableElement?: DataTableDirective;
  @ViewChild("prdDesx")  prdDesx? : ElementRef;

  @ViewChild('instance', {static: true}) instance?: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();




  dtOptions    : DataTables.Settings  = {} ;
  loading      : boolean              = true;
  tblProductos : any                  = {};
  producto     : any                  = {};
  filtroPrd    : UntypedFormGroup;
  token        : string               = '';
  parametros   : any []               = [];
  statesx      : any                  ;
  states       : string[]             = [];
  upPrd        : UntypedFormGroup             ;
  carga        : string              = "invisible";
  model        : any;


  constructor(private servicio     : UsersService ,
              private servicioget  : RestService,
              private modal        : NgbModal,
              private fb           : UntypedFormBuilder,
              private excel        : ExcelService,
              private servicioLink : LinksService,
              private servicioAlert: AlertasService,
              private servicePrd   : ProductosServiceService,
              private serviLoad    : LoadingService
    ) {

      this.filtroPrd = fb.group({
      prdDes : [''],
      created_at : [''],
      });
      this.token = this.servicio.getToken();

      this.upPrd = fb.group({
      upPrdDes : ['', Validators.compose([
      Validators.required
      ])]
      });
      }

      search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) => {
      const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
      const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance?.isPopupOpen()));
      const inputFocus$ = this.focus$;

      return merge(debouncedText$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.states
      : this.states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
      );
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
    this.servicioget.get('prdDes' , this.token, this.parametros).subscribe(data => {
       this.statesx = data;
      this.statesx.forEach((element: { prdDes: string; }) => {
        this.states.push(element.prdDes);
      });

    });

}


ngAfterViewInit(): void {
}




  public buscar(prdDes : string  , created_at : string ){

    if (prdDes){
      this.loading      = true;
      let parm : any[]  = [{key :'prdDes' ,value: prdDes} ];
      this.tblProductos = {};

      this.datatableElement?.dtInstance.then((dtInstance : DataTables.Api) => {
        dtInstance.destroy().draw();
      });
      this.serviLoad.sumar.emit(1);
      this.servicioget.get('filPrdDes' , this.token, parm).subscribe(respuesta => {
          this.tblProductos = respuesta;
          this.loading      = false;
         });
    }else{
      this.servicioAlert.setAlert('Debe ingresar un filtro', 'warning');
      this.servicioAlert.disparador.emit(this.servicioAlert.getAlert());
    }

  }


  public tblData(){
    this.tblProductos = {};
    this.serviLoad.sumar.emit(1);
    this.servicioget.get('trabProducto' , this.token, this.parametros).subscribe(respuesta => {
      this.tblProductos = respuesta;
     });

     setTimeout(()=> {
        this.carga = 'visible';
        this.loading = false;
     },3000 );

  }

  public refrescar(){
     this.loading       = true;
     this.carga         = 'invisible';
     this.tblProductos  = {};

     this.datatableElement?.dtInstance.then((dtInstance : DataTables.Api) => {
      dtInstance.destroy().draw();
    });
    this.serviLoad.sumar.emit(1);
     this.servicioget.get('trabProducto' , this.token, this.parametros).subscribe(respuesta => {
       this.tblProductos = respuesta;
       setTimeout(()=> {
        this.loading = false;
        this.carga   = 'visible';
      },1000);
    });

    this.filtroPrd = this.fb.group({
        prdDes : [''],
        created_at : [''],
      });
  }

  public Excel(){
      this.excel.exportAsExcelFile(this.tblProductos, 'producto');
    return false;
  }

  public prvNuevo(){
    const d = 'insProducto';
    this.servicioLink.disparador.emit(d);
 }

 public modelUp(xproductos : any){
  const productos = xproductos;
  this.servicePrd.setProductos(productos);

  this.parametros = [{key :'idPrd' ,value: productos.id}];
  this.servicioget.get('datPrd' , this.token, this.parametros).subscribe(data => {
    this.servicePrd.setDatPrd(data);
    setTimeout(()=>{
      this.servicioLink.disparador.emit('upProducto');
    },200);
  });
 }

}
