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
  }

  public insLog(log : LogSys){
    this.token           = this.servicioUser.getToken();
    this.rest.post('insLogSys', this.token, log).subscribe(data =>{
    });
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
