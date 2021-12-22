export class Moneda {

  public  idMon     :number;
  public  monDes    :string;
  public  monCod    :string;


  constructor(xid :number , xmonDes: string , xmonCod : string  ) {
     this.idMon       = xid;
     this.monDes      = xmonDes;
     this.monCod      = xmonCod;

  }


  getId () {
      return this.idMon;
  }

  setId (xid:number) : number {
      this.idMon = xid;
      return this.idMon;
  }

  getmonDes () {
    return this.monDes;
}


  setmonDes (xmonDes:string) : string {
      this.monDes = xmonDes;
      return this.monDes;
  }

  getmonCod () {
    return this.monCod;
}


  setmonCod (xmonCod:string) : string {
      this.monCod = xmonCod;
      return this.monCod;
  }




}
