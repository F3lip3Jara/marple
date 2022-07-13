import { LoadingService } from './../../../servicios/loading.service';
import { LogSysService } from './../../../servicios/log-sys.service';
import { LogSys } from './../../../model/logSys.model';
import { tblUsuario } from './../../../model/tblUsuario.model';
import { LinksService } from './../../../servicios/links.service';
import { DataTableDirective } from 'angular-datatables';
import { RestService } from 'src/app/servicios/rest.service';
import { UsersService } from 'src/app/servicios/users.service';
import { Component,  OnInit,  ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExcelService } from 'src/app/servicios/excel.service';
import { AlertasService } from 'src/app/servicios/alertas.service';

@Component({
  selector: 'app-trab-user',
  templateUrl: './trab-user.component.html',
  styleUrls: ['./trab-user.component.css']
})
export class TrabUserComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  datatableElement?: DataTableDirective;


  loading         : boolean              = true;
  dtOptions       : DataTables.Settings  = {} ;
  carga           : string               = "invisible";
  tblUsuarios     : any                  = {};
  token           : string               = '';
  parametros      : any []               = [];
  archivos        : any []               = [];
  rol             : any;
  gerencia        : any;
  fileToUpload?   : File;
  usuario         : tblUsuario           = new tblUsuario (0 , '', '','','','','','','','', '') ;
  valGuar         : boolean              = false;
  udpUser         : UntypedFormGroup;

  constructor(
    private servicio        : UsersService,
    private rest            : RestService,
    private servicioLink    : LinksService,
    private excel           : ExcelService,
    private modal           : NgbModal,
    private alertas         : AlertasService,
    fgUpUser                : UntypedFormBuilder,
    private serLog          : LogSysService,
    private serviLoad       : LoadingService
    ) {
    this.token = this.servicio.getToken();

    this.udpUser = fgUpUser.group({
      empApe : [ '',Validators.compose([
        Validators.required,
       ])],
       empNombre : ['', Validators.compose([
         Validators.required
        ])],
      rol : ['',Validators.compose([
          Validators.required
         ])],
     gerencias : [ '',Validators.compose([
          Validators.required
        ])]

    });

   }

  ngOnInit(): void {
    this.serviLoad.sumar.emit(3);
    this.tblData();

    this.rest.get('trabRoles', this.token , this.parametros).subscribe(data => {
      this.rol = data;
   });

   this.rest.get('trabGerencia', this.token , this.parametros).subscribe(data => {
     this.gerencia = data;
  });



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


    this.tblUsuarios = {};
    this.rest.get('trabUsuarios' , this.token, this.parametros).subscribe(data => {
      this.tblUsuarios = data;
    });
    setTimeout(()=> {
        this.carga = 'visible';
        this.loading = false;
     },1500 );
   }

   public userNuevo(){
    const d = 'insUsuario';
    this.servicioLink.disparador.emit(d);

   }


   public Excel(){
    let tblUsuariox : any [] = [];
    this.tblUsuarios.forEach((element : any) => {
        tblUsuariox.push({
          "ID"       : element.id,
          "Usuario"  : element.emploNom,
          "Nombre"   : element.emploApe,
          "Rol"      : element.rolDes,
          "Gerencia" : element.gerDes,
          "Activado" : element.activado,
          "Reinicio" : element.reinicio,
          "Creado"   : element.created_at.substr(0 , 10),
        });
    });

   this.excel.exportAsExcelFile(tblUsuariox, 'usuario');
   return false;
  }


  public modelUp(content :any , xusuario : any){
    this.usuario.setId(xusuario.id);
    this.usuario.setEmploNom(xusuario.emploNom);
    this.usuario.setEmploApe(xusuario.emploApe);
    this.usuario.setEmploFecNac(xusuario.emploFecNac);
    this.usuario.setActivado(xusuario.activado);
    this.usuario.setReinicio(xusuario.reinicio);
    this.usuario.setName(xusuario.name);
    this.usuario.setGerencia(xusuario.gerencia);
    this.usuario.setRol(xusuario.rol);

    this.parametros = [{key :'idUser' ,value: xusuario.id}];

    this.rest.get('getUsuarios' , this.token , this.parametros).subscribe((data : any) =>{
        data.forEach((element : any) => {

          this.udpUser.controls['rol'].setValue(element['idRol']);
          this.udpUser.controls['gerencias'].setValue(element['gerId']);

        });

    });


    this.udpUser.controls['empNombre'].setValue(this.usuario.emploNom);
    this.udpUser.controls['empApe'].setValue(this.usuario.emploApe);
    this.modal.open(content);
  }

  public upUser(
               xnombre   : string,
               xapellido : string,
               xidRol    : string,
               xidGer    : string,
               xfecNac   : string,
               xActivado : string,
               xReinicio : string ){

    this.valGuar       = true;
    let id    : number = 0 ;
    let xname :string  = '';
    id                 = this.usuario.getId();
    xname              = this.usuario.getName();
    this.serviLoad.sumar.emit(1);
    let tbl_Usuario  :tblUsuario = new tblUsuario(id , xname  , '' , xidRol , xnombre , xapellido, xfecNac, '' , xReinicio , xActivado, xidGer);
     this.rest.post('upUsuario' , this.token , tbl_Usuario).subscribe(data =>{
        data.forEach((element : any) => {
          this.modal.dismissAll();
          if(element.error == '0' ){
            this.alertas.disparador.emit(this.alertas.getAlert());
            setTimeout(()=>{
              this.alertas.setAlert('','');
            },1500);
            this.tblData();

            if(xReinicio == 'S'){
              let des     = 'El usuario ' + xname + ' fue reiniciado.'
              let log     = new LogSys(1, '' , 3 , 'REINICIO DE USUARIO' , des );
              this.serLog.insLog(log);
            }

            if(xActivado == 'D'){
              let des     = 'El usuario ' + xname + ' fue deshabilitado.'
              let log     = new LogSys(1, '' , 4 , 'DESHABILITAR USUARIO' , des);
              this.serLog.insLog(log);
            }else{
              let des     = 'El usuario ' + xname + ' fue habilitado.';
              const log   = new LogSys(1, '' , 5 , 'HABILITAR USUARIO' , des);
              this.serLog.insLog(log);
            }

          }else{
            this.alertas.disparador.emit(this.alertas.getAlert());
            setTimeout(()=>{
              this.alertas.setAlert('','');
            },1500);
          }
         this.valGuar = false;
        });
      });
      return false;
  }

}
