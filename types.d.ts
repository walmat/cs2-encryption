export type CardData = {
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

export type DecodedJwtData = {
  data: {
    expirationYear: string;
    number: string;
    expirationMonth: string;
    type: string;
  };
  iss: string;
  exp: number;
  type: string;
  iat: number;
  jti: string;
};

// encryption payload
export type Payload = {
  data: CardData;
  context: string;
  index: number;
};

// encryption header
export type Header = {
  kid: string;
  alg: string;
  enc: string;
};

// Useful for readability
export type InitializationVector = Uint8Array;
