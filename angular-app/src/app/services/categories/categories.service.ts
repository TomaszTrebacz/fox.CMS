import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ListCategoriesGQL } from 'src/app/graphql';
import { Category } from 'src/app/models';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  constructor(private listCategoriesGQL: ListCategoriesGQL) {}

  findAll(): Observable<Category[]> {
    return this.listCategoriesGQL
      .watch()
      .valueChanges.pipe(map(result => result.data.categories));
  }
}
