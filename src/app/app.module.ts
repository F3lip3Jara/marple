import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
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



const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
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
    NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,
      useClass: InterceptorsErrorService,
      multi: true
     },
     CookieService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
