import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { PanelModule } from 'primeng/panel';
import { AdminModule } from '../modules/admin/admin.module';
import { ToastModule } from 'primeng/toast';
import { InputMaskModule } from 'primeng/inputmask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressBarModule } from 'primeng/progressbar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MessageModule,
    BrowserAnimationsModule,
    MessagesModule,
    PanelModule,
    MenuModule,
    MenubarModule,
    InputTextModule,
    ButtonModule,
    AccordionModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    PanelModule,
    ToastModule,
    InputMaskModule,
    ProgressSpinnerModule,
    ProgressBarModule
  ],
  exports: [
    MessageModule,
    MessagesModule,
    InputTextModule,
    MenuModule,
    MenubarModule,
    BrowserAnimationsModule,
    ButtonModule,
    AccordionModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    PanelModule,
    ToastModule,
    InputMaskModule,
    PanelModule,
    ProgressSpinnerModule,
    ProgressBarModule
  ]
})
export class SharedModule {}
