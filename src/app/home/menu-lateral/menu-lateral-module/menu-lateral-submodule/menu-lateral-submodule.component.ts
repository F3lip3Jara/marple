import { Component, Input, OnInit } from '@angular/core';
import { LinksService } from 'src/app/servicios/links.service';

@Component({
  selector: 'app-menu-lateral-submodule',
  templateUrl: './menu-lateral-submodule.component.html',
  styleUrls: ['./menu-lateral-submodule.component.css']
})
export class MenuLateralSubmoduleComponent implements OnInit {

  @Input() subModule : any;
  isMenuCollapsed : boolean  = true;

  constructor(private link : LinksService) { }


  ngOnInit(): void {
  }

  elinks(link : string){
    const d = link;
    console.log(link);   
    this.link.disparador.emit(link);
    return false;
  }

}
