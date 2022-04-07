
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {MenuLateralComponent} from './home/menu-lateral/menu-lateral.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule , ReactiveFormsModule   } from '@angular/forms';
import { InterceptorsErrorService } from './interceptors/interceptors-error.service';
import { DataTablesModule } from "angular-datatables";
import { CookieService } from 'ngx-cookie-service';
import { ReceptorDirective } from './receptor.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertsComponent } from './home/alerts/alerts.component';
import { TrabUserComponent } from './home/seguridad/trab-user/trab-user.component';
import { TrabRolesComponent } from './home/seguridad/trab-roles/trab-roles.component';
import { TrabEtapasComponent } from './home/parametros/trab-etapas/trab-etapas.component';
import { InsUserComponent } from './home/seguridad/trab-user/ins-user/ins-user.component';
import { InfoUsuarioComponent } from './home/menu-lateral/info-usuario/info-usuario.component';
import { CambioPasswordComponent } from './login/cambio-password/cambio-password.component';
import { TrabGerenciaComponent } from './home/parametros/trab-gerencia/trab-gerencia.component';
import { TrabEmpresaComponent } from './home/parametros/trab-empresa/trab-empresa.component';
import { TrabPaisComponent } from './home/parametros/trab-pais/trab-pais.component';
import { TrabRegionComponent } from './home/parametros/trab-region/trab-region.component';
import { TrabComunaComponent } from './home/parametros/trab-comuna/trab-comuna.component';
import { TrabCiudadComponent } from './home/parametros/trab-ciudad/trab-ciudad.component';
import { TrabProveedoresComponent } from './home/parametros/trab-proveedores/trab-proveedores.component';
import { InsProveedoresComponent } from './home/parametros/trab-proveedores/ins-proveedores/ins-proveedores.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { UpProveedorComponent } from './home/parametros/trab-proveedores/up-proveedor/up-proveedor.component';
import { VerProveedorComponent } from './home/parametros/trab-proveedores/ver-proveedor/ver-proveedor.component';
import { UpDesProveeedorComponent } from './home/parametros/trab-proveedores/up-proveedor/up-des-proveeedor/up-des-proveeedor.component';
import { TrabMonedasComponent } from './home/parametros/trab-monedas/trab-monedas.component';
import { TrabColorComponent } from './home/parametros/trab-color/trab-color.component';
import { TrabUnidadMedidaComponent } from './home/parametros/trab-unidad-medida/trab-unidad-medida.component';
import { TrabGrupoComponent } from './home/parametros/trab-grupo/trab-grupo.component';
import { TrabSubGrupoComponent } from './home/parametros/trab-sub-grupo/trab-sub-grupo.component';
import { TrabProductosComponent } from './home/parametros/trab-productos/trab-productos.component';
import { InsProductosComponent } from './home/parametros/trab-productos/ins-productos/ins-productos.component';
import { TrabOrdenProduccionComponent } from './home/produccion/trab-orden-produccion/trab-orden-produccion.component';
import { InsOrdenProduccionComponent } from './home/produccion/trab-orden-produccion/ins-orden-produccion/ins-orden-produccion.component';
import { UpProductosComponent } from './home/parametros/trab-productos/up-productos/up-productos.component';
import { TrabOrdenTrabajoComponent } from './home/produccion/trab-orden-trabajo/trab-orden-trabajo.component';
import { InsOrdTrabajoComponent } from './home/produccion/trab-orden-trabajo/ins-ord-trabajo/ins-ord-trabajo.component';
import { TrabEtapaDetalleComponent } from './home/parametros/trab-etapa-detalle/trab-etapa-detalle.component';
import { TrabMaquinasComponent } from './home/parametros/trab-maquinas/trab-maquinas.component';
import { UpUserComponent } from './home/seguridad/trab-user/up-user/up-user.component';
import { TrabCalendarioJulComponent } from './home/parametros/trab-calendario-jul/trab-calendario-jul.component';
import { TrabMezclaComponent } from './home/produccion/trab-mezcla/trab-mezcla.component';
import { InsMezclaComponent } from './home/produccion/trab-mezcla/ins-mezcla/ins-mezcla.component';
import { SelProductoComponent } from './home/selector/sel-producto/sel-producto.component';
import { TrabExtursionComponent } from './home/produccion/trab-extursion/trab-extursion.component';
import { InsExtursionComponent } from './home/produccion/trab-extursion/ins-extursion/ins-extursion.component';
import { TrabLogComponent } from './home/seguridad/trab-log/trab-log.component';
import { TrabBincorComponent } from './home/parametros/trab-bincor/trab-bincor.component';



const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'changePassword', component: CambioPasswordComponent },
  { path: 'home/:proveedor' , component: HomeComponent },
  { path: '*', redirectTo: 'login', pathMatch: 'full'  }

];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuLateralComponent,
    ReceptorDirective,
    AlertsComponent,
    TrabUserComponent,
    TrabRolesComponent,
    TrabEtapasComponent,
    InsUserComponent,
    InfoUsuarioComponent,
    CambioPasswordComponent,
    TrabGerenciaComponent,
    TrabEmpresaComponent,
    TrabPaisComponent,
    TrabRegionComponent,
    TrabComunaComponent,
    TrabCiudadComponent,
    TrabProveedoresComponent,
    InsProveedoresComponent,
    UpProveedorComponent,
    VerProveedorComponent,
    UpDesProveeedorComponent,
    TrabMonedasComponent,
    TrabColorComponent,
    TrabUnidadMedidaComponent,
    TrabGrupoComponent,
    TrabSubGrupoComponent,
    TrabProductosComponent,
    InsProductosComponent,
    TrabOrdenProduccionComponent,
    InsOrdenProduccionComponent,
    UpProductosComponent,
    TrabOrdenTrabajoComponent,
    InsOrdTrabajoComponent,
    TrabEtapaDetalleComponent,
    TrabMaquinasComponent,
    UpUserComponent,
    TrabCalendarioJulComponent,
    TrabMezclaComponent,
    InsMezclaComponent,
    SelProductoComponent,
    TrabExtursionComponent,
    InsExtursionComponent,
    TrabLogComponent,
    TrabBincorComponent,

  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    CommonModule,
    HttpClientModule,
    DataTablesModule,
    NgbModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,
      useClass: InterceptorsErrorService,
      multi: true
     },
     CookieService,
     {
       provide: LocationStrategy,
       useClass: HashLocationStrategy
     }
    ],
  bootstrap: [AppComponent],

})
export class AppModule { }
