export class Gerencia {

  public  gerId    :number;
  public  gerDes    :string;


  constructor(xid :number , xgerDes: string  ) {
     this.gerId       = xid;
     this.gerDes      = xgerDes;

  }

  getgerDes () {
      return this.gerDes;
  }

  getId () {
      return this.gerId;
  }

  setId (xid:number) : number {
      this.gerId = xid;
      return this.gerId;
  }

  setGerDes (xgerDes:string) : string {
      this.gerDes = xgerDes;
      return this.gerDes;
  }



}
