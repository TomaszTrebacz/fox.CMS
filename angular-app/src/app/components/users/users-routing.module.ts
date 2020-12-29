import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/helpers/auth.guard';
import { userRole } from 'src/app/models/userRole.interface';
import { AccountComponent } from './account/account.component';
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResendConfirmLinkComponent } from './confirm-account/resend-confirm-link/resend-confirm-link.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePassComponent } from './reset-password/by-email/change-pass/change-pass.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditAccountComponent } from './edit-account/edit-account.component';

const userRoutes: Routes = [
  {
    path: 'users',
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'confirm-account',
        component: ConfirmAccountComponent
      },
      {
        path: 'resend-confirmLink',
        component: ResendConfirmLinkComponent
      },
      {
        path: 'reset-password',
        children: [
          {
            path: '',
            component: ResetPasswordComponent
          },
          {
            path: 'changePass',
            component: ChangePassComponent
          }
        ]
      },
      {
        path: 'account',
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: AccountComponent
          },
          {
            path: 'change-password',
            component: ChangePasswordComponent
          },
          {
            path: 'edit-account',
            component: EditAccountComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
