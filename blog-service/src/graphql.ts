/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class ChangeCategoryPostInput {
  id: number;
  category: number;
}

export class CreateCategoryInput {
  name: string;
}

export class CreatePostInput {
  title: string;
  text: string;
  category: number;
}

export class EditCategoryInput {
  id: number;
  name: string;
}

export class EditPostInput {
  id: number;
  title: string;
  text: string;
}

export class Category {
  id: number;
  name: string;
  posts?: Post[];
}

export class Post {
  id: number;
  title: string;
  text: string;
  user?: User;
  created: Date;
  updated: Date;
  category?: Category;
}

export abstract class IMutation {
  abstract createCategory(
    createCategoryInput?: CreateCategoryInput,
  ): Category | Promise<Category>;

  abstract editCategory(
    editCategoryInput?: EditCategoryInput,
  ): boolean | Promise<boolean>;

  abstract createPost(createPostInput?: CreatePostInput): Post | Promise<Post>;

  abstract editPost(editPostInput?: EditPostInput): boolean | Promise<boolean>;

  abstract changeCategoryPost(
    changeCategoryPostInput?: ChangeCategoryPostInput,
  ): Post | Promise<Post>;

  abstract deleteCategory(id: number): boolean | Promise<boolean>;

  abstract deletePost(id: number): boolean | Promise<boolean>;

  abstract deleteUserPosts(id: string): boolean | Promise<boolean>;
}

export abstract class IQuery {
  abstract posts(): Post[] | Promise<Post[]>;

  abstract categories(): Category[] | Promise<Category[]>;

  abstract category(id?: number): Category | Promise<Category>;
}

export class User {
  id: string;
  posts?: Post[];
}
