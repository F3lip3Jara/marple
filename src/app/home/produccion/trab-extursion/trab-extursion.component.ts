import { LinksService } from 'src/app/servicios/links.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trab-extursion',
  templateUrl: './trab-extursion.component.html',
  styleUrls: ['./trab-extursion.component.css']
})
export class TrabExtursionComponent implements OnInit {

  constructor(private linkService  : LinksService) { }

  ngOnInit(): void {
  }

  extNuevo(){
    this.linkService.disparador.emit('insExtur');
  }

}
