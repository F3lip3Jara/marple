export class unMed {

  public  idUn     :number;
  public  unDes    :string;
  public  unCod    :string;


  constructor(xid :number , xunDes: string , xunCod : string  ) {
     this.idUn       = xid;
     this.unDes      = xunDes;
     this.unCod      = xunCod;

  }


  getId () {
      return this.idUn;
  }

  setId (xid:number) : number {
      this.idUn = xid;
      return this.idUn;
  }

  getunDes () {
    return this.unDes;
}


  setunDes (xunDes:string) : string {
      this.unDes = xunDes;
      return this.unDes;
  }

  getunCod () {
    return this.unCod;
}


  setunCod (xunCod:string) : string {
      this.unCod = xunCod;
      return this.unCod;
  }




}
