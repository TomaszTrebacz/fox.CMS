/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class ChangePassByTokenInput {
  token?: string;
  password?: string;
}

export class ChangeRoleInput {
  id: string;
  role: string;
}

export class CreateUserInput {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
}

export class LoginInput {
  email: string;
  password: string;
}

export class ResetPasswordInput {
  phoneNumber?: string;
  code?: number;
}

export class UpdateUserInput {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export class LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  role: string;
}

export abstract class IMutation {
  abstract registerUser(
    createUserInput?: CreateUserInput,
  ): User | Promise<User>;

  abstract updateUser(
    updateUserInput?: UpdateUserInput,
  ): boolean | Promise<boolean>;

  abstract deleteUser(id?: string): boolean | Promise<boolean>;

  abstract changeRole(
    changeRoleInput?: ChangeRoleInput,
  ): boolean | Promise<boolean>;

  abstract resetPassword(
    resetPasswordInput?: ResetPasswordInput,
  ): boolean | Promise<boolean>;

  abstract refreshToken(
    refreshToken?: string,
  ): TokenResponse | Promise<TokenResponse>;

  abstract logout(id?: string): boolean | Promise<boolean>;

  abstract confirmUser(confirmToken?: string): boolean | Promise<boolean>;

  abstract changeConfirmToken(email?: string): boolean | Promise<boolean>;

  abstract sendCodePhone(phoneNumber?: string): boolean | Promise<boolean>;

  abstract sendChangePassEmail(email?: string): boolean | Promise<boolean>;

  abstract changePassByToken(
    changePassByTokenInput?: ChangePassByTokenInput,
  ): boolean | Promise<boolean>;

  abstract changePassword(password?: string): boolean | Promise<boolean>;
}

export class TokenResponse {
  accessToken?: string;
  refreshToken?: string;
}

export class User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  created: Date;
  updated: Date;
}

export abstract class IQuery {
  abstract users(): User[] | Promise<User[]>;

  abstract currentUser(): User | Promise<User>;

  abstract user(id: string): User | Promise<User>;

  abstract login(
    loginCredentials?: LoginInput,
  ): LoginResponse | Promise<LoginResponse>;
}
