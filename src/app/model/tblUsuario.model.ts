
export class tblUsuario {

  constructor(
    public id         :  number,
    public name       : string,
    public email      : string,
    public rol        : string,
    public emploNom   : string,
    public emploApe   : string,
    public emploFecNac: string,
    public created_at : string,
    public reinicio   : string,
    public activado   : string,
    public gerencia   : string){

    }

	public getId() : number{
  return this.id;
}

	public  setId(id : number) {
  this.id = id;
}

	public getName() {
  return this.name;
}

	public  setName(name : string) {
  this.name = name;
}

	public getEmail() : string {
  return this.email;
}

	public  setEmail(email : string) {
  this.email = email;
}

	public getRol() : string{
  return this.rol;
}

	public  setRol(rolDes : string) {
  this.rol = rolDes;
}

public getGerencia() : string{
  return this.gerencia;
}

	public  setGerencia(gerencia : string) {
  this.gerencia = gerencia;
}

	public getEmploNom() : string{
  return this.emploNom;
}

	public  setEmploNom(emploNom : string) {
  this.emploNom = emploNom;
}

	public getEmploApe() : string{
  return this.emploApe;
}

	public  setEmploApe(emploApe : string) {
  this.emploApe = emploApe;
}

	public getEmploFecNac() : string {
  return this.emploFecNac;
}

	public  setEmploFecNac(emploFecNac : string) {
  this.emploFecNac = emploFecNac;
}

	public getCreated_at() : string{
  return this.created_at;
}

	public  setCreated_at(created_at : string) {
  this.created_at = created_at;
}

	public getReinicio() : string{
  return this.reinicio;
}

	public  setReinicio(reinicio : string) {
  this.reinicio = reinicio;
}

	public getActivado() : string{
  return this.activado;
}

	public  setActivado(activado : string) {
  this.activado = activado;
}






}
