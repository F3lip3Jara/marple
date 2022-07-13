import { UsersService } from './users.service';
import { LogSys } from './../model/logSys.model';
import { RestService } from './rest.service';
import { Injectable, Output ,EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogSysService {
  token               : string = '';

  constructor(private rest          : RestService,
              private servicioUser  : UsersService){
<<<<<<< HEAD
  }

  public insLog(log : LogSys){
    this.token           = this.servicioUser.getToken();
    this.rest.post('insLogSys', this.token, log).subscribe(data =>{
    });
=======


  }


  public insLog(log : LogSys){
    this.token           = this.servicioUser.getToken();
    this.rest.post('insLogSys', this.token, log).subscribe(data =>{

    });

>>>>>>> 3a629026ca5e04e1d05975795fe6b23bf253a8dd
  }

}






/*

  @Output() dislog :EventEmitter <any> = new EventEmitter();
  private  logSys: any = null;

  constructor() {

   }

  public setLogSys(log : LogSys){
        this.logSys=log;

  }

  public getLogSys():LogSys{
    return this.logSys;
  }
}
*/
