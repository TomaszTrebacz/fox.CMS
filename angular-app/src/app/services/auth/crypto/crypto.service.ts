import { Injectable } from '@angular/core';
import CryptoES from 'crypto-es';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

/*
// The Advanced Encryption Standard (AES)
// is a U.S. Federal Information Processing Standard (FIPS)
*/
export class CryptoService {
  secretKey = environment.aesKey;

  constructor() {}

  encrypt(value: string): string {
    return CryptoES.AES.encrypt(value, this.secretKey.trim()).toString();
  }

  decrypt(value: string) {
    return CryptoES.AES.decrypt(value, this.secretKey.trim()).toString(
      CryptoES.enc.Utf8
    );
  }
}
