import { Pais } from "./pais.model";

export class Region extends Pais{

  public  idReg     :number;
  public  regDes    :string;
  public  regCod    :string;


  constructor(xid :number , xregDes: string , xregCod : string  , xidPai :number , xpaiDes: string , xpaicod : string) {
     super(xidPai , xpaiDes, xpaicod);
     this.idReg       = xid;
     this.regDes      = xregDes;
     this.regCod      = xregCod;

  }


  getIdReg () {
      return this.idReg;
  }

  setIdReg (xid:number) : number {
      this.idReg = xid;
      return this.idReg;
  }

  getregDes () {
    return this.regDes;
}


  setregDes (xregDes:string) : string {
      this.regDes = xregDes;
      return this.regDes;
  }

  getregCod () {
    return this.regCod;
}


  setregCod (xregCod:string) : string {
      this.regCod = xregCod;
      return this.regCod;
  }




}
