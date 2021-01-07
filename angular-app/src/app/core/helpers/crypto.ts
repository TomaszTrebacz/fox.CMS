import CryptoES from 'crypto-es';
import { environment } from 'src/environments/environment';

const secretKey = environment.aesKey;

export const encrypt = (value: string): string => {
  return CryptoES.AES.encrypt(value, secretKey.trim()).toString();
};

export const decrypt = (value: string): string => {
  return CryptoES.AES.decrypt(value, secretKey.trim()).toString(
    CryptoES.enc.Utf8
  );
};
