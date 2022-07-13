import { Component, Input, OnInit ,EventEmitter, Output} from '@angular/core';
import { Router } from '@angular/router';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { LinksService } from 'src/app/servicios/links.service';
import { RestService } from 'src/app/servicios/rest.service';
import { UsersService } from 'src/app/servicios/users.service';

@Component({
  selector: 'app-menu-lateral-module',
  templateUrl: './menu-lateral-module.component.html',
  styleUrls: ['./menu-lateral-module.component.css']
})
export class MenuLateralModuleComponent implements OnInit {
@Input() module  :any         =[];
isMenuCollapsed  : boolean    = true;

  constructor( private link : LinksService) {  } 

  ngOnInit(): void {  }

  elinks(link : string){
    const d = link;
    this.link.disparador.emit(link);
    return false;
  }

}
