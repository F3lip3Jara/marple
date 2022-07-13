import { LogSysService } from './../../../../servicios/log-sys.service';
import { LogSys } from './../../../../model/logSys.model';
import { Alert } from 'src/app/model/alert.model';
import { AlertasService } from 'src/app/servicios/alertas.service';
import { RestService } from 'src/app/servicios/rest.service';
import { UsersService } from 'src/app/servicios/users.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, UntypedFormControl } from '@angular/forms';

@Component({
  selector: 'app-up-user',
  templateUrl: './up-user.component.html',
  styleUrls: ['./up-user.component.css']
})
export class UpUserComponent implements OnInit {
  token           : string;
  parametros      : any []  = [];
  nombre          : string  = '';
  rol             : string  = '';
  imgName         : string  = '';
  previsualizador : any     = null;
  updUser         : UntypedFormGroup;

  val             : boolean = false;

  constructor(private servicioUser : UsersService ,
              private  rest        : RestService,
<<<<<<< HEAD
              fgUpdUser            : UntypedFormBuilder,
=======
              fgUpdUser            : FormBuilder,
>>>>>>> 3a629026ca5e04e1d05975795fe6b23bf253a8dd
              private servicioAler : AlertasService,
              private serLog        : LogSysService) {

    this.token           = this.servicioUser.getToken();

    this.updUser = fgUpdUser.group({
      emploFecNac  : []

    });


   }

  ngOnInit(): void {
    let usuariox ;

    this.rest.get('getUsuario' , this.token, this.parametros).subscribe(respuesta => {
       Object.values(respuesta).forEach(element=>{
       this.nombre  = element.name;
        this.rol      = element.rolDes;
        this.imgName  = element.imgName;
      });
    });


  }

  capturarFile (event : any){
    const archivoCapturado = event.target.files[0];
    try {
     var myReader: FileReader = new FileReader();
     myReader.readAsDataURL(archivoCapturado);
     myReader.onloadend = (event) => {
       this.previsualizador  =event.target?.result;
     }
   }
   catch(e: any){
     console.log(e);
   }
  }

  nombreValidator(control: UntypedFormControl) : { [s : string] : boolean}  | null{
    const i = control.value.toString().trim().length;

    if(i > 0 && i > 6 && i < 8){
      return { "invalidNombre" : true};
    }

    return null;
  }

  public guardar( ){
    this.val        = true;
    let param = [{'imgName' : this.previsualizador }];
    this.rest.post('upUsuario2', this.token , param).subscribe(data => {
       data.forEach((element : any) => {
            if(element.error == '0'){
              this.val=false;
              window.location.reload();
            //  let   des    : string = 'Usuario actualizado ' + empName;
            //  const log    : LogSys = new LogSys(1, '' , 2 , 'INGRESO DE USUARIO' , des);
             // this.serLog.insLog(log);

            }else{
              this.servicioAler.disparador.emit(this.servicioAler.getAlert());
              setTimeout(()=>{
                this.servicioAler.setAlert('','');
              },1500);
              this.val=false;
            }
        });

        let alerta : Alert = this.servicioAler.getAlert();
        this.servicioAler.disparador.emit(alerta);
    });

  }

}
