
export class LogSys {

   public idEta    : number;
   public lgName   : string;
   public idEtaDes : number;
   public lgDes    : string;
   public lgDes1   : string;


   constructor(xid: number , xlgName: string , xidEtaDes: number , xlgDes: string , xlgDes1 : string){
      this.idEta    = xid;
      this.lgName   = xlgName;
      this.idEtaDes = xidEtaDes;
      this.lgDes    = xlgDes;
      this.lgDes1   = xlgDes1;
   }

   public setName(name :string){
      this.lgName = name;
   }

  }
