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
import { ProductosComponent } from './parametros/productos/productos.component';
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
        case 'producto':
              miComponent = ProductosComponent
              break;
        case 'upProveedor':
             miComponent  = UpProveedorComponent


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
