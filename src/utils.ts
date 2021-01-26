import btoa from 'btoa';

import { Header, InitializationVector, Payload } from '../types';

export const generateKey = (crypto: Crypto): Promise<CryptoKey> =>
  crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256
    },
    true,
    ['encrypt']
  );



export const _encrypt = async (
    crypto: Crypto,
    payload: Payload,
    key: CryptoKey,
    header: Header,
    iv: InitializationVector
  ): Promise<[ArrayBuffer, CryptoKey]> => {
    const algorithm = {
      name: 'AES-GCM',
      iv,
      additionalData: stringToArrayBuffer(replace(JSON.stringify(header))),
      tagLength: 128
    };
  
    const buffer = await crypto.subtle.encrypt(
      algorithm,
      key,
      stringToArrayBuffer(JSON.stringify(payload))
    );
  
    return [buffer, key];
  };
  
export const importKey = (crypto: Crypto, jsonWebKey: JsonWebKey) =>
  crypto.subtle.importKey(
    'jwk',
    jsonWebKey,
    {
      name: 'RSA-OAEP',
      hash: {
        name: 'SHA-1'
      }
    },
    false,
    ['wrapKey']
  );
  
export const wrapKey = async (crypto: Crypto, key: CryptoKey, jsonWebKey: JsonWebKey) => {
  const wrappingKey = await importKey(crypto, jsonWebKey);

  // cast to `any` because web crypto types are all fucked up
  const params: any = {
    name: 'RSA-OAEP',
    hash: {
      name: 'SHA-1'
    }
  };

  return crypto.subtle.wrapKey('raw', key, wrappingKey, params);
}
  
export const build = async (
  crypto: Crypto,
  buffer: ArrayBuffer,
  key: CryptoKey,
  iv: InitializationVector,
  header: Header,
  jsonWebKey: JsonWebKey
) => {
  // eslint-disable-next-line no-bitwise
  const u = buffer.byteLength - ((128 + 7) >> 3);
  const keyBuffer = await wrapKey(crypto, key, jsonWebKey);

  return [
    replace(JSON.stringify(header)),
    replace(arrayBufferToString(keyBuffer)),
    replace(arrayBufferToString(iv)),
    replace(arrayBufferToString(buffer.slice(0, u))),
    replace(arrayBufferToString(buffer.slice(u)))
  ].join('.');
}

export const arrayBufferToString = (buf: ArrayBuffer) =>
  String.fromCharCode.apply(null, new Uint8Array(buf) as any);

export const stringToArrayBuffer = (str: string) => {
  const buffer = new ArrayBuffer(str.length);
  const array = new Uint8Array(buffer);
  const { length } = str;

  for (let r = 0; r < length; r += 1) {
    array[r] = str.charCodeAt(r);
  }

  return buffer;
};

export const replace = (str: string) =>
  btoa(str).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');