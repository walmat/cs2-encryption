export type Data = {
  securityCode: string;
  number: string;
  type: string;
  expirationMonth: string;
  expirationYear: string;
};

export type KeyId = {
  flx: {
    path: string;
    data: string;
    origin: string;
    jwk: {
      kty: string;
      e: string;
      use: string;
      n: string;
      kid: string;
    };
  };
  ctx: {
    data: {
      targetOrigins: string[];
      mfOrigin: string;
    };
    type: string;
  }[];
  iss: string;
  exp: number;
  iat: number;
  jti: string;
};

// derived from cybersource v2 card types
export type Type = '001' | '002' | '042' | '004' | '005' | '007' | '062';

export type DecodedJwtData = {
  data: {
    expirationYear: string;
    number: string;
    expirationMonth: string;
    type: Type;
  };
  iss: 'Flex/04';
  exp: number;
  type: 'mf-0.11.0';
  iat: number;
  jti: string;
};

type Payload = {
  data: Data;
  context: string;
  index: number;
};

type Header = {
  kid: string;
  alg: string;
  enc: string;
};

type InitializationVector = Uint8Array;
