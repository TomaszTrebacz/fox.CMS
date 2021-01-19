import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  AllPostsGQL,
  PostGQL,
  UserPostsGQL,
  CreatePostGQL,
  EditPostGQL,
  DeletePostGQL,
  ChangeCategoryGQL,
} from 'src/app/core/graphql';
import { Post } from 'src/app/core/models';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(
    private allPostsGQL: AllPostsGQL,
    private postGQL: PostGQL,
    private userPostsGQL: UserPostsGQL,
    private createPostGQL: CreatePostGQL,
    private editPostGQL: EditPostGQL,
    private deletePostGQL: DeletePostGQL,
    private changeCategoryGQL: ChangeCategoryGQL
  ) {}

  findAll(): Promise<Post[]> {
    return this.allPostsGQL
      .fetch()
      .toPromise()
      .then((result) => result.data.posts);
  }

  findOne(id: number): Observable<Post> {
    return this.postGQL
      .fetch({ id: id })
      .pipe(map((result) => result.data.post));
  }

  findUserPosts(id: string): Observable<Post[]> {
    return this.userPostsGQL
      .fetch({ id: id })
      .pipe(map((result) => result.data.userPosts));
  }

  createPost(input: any): Observable<any> {
    return this.createPostGQL
      .mutate({ input: input })
      .pipe(map((result) => result.data));
  }

  editPost(input: any): Observable<any> {
    return this.editPostGQL
      .mutate({ input: input })
      .pipe(map((result) => result.data));
  }

  changeCategory(input: any): Observable<any> {
    console.log('eee');
    console.log(input);
    console.log('eee');
    return this.changeCategoryGQL.mutate({ input: input });
  }

  deletePost(id: number): Observable<any> {
    return this.deletePostGQL.mutate({ id: id });
  }
}
