import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  @Output() sumar   :EventEmitter <any> = new EventEmitter();
  @Output() restar  :EventEmitter <any> = new EventEmitter();

  constructor() { }


}
