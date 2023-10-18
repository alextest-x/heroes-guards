import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutAuthPagesComponent } from './pages/layout-auth-pages/layout-auth-pages/layout-auth-pages.component';
import { RegisterComponent } from './pages/register-page/register.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';

const routes: Routes = [

  {
    path: '',
    component:  LayoutAuthPagesComponent,
    children: [
      { path: 'login',       component: LoginPageComponent},
      { path: 'new-account', component: RegisterComponent },
      { path: '**',         redirectTo: 'login' },

          ]
  },
];








@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [RouterModule ],
  declarations: [],
  providers: [],
})
export class AuthRoutingModule { }
