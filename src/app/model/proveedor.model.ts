export class Proveedor {

  public idPrv    : number;
  public prvRut   : string;
  public prvNom   : string;
  public prvNom2  : string;
  public prvGiro  : string;
  public prvDir   : string;
  public prvNum   : string;
  public idPai    : number;
  public idReg    : number;
  public idCom    : number;
  public idCiu    : number;
  public prvMail  : string;
  public prvTel   : string;
  public prvCli   : any;
  public prvPrv   : any;
  public prvAct   : any;

  constructor(
     idPrv     : number,
     prvRut   : string,
     prvNom   : string,
     prvNom2  : string,
     prvGiro  : string,
     prvDir   : string,
     prvNum   : string,
     idPai    : number,
     idReg    : number,
     idCom    : number,
     idCiu    : number,
     prvMail  : string,
     prvTel   : string,
     prvCli   : any,
     prvPrv   : any,
     prvAct   : any

  ){

    this.prvRut  = prvRut;
    this.prvNom  = prvNom;
    this.prvNom2 = prvNom2;
    this.prvGiro = prvGiro;
    this.prvDir  = prvDir;
    this.prvNum  = prvNum;
    this.idPai   = idPai;
    this.idReg   = idReg;
    this.idCom   = idCom;
    this.idCiu   = idCiu;
    this.prvMail = prvMail;
    this.prvTel  = prvTel;
    this.prvCli  = prvCli;
    this.prvPrv  = prvPrv;
    this.idPrv   = idPrv;
    this.prvAct  = prvAct;
  }

  public getidPrv() {
    return this.idPrv;
  }

  public  setidPrv(idPrv : number) {
    this.idPrv = idPrv;
  }


  public getPrvRut() {
    return this.prvRut;
  }

  public  setPrvRut(prvRut : string) {
    this.prvRut = prvRut;
  }

  public getPrvNom() {
    return this.prvNom;
  }

  public  setPrvNom(prvNom  : string) {
    this.prvNom = prvNom;
  }

  public getPrvNom2() {
    return this.prvNom2;
  }

  public  setPrvNom2(prvNom2 : string) {
    this.prvNom2 = prvNom2;
  }

  public getPrvGiro() {
    return this.prvGiro;
  }

  public  setPrvGiro(prvGiro  : string) {
    this.prvGiro = prvGiro;
  }

  public getPrvDir() {
    return this.prvDir;
  }

  public  setPrvDir(prvDir  : string) {
    this.prvDir = prvDir;
  }

  public getPrvNum() {
    return this.prvNum;
  }

  public  setPrvNum(prvNum  : string) {
    this.prvNum = prvNum;
  }

  public getIdPai() {
    return this.idPai;
  }

  public  setIdPai(idPai : number) {
    this.idPai = idPai;
  }

  public getIdReg() {
    return this.idReg;
  }

  public  setIdReg(idReg : number) {
    this.idReg = idReg;
  }

  public getIdCom() {
    return this.idCom;
  }

  public  setIdCom(idCom : number) {
    this.idCom = idCom;
  }

  public getIdCiu() {
    return this.idCiu;
  }

  public  setIdCiu(idCiu  : number) {
    this.idCiu = idCiu;
  }

  public getPrvMail() {
    return this.prvMail;
  }

  public  setPrvMail(prvMail : string) {
    this.prvMail = prvMail;
  }

  public getPrvTel() {
    return this.prvTel;
  }

  public  setPrvTel(prvTel : string) {
    this.prvTel = prvTel;
  }

  public getPrvCli() {
    return this.prvCli;
  }

  public  setPrvCli(prvCli : any) {
    this.prvCli = prvCli;
  }

  public getPrvPrv() {
    return this.prvPrv;
  }

  public  setPrvPrv(prvPrv : any) {
    this.prvPrv = prvPrv;
  }

  public getPrvAct() {
    return this.prvAct;
  }

  public  setPrvAct(prvAct : any) {
    this.prvAct = prvAct;
  }




}
