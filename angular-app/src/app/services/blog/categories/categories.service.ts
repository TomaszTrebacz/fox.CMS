import { Injectable } from '@angular/core';
import { ListCategoriesGQL } from 'src/app/graphql/listCategories.query';
import { Category } from 'src/app/interfaces/category.interface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private listCategoriesGQL: ListCategoriesGQL) {}

  findAll(): Observable<Category[]> {
    return this.listCategoriesGQL
      .watch()
      .valueChanges.pipe(map((result) => result.data.categories));
  }
}
