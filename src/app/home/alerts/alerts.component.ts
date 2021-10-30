import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild ,  AfterViewInit} from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { Alert } from 'src/app/model/alert.model';
import { AlertasService } from 'src/app/servicios/alertas.service';


@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit , AfterViewInit {


    type     : string  = '';
    valida   : boolean = false;
    alerta   : Alert   = new Alert('', '');

    constructor( private  servicio : AlertasService) {


     }

    ngOnInit() {
      this.servicio.disparador.subscribe(data=>{

        this.valida= true;
        this.alerta = data;


      });
    }

    ngAfterViewInit(){

    }


}


