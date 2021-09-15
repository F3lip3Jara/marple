import { Component, OnInit ,Output , EventEmitter} from '@angular/core';
import { Links } from 'src/app/model/link.model';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {
  public isMenuCollapsed = true;
  public isMenuCollapsed2 = true;

  @Output() onItemAdded: EventEmitter<any>;
  public links : Links |undefined;

  constructor() {

    this.onItemAdded = new EventEmitter();
   }

  ngOnInit(): void {
  }

  elinks(link : string){
    const d = link;
    this.onItemAdded.emit(d);
    return false;
  }



}
