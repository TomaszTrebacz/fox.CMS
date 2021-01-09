import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category, Post } from 'src/app/core/models';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { PostsService } from 'src/app/core/services/posts/posts.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  posts: Observable<Post[]>;
  categories: Observable<Category[]>;

  constructor(
    private postsservice: PostsService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit() {
    this.posts = this.postsservice.findAll();
    this.categories = this.categoriesService.findAll();
  }
}
