import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
//import { PagesComponent } from './pages/pages.component';
import { MaterialModule } from '../material/material.module';


import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterComponent } from './pages/register-page/register.component';
import { LayoutPageComponent } from '../heroes/pages/layout-page/layout-page.component';
import { LayoutAuthPagesComponent } from './pages/layout-auth-pages/layout-auth-pages/layout-auth-pages.component';



@NgModule({
  declarations: [
    //PagesComponent,
    LayoutPageComponent,
    LoginPageComponent,
    RegisterComponent,
    LayoutAuthPagesComponent
      ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
  ]
})
export class AuthModule { }
