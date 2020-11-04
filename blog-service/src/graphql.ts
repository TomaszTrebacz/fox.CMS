
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class Category {
    id: number;
    name: string;
    posts?: Post[];
}

export class Post {
    id: number;
    title: string;
    text: string;
    created: Date;
    category?: Category;
    user?: User;
}

export abstract class IQuery {
    abstract posts(): Post[] | Promise<Post[]>;

    abstract categories(): Category[] | Promise<Category[]>;
}

export class User {
    id: string;
    posts?: Post[];
}
