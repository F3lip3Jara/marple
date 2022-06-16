import { LoadingService } from './../../../servicios/loading.service';
import { LogSysService } from './../../../servicios/log-sys.service';
import { LogSys } from './../../../model/logSys.model';
import { Alert } from 'src/app/model/alert.model';
import { AlertasService } from './../../../servicios/alertas.service';
import { UsersService } from 'src/app/servicios/users.service';
import { Component,  OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RestService } from 'src/app/servicios/rest.service';
import { Roles } from 'src/app/model/rol.model';
import { DataTableDirective } from 'angular-datatables';
import { ExcelService } from 'src/app/servicios/excel.service';


@Component({
  selector: 'app-trab-roles',
  templateUrl: './trab-roles.component.html',
  styleUrls: ['./trab-roles.component.css']
})
export class TrabRolesComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  datatableElement?: DataTableDirective;


  loading      : boolean              = true;
  dtOptions    : DataTables.Settings  = {} ;
  tblRoles     : any                  = {};
  token        : string               = '';
  parametros   : any []               = [];
  roles        : Roles;
  carga        : string               = "invisible";


  constructor(private fb  : FormBuilder,
    private servicio      : UsersService,
    private rest          : RestService,
    private modal         : NgbModal,
    private excel         : ExcelService,
    private servicioaler  : AlertasService,
    private serLogSys     : LogSysService,
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
    this.tblRoles = {};
    this.rest.get('trabRoles' , this.token, this.parametros).subscribe(data => {
        this.tblRoles = data;
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
      url = 'updRoles';
      des      = 'Rol ' + rolesx.rolDes + ' fue actualizado.';
      idEtaDes = 7;
      lgDes    = 'ACUALIZAR ROL';
    }else{
      url = 'insRoles';
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
              this.tblRoles = {};
              this.rest.get('trabRoles' , this.token, this.parametros).subscribe(data => {
                  this.tblRoles = data;
              });
              this.datatableElement?.dtInstance.then((dtInstance : DataTables.Api) => {
                dtInstance.destroy().draw();
              });
              this.carga             = 'visible';
              this.loading           = false;
              const serLog  : LogSys = new LogSys(1, '' , idEtaDes, lgDes  , des);


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
                this.tblRoles = {};
                this.rest.get('trabRoles' , this.token, this.parametros).subscribe(data => {
                    this.tblRoles = data;
                });
                this.datatableElement?.dtInstance.then((dtInstance : DataTables.Api) => {
                  dtInstance.destroy().draw();
                });
                this.carga    = 'visible';
                this.loading  = false;
                let des     = 'Rol ' + rol.rolDes + ' fue eliminado.'
                let serLog  = new LogSys(1, '' , 8 , 'ELIMINAR ROL' , des);


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
    this.excel.exportAsExcelFile(this.tblRoles, 'roles');
     return false;
  }

}
