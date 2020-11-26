import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/helpers/auth.guard';
import { userRole } from 'src/app/models/userRole.interface';
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
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
