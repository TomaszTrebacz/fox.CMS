import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from '../account/account.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

const userRoutes: Routes = [
  {
    path: 'users',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'account',
        component: AccountComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
