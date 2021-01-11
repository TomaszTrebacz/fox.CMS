import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';
import { ResendConfirmLinkComponent } from './confirm-account/resend-confirm-link/resend-confirm-link.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ConfirmationCodeComponent } from './reset-password/by-phone/confirmation-code/confirmation-code.component';
import { ByPhoneComponent } from './reset-password/by-phone/by-phone.component';
import { ByEmailComponent } from './reset-password/by-email/by-email.component';
import { ChangePassComponent } from './reset-password/by-email/change-pass/change-pass.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ConfirmAccountComponent,
    ResendConfirmLinkComponent,
    ResetPasswordComponent,
    ConfirmationCodeComponent,
    ByPhoneComponent,
    ByEmailComponent,
    ChangePassComponent,
    ProfileComponent,
  ],
  imports: [CommonModule, UsersRoutingModule, SharedModule],
  exports: [
    LoginComponent,
    RegisterComponent,
    ConfirmAccountComponent,
    ResendConfirmLinkComponent,
    ResetPasswordComponent,
    ConfirmationCodeComponent,
    ByPhoneComponent,
    ByEmailComponent,
    ChangePassComponent,
  ],
})
export class UsersModule {}
