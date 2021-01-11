import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account/account.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { ChangePhoneComponent } from './change-phone/change-phone.component';
import { ChangePhoneTokenComponent } from './change-phone-token/change-phone-token.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    AccountComponent,
    ChangePasswordComponent,
    EditAccountComponent,
    ChangePhoneComponent,
    ChangePhoneTokenComponent,
  ],
  imports: [CommonModule, AccountRoutingModule, SharedModule],
  exports: [
    AccountComponent,
    ChangePasswordComponent,
    EditAccountComponent,
    ChangePhoneComponent,
    ChangePhoneTokenComponent,
  ],
})
export class AccountModule {}
