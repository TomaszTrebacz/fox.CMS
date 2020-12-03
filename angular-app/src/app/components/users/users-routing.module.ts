import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/helpers/auth.guard';
import { userRole } from 'src/app/models/userRole.interface';
import { AccountComponent } from './account/account.component';
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResendConfirmLinkComponent } from './resend-confirm-link/resend-confirm-link.component';

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
        path: 'confirm-account',
        component: ConfirmAccountComponent,
      },
      {
        path: 'resend-confirmLink',
        component: ResendConfirmLinkComponent,
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
