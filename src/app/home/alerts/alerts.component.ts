import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Alert } from 'src/app/model/alert.model';
import { AlertasService } from 'src/app/servicios/alertas.service';


@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})


export class AlertsComponent implements OnInit , AfterViewInit {



  public show          = false;


    type     : string  = '';
    alerta   : Alert   = new Alert('', '');

    constructor( private  servicio : AlertasService,
                private el         : ElementRef) {

     }

    ngOnInit() {


      this.servicio.disparador.subscribe(data=>{
          if(data){
              this.alerta  = data;
              this.show    = true;
              setTimeout(()=>{
                this.show = false;
              },5000);
          }

    });

    }

    ngAfterViewInit(){

    }




}


