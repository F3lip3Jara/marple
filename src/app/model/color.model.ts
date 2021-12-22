export class Color {

  public  idCol     :number;
  public  colDes    :string;
  public  colCod    :string;


  constructor(xid :number , xcolDes: string , xcolCod : string  ) {
     this.idCol       = xid;
     this.colDes      = xcolDes;
     this.colCod      = xcolCod;

  }


  getId () {
      return this.idCol;
  }

  setId (xid:number) : number {
      this.idCol = xid;
      return this.idCol;
  }

  getcolDes () {
    return this.colDes;
}


  setcolDes (xcolDes:string) : string {
      this.colDes = xcolDes;
      return this.colDes;
  }

  getcolCod () {
    return this.colCod;
}


  setcolCod (xcolCod:string) : string {
      this.colCod = xcolCod;
      return this.colCod;
  }




}
