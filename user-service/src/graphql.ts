
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class User {
    id: string;
    email: string;
    name: string;
    password: string;
    role: string;
    created: Date;
    updated: Date;
}

export abstract class IQuery {
    abstract users(): User[] | Promise<User[]>;
}
