import { Alert } from 'src/app/model/alert.model';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { RestService } from 'src/app/servicios/rest.service';
import { UsersService } from 'src/app/servicios/users.service';
import { Gerencia } from 'src/app/model/gerencia.model';
import { DataTableDirective } from 'angular-datatables';
import { ExcelService } from 'src/app/servicios/excel.service';

@Component({
  selector: 'app-trab-gerencia',
  templateUrl: './trab-gerencia.component.html',
  styleUrls: ['./trab-gerencia.component.css']
})
export class TrabGerenciaComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  datatableElement?: DataTableDirective;


  loading      : boolean              = true;
  dtOptions    : DataTables.Settings  = {} ;
  tblGerencia  : any                  = {};
  token        : string               = '';
  parametros   : any []               = [];
  carga        : string               = "invisible";
  gerencia     : Gerencia;

  constructor(private fb: FormBuilder,
    private servicio : UsersService,
    private rest : RestService,
    private modal : NgbModal,
    private servicioaler: AlertasService,
    private excel: ExcelService) {

      this.token    = this.servicio.getToken();
      this.gerencia = new Gerencia(0, '');
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

      this.tblData();
  }

  public tblData(){
    this.tblGerencia = {};
    this.rest.get('trabGerencia' , this.token, this.parametros).subscribe(data => {
        this.tblGerencia = data;
    });
    setTimeout(()=> {
        this.carga = 'visible';
        this.loading = false;
     },3000 );
   }

   public modalIns(content : any ){
    this.modal.open(content);
 }

 public modelUp(content :any , xgerencia: Gerencia ){
  this.gerencia.setId(xgerencia.gerId);
  this.gerencia.setGerDes(xgerencia.gerDes);
  console.log(this.gerencia);
  this.modal.open(content);
}

public delGerencia( gerencia : any) : boolean{
  let url      = 'delGerencia';
  this.carga   = 'invisible';
  this.loading = true;

   this.rest.post(url ,this.token, gerencia).subscribe(resp => {
       resp.forEach((elementx : any)  => {
         if(elementx.error == '0'){
           this.modal.dismissAll();
           this.servicioaler.disparador.emit(this.servicioaler.getAlert());

           setTimeout(()=>{
             this.servicioaler.setAlert('','');
             this.tblGerencia = {};
             this.rest.get('trabGerencia' , this.token, this.parametros).subscribe(data => {
                 this.tblGerencia = data;
             });

             this.datatableElement?.dtInstance.then((dtInstance : DataTables.Api) => {
               dtInstance.destroy().draw();
             });

             this.carga    = 'visible';
             this.loading  = false;
           },1500);

         }else{
           this.carga    = 'visible';
           this.loading  = false;
           this.servicioaler.disparador.emit(this.servicioaler.getAlert());

           setTimeout(()=>{
             this.servicioaler.setAlert('','');
           },1500);
         }
       });
   });
   return false;
}

public action(gerDesx : any , tipo :string ) : boolean{
  let url    = '';
  this.carga = 'invisible';
  this.loading = true;
  let gerenciax = new Gerencia(this.gerencia.gerId , gerDesx  );

  if(tipo =='up'){
     url = 'updGerencia';
  }else{
    url = 'insGerencia';
  }
 this.rest.post(url, this.token, gerenciax).subscribe(resp => {
      resp.forEach((elementx : any)  => {
      if(elementx.error == '0'){
          this.modal.dismissAll();

          setTimeout(()=>{
            this.servicioaler.setAlert('','');
            this.tblGerencia = {};

            this.rest.get('trabGerencia' , this.token, this.parametros).subscribe(data => {
                this.tblGerencia = data;
            });

            this.datatableElement?.dtInstance.then((dtInstance : DataTables.Api) => {
              dtInstance.destroy().draw();
            });

            this.carga    = 'visible';
            this.loading  = false;

          },1500);
      }else {
        this.carga    = 'visible';
        this.loading  = false;
      }
    });
  });

  let alerta : Alert = this.servicioaler.getAlert();
  this.servicioaler.disparador.emit(alerta);
  return false;
}


public Excel(){
  this.excel.exportAsExcelFile(this.tblGerencia, 'roles');
   return false;
}

}
