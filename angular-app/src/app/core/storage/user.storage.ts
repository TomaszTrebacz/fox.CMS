import { decrypt, encrypt } from '../utils';

export function UserStorage(): any {
  return (target: any, key: string) => {
    const itemKey = 'user';

    Object.defineProperty(target, key, {
      get: () => {
        const user = localStorage.getItem(itemKey);

        if (user) {
          return JSON.parse(decrypt(user));
        }

        return null;
      },
      set: (token: string) => {
        localStorage.setItem(itemKey, encrypt(JSON.stringify(token)));
      },
    });
  };
}
