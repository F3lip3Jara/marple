import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {MenuLateralComponent} from './home/menu-lateral/menu-lateral.component';
import { ProductosComponent } from './home/parametros/productos/productos.component';
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
    ProductosComponent,
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
