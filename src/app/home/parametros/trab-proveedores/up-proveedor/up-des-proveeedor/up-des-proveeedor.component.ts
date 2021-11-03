import { LinksService } from 'src/app/servicios/links.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from 'src/app/servicios/users.service';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { ProveedoresService } from 'src/app/servicios/proveedores.service';
import { RestService } from 'src/app/servicios/rest.service';
import { DataTableDirective } from 'angular-datatables';
import { ExcelService } from 'src/app/servicios/excel.service';

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
    private excel        : ExcelService) {

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
}
