import { AlertasService } from 'src/app/servicios/alertas.service';
import { UsersService } from 'src/app/servicios/users.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RestService } from 'src/app/servicios/rest.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Alert } from 'src/app/model/alert.model';


@Component({
  selector: 'app-info-usuario',
  templateUrl: './info-usuario.component.html',
  styleUrls: ['./info-usuario.component.css']
})
export class InfoUsuarioComponent implements OnInit {

  @Output() onItemAdded: EventEmitter<any>;


  public token      : string ;
  public parametros : any[] = [];
  public usuario    : string ;
  public rol        : string ;
  public imgName    : string ;
  public idRol      : number = 0;



  constructor( private rest        : RestService ,
               private servicioUser:  UsersService,
               private alertas     : AlertasService,
               private router      : Router
                  ) {
    this.token    = servicioUser.getToken();
    this.usuario  = '';
    this.rol      = '';
    this.imgName  = '';
    this.onItemAdded = new EventEmitter();
   }



   ngAfterViewInit(): void {
      let val          = 'N';
    /*  let demonio      = setInterval(()=>{
      this.token       = this.servicioUser.getToken();
      this.parametros  = [{usuario : this.usuario}];

      this.rest.post('setUserSession',this.token, this.parametros).subscribe(data =>{
        data.forEach((element : any) => {
          if(element.error == '99' ){
          }else{
            setTimeout(()=>{
              this.router.navigate(['/login']);
              this.alertas.setAlert('','');
              this.servicioUser.eliminarToken();
              let val     = 'S';
            },1400);
          }
      });
      });
    }, 18000);

    if(val == 'S'){
      clearInterval(demonio);
    }*/
   }

  ngOnInit(): void {
    let  usuariox : any ;

<<<<<<< HEAD
    this.rest.get('getUsuario' , this.token, this.parametros).subscribe(respuesta  => {
     usuariox = respuesta;    

     Object.values(respuesta).forEach(element=>{
=======
    this.rest.get('getUsuario' , this.token, this.parametros).subscribe(respuesta => {
     usuariox = respuesta;
      Object.values(respuesta).forEach(element=>{
>>>>>>> 3a629026ca5e04e1d05975795fe6b23bf253a8dd
        this.usuario  = element.name;
        this.rol      = element.rolDes;
        this.imgName  = element.imgName;

      });

      if(this.usuario == ''){
           this.router.navigate(['/login']);
           this.alertas.setAlert('','');
           this.servicioUser.eliminarToken();
        }
         this.onItemAdded.emit(usuariox);
         
      
         
    });


  }



}
