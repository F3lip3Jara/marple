import { LinksService } from 'src/app/servicios/links.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/servicios/users.service';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';
import { RestService } from 'src/app/servicios/rest.service';
import { DataTableDirective } from 'angular-datatables';
import { ExcelService } from 'src/app/servicios/excel.service';
import { LogSysService } from 'src/app/servicios/log-sys.service';
import { LogSys } from 'src/app/model/logSys.model';

@Component({
  selector: 'app-up-des-proveeedor',
  templateUrl: './up-des-proveeedor.component.html',
  styleUrls: ['./up-des-proveeedor.component.css']
})
export class UpDesProveeedorComponent implements OnInit {

  @ViewChild(DataTableDirective, {static: false})
  datatableElement?: DataTableDirective;


  proveedor        : any;
  tblProveedor     : any;
  token            : any;
  parametros       : any []              = [];
  loading         : boolean              = true;
  dtOptions       : DataTables.Settings  = {} ;
  carga           : string               = "invisible";


  constructor(private serProveedor : ProveedoresService,
    private rest         : RestService,
    private servicioaler : AlertasService,
    private servicio     : UsersService,
    private servicioLink : LinksService,
    private excel        : ExcelService,
    private serLog       : LogSysService) {

       this.proveedor = this.serProveedor.getProveedor();
       this.token     = this.servicio.getToken();
    }

  ngOnInit(): void {

    this.tblData();
  }

  public tblData(){
    this.tblProveedor = {};
    this.rest.get('trabPrvDir' , this.token, this.parametros).subscribe(data => {
      this.tblProveedor = data;
    });
    setTimeout(()=> {
        this.carga = 'visible';
        this.loading = false;
     },1500 );
   }

   public Excel(){
    this.excel.exportAsExcelFile(this.tblProveedor, 'proveedores');
    return false;
   }


   public delPrvDir( proveedor : any){
    let url      = 'delPrvDir';
    this.carga   = 'invisible';
    this.loading = true;

     this.rest.post(url ,this.token, proveedor ).subscribe(resp => {
         resp.forEach((elementx : any)  => {
           if(elementx.error == '0'){
            let   des              = 'Eliminar de dirección proveedor id: '+ proveedor.id;
            let   log  : LogSys    = new LogSys(2, '' , 24, 'ELIMINAR DIR PROVEEDOR/CLIENTE'  , des);
            this.serLog.insLog(log);
             
             this.servicioaler.disparador.emit(this.servicioaler.getAlert());
             setTimeout(()=>{
               this.servicioaler.setAlert('','');
               this.tblProveedor = {};
               this.rest.get('trabPrvDir' , this.token, this.parametros).subscribe(data => {
                   this.tblProveedor = data;
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
}
