import { Grupo } from './grupo.model';


export class SubGrupo extends Grupo{

  public  idSubGrp   :number;
  public  grpsDes    :string;
  public  grpsCod    :string;


  constructor(xid :number , xgrpsDes: string , xgrpsCod : string  , xidGrp :number , xgrpDes: string , xgrpCod : string) {
     super(xidGrp , xgrpDes, xgrpCod);
     this.idSubGrp       = xid;
     this.grpsDes      = xgrpsDes;
     this.grpsCod      = xgrpsCod;

  }


  getidSubGrp () {
      return this.idSubGrp;
  }

  setidSubGrp (xid:number) : number {
      this.idSubGrp = xid;
      return this.idSubGrp;
  }

  getgrpsDes () {
    return this.grpsDes;
}


  setgrpsDes (xgrpsDes:string) : string {
      this.grpsDes = xgrpsDes;
      return this.grpsDes;
  }

  getgrpsCod () {
    return this.grpsCod;
}


  setgrpsCod (xgrpsCod:string) : string {
      this.grpsCod = xgrpsCod;
      return this.grpsCod;
  }




}
