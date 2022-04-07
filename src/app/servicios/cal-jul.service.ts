import { UsersService } from 'src/app/servicios/users.service';
import { RestService } from 'src/app/servicios/rest.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalJulService {
   ano        : any ;
   parametros : any [] = [];
   token      : string ;

  constructor(
     private serviciorest : RestService,
     private userService  : UsersService
    ) {
      this.token = userService.getToken();
      serviciorest.get('busUltAno', this.token , this.parametros).subscribe((rest:any) =>{
        rest.forEach((element: any) => {
              this.ano = element.calAno;
        });
      });
  }


  getAno() : any {
    return this.ano;
  }

  actualAno(){
    this.token = this.userService.getToken();
      this.serviciorest.get('busUltAno', this.token , this.parametros).subscribe((rest:any) =>{
        rest.forEach((element: any) => {
              this.ano = element.calAno;
        });
      });
  }

}
