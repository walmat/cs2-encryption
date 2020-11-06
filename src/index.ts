import { Crypto } from '@peculiar/webcrypto';

import { replace, arrayBufferToString, stringToArrayBuffer } from './utilts';
import { Data, Header, InitializationVector, KeyId, Payload } from '../types';

const generateKey = (crypto: Crypto): Promise<CryptoKey> =>
  crypto.subtle.generateKey(
    {
      name: 'AES-GCM',
      length: 256
    },
    true,
    ['encrypt']
  );

const _encrypt = async (
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

function importKey(crypto: Crypto, jsonWebKey: JsonWebKey) {
  return crypto.subtle.importKey(
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
}

async function wrapKey(crypto: Crypto, key: CryptoKey, jsonWebKey: JsonWebKey) {
  const wrappingKey = await importKey(crypto, jsonWebKey);

  return crypto.subtle.wrapKey('raw', key, wrappingKey, {
    name: 'RSA-OAEP',
    hash: {
      name: 'SHA-1'
    }
  });
}

async function build(
  crypto: Crypto,
  buffer: ArrayBuffer,
  key: CryptoKey,
  iv: InitializationVector,
  header: Header,
  jsonWebKey: JsonWebKey
) {
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

export const encrypt = async (
  data: Data,
  keyId: KeyId,
  context: string,
  index = 0
) => {
  const crypto = new Crypto();

  const header: Header = {
    kid: keyId.flx.jwk.kid || '',
    alg: 'RSA-OAEP',
    enc: 'A256GCM'
  };

  const payload: Payload = {
    data,
    context,
    index
  };

  const iv: InitializationVector = crypto.getRandomValues(new Uint8Array(12));

  return generateKey(crypto)
    .then(key => _encrypt(crypto, payload, key, header, iv))
    .then(data => {
      const [buffer, key] = data;

      return build(crypto, buffer, key, iv, header, keyId.flx.jwk);
    });
};
