import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { first, map, tap } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';
import { Category } from 'src/app/core/models';
import { PostsService } from 'src/app/core/services/posts/posts.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  createPostForm: FormGroup;
  error: '';
  cities: any;
  cat: Observable<Category[]>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private categoriesService: CategoriesService,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.categoriesService.findAll().subscribe((result) => {
      this.cities = result.map(({ id: value, name: name }) => ({
        value,
        name,
      }));
    });

    this.createPostForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      text: ['', [Validators.required, Validators.minLength(50)]],
      category: ['', [Validators.required]],
    });
  }

  hasFormErrors() {
    return !this.createPostForm.valid;
  }

  onSubmit() {
    if (this.createPostForm.invalid) {
      return;
    }

    this.createPostForm.value.category = this.createPostForm.value.category.value;

    this.postsService
      .createPost(this.createPostForm.value)
      .pipe(first())
      .subscribe({
        next: (result) => {
          this.router.navigateByUrl(`/blog/post/${result.createPost.id}`);
          this.messageService.add({
            key: 'defaultToast',
            severity: 'success',
            summary: 'Successfully posted!',
            detail: `Your post has been created!`,
          });
        },
        error: (error) => {
          this.messageService.add({
            key: 'defaultMessage',
            severity: 'error',
            summary: 'Post has not been created',
            detail: error.message,
          });
        },
      });
  }
}
