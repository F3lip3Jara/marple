import { Ciudad } from "./ciudad.model";


export class Comuna extends Ciudad{

  public  idCom     :number;
  public  comDes    :string;
  public  comCod    :string;


  constructor(xid     : number,
              xcomDes : string,
              xcomCod : string,
              xidPai  : number,
              xregCod : string,
              xregDes : string,
              xidReg  : number,
              xpaiDes : string,
              xpaiCod : string,
              xidCiu  : number,
              xciuDes : string,
              xciuCod : string ) {

     super(xidCiu , xciuDes , xciuCod , xidPai, xregCod ,xregDes ,xidReg  , xpaiDes, xpaiCod)


     this.idCom       = xid;
     this.comDes      = xcomDes;
     this.comCod      = xcomCod;

  }


  getidCom () {
      return this.idCom;
  }

  setidCom (xid:number) : number {
      this.idCom = xid;
      return this.idCom;
  }

  getcomDes () {
    return this.comDes;
}


  setcomDes (xcomDes:string) : string {
      this.comDes = xcomDes;
      return this.comDes;
  }

  getcomCod () {
    return this.comCod;
}


  setcomCod (xcomCod:string) : string {
      this.comCod = xcomCod;
      return this.comCod;
  }




}
