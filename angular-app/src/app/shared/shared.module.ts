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
import { InputMaskModule } from 'primeng/inputmask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressBarModule } from 'primeng/progressbar';
import { FielderrorsComponent } from './fielderrors/fielderrors.component';
import { DisplayPostsComponent } from './display-posts/display-posts.component';
import { CardModule } from 'primeng/card';

@NgModule({
  declarations: [FielderrorsComponent, DisplayPostsComponent],
  imports: [
    CommonModule,
    MessageModule,
    BrowserAnimationsModule,
    MessagesModule,
    PanelModule,
    InputTextModule,
    ButtonModule,
    AccordionModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    InputMaskModule,
    ProgressSpinnerModule,
    ProgressBarModule,
    CardModule,
  ],
  exports: [
    FielderrorsComponent,
    MessageModule,
    MessagesModule,
    InputTextModule,
    BrowserAnimationsModule,
    ButtonModule,
    AccordionModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    InputMaskModule,
    ProgressSpinnerModule,
    ProgressBarModule,
    CardModule,
    PanelModule,
    DisplayPostsComponent,
  ],
})
export class SharedModule {}
