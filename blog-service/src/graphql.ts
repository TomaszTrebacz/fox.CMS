
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class Post {
    id: number;
    title: string;
    text: string;
    created: Date;
    user?: User;
}

export abstract class IQuery {
    abstract posts(): Post[] | Promise<Post[]>;
}

export class User {
    id: string;
    posts?: Post[];
}
