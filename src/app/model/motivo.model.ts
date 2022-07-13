export class Motivo {

  public  idMot     :number;
  public  motDes    :string;


  constructor(xid :number , motDes: string ) {
     this.idMot       = xid;
     this.motDes      = motDes;
  }


  getId () {
      return this.idMot;
  }

  setId (xid:number) : number {
      this.idMot = xid;
      return this.idMot;
  }

  getcolDes () {
    return this.motDes;
}


  setcolDes (motDes:string) : string {
      this.motDes = motDes;
      return this.motDes;
  }




}
