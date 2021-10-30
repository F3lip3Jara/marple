import { Comuna } from './comuna.model';


export class Ciudad extends Comuna{

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
              xpaiCod : string,
              xidCom  : number,
              xcomDes : string,
              xcomCod : string) {

     super(xidCom , xcomDes , xcomCod , xidPai ,xregCod  ,xregDes , xidReg, xpaiDes , xpaiCod )
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
    return this.comCod;
}


  setciuCod (xciuCod:string) : string {
      this.ciuCod = xciuCod;
      return this.ciuCod;
  }




}
