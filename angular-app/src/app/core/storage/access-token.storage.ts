import { decrypt, encrypt } from '../utils';

export function AccessToken(): any {
  return (target: any, key: string) => {
    const tokenKey = 'accesstoken';

    Object.defineProperty(target, key, {
      get: () => {
        const accesstoken = localStorage.getItem(tokenKey);

        if (accesstoken) {
          return JSON.parse(decrypt(accesstoken));
        }

        return null;
      },
      set: (token: string) => {
        localStorage.setItem(tokenKey, encrypt(token));
      },
    });
  };
}
