import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResendConfirmLinkComponent } from './confirm-account/resend-confirm-link/resend-confirm-link.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePassComponent } from './reset-password/by-email/change-pass/change-pass.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { AuthGuard } from 'src/app/core/guards';
import { ChangePhoneComponent } from './change-phone/change-phone.component';
import { ChangePhoneTokenComponent } from './change-phone/change-phone-token/change-phone-token.component';

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
          },
          {
            path: 'change-phone',
            children: [
              {
                path: '',
                component: ChangePhoneComponent
              },
              {
                path: 'token',
                component: ChangePhoneTokenComponent
              }
            ]
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
