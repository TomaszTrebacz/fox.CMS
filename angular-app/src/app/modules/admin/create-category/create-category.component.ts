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
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css'],
})
export class CreateCategoryComponent implements OnInit {
  createCategoryForm: FormGroup;
  error: '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private messageService: MessageService,
    private categoriesService: CategoriesService,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.createCategoryForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  hasFormErrors(): boolean {
    return !this.createCategoryForm.valid;
  }

  onSubmit(): void {
    if (this.createCategoryForm.invalid) {
      return;
    }

    this.categoriesService
      .createCategory(this.createCategoryForm.value)
      .pipe(first())
      .subscribe({
        next: (result) => {
          this.router.navigateByUrl(`/blog/category/${result.id}`);
          this.messageService.add({
            key: 'defaultToast',
            severity: 'success',
            summary: 'Successfully created!',
            detail: `Your category has been created!`,
          });
        },
        error: (error) => {
          this.messageService.add({
            key: 'defaultMessage',
            severity: 'error',
            summary: 'Error!',
            detail: error.message,
          });
        },
      });
  }
}
