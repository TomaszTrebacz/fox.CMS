import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AllPostsGQL, PostGQL } from 'src/app/core/graphql';
import { Post } from 'src/app/core/models';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private allPostsGQL: AllPostsGQL, private postGQL: PostGQL) {}

  findAll(): Observable<Post[]> {
    return this.allPostsGQL
      .watch()
      .valueChanges.pipe(map((result) => result.data.posts));
  }

  findOne(id: number): Observable<Post> {
    return this.postGQL
      .fetch({ id: id })
      .pipe(map((result) => result.data.post));
  }
}
