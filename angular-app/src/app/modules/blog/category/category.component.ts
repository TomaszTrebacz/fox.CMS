import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { Category, Post } from 'src/app/core/models';
import { CategoriesService } from 'src/app/core/services/categories/categories.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  id: number;
  category: Category;

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoriesService: CategoriesService,
    private router: Router,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.id = parseInt(params.get('id'), 10);

      this.categoriesService
        .findOne(this.id)
        .then((category) => (this.category = category));
    });
  }

  deleteCategory() {
    this.categoriesService
      .deleteCategory(this.id)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigateByUrl(`/admin/workboard`);
          this.messageService.add({
            key: 'defaultToast',
            severity: 'success',
            summary: 'Successfully deleted!',
            detail: `Your category has been deleted!`,
          });
        },
        error: (error) => {
          this.messageService.add({
            key: 'defaultMessage',
            severity: 'error',
            summary: 'Category has not been deleted',
            detail: error.message,
          });
        },
      });
  }
}
