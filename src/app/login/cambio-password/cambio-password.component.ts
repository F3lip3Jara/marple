import { Usuario } from './../../model/usuario.model';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/servicios/users.service';
import { RestService } from 'src/app/servicios/rest.service';

@Component({
  selector: 'app-cambio-password',
  templateUrl: './cambio-password.component.html',
  styleUrls: ['./cambio-password.component.css']
})

export class CambioPasswordComponent implements OnInit {

  changePassword      : FormGroup;
  val                 : boolean   = false;
  usuario             : string    = '';
  token               : string ;
  parametros          : []        = [];
  valida             : boolean    = false;

  constructor(fb: FormBuilder ,
    private usersService : UsersService,
    private rest         : RestService,
    private router       : Router ,
    private servicioAler : AlertasService) {

      this.changePassword = fb.group({
        password1 : ['' , Validators.compose([
         Validators.required,
         this.nombreValidator
        ])],
        password2 : ['' , Validators.compose([
          Validators.required


         ])],
      });

      this.token   = usersService.getToken();
      console.log(this.token);

      this.rest.get('getUsuario' , this.token, this.parametros).subscribe(respuesta => {
        Object.values(respuesta).forEach(element=>{
         this.usuario = element.name;
        });
      });

     }

  ngOnInit(): void {

    this.changePassword.valueChanges.subscribe(field => {
      if (field.password1 !== field.password2) {
        this.valida = true;
      }else{
        this.valida = false;
      }
    });


  }
  nombreValidator(control: FormControl) : { [s : string] : boolean}  | null{
    const i = control.value.toString().trim().length;

    if(i > 0 && i > 6 && i < 8){
      return { "invalidNombre" : true};
    }

    return null;
  }

  public guardar(password1 : string ) : boolean{

    const userx = new Usuario(1,this.usuario , password1 , this.token , this.usuario);
    this.val    = true;
    this.rest.post('up_Password' , this.token, userx).subscribe(data=> {
      data.forEach((element:any) => {

        this.servicioAler.disparador.emit(this.servicioAler.getAlert());

          if(element.error == '0'){

            setTimeout(()=>{
              this.servicioAler.setAlert('','');
              this.router.navigate(['/login']);
              this.val = false;
            },1500);

          }else{
             this.val = false;
          }

      });
    });
    return false;
  }

}
