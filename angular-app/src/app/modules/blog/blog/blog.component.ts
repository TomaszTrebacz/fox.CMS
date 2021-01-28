import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, Post } from 'src/app/core/models';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { PostsService } from 'src/app/core/services/posts/posts.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
})
export class BlogComponent implements OnInit {
  posts: Post[];
  categories: Observable<Category[]>;

  constructor(
    private postsService: PostsService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.postsService.findAll().then((posts) => (this.posts = posts));
    this.categories = this.categoriesService.findAll();
  }
}
