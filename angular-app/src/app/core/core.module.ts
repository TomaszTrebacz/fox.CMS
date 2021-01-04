import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { GraphQLModule } from './graphql/config/graphql.module';
import { ProgressBarService } from './services/progress-bar/progress-bar.service';
import { MessageService } from 'primeng/api';
import { ProgressBarInterceptor } from 'src/app/core/interceptors';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [ProgressBarComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GraphQLModule,
    ToastModule,
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
  exports: [ProgressBarComponent, ToastModule],
})
export class CoreModule {}
