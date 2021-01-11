import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResendConfirmLinkComponent } from './confirm-account/resend-confirm-link/resend-confirm-link.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePassComponent } from './reset-password/by-email/change-pass/change-pass.component';
import { ProfileComponent } from './profile/profile.component';
import { ConfirmationCodeComponent } from './reset-password/by-phone/confirmation-code/confirmation-code.component';

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
        path: 'reset-password',
        children: [
          {
            path: '',
            component: ResetPasswordComponent,
          },
          {
            path: 'code',
            component: ConfirmationCodeComponent,
          },
          {
            path: 'changePass',
            component: ChangePassComponent,
          },
        ],
      },
      {
        path: 'profile/:id',
        component: ProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
