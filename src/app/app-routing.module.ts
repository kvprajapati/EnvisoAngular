import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
 
import { AuthGuard } from './auth/auth.guard';
import { CustomerComponent } from './customer/customer.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  {path:'',redirectTo:'/user/registration',pathMatch:"full"},
  {
    path:"user",component:UserComponent,
    children:[
      {
        path:'registration',component:RegistrationComponent
      },
      {
        path:'login',component:LoginComponent
      }
    ]
  },
  {path:'home', component:CustomerComponent, canActivate:[AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
