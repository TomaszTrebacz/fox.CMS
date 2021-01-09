import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ListCategoriesGQL } from 'src/app/core/graphql';
import { Category } from 'src/app/core/models';

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
