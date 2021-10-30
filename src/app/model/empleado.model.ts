export class Empleado {

  private emploNom    : string;
  private emploApe    : string;
  private emploAvatar : string;
  private empid       : number;
  private emploFecNac : string;
  private idRol       : number;
  private gerId       : number;
  private empName     : string;

    constructor (emploNomx: string, emploApex: string, emploAvatarx: string, empidx: number,  emploFecNacx : string , idRolx : number  , idGerx:number , empNamex : string){
      this.emploNom    = emploNomx;
      this.emploApe    = emploApex;
      this.emploAvatar = emploAvatarx;
      this.empid       = empidx;
      this.emploFecNac = emploFecNacx;
      this.idRol       = idRolx;
      this.gerId       = idGerx;
      this.empName     = empNamex;
    }

    public getIdRol () : number {
       return this.idRol;
    }

    public setIdRol (idRolx : number){
      this.idRol = idRolx;
    }

    public getGerId () : number {
      return this.gerId;
   }

   public setGerId (gerIdx : number){
     this.gerId = gerIdx;
   }

    public getEmploNom () :string {
      return this.emploNom;
    }

    public setEmplonom (emploNom : string) {
      this.emploNom = emploNom;
    }
    public getEmpName () :string {
      return this.empName;
    }

    public setEmpName (empNamex : string) {
      this.empName = empNamex;
    }

    public getEmploApe() :string {
      return this.emploApe;
    }

    public  setEmploApe(emploApe : string) {
      this.emploApe = emploApe;
    }

    public getEmploAvatar() :string {
      return this.emploAvatar;
    }

    public  setEmploAvatar (emploAvatar:string) {
    this.emploAvatar= emploAvatar ;
  }

    public getEmpid () :number{
    return this.empid;
  }

    public  setEmpid(empid : number) {
    this.empid = empid ;
  }

    public geEmploFecNac () : string {
    return this.emploFecNac ;
  }

    public  setEmploFecNac (emploFecNac: string) {
    this.emploFecNac = emploFecNac ;
  }


}
