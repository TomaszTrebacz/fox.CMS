import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogComponent } from './modules/blog/blog/blog.component';
import { HomeComponent } from './modules/home/home.component';
import { BlogModule } from './modules/blog/blog/blog.module';
import { FooterComponent } from './modules/footer/footer.component';
import { HeaderComponent } from './modules/header/header.component';
import { LoginComponent } from './modules/users/login/login.component';
import { RegisterComponent } from './modules/users/register/register.component';
import { UsersModule } from './modules/users/users.module';
import { AccountComponent } from './modules/users/account/account.component';
import { FielderrorsComponent } from './shared/fielderrors/fielderrors.component';
import { AdminModule } from './modules/admin/admin.module';
import { WorkboardComponent } from './modules/admin/workboard/workboard.component';
import { ConfirmAccountComponent } from './modules/users/confirm-account/confirm-account.component';
import { ResendConfirmLinkComponent } from './modules/users/confirm-account/resend-confirm-link/resend-confirm-link.component';
import { ResetPasswordComponent } from './modules/users/reset-password/reset-password.component';
import { ConfirmationCodeComponent } from './modules/users/reset-password/by-phone/confirmation-code/confirmation-code.component';
import { ProgressBarComponent } from './core/progress-bar/progress-bar.component';
import { ByPhoneComponent } from './modules/users/reset-password/by-phone/by-phone.component';
import { ByEmailComponent } from './modules/users/reset-password/by-email/by-email.component';
import { ChangePassComponent } from './modules/users/reset-password/by-email/change-pass/change-pass.component';
import { ChangePasswordComponent } from './modules/users/change-password/change-password.component';
import { EditAccountComponent } from './modules/users/edit-account/edit-account.component';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { ChangePhoneComponent } from './modules/users/change-phone/change-phone.component';
import { ChangePhoneTokenComponent } from './modules/users/change-phone/change-phone-token/change-phone-token.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BlogComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AccountComponent,
    FielderrorsComponent,
    WorkboardComponent,
    ConfirmAccountComponent,
    ResendConfirmLinkComponent,
    ResetPasswordComponent,
    ConfirmationCodeComponent,
    ProgressBarComponent,
    ByPhoneComponent,
    ByEmailComponent,
    ChangePassComponent,
    ChangePasswordComponent,
    EditAccountComponent,
    ChangePhoneComponent,
    ChangePhoneTokenComponent
  ],
  imports: [
    AppRoutingModule,
    CoreModule,
    SharedModule,
    BlogModule,
    UsersModule,
    AdminModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
