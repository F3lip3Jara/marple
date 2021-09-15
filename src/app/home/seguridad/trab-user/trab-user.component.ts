import { LinksService } from './../../../servicios/links.service';
import { DataTableDirective } from 'angular-datatables';
import { RestService } from 'src/app/servicios/rest.service';
import { UsersService } from 'src/app/servicios/users.service';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal , NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-trab-user',
  templateUrl: './trab-user.component.html',
  styleUrls: ['./trab-user.component.css']
})
export class TrabUserComponent implements OnInit {
  @ViewChild(DataTableDirective, {static: false})
  datatableElement?: DataTableDirective;


  loading         : boolean              = true;
  dtOptions       : DataTables.Settings  = {} ;
  insUser         : FormGroup;
  //filtroUser   : FormGroup;
  tblUsuarios     : any                  = {};
  token           : string               = '';
  parametros      : any []               = [];
  archivos        : any []               = [];
  fileToUpload?   : File;
  previsualizador : any ;

  constructor(fgInsUser: FormBuilder,
    private servicio : UsersService,
    private rest : RestService,
    private modal : NgbModal,
    private sanitizer: DomSanitizer,
    private servicioLink : LinksService
    ) {

    this.insUser = fgInsUser.group({
      email : ['' , Validators.compose([
        Validators.required,
        Validators.email
       ])],
       nombre : ['' , Validators.compose([
         Validators.required
        ])],
    });
    this.token = this.servicio.getToken();

   }

  ngOnInit(): void {
    this.tblData();
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 20,
      lengthMenu : [20,50,100, 200],
      processing: true,
      language: {
        emptyTable: '',
        zeroRecords: 'No hay coincidencias',
        lengthMenu: 'Mostrar _MENU_ elementos',
        search: 'Buscar:',
        info: 'De _START_ a _END_ de _TOTAL_ elementos',
        infoEmpty: 'De 0 a 0 de 0 elementos',
        infoFiltered: '(filtrados de _MAX_ elementos totales)',
        paginate: {
          first: 'Prim.',
          last: 'Últ.',
          next: 'Sig.',
          previous: 'Ant.'
        }
      }}


  }

  public tblData(){
    this.tblUsuarios = {};
    this.rest.get('trabUsuarios' , this.token, this.parametros).subscribe(data => {
        this.tblUsuarios = data;
    });

     setTimeout(()=> {
      // this.carga = 'visible';
        this.loading = false;
     },3000 );
   }

   public userNuevo(content : any):boolean{
    // this.modal.open(content);
    const d = 'insUsuario';
    //this.onItemAdded.emit(d);
    this.servicioLink.disparador.emit(d);

    console.log(d);
    return false;


   }

   public guardar(nombre: string , emial: string){

   }


   capturarFile (event : any){
     const archivoCapturado = event.target.files[0];
     try {
      var myReader: FileReader = new FileReader();
      myReader.readAsDataURL(archivoCapturado);
      myReader.onloadend = (event) => {
        this.previsualizador  =event.target?.result;
        console.log(event.target?.result);
      }
    }
    catch(e: any){
      console.log(e);
    }
   }





}
