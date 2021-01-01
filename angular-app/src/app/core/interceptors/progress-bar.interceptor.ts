import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProgressBarService } from '../services/progress-bar/progress-bar.service';
import { finalize } from 'rxjs/operators';

@Injectable()
export class ProgressBarInterceptor implements HttpInterceptor {
  constructor(public progressBarService: ProgressBarService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.progressBarService.show();
    return next
      .handle(request)
      .pipe(finalize(() => this.progressBarService.hide()));
  }
}
