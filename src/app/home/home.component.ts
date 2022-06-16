import { Loading } from './../model/loading';
import { LoadingService } from './../servicios/loading.service';
import { LinksService } from './../servicios/links.service';
import { Component, OnInit  , ComponentFactoryResolver , ViewChild, AfterViewInit} from '@angular/core';
import { ReceptorDirective } from '../receptor.directive';
import { Observable } from 'rxjs';
import { AlertasService } from '../servicios/alertas.service';
import { RestService } from '../servicios/rest.service';
import { UsersService } from '../servicios/users.service';
import { Router } from '@angular/router';
import { NgbProgressbarConfig } from '@ng-bootstrap/ng-bootstrap';

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
  load                          = new Loading(0);
  loadx                         = new Loading(0);
  progreso            :number   = 0;
  valor                         = '';

  time  = new Observable(observer => {
    setInterval(()=> observer.next(new Date().toString() ), 1000);
  });

  constructor( private componentFactoryResolver: ComponentFactoryResolver ,
               private servicioAler      : AlertasService,
               private servicioUser      : UsersService,
               private servicioLink      : LinksService,
               private rest              : RestService,
               private router            : Router,
               private serviLoad         : LoadingService,
               config: NgbProgressbarConfig
               ){

          this.token           = this.servicioUser.getToken();
          config.striped       = true;
          config.animated      = true;

   }
ngAfterViewInit(): void {
    this.serviLoad.sumar.subscribe(data=>{
      this.load.setTotal(data*2);
      this.loadx.setTotal(data*2);
    });

  this.serviLoad.restar.subscribe(data=>{
    let total      = this.load.total;
    let diferencia = this.loadx.total;

    if(total > 0){
      diferencia     = diferencia - data;

      this.loadx.setTotal(diferencia);
      if(diferencia > 0){
          this.progreso = (diferencia*100)/total;
          this.valor    = this.progreso.toString();
      }else{
        if(diferencia == 0){
          this.progreso = 100;
          setTimeout(()=> {
            this.progreso = 0;
            this.load.setTotal(0);
            this.loadx.setTotal(0);
            },1000 );
        }
      }
    }});
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
