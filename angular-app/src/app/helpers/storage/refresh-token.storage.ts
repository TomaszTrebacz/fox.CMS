import { decrypt, encrypt } from '../crypto';

export function RefreshToken() {
  return (target: any, key: string) => {
    const tokenKey = 'refreshtoken';

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
