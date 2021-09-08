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
  filtroRol    : FormGroup;
  tblRoles     : any                  = {};
  token        : string               = '';
  parametros   : any []               = [];
  roles        : Roles;
  carga        : string               = "invisible";


  constructor(private fb: FormBuilder,
    private servicio : UsersService,
    private rest : RestService,
    private modal : NgbModal,
    private excel: ExcelService
    ) {

      this.filtroRol = fb.group({
        prdDes : [''],
        created_at : [''],
      });


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
    this.tblRoles = {};
    this.rest.get('trabRoles' , this.token, this.parametros).subscribe(data => {
        this.tblRoles = data;
    });
    setTimeout(()=> {
        this.carga = 'visible';
        this.loading = false;
     },3000 );
   }

   public modalIns(content : any ){
      this.modal.open(content);
   }

   public modelUp(content :any , xroles: Roles){
     this.roles.setId(xroles.idRol);
     this.roles.setRolDes(xroles.rolDes);

    console.log(this.roles);
     this.modal.open(content);
   }

   public actionRoles(rolDesx : any , tipo :string ){
    let url = '';
    let rolesx = new Roles(this.roles.idRol , rolDesx  );

    if(tipo =='up'){
       url = 'updRoles';
    }else{
      url = 'insRoles';
    }
    this.rest.post(url, this.token, rolesx).subscribe(resp => {
        if(resp == 'OK'){
          this.modal.dismissAll();
          this.loading      = true;
          this.tblRoles     = {};
          this.rest.get('trabRoles' , this.token, this.parametros).subscribe(respuesta => {
            this.tblRoles = respuesta;
              this.carga = 'visible';
              this.loading = false;

          });

        this.datatableElement?.dtInstance.then((dtInstance : DataTables.Api) => {
          dtInstance.destroy().draw();
        });
      }
    });
  }

  public delRoles( rol : any){
     let url = 'delRoles';
      this.rest.post(url ,this.token, rol).subscribe(resp => {
        if(resp == 'OK'){
          this.modal.dismissAll();
          this.loading      = true;
          this.tblRoles     = {};
          this.rest.get('trabRoles' , this.token, this.parametros).subscribe(respuesta => {
            this.tblRoles = respuesta;
            this.carga    = 'visible';
            this.loading  = false;

          });

        this.datatableElement?.dtInstance.then((dtInstance : DataTables.Api) => {
          dtInstance.destroy().draw();
        });
      }
      });

  }

  public Excel(){
    this.excel.exportAsExcelFile(this.tblRoles, 'roles');
  return false;
  }

}