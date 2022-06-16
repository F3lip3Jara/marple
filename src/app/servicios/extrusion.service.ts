import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExtrusionService {
  private extrusion : any    = null;

  constructor() { }

  setExtrusion(extrusion : any) : any {
    this.extrusion = extrusion ;
    return this.extrusion;
 }


 getExtrusion() : any {
       return this.extrusion;
 }

}
