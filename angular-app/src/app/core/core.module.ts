import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { GraphQLModule } from './graphql/config/graphql.module';
import { ProgressBarService } from './progress-bar/progress-bar.service';
import { MessageService, SharedModule } from 'primeng/api';
import { ProgressBarInterceptor } from 'src/app/core/interceptors';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { ToastModule } from 'primeng/toast';
import { CutHtmlTagsPipe, CutPipe } from './pipes';
import { AccessDirective } from './directives';

@NgModule({
  declarations: [ProgressBarComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    GraphQLModule,
    ToastModule,
    SharedModule,
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
