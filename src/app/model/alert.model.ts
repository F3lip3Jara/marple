export class Alert {

    private type: string;
    private message: string;


   constructor(  typex : string ,  messagex : string ){

     this.type = typex;
     this.message = messagex;
   }


   setMessage(messagex : string ){
      this.message = messagex;
   }

   getMessage():string{
        return this.message;
   }

   getType():string{
    return this.type;
    }

    setType(typex : string){
     this.type = typex;
    }
 }
