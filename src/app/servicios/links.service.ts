import { Links } from 'src/app/model/link.model';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LinksService {

 @Output() disparador :EventEmitter <any> = new EventEmitter();


  constructor() { }


}
