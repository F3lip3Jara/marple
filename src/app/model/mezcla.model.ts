
export class Mezcla {

    public mezTurn   : number;
    public mezMaq    : string;
    public mezTip    : string;
    public mezLotSal : string;
    public mezProd   : any [];
    public etapa     : any [];
    public mezKil    : number;
    public producto  : any;

   constructor(  mezTurn : number ,  mezMaq : string  ,  mezTip : string , mezProd :  any[] , mezLotSal : string , etapa : any [] , mezKil : number , producto : any){

     this.mezTurn   = mezTurn;
     this.mezMaq    = mezMaq;
     this.mezTip    = mezTip;
     this.mezProd   = mezProd;
     this.mezLotSal = mezLotSal;
     this.etapa     = etapa;
     this.mezKil    = mezKil;
     this.producto  = producto;
   }

   setEta(etapa : any){
    this.etapa = etapa;
   }

   setmezdKil(mezKil : number){
    this.mezKil = mezKil;
   }

   setProducto(producto : any){
     this.producto = producto;
   }

 }
