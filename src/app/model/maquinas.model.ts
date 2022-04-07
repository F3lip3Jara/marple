import { Etapas } from 'src/app/model/etapas.model';

export class Maquinas extends Etapas {

  public idMaq: number;
  public maqDes: string;
  public maqCod: string;
  public maqTip: string;


 constructor( id :number , etaDes : string , etaProd : string , idMaq: number , maqDes:string , maqCod : string, maqTip : string ){
    super(id, etaDes , etaProd);
    this.idMaq = idMaq;
    this.maqDes = maqDes;
    this.maqCod = maqCod;
    this.maqTip = maqTip;
 }

 setMaqDes(maqDes : string ){
    this.maqDes = maqDes;
 }

 getMaqDes():string{
      return this.maqDes;
 }

 getIdMaq():number{
  return this.idMaq;
  }

  setidMaq(idMaq : number){
   this.idMaq = idMaq;
  }


  setMaqCod(maqCod : string ){
    this.maqCod = maqCod;
  }

 getMaqCod():string{
      return this.maqCod;
  }

  setMaqTip(maqTip : string ){
    this.maqTip = maqTip;
  }

 getMaqTip():string{
      return this.maqTip;
  }
}
