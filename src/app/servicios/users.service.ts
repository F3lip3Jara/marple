import { TrabBincorComponent } from './../home/parametros/trab-bincor/trab-bincor.component';
import { InsExtursionComponent } from './../home/produccion/trab-extursion/ins-extursion/ins-extursion.component';
import { TrabExtursionComponent } from './../home/produccion/trab-extursion/trab-extursion.component';
import { InsMezclaComponent } from './../home/produccion/trab-mezcla/ins-mezcla/ins-mezcla.component';
import { TrabMezclaComponent } from './../home/produccion/trab-mezcla/trab-mezcla.component';
import { TrabCalendarioJulComponent } from './../home/parametros/trab-calendario-jul/trab-calendario-jul.component';
import { UpUserComponent } from './../home/seguridad/trab-user/up-user/up-user.component';
import { TrabMaquinasComponent } from './../home/parametros/trab-maquinas/trab-maquinas.component';
import { TrabEtapaDetalleComponent } from './../home/parametros/trab-etapa-detalle/trab-etapa-detalle.component';
import { TrabOrdenTrabajoComponent } from './../home/produccion/trab-orden-trabajo/trab-orden-trabajo.component';
import { UpProductosComponent } from './../home/parametros/trab-productos/up-productos/up-productos.component';
import { InsOrdenProduccionComponent } from './../home/produccion/trab-orden-produccion/ins-orden-produccion/ins-orden-produccion.component';
import { TrabOrdenProduccionComponent } from './../home/produccion/trab-orden-produccion/trab-orden-produccion.component';
import { InsProductosComponent } from './../home/parametros/trab-productos/ins-productos/ins-productos.component';
import { TrabProductosComponent } from './../home/parametros/trab-productos/trab-productos.component';
import { TrabSubGrupoComponent } from './../home/parametros/trab-sub-grupo/trab-sub-grupo.component';
import { TrabGrupoComponent } from './../home/parametros/trab-grupo/trab-grupo.component';
import { TrabUnidadMedidaComponent } from './../home/parametros/trab-unidad-medida/trab-unidad-medida.component';
import { TrabColorComponent } from './../home/parametros/trab-color/trab-color.component';
import { TrabMonedasComponent } from './../home/parametros/trab-monedas/trab-monedas.component';
import { UpProveedorComponent } from './../home/parametros/trab-proveedores/up-proveedor/up-proveedor.component';
import { InsProveedoresComponent } from './../home/parametros/trab-proveedores/ins-proveedores/ins-proveedores.component';
import { TrabProveedoresComponent } from './../home/parametros/trab-proveedores/trab-proveedores.component';
import { TrabCiudadComponent } from './../home/parametros/trab-ciudad/trab-ciudad.component';
import { TrabComunaComponent } from './../home/parametros/trab-comuna/trab-comuna.component';
import { TrabRegionComponent } from './../home/parametros/trab-region/trab-region.component';
import { TrabPaisComponent } from './../home/parametros/trab-pais/trab-pais.component';
import { TrabEtapasComponent } from './../home/parametros/trab-etapas/trab-etapas.component';
import { TrabEmpresaComponent } from './../home/parametros/trab-empresa/trab-empresa.component';
import { TrabGerenciaComponent } from './../home/parametros/trab-gerencia/trab-gerencia.component';
import { TrabRolesComponent } from './../home/seguridad/trab-roles/trab-roles.component';
import { InsUserComponent } from './../home/seguridad/trab-user/ins-user/ins-user.component';
import { TrabUserComponent } from './../home/seguridad/trab-user/trab-user.component';
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

  eliminarToken () {
    this.cookies.delete("token");

  }

  getComponent(link : any) : any{

    let miComponent : any ;

    switch (link) {
      case 'users':
        miComponent = TrabUserComponent;
        break;
      case 'insUsuario':
        miComponent = InsUserComponent;
        break;
      case 'roles':
        miComponent = TrabRolesComponent;
        break;
      case 'gerencia':
        miComponent = TrabGerenciaComponent;
        break;
      case 'empresa':
        miComponent = TrabEmpresaComponent;
        break;
      case 'etapas':
        miComponent = TrabEtapasComponent;
        break;
      case 'pais':
        miComponent = TrabPaisComponent;
        break;
      case 'regiones':
        miComponent = TrabRegionComponent;
        break;
      case 'comuna':
        miComponent = TrabComunaComponent;
        break;
      case 'ciudad':
        miComponent = TrabCiudadComponent;
        break;
      case 'proveedor':
        miComponent = TrabProveedoresComponent;
        break;
      case 'insProveedor':
        miComponent = InsProveedoresComponent;
        break;
      case 'upProveedor':
        miComponent = UpProveedorComponent;
        break;
      case 'moneda':
        miComponent = TrabMonedasComponent;
        break;
      case 'color':
        miComponent = TrabColorComponent;
        break;
      case 'unidad':
        miComponent = TrabUnidadMedidaComponent;
        break;
      case 'grupo':
        miComponent = TrabGrupoComponent;
        break;
      case 'subgrupo':
        miComponent = TrabSubGrupoComponent;
        break;
      case 'productos':
        miComponent = TrabProductosComponent;
        break;
      case 'insProducto':
        miComponent = InsProductosComponent;
        break;
      case 'op':
        miComponent = TrabOrdenProduccionComponent;
        break;
      case 'insOp':
        miComponent = InsOrdenProduccionComponent;
        break;
      case 'upProducto':
        miComponent = UpProductosComponent;
        break;
      case 'ot':
        miComponent = TrabOrdenTrabajoComponent;
        break;
      case 'insEtapasDet':
        miComponent = TrabEtapaDetalleComponent;
        break;
      case 'maquinas':
        miComponent = TrabMaquinasComponent;
        break;
      case 'UpdUser':
        miComponent = UpUserComponent;
        break;
      case 'calJul':
        miComponent = TrabCalendarioJulComponent;
        break;
      case 'mezcla':
        miComponent = TrabMezclaComponent;
        break;
      case 'insMezcla':
        miComponent = InsMezclaComponent;
        break;
      case 'extursion':
        miComponent = TrabExtursionComponent;
        break;
      case 'insExtur':
        miComponent = InsExtursionComponent;
        break;
      case 'binCol':
        miComponent = TrabBincorComponent;
        break;
    }

    return miComponent;
  }

}
