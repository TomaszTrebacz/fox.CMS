import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-posts',
  templateUrl: './display-posts.component.html',
  styleUrls: ['./display-posts.component.css'],
})
export class DisplayPostsComponent implements OnInit {
  @Input() posts;

  constructor() {}

  ngOnInit(): void {}
}
