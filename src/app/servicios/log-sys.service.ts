import { Injectable, Output ,EventEmitter} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogSysService {

  @Output() disparador :EventEmitter <any> = new EventEmitter();

  /*alerta : Alert = new Alert('', '');

  getAlert(): Alert {
     return this.alerta;
  }

  setAlert(mensaje : string  , type : string){
    this.alerta.setMessage(mensaje);
    this.alerta.setType(type);
  }*/
  constructor(){


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
