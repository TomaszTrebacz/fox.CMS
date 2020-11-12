import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AllPostsGQL } from 'src/app/graphql/allPostsGQL.query';
import { Post } from 'src/app/interfaces/post.interface';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  posts: Observable<Post[]>;

  constructor(private allPostsGQL: AllPostsGQL) {}

  ngOnInit() {
    this.posts = this.allPostsGQL
      .watch()
      .valueChanges.pipe(map((result) => result.data.posts));
  }
}
