import { InsUserComponent } from './seguridad/trab-user/ins-user/ins-user.component';
import { LinksService } from './../servicios/links.service';
import { TrabEtapasComponent } from './parametros/trab-etapas/trab-etapas.component';
import { TrabRolesComponent } from './seguridad/trab-roles/trab-roles.component';
import { Component, OnInit , EventEmitter ,Output , ComponentFactoryResolver , ViewChild, AfterViewInit} from '@angular/core';
import { ProductosComponent } from './parametros/productos/productos.component';
import { ReceptorDirective } from '../receptor.directive';
import { Observable } from 'rxjs';
import { AlertasService } from '../servicios/alertas.service';
import { TrabUserComponent } from './seguridad/trab-user/trab-user.component';
import { RestService } from '../servicios/rest.service';
import { UsersService } from '../servicios/users.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit , AfterViewInit {
  @ViewChild(ReceptorDirective , {static : true}) receptor?: ReceptorDirective ;
  @Output() onItemAdded: EventEmitter<any>;

  usuario      : string  = '';
  token        : string;
  parametros   : any []  = [];
  rol          : string  = '';



  time  = new Observable(observer => {
    setInterval(()=> observer.next(new Date().toString()), 1000);
  });



  constructor( private componentFactoryResolver: ComponentFactoryResolver ,
               private servicioAler : AlertasService,
               private servicioget :  RestService ,
               private servicioUser:  UsersService,
               private servicioLink:  LinksService){

          this.token  =this.servicioUser.getToken();
          this.onItemAdded     = new EventEmitter();
   }

   ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.servicioAler.disparador.subscribe();
    this.servicioLink.disparador.subscribe(data => {
        this.links(data);
    });

    this.getUsuario();
  }

  public links(link: any){

    let miComponent : any;

    switch (link) {
      case 'productos':
        miComponent = ProductosComponent;
        break;

      case 'users':
          miComponent = TrabUserComponent;
          break;

      case 'roles':
          miComponent = TrabRolesComponent;
          break;

      case 'etapas':
            miComponent = TrabEtapasComponent;
            break;
      case 'insUsuario':
              miComponent = InsUserComponent;
              break;
    }


  //  console.log(link);

      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(miComponent);
      this.receptor?.viewContainerRef.clear();
      this.receptor?.viewContainerRef.createComponent(componentFactory);
      return false;
  }

   public getUsuario(){

    this.servicioget.get('getUser' , this.token , this.parametros).subscribe(data => {
      Object.values(data).forEach(element=>{
        this.usuario  = element.name;
        this.rol      = element.rolDes;
    });
    });
  }
}
