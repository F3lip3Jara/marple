import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private tareas : any    = null;

  constructor() { }

  setExtrusion(tareas : any) : any {
    this.tareas = tareas ;
  }


 getExtrusion() : any {
       return this.tareas;
 }

}
