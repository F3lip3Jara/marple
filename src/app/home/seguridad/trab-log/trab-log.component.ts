
import { LogSysService } from './../../../servicios/log-sys.service';
import { Component, OnInit } from '@angular/core';
import { LogServiciosService } from 'src/app/servicios/log-servicios.service';

@Component({
  selector: 'app-trab-log',
  templateUrl: './trab-log.component.html',
  styleUrls: ['./trab-log.component.css']
})
export class TrabLogComponent implements OnInit {

  datos : any ;

  constructor(private serlogSys : LogServiciosService) { }

  ngOnInit(): void {

    this.serlogSys.disparador.subscribe(data =>{
        console.log(data);
      this.datos = data;
    });

  }

}
