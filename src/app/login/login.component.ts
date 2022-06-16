import { LogSys } from './../model/logSys.model';
import { LogSysService } from './../servicios/log-sys.service';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from '../model/usuario.model';
import { UsersService } from "../servicios/users.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: FormGroup;
  log: boolean = false;


  constructor(fb          : FormBuilder,
    private UsersService  : UsersService,
    private router        : Router,
    private servicioAler  : AlertasService,
    private serLog        : LogSysService) {

    this.login = fb.group({
      email: ['', Validators.compose([
        Validators.required
      ])],
      password: ['', Validators.compose([
        Validators.required
      ])],
    });
    this.UsersService.setToken("");
  }

  ngOnInit(): void {

  }

  guardar(email: string, password: string): boolean {
    this.log    = true;
    const userx = new Usuario(1, '', password, '', email);
    this.UsersService.eliminarToken();

    this.UsersService.login(userx).subscribe(data => {
      if(!data.id) {
        this.servicioAler.disparador.emit(this.servicioAler.getAlert());
        setTimeout(() => {
          this.servicioAler.setAlert('', '');
        }, 2000);
        this.log = false;
      }else{

        let reinicio: string = data.reinicio;
        let token   : string = data.token;
        this.UsersService.setToken(token);

        if (reinicio == 'S') {
          this.router.navigate(['/changePassword']);
        } else {

          let des     = 'El usuario ' + email + ' logeado.'
          let serLog  = new LogSys(1, email , 1 , 'LOGEO DE USUARIO' , des);
          this.serLog.insLog(serLog);
          this.router.navigate(['/home']);
          this.log = false;
        }
      }
    });
      return false;
  }
}





