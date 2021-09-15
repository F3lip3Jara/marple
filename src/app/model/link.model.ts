export class Links {
        constructor(private link : string ){
        }

        getLink() {
            return this.link;
        }

        setLink( xlink : string ):string{
            this.link = xlink;
            return this.link;
        }
}
