import { decrypt, encrypt } from '../crypto';

export function UserStorage() {
  return (target: any, key: string) => {
    const itemKey = 'user';

    Object.defineProperty(target, key, {
      get: () => {
        return JSON.parse(decrypt(localStorage.getItem(itemKey)));
      },
      set: (token: string) => {
        localStorage.setItem(itemKey, encrypt(JSON.stringify(token)));
      },
    });
  };
}
