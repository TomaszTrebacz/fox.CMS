import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
      .watch({ id })
      .valueChanges.pipe(map((result) => result.data.post));
  }

  findUserPosts(id: string): Observable<Post[]> {
    return this.userPostsGQL
      .watch({ id })
      .valueChanges.pipe(map((result) => result.data.userPosts));
  }

  createPost(
    input: Pick<Post, 'title' | 'text' | 'category' | 'imageUrl'>
  ): Observable<Post> {
    return this.createPostGQL
      .mutate({ input })
      .pipe(map((result) => result.data.createPost));
  }

  editPost(input: Pick<Post, 'id' | 'title' | 'text'>): Observable<boolean> {
    return this.editPostGQL
      .mutate({ input })
      .pipe(map((result) => result.data));
  }

  changeCategory(input: any): Observable<boolean> {
    return this.changeCategoryGQL
      .mutate({ input })
      .pipe(map((res) => res.data));
  }

  deletePost(id: number): Observable<boolean> {
    return this.deletePostGQL.mutate({ id }).pipe(map((res) => res.data));
  }
}
