import { TrabOrdenTrabajoComponent } from './produccion/trab-orden-trabajo/trab-orden-trabajo.component';
import { UpProductosComponent } from './parametros/trab-productos/up-productos/up-productos.component';
import { TrabOrdenProduccionComponent } from './produccion/trab-orden-produccion/trab-orden-produccion.component';
import { InsOrdenProduccionComponent } from './produccion/trab-orden-produccion/ins-orden-produccion/ins-orden-produccion.component';
import { InsProductosComponent } from './parametros/trab-productos/ins-productos/ins-productos.component';
import { TrabProductosComponent } from './parametros/trab-productos/trab-productos.component';
import { TrabSubGrupoComponent } from './parametros/trab-sub-grupo/trab-sub-grupo.component';
import { TrabGrupoComponent } from './parametros/trab-grupo/trab-grupo.component';
import { TrabUnidadMedidaComponent } from './parametros/trab-unidad-medida/trab-unidad-medida.component';
import { TrabColorComponent } from './parametros/trab-color/trab-color.component';
import { TrabMonedasComponent } from './parametros/trab-monedas/trab-monedas.component';
import { UpProveedorComponent } from './parametros/trab-proveedores/up-proveedor/up-proveedor.component';
import { TrabProveedoresComponent } from './parametros/trab-proveedores/trab-proveedores.component';
import { InsProveedoresComponent } from './parametros/trab-proveedores/ins-proveedores/ins-proveedores.component';
import { TrabCiudadComponent } from './parametros/trab-ciudad/trab-ciudad.component';
import { TrabComunaComponent } from './parametros/trab-comuna/trab-comuna.component';
import { TrabRegionComponent } from './parametros/trab-region/trab-region.component';
import { TrabPaisComponent } from './parametros/trab-pais/trab-pais.component';
import { TrabEmpresaComponent } from './parametros/trab-empresa/trab-empresa.component';
import { InsUserComponent } from './seguridad/trab-user/ins-user/ins-user.component';
import { LinksService } from './../servicios/links.service';
import { TrabEtapasComponent } from './parametros/trab-etapas/trab-etapas.component';
import { TrabRolesComponent } from './seguridad/trab-roles/trab-roles.component';
import { Component, OnInit , EventEmitter ,Output , ComponentFactoryResolver , ViewChild, AfterViewInit} from '@angular/core';
import { ReceptorDirective } from '../receptor.directive';
import {  Observable } from 'rxjs';
import { AlertasService } from '../servicios/alertas.service';
import { TrabUserComponent } from './seguridad/trab-user/trab-user.component';
import { RestService } from '../servicios/rest.service';
import { UsersService } from '../servicios/users.service';
import { TrabGerenciaComponent } from './parametros/trab-gerencia/trab-gerencia.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit , AfterViewInit {
  @ViewChild(ReceptorDirective , {static : true}) receptor?: ReceptorDirective ;
  @Output() onItemAdded: EventEmitter<any>;

  usuario             : string  = '';
  token               : string;
  parametros          : any []  = [];
  rol                 : string  = '';
  imgName             : string  = '';
  name                : string  = '';
  isMenuCollapsed               = false;

  time  = new Observable(observer => {
    setInterval(()=> observer.next(new Date().toString() ), 1000);
  });

  constructor( private componentFactoryResolver: ComponentFactoryResolver ,
               private servicioAler : AlertasService,
               private servicioUser : UsersService,
               private servicioLink : LinksService,
               private rest         : RestService,
               private router       : Router,

               ){

          this.token           = this.servicioUser.getToken();
          this.onItemAdded     = new EventEmitter();


   }

   ngAfterViewInit(): void {

  }

  ngOnInit(): void {

    this.servicioLink.disparador.subscribe(data => {
        this.links(data);
    });


  }

  public links(link: any){

    let miComponent : any;
    switch (link) {
      case 'users':
          miComponent = TrabUserComponent;
          break;
      case 'insUsuario':
            miComponent = InsUserComponent;
          break;
      case 'roles':
          miComponent = TrabRolesComponent;
          break;
      case 'gerencia':
            miComponent = TrabGerenciaComponent;
            break;
      case 'empresa':
            miComponent = TrabEmpresaComponent;
            break;
       case 'etapas':
            miComponent = TrabEtapasComponent;
            break;
       case 'pais':
            miComponent = TrabPaisComponent;
            break;
       case 'regiones':
            miComponent = TrabRegionComponent;
            break;
       case 'comuna':
            miComponent = TrabComunaComponent;
            break;
       case 'ciudad':
            miComponent = TrabCiudadComponent;
            break;
       case 'proveedor':
            miComponent = TrabProveedoresComponent
            break;
        case 'insProveedor':
            miComponent = InsProveedoresComponent
            break;
        case 'upProveedor':
             miComponent  = UpProveedorComponent
             break;
        case 'moneda':
              miComponent  = TrabMonedasComponent
             break;
        case 'color':
              miComponent  = TrabColorComponent
             break;
        case 'unidad':
             miComponent  = TrabUnidadMedidaComponent
             break;
        case 'grupo':
             miComponent  = TrabGrupoComponent
             break;
        case 'subgrupo':
              miComponent  = TrabSubGrupoComponent
              break;
        case 'productos':
              miComponent  = TrabProductosComponent
              break;
        case 'insProducto':
              miComponent  = InsProductosComponent
              break;
        case 'op':
              miComponent  = TrabOrdenProduccionComponent
              break;
        case 'insOp':
              miComponent  = InsOrdenProduccionComponent
              break;
        case 'upProducto':
              miComponent  = UpProductosComponent
              break;
        case 'ot':
              miComponent  = TrabOrdenTrabajoComponent
              break;


    }
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(miComponent);
      this.receptor?.viewContainerRef.clear();
      this.receptor?.viewContainerRef.createComponent(componentFactory);
      return false;
  }

  infoUsuario(usuariox : any){

    Object.values(usuariox).forEach((element: any)=>{
        this.imgName = element.imgName;
        this.name    = element.name;
    });
  }

  salir(){
    this.router.navigate(['/login']);
    this.servicioAler.setAlert('','');
    this.servicioUser.eliminarToken();
  }




}
