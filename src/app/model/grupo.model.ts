export class Grupo {

  public  idGrp     :number;
  public  grpDes    :string;
  public  grpCod    :string;


  constructor(xid :number , xgrpDes: string , xgrpCod : string  ) {
     this.idGrp       = xid;
     this.grpDes      = xgrpDes;
     this.grpCod      = xgrpCod;

  }


  getId () {
      return this.idGrp;
  }

  setId (xid:number) : number {
      this.idGrp = xid;
      return this.idGrp;
  }

  getgrpDes () {
    return this.grpDes;
}


  setgrpDes (xgrpDes:string) : string {
      this.grpDes = xgrpDes;
      return this.grpDes;
  }

  getgrpCod () {
    return this.grpCod;
}


  setgrpCod (xgrpCod:string) : string {
      this.grpCod = xgrpCod;
      return this.grpCod;
  }




}
