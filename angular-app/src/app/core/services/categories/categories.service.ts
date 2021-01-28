import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ListCategoriesGQL, CategoryGQL } from 'src/app/core/graphql';
import { Category } from 'src/app/core/models';
import {
  CreateCategoryGQL,
  DeleteCategoryGQL,
} from '../../graphql/mutation/category';
import { EditCategoryGQL } from '../../graphql/mutation/category/edit-category.component';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(
    private listCategoriesGQL: ListCategoriesGQL,
    private categoryGQL: CategoryGQL,
    private createCategoryGQL: CreateCategoryGQL,
    private deleteCategoryGQL: DeleteCategoryGQL,
    private editCategoryGQL: EditCategoryGQL
  ) {}

  findAll(): Observable<Category[]> {
    return this.listCategoriesGQL
      .watch()
      .valueChanges.pipe(map((result) => result.data.categories));
  }

  findOne(id: number): Promise<Category> {
    return this.categoryGQL
      .fetch({ id })
      .toPromise()
      .then((result) => result.data.category);
  }

  createCategory(name: string): Observable<Category> {
    return this.createCategoryGQL
      .mutate({ input: name })
      .pipe(map((result) => result.data.createCategory));
  }

  deleteCategory(id: number): Observable<boolean> {
    return this.deleteCategoryGQL.mutate({ id }).pipe(map((res) => res.data));
  }

  editCategory(name: string): Observable<boolean> {
    return this.editCategoryGQL
      .mutate({ input: name })
      .pipe(map((res) => res.data));
  }
}
