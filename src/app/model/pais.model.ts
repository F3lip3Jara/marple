export class Pais {

  public  idPai     :number;
  public  paiDes    :string;
  public  paiCod    :string;


  constructor(xid :number , xpaiDes: string , xpaicod : string  ) {
     this.idPai       = xid;
     this.paiDes      = xpaiDes;
     this.paiCod      = xpaicod;

  }


  getId () {
      return this.idPai;
  }

  setId (xid:number) : number {
      this.idPai = xid;
      return this.idPai;
  }

  getPaiDes () {
    return this.paiDes;
}


  setPaiDes (xpaiDes:string) : string {
      this.paiDes = xpaiDes;
      return this.paiDes;
  }

  getPaiCod () {
    return this.paiCod;
}


  setPaicod (xpaicod:string) : string {
      this.paiCod = xpaicod;
      return this.paiCod;
  }




}
