import { Component, OnInit, Output, Input, ViewChild , ElementRef , AfterViewInit} from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Alert } from 'src/app/model/alert.model';

import { AlertasService } from 'src/app/servicios/alertas.service';


@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit , AfterViewInit {

    @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert?: NgbAlert;

    alert    : Alert;
    type     : string = '';
    valida   : boolean = true;

    constructor( private  servicio : AlertasService) {
      this.alert = this.servicio.alert();
      this.valida = true;
     }

    ngOnInit() {
      this.servicio.disparador.emit(this.alert);


    }

    ngAfterViewInit(){

    }


}


