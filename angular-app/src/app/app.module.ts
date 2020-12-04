import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BlogComponent } from './components/blog/blog/blog.component';
import { HomeComponent } from './components/home/home.component';
import { BlogModule } from './components/blog/blog/blog.module';
import { FooterComponent } from './components/footer/footer.component';

import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from './components/header/header.component';
import { PasswordModule } from 'primeng/password';

import { MenuModule } from 'primeng/menu';
import { AccordionModule } from 'primeng/accordion';
import { LoginComponent } from './components/users/login/login.component';
import { RegisterComponent } from './components/users/register/register.component';
import { UsersModule } from './components/users/users.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { AccountComponent } from './components/users/account/account.component';
import { FielderrorsComponent } from './shared/fielderrors/fielderrors.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AdminModule } from './components/admin/admin.module';
import { WorkboardComponent } from './components/admin/workboard/workboard.component';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { InputMaskModule } from 'primeng/inputmask';
import { MessageService } from 'primeng/api';
import { ConfirmAccountComponent } from './components/users/confirm-account/confirm-account.component';
import { ResendConfirmLinkComponent } from './components/users/confirm-account/resend-confirm-link/resend-confirm-link.component';
import { ResetPasswordComponent } from './components/users/reset-password/reset-password.component';
import { ConfirmationCodeComponent } from './components/users/reset-password/by-phone/confirmation-code/confirmation-code.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressBarComponent } from './shared/progress-bar/progress-bar.component';
import { ProgressBarService } from './services/progress-bar/progress-bar.service';
import { ProgressBarInterceptor } from './interceptors/progress-bar.interceptor';
import { ByPhoneComponent } from './components/users/reset-password/by-phone/by-phone.component';
import { ByEmailComponent } from './components/users/reset-password/by-email/by-email.component';
import { ChangePassComponent } from './components/users/reset-password/by-email/change-pass/change-pass.component';
import { ChangePasswordComponent } from './components/users/change-password/change-password.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    GraphQLModule,
    MessageModule,
    MessagesModule,
    HttpClientModule,
    BlogModule,
    UsersModule,
    MenuModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    AccordionModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    PanelModule,
    JwtModule,
    AdminModule,
    ToastModule,
    InputMaskModule,
    ProgressSpinnerModule,
    ProgressBarModule,
  ],
  providers: [
    MessageService,
    ProgressBarService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ProgressBarInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
