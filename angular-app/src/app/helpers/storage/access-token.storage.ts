import { decrypt, encrypt } from '../crypto';

export function AccessToken() {
  return (target: any, key: string) => {
    const tokenKey = 'accesstoken';

    Object.defineProperty(target, key, {
      get: () => {
        return decrypt(localStorage.getItem(tokenKey));
      },
      set: (token: string) => {
        localStorage.setItem(tokenKey, encrypt(token));
      },
    });
  };
}
