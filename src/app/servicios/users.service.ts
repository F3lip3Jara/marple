import { Injectable } from "@angular/core";
import { HttpClient , HttpHeaders, HttpParams  } from "@angular/common/http";
import { Observable } from "rxjs";
import { Usuario } from "../model/usuario.model";
import {CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: "root"
})
export class UsersService {

  constructor(private http: HttpClient , private cookies: CookieService ) {}

  login(user: Usuario): Observable<any> {
     const headers = { 'Content-Type': 'application/json' };
    return this.http.post('log', user, { headers });
  }

  setToken(token: string) {
    this.cookies.set("token", token);
  }
  getToken() : string{
    return this.cookies.get("token");
  }
}
