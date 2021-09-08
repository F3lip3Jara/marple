import { Injectable, Output ,EventEmitter} from '@angular/core';
import { Alert } from '../model/alert.model';


@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  @Output() disparador :EventEmitter <Alert> = new EventEmitter();

  alerta : Alert = new Alert('', '');

  alert(): Alert {
     return this.alerta;
  }

  setAlert(mensaje : string  , type : string){
    this.alerta.setMessage(mensaje);
    this.alerta.setType(type);
  }
  constructor(){

  }

}
