
export class Producto {

    public  idPrd    :number;
    public prdDes    :string;
 

    constructor(xid :number , xprdDes: string  ) {
        this.idPrd       = xid;
        this.prdDes   = xprdDes;
      
    }

    getPrdDes () {
        return this.prdDes;
    }
 
    getId () {
        return this.idPrd;
    }

    setId (xid:number) : number {
        this.idPrd = xid;
        return this.idPrd;
    }

    setPrdDes (xprdDes:string) : string {
        this.prdDes = xprdDes;
        return this.prdDes;
    }

  
    
  }