import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PasswordModule } from 'primeng/password';

import { UsersRoutingModule } from './users-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';
import { ResendConfirmLinkComponent } from './confirm-account/resend-confirm-link/resend-confirm-link.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ConfirmationCodeComponent } from './reset-password/by-phone/confirmation-code/confirmation-code.component';
import { ByPhoneComponent } from './reset-password/by-phone/by-phone.component';
import { ByEmailComponent } from './reset-password/by-email/by-email.component';
import { ChangePassComponent } from './reset-password/by-email/change-pass/change-pass.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { ChangePhoneComponent } from './change-phone/change-phone.component';
import { ChangePhoneTokenComponent } from './change-phone/change-phone-token/change-phone-token.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    ConfirmAccountComponent,
    ResendConfirmLinkComponent,
    ResetPasswordComponent,
    ConfirmationCodeComponent,
    ByPhoneComponent,
    ByEmailComponent,
    ChangePassComponent,
    ChangePasswordComponent,
    EditAccountComponent,
    ChangePhoneComponent,
    ChangePhoneTokenComponent,
  ],
  imports: [CommonModule, UsersRoutingModule, SharedModule],
  exports: [
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    ConfirmAccountComponent,
    ResendConfirmLinkComponent,
    ResetPasswordComponent,
    ConfirmationCodeComponent,
    ByPhoneComponent,
    ByEmailComponent,
    ChangePassComponent,
    ChangePasswordComponent,
    EditAccountComponent,
    ChangePhoneComponent,
    ChangePhoneTokenComponent,
  ],
})
export class UsersModule {}
