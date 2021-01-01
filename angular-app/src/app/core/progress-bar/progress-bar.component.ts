import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ProgressBarService } from '../services/progress-bar/progress-bar.service';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {
  isLoading: Subject<boolean> = this.progressBarService.isLoading;

  constructor(private progressBarService: ProgressBarService) {}

  ngOnInit(): void {}
}
