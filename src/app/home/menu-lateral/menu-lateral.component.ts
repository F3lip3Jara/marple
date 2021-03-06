import { Component, OnInit ,Output , EventEmitter, Input} from '@angular/core';
import { Links } from 'src/app/model/link.model';
import { RestService } from 'src/app/servicios/rest.service';
import { UsersService } from 'src/app/servicios/users.service';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {
  public isMenuCollapsed  = true;
  public isMenuCollapsed2 = true;
  public isMenuCollapsed3 = true;
  public isMenuCollapsed4 = true;
  public isMenuCollapsed5 = true;

  token            : string ;
  parametros       : any[]   = [];  
  @Input() modulos : any     = [];


  @Output() onItemAdded: EventEmitter<any>;

  public links : Links |undefined;

  constructor(  private rest        : RestService ,
                private servicioUser: UsersService
            ) {

    this.onItemAdded = new EventEmitter();
    this.token    = servicioUser.getToken(); 
   }

  ngOnInit(): void {   
  }

 

}
