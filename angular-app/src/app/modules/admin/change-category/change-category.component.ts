import { Component, Input, OnInit } from '@angular/core';
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
  selector: 'app-change-category',
  templateUrl: './change-category.component.html',
  styleUrls: ['./change-category.component.css'],
})
export class ChangeCategoryComponent implements OnInit {
  @Input() id;
  changeCategoryForm: FormGroup;
  error: '';
  categories: any;
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
      this.categories = result.map(({ id: value, name: name }) => ({
        value,
        name,
      }));
    });

    this.changeCategoryForm = this.fb.group({
      id: [this.id, Validators.required],
      category: ['', [Validators.required]],
    });
  }

  hasFormErrors(): boolean {
    return !this.changeCategoryForm.valid;
  }

  onSubmit(): void {
    if (this.changeCategoryForm.invalid) {
      return;
    }

    this.changeCategoryForm.value.category = this.changeCategoryForm.value.category.value;

    this.postsService
      .changeCategory(this.changeCategoryForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.messageService.add({
            key: 'defaultToast',
            severity: 'success',
            summary: 'Successfully changed!',
            detail: `Post's category has been changed!`,
          });
        },
        error: (error) => {
          this.messageService.add({
            key: 'defaultMessage',
            severity: 'error',
            summary: 'Error',
            detail: error.message,
          });
        },
      });
  }
}
