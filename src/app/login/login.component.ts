
import { LogServiciosService } from 'src/app/servicios/log-servicios.service';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup , Validators  } from '@angular/forms';
import { Router  } from '@angular/router';
import {Usuario} from '../model/usuario.model';
import {UsersService} from "../servicios/users.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login        : FormGroup;
  log          : boolean = false;


  constructor(fb                   : FormBuilder ,
              private UsersService : UsersService,
              private router       : Router ,
              private servicioAler : AlertasService ,
              private serviLogSys  : LogServiciosService) {

    this.login = fb.group({
      email : ['' , Validators.compose([
       Validators.required
      ])],
      password : ['' , Validators.compose([
        Validators.required
       ])],
    });
    this.UsersService.setToken("");
  }

  ngOnInit(): void {

  }

  guardar(email : string , password:string  ) : boolean {
    this.log = true;
    let datx : any [] = [];

    const userx = new Usuario(1,'' , password , '', email);

     this.UsersService.login(userx).subscribe( data => {
      data.forEach((element:any) => {
         if(element.error == "1"){
              this.servicioAler.disparador.emit(this.servicioAler.getAlert());
              setTimeout(()=>{
                this.servicioAler.setAlert('','');
              },2000);
              this.log = false;
         }else{

              datx = data;
              let reinicio : string  = '';
              let token    : string  = '';
              let name     : string  = '';

              if(datx){
                Object.values(datx).forEach(element=>{
                    token    = element.token;
                    reinicio = element.reinicio;
                    name     = element.name;
                });
                this.UsersService.setToken(token);
              }

              if (reinicio == 'S'){
                this.router.navigate(['/changePassword']);
              }else{
               // const serLog  = new LogSys(1, '', 1 , 'LOGEO DE USUARIO' , '');
                //this.serviLogSys.setLogSys(serLog);

                this.router.navigate(['/home']);
                this.log = false;
              }
          }
      });
    });


     return false;
  }
}





