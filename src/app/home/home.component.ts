import { LinksService } from './../servicios/links.service';
import { Component, OnInit  , ComponentFactoryResolver , ViewChild, AfterViewInit} from '@angular/core';
import { ReceptorDirective } from '../receptor.directive';
import { Observable } from 'rxjs';
import { AlertasService } from '../servicios/alertas.service';
import { RestService } from '../servicios/rest.service';
import { UsersService } from '../servicios/users.service';
import { Router } from '@angular/router';
import { LogServiciosService } from 'src/app/servicios/log-servicios.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit , AfterViewInit {

  @ViewChild(ReceptorDirective , {static : true}) receptor?: ReceptorDirective ;
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
               private servicioAler      : AlertasService,
               private servicioUser      : UsersService,
               private servicioLink      : LinksService,
               private rest              : RestService,
               private router            : Router,
               private serlogSys            : LogServiciosService
               ){

          this.token           = this.servicioUser.getToken();

   }

   ngAfterViewInit(): void {
  }

  ngOnInit(): void {

    this.servicioLink.disparador.subscribe(data => {
        this.links(data);
    });


  }

  public links(link: any){

      let miComponent : any = this.servicioUser.getComponent(link);
      let componentFactory  = this.componentFactoryResolver.resolveComponentFactory(miComponent);
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

  editar(){
      this.links('UpdUser');
  }


}
