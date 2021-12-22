import { Region } from "./region.model";



export class Ciudad extends Region{

  public  idCiu     :number;
  public  ciuDes    :string;
  public  ciuCod    :string;


  constructor(xid     : number,
              xciuDes : string,
              xciuCod : string,
              xidPai  : number,
              xregCod : string,
              xregDes : string,
              xidReg  : number,
              xpaiDes : string,
              xpaiCod : string
             ) {

     super(xidReg, xregDes , xregCod , xidPai , xpaiDes , xpaiCod );
     this.idCiu       = xid;
     this.ciuDes      = xciuDes;
     this.ciuCod      = xciuCod;

  }


  getidCiu () {
      return this.idCiu;
  }

  setidCiu (xid:number) : number {
      this.idCiu = xid;
      return this.idCiu;
  }

  getciuDes () {
    return this.ciuDes;
}


  setciuDes (xciuDes:string) : string {
      this.ciuDes = xciuDes;
      return this.ciuDes;
  }

  getciuCod () {
    return this.ciuCod;
}


  setciuCod (xciuCod:string) : string {
      this.ciuCod = xciuCod;
      return this.ciuCod;
  }




}
