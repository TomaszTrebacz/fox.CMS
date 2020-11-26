import { Injectable } from '@angular/core';
import { AllPostsGQL, Response } from 'src/app/graphql/allPostsGQL.query';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Post } from 'src/app/models/post.interface';
@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private allPostsGQL: AllPostsGQL) {}

  findAll(): Observable<Post[]> {
    return this.allPostsGQL
      .watch()
      .valueChanges.pipe(map((result) => result.data.posts));
  }
}
