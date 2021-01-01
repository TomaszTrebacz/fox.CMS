import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AllPostsGQL } from 'src/app/core/graphql';
import { Post } from 'src/app/core/models';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private allPostsGQL: AllPostsGQL) {}

  findAll(): Observable<Post[]> {
    return this.allPostsGQL
      .watch()
      .valueChanges.pipe(map(result => result.data.posts));
  }
}
