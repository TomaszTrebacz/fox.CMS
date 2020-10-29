
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
}

export abstract class IQuery {
    abstract posts(): Post[] | Promise<Post[]>;
}
