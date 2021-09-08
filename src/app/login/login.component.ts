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
       Validators.required,
       Validators.email
      ])],
      password : ['' , Validators.compose([
        Validators.required
       ])],
    });

  }

  ngOnInit(): void {
    this.servicioAler.disparador.subscribe();
  }

  guardar(email : string , password:string  ) : boolean {
     const userx = new Usuario(1,'' , password , '', email);
     this.UsersService.login(userx).subscribe( data => {
          this.log = true;
      data.forEach((element:any) => {
         if(element.error == "1"){
            setTimeout(()=>{
              this.servicioAler.setAlert("","");
            }, 5000);
            this.log = false;
         }else{
              let datx : any []  = data;
              let token          = '';
              if(datx){
                Object.values(datx).forEach(element=>{
                    token = element.token;
                });

                this.UsersService.setToken(token);

              }

            setTimeout(()=>{
                this.router.navigate(['/home']);
                this.log = false;
              },2000);
         }

      });
    });
     return false;
 }






}
