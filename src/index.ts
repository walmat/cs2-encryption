import decode from 'jwt-decode';
import { Crypto } from '@peculiar/webcrypto';

import { generateKey, _encrypt, build } from './utils';
import { CardData, KeyId, DecodedJwtData, Payload, Header, InitializationVector } from '../types';

export const CardTypes = {
  Visa: '001',
  MasterCard: '002',
  AmericanExpress: '003',
  Discover: '004',
  Diners: '005',
  JCB: '007',
  Maestro: '042',
  ChinaUnionPay: '062',
};

export const encrypt = async (
  data: CardData,
  context: string,
  index = 0
) => {
  const crypto = new Crypto();
  const keyId = <KeyId>decode(context);

  const header: Header = {
    kid: keyId.flx.jwk.kid,
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
    .then((key: CryptoKey) => _encrypt(crypto, payload, key, header, iv))
    .then((data: [ArrayBuffer, CryptoKey]) => {
      const [buffer, key] = data;

      return build(crypto, buffer, key, iv, header, keyId.flx.jwk);
    });
};

// re-exports
export { CardData, KeyId, DecodedJwtData, Payload, Header, InitializationVector };
