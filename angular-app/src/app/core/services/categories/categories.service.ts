import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ListCategoriesGQL, CategoryGQL } from 'src/app/core/graphql';
import { Category } from 'src/app/core/models';
import {
  CreateCategoryGQL,
  DeleteCategoryGQL,
} from '../../graphql/mutation/category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(
    private listCategoriesGQL: ListCategoriesGQL,
    private categoryGQL: CategoryGQL,
    private createCategoryGQL: CreateCategoryGQL,
    private deleteCategoryGQL: DeleteCategoryGQL
  ) {}

  findAll(): Observable<Category[]> {
    return this.listCategoriesGQL
      .watch()
      .valueChanges.pipe(map((result) => result.data.categories));
  }

  findOne(id: number): Observable<Category> {
    return this.categoryGQL
      .fetch({ id: id })
      .pipe(map((result) => result.data.category));
  }

  createCategory(input: any): Observable<any> {
    return this.createCategoryGQL
      .mutate({ input: input })
      .pipe(map((result) => result.data));
  }

  deleteCategory(id: number): Observable<any> {
    return this.deleteCategoryGQL.mutate({ id: id });
  }
}
