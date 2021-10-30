import { Component, OnInit,  AfterViewInit, ViewChild,  ElementRef} from '@angular/core';
import { NgbModal , NgbTypeahead  } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective} from 'angular-datatables';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/servicios/users.service';
import { RestService } from 'src/app/servicios/rest.service';
import {Observable, Subject, merge, OperatorFunction} from 'rxjs';
import {debounceTime, distinctUntilChanged,  filter, map} from 'rxjs/operators';
import { Producto} from 'src/app/model/producto.model';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { ExcelService } from 'src/app/servicios/excel.service';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements  OnInit  , AfterViewInit   {

  @ViewChild(DataTableDirective, {static: false})
  datatableElement?: DataTableDirective;
  @ViewChild("prdDesx")  prdDesx? : ElementRef;

 // alert        : Alert                = new Alert('','');
  dtOptions    : DataTables.Settings  = {} ;
  loading      : boolean              = true;
  validaup     : boolean              = true;
  tblProductos : any                  = {};
  producto     : any                  = {};
  filtroPrd    : FormGroup;
  token        : string               = '';
  parametros   : any []               = [];
  statesx      : any                  ;
  states       : string[]             = [];
  upPrd        : FormGroup             ;
  carga        : string              = "invisible";
  model: any;

  @ViewChild('instance', {static: true}) instance?: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  constructor(private servicio    : UsersService ,
              private servicioget : RestService,
              private modal : NgbModal,
              private fb: FormBuilder,
              private excel : ExcelService
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

    this.servicioget.get('filter_prdDes' , this.token, this.parametros).subscribe(data => {
       this.statesx = data;
      this.statesx.forEach((element: { prdDes: string; }) => {
        this.states.push(element.prdDes);
      });

    });

}


ngAfterViewInit(): void {
}

  actualizar(content : any , productox : Producto ){
    this.modal.open(content);
    this.producto = productox;
    return false;
  }


  actualizarPrd(upPrdDes : any) : boolean{

    let productox = new Producto(this.producto.idPrd , upPrdDes );
    this.servicioget.post('updproducto', this.token, productox).subscribe(resp => {
      if(resp == 'OK'){
        this.modal.dismissAll();
        this.loading      = true;
        this.tblProductos = {};

        this.servicioget.get('productos' , this.token, this.parametros).subscribe(respuesta => {
          this.tblProductos = respuesta;

         });

      this.datatableElement?.dtInstance.then((dtInstance : DataTables.Api) => {
        dtInstance.destroy().draw();
      });

      this.states  = [];
      this.servicioget.get('filter_prdDes' , this.token, this.parametros).subscribe(data => {
      this.statesx = data;

       this.statesx.forEach((element: { prdDes: string; }) => {
         this.states.push(element.prdDes);
       });
       this.loading      = false;
     });

      }else{

        //this.renderer.setStyle(this.prdDesx?.nativeElement , 'disabled' , false);
      }
  });
    return false;
  }
  public buscar(prdDes : string  , created_at : string ){
    this.loading      = true;
    let parm : any[]  = [{key :'prdDes' ,value: prdDes},{key :'created_at' ,value: 'y'} ];
    this.tblProductos = {};

    this.servicioget.get('productos1' , this.token, parm).subscribe(respuesta => {
        this.tblProductos = respuesta;
        this.loading      = false;
       });

    this.datatableElement?.dtInstance.then((dtInstance : DataTables.Api) => {
      dtInstance.destroy().draw();
    });
  }


  public tblData(){
    this.tblProductos = {};
    this.servicioget.get('productos' , this.token, this.parametros).subscribe(respuesta => {
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

     this.servicioget.get('productos' , this.token, this.parametros).subscribe(respuesta => {
       this.tblProductos = respuesta;
    });

    this.datatableElement?.dtInstance.then((dtInstance : DataTables.Api) => {
      dtInstance.destroy().draw();
      setTimeout(()=> {
        this.loading = false;
        this.carga   = 'visible';
      },2000);

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
}
