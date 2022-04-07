export class Etapas {

  public idEta: number;
  public etaDes: string;
  public etaProd: string;

 constructor(  id : number ,  etaDes : string , etaProd: string ){

   this.idEta = id;
   this.etaDes = etaDes;
   this.etaProd = etaProd;

 }

 setEtaDes(etaDes : string ){
    this.etaDes = etaDes;
 }

 getEtaDes():string{
      return this.etaDes;
 }

 setEtProd(etaProd : string ){
  this.etaProd = etaProd;
}

getEtaProd():string{
    return this.etaProd;
}

 getIdEta():number{
  return this.idEta;
  }

  setIdEta(idEta : number){
   this.idEta = idEta;
  }
}
