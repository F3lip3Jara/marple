
export class Producto {

  public idPrd: number;
  public prdDes: string;
  public prdCod: string;
  public prdObs: string;
  public prdRap: string;
  public prdEan: number;
  public prdTip: string;
  public prdCost: any;
  public prdNet: any ;
  public prdBrut: any;
  public prdInv: string;
  public prdPes: number;
  public prdMin: number;
  public idGrp: number;
  public idSubGrp: number;
  public idCol: number;
  public idMon: number;
  public idUn : number;


 constructor( idPrd: number,
  prdDes: string,
  prdCod: string,
  prdObs: string,
  prdRap: string,
  prdEan: number,
  prdTip: string,
  prdCost: any,
  prdNet: any,
  prdBrut: any,
  prdInv: string,
  prdPes: number,
  prdMin: number,
  idGrp: number,
  idSubGrp: number,
  idCol: number,
  idMon: number,
  idUn: number){

    this.idPrd = idPrd ;
    this.prdDes = prdDes ;
    this.prdCod = prdCod;
    this.prdObs = prdObs;
    this.prdRap = prdRap ;
    this.prdEan = prdEan;
    this.prdTip = prdTip;
    this.prdCost =prdCost ;
    this.prdNet =prdNet ;
    this.prdBrut =prdBrut ;
    this.prdInv = prdInv;
    this.prdPes = prdPes;
    this.prdMin =prdMin ;
    this.idGrp =idGrp ;
    this.idSubGrp = idSubGrp;
    this.idCol = idCol;
    this.idMon = idMon;
    this.idUn  = idUn;

  }

  public getidPrd() {
    return this.idPrd;
  }

  public setidPrd(idPrd : number) {
    this.idPrd = idPrd ;
  }

  public  getprdDes() {
    return this.prdDes;
  }

  public  setprdDes(prdDes: string) {
    this.prdDes = prdDes ;
  }

  public  getprdCod(prdCod : string) {
    return this.prdCod;
  }

  public  setprdCod(prdCod : string) {
    this.prdCod = prdCod;
  }



  public  getprdObs() {
    return this.prdObs;
  }

  public  setprdObs(prdObs : string) {
    this.prdObs = prdObs;
  }

  public  getprdRap(prdRap : string) {
    return this.prdRap;
  }

  public  setprdRap(prdRap : string) {
    this.prdRap = prdRap ;
  }

  public  getprdEan() {
    return this.prdEan;
  }

  public  setprdEan(prdEan : number) {
    this.prdEan = prdEan;
  }

  public  getprdTip() {
    return this.prdTip;
  }

  public  setprdTip(prdTip : string) {
    this.prdTip = prdTip;
  }

  public  getprdCost() {
    return this.prdCost;
  }

  public  setprdCost(prdCost : any) {
    this.prdCost =prdCost ;
  }

  public  getprdNet() {
    return this.prdNet;
  }

  public  setprdNet(prdNet : any) {
    this.prdNet =prdNet ;
  }

  public  getprdBrut() {
    return this.prdBrut;
  }

  public  setprdBrut(prdBrut : any) {
    this.prdBrut =prdBrut ;
  }

  public  getprdInv() {
    return this.prdInv;
  }

  public  setprdInv(prdInv : string) {
    this.prdInv = prdInv;
  }

  public  getprdPes(prdPes : number) {
    return this.prdPes;
  }

  public  setprdPes(prdPes : number) {
    this.prdPes = prdPes;
  }

  public  getprdMin() {
    return this.prdMin;
  }

  public  setprdMin(prdMin : number) {
    this.prdMin =prdMin ;
  }

  public  getidGrp() {
    return this.idGrp;
  }

  public  setidGrp(idGrp : number) {
    this.idGrp =idGrp ;
  }

  public  getidSubGrp() {
    return this.idSubGrp;
  }

  public  setidSubGrp(idSubGrp : number) {
    this.idSubGrp = idSubGrp;
  }

  public  getidCol() {
    return this.idCol;
  }

  public  setidCol(idCol : number) {
    this.idCol = idCol;
  }

  public  getidMon() {
    return this.idMon;
  }

  public  setidMon(idMon : number) {
    this.idMon = idMon;
  }

  public  getidUn() {
    return this.idUn;
  }

  public  setidUn(idUn : number) {
    this.idUn = idUn;
  }




  }
