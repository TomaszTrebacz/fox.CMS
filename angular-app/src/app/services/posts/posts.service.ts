import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AllPostsGQL } from 'src/app/graphql';
import { Post } from 'src/app/models';

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
