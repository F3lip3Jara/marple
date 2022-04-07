import { Etapas } from 'src/app/model/etapas.model';

export class Etapasdet extends Etapas {

  public idEtaDes: number;
  public etaDesDes: string;


 constructor( id :number , etaDes : string , etaProd : string , idEtaDes: number , etaDesDes:string ){
    super(id, etaDes , etaProd);
    this.idEtaDes = idEtaDes;
    this.etaDesDes = etaDesDes;


 }

 setEtaDesDes(etaDesDes : string ){
    this.etaDesDes = etaDesDes;
 }

 getEtaDesDes():string{
      return this.etaDesDes;
 }

 getIdEtaDet():number{
  return this.idEtaDes;
  }

  setIdEtaDet(idEtaDes : number){
   this.idEtaDes = idEtaDes;
  }
}
