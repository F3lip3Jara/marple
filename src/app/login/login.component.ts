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

  login      : FormGroup;
  log        : boolean = false;

  constructor(fb: FormBuilder ,
              private UsersService : UsersService,
              private router : Router ,
              private servicioAler : AlertasService) {

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
    this.servicioAler.disparador.subscribe();
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

              if(datx){

                Object.values(datx).forEach(element=>{
                    token    = element.token;
                    reinicio = element.reinicio;
                });

                this.UsersService.setToken(token);
              }

              if (reinicio == 'S'){
                this.router.navigate(['/changePassword']);
              }else{
                setTimeout(()=>{
                  this.router.navigate(['/home']);
                  this.log = false;
                },2000);
              }
        }
      });
    });

     return false;
  }
}





