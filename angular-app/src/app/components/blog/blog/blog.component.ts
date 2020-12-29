import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AllPostsGQL } from 'src/app/graphql/query/post/allPosts.query';
import { Category } from 'src/app/models/category.interface';
import { Post } from 'src/app/models/post.interface';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { PostsService } from 'src/app/services/posts/posts.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  posts: Observable<Post[]>;
  categories: Observable<Category[]>;

  constructor(
    private postsservice: PostsService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit() {
    this.posts = this.postsservice.findAll().pipe(map(result => result));
    this.categories = this.categoriesService
      .findAll()
      .pipe(map(result => result));
  }
}
