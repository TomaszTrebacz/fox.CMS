import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgressBarService {
  isLoading = new Subject<boolean>();

  constructor() {}

  show(): void {
    this.isLoading.next(true);
  }
  hide(): void {
    this.isLoading.next(false);
  }
}
