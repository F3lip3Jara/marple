export class Etapas {

  public idEta: number;
  public etaDes: string;


 constructor(  id : number ,  etaDes : string ){

   this.idEta = id;
   this.etaDes = etaDes;
 }

 setEtaDes(etaDes : string ){
    this.etaDes = etaDes;
 }

 getEtaDes():string{
      return this.etaDes;
 }

 getIdEta():number{
  return this.idEta;
  }

  setIdEta(idEta : number){
   this.idEta = idEta;
  }
}
