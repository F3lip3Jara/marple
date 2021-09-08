export class Roles {

  public  idRol    :number;
  public  rolDes    :string;


  constructor(xid :number , xprdDes: string  ) {
      this.idRol       = xid;
      this.rolDes   = xprdDes;

  }

  getRolDes () {
      return this.rolDes;
  }

  getId () {
      return this.idRol;
  }

  setId (xid:number) : number {
      this.idRol = xid;
      return this.idRol;
  }

  setRolDes (xrolDes:string) : string {
      this.rolDes = xrolDes;
      return this.rolDes;
  }



}
