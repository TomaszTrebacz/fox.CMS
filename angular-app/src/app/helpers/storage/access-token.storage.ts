import { decrypt, encrypt } from '../crypto';

export function AccessToken() {
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
      }
    });
  };
}
