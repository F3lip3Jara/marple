
export class Usuario {

    public  id      : number;
    public nombre   : string;
    public password : string ;
    public token    : string ;
    public email    : string ;
    public remember : string ;

    constructor(xid :number , xnombre : string  , xpassword: string , xtoken:string , xemail : string ) {
        this.id       = xid;
        this.nombre   = xnombre;
        this.password = xpassword;
        this.token    = xtoken;
        this.email    = xemail;
        this.remember = 'S';
    }

    getEmail () {
        return this.email;
    }

    getPassword(){
        return this.password;
    }

    getNombre () {
        return this.nombre;
    }

    getToken() {
        return this.token
    }

    getInt () {
        return this.id;
    }

    setId (xid:number) {
        this.id = xid;

    }

    setNombre (xnombre:string)  {
        this.nombre = xnombre;
        return this.nombre;
    }

    setPassword (xpassword:string)  {
        this.password = xpassword;

    }

    setToken (xtoken :string)  {
        this.token = xtoken;
    }

  }
