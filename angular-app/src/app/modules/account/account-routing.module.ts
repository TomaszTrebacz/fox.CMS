import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards';
import { AccountComponent } from './account/account.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangePhoneTokenComponent } from './change-phone-token/change-phone-token.component';
import { ChangePhoneComponent } from './change-phone/change-phone.component';
import { EditAccountComponent } from './edit-account/edit-account.component';

const accountRoutes: Routes = [
  {
    path: 'account',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: AccountComponent,
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
      },
      {
        path: 'edit-account',
        component: EditAccountComponent,
      },
      {
        path: 'change-phone',
        children: [
          {
            path: '',
            component: ChangePhoneComponent,
          },
          {
            path: 'token',
            component: ChangePhoneTokenComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(accountRoutes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
