import { Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataTableDirective } from 'angular-datatables';
import { Roles } from 'src/app/model/rol.model';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { ExcelService } from 'src/app/servicios/excel.service';
import { LoadingService } from 'src/app/servicios/loading.service';
import { LogSysService } from 'src/app/servicios/log-sys.service';
import { RestService } from 'src/app/servicios/rest.service';
import { UsersService } from 'src/app/servicios/users.service';

@Component({
  selector: 'app-trab-opciones',
  templateUrl: './trab-opciones.component.html',
  styleUrls: ['./trab-opciones.component.css']
})
export class TrabOpcionesComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  datatableElement?: DataTableDirective;


  loading      : boolean              = true;
  dtOptions    : DataTables.Settings  = {} ;
  tblOpciones  : any                  = {};
  token        : string               = '';
  parametros   : any []               = [];
  roles        : Roles;
  carga        : string               = "invisible";


  constructor(private fb            : UntypedFormBuilder,
              private servicio      : UsersService,
              private rest          : RestService,
              private modal         : NgbModal,
              private excel         : ExcelService,
              private servicioaler  : AlertasService,
              private serLog        : LogSysService,
              private serviLoad     : LoadingService
    ) {
      this.token = this.servicio.getToken();
      this.roles = new Roles(0, '');
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
  }

  public tblData(){
    this.serviLoad.sumar.emit(1);
    this.tblOpciones = {};
    this.rest.get('trabOpciones' , this.token, this.parametros).subscribe(data => {
        this.tblOpciones = data;
    });
    setTimeout(()=> {
        this.carga = 'visible';
        this.loading = false;
     },1500 );
   }

   public modalIns(content : any ){
      this.modal.open(content);
   }

   public modelUp(content :any , xroles: Roles){
     this.roles.setId(xroles.idRol);
     this.roles.setRolDes(xroles.rolDes);
     this.modal.open(content);
   }

   public action(rolDesx : any , tipo :string ) : boolean{
    let url      = '';
    this.carga   = 'invisible';
    this.loading = true;
    let rolesx   = new Roles(this.roles.idRol , rolDesx  );
    let des      = '';
    let idEtaDes = 0;
    let lgDes    = '';

    if(tipo =='up'){
      url      = 'updRoles';
      des      = 'Rol ' + rolesx.rolDes + ' fue actualizado.';
      idEtaDes = 7;
      lgDes    = 'ACUALIZAR ROL';
    }else{
      url      = 'insRoles';
      des      = 'Rol ' + rolesx.rolDes + ' fue ingresado.';
      idEtaDes = 6;
      lgDes    = 'INGRESO DE ROL';
    }
    this.serviLoad.sumar.emit(2);
   this.rest.post(url, this.token, rolesx).subscribe(resp => {
        resp.forEach((elementx : any)  => {
        if(elementx.error == '0'){
            this.modal.dismissAll();
            setTimeout(()=>{
              this.tblOpciones = {};
              this.rest.get('trabOpciones' , this.token, this.parametros).subscribe(data => {
                  this.tblOpciones = data;
              });
              this.datatableElement?.dtInstance.then((dtInstance : DataTables.Api) => {
                dtInstance.destroy().draw();
              });
              this.carga             = 'visible';
              this.loading           = false;
            
            },1500);
        }else {
          this.carga    = 'visible';
          this.loading  = false;
        }
      });
    });

    this.servicioaler.disparador.emit(this.servicioaler.getAlert());
    return false;
  }

  public delRoles( rol : any) : boolean{
     let url      = 'delRoles';
     this.carga   = 'invisible';
     this.loading = true;

     this.serviLoad.sumar.emit(1);
      this.rest.post(url ,this.token, rol).subscribe(resp => {
          resp.forEach((elementx : any)  => {
            if(elementx.error == '0'){
              this.modal.dismissAll();
              setTimeout(()=>{
                this.serviLoad.sumar.emit(1);
                this.tblOpciones = {};
                this.rest.get('trabOpciones' , this.token, this.parametros).subscribe(data => {
                    this.tblOpciones = data;
                });
                this.datatableElement?.dtInstance.then((dtInstance : DataTables.Api) => {
                  dtInstance.destroy().draw();                });
                  this.carga     = 'visible';
                  this.loading   = false;              
              },1500);
            }else{
              this.carga    = 'visible';
              this.loading  = false;
            }
          });
      });
      this.servicioaler.disparador.emit(this.servicioaler.getAlert());
      return false;
  }

  public Excel(){
    this.excel.exportAsExcelFile(this.tblOpciones, 'opciones');
     return false;
  }

}
