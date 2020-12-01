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
import { UsersModule } from './components/users/users/users.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PanelModule } from 'primeng/panel';
import { AccountComponent } from './components/users/account/account.component';
import { FielderrorsComponent } from './shared/fielderrors/fielderrors.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AdminModule } from './components/admin/admin.module';
import { WorkboardComponent } from './components/admin/workboard/workboard.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    GraphQLModule,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
