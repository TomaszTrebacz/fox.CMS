import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AllPostsGQL } from 'src/app/graphql/allPostsGQL.query';
import { Post } from 'src/app/interfaces/post.interface';
import { PostsService } from 'src/app/services/blog/posts.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  posts: Observable<Post[]>;
  constructor(private service: PostsService) {}

  ngOnInit() {
    this.posts = this.service.findAll().pipe(map((result) => result));
  }
}
