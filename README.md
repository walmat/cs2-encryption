# Cybersource V2 Encryption
> A small (~12kB) helper library to port NodeJS WebCrypto and perform [Cybersource V2](https://www.cybersource.com/en-us.html) MicroForm encryption. 

[![NPM registry](https://img.shields.io/npm/v/cs2-encryption.svg?style=for-the-badge)](https://yarnpkg.com/en/package/cs2-encryption) [![NPM license](https://img.shields.io/badge/license-mit-red.svg?style=for-the-badge)](LICENSE.md)

## Installation
```
yarn add cs2-encryption --save

// or

npm i cs2-encryption -S
```


## Card Types
```
import { CardTypes } from 'cs2-encryption';

console.log(CardTypes.Visa);
// => '001'
```

## Example Usage
```
import { encrypt, CardData, CardTypes } from 'cs2-encryption';

// Received from `POST` to https://flex.cybersource.com/flex/v2/tokens
const context = "eyJraWQiOiJsbiIsImFsZyI...";

const data: CardData = {
  number: "4242424242424242",
  securityCode: "123",
  expirationMonth: "10",
  expirationYear: "2021",
  type: CardTypes.Visa, // see `CardTypes` declarations 
};

const encrypted = await encrypt(data, context);

console.log(encrypted);
// => eyJraWQiOiIwM3dEVnJC...

console.log(typeof encrypted);
// => string (an encrypted JWT)
```

## Changelog

### [1.0.4] - 2021-01-25

#### Changed
- Fixed types
- Fixed compilation error from WebCrypto port

### [1.0.0 - 1.0.3] - 2020-11-06

#### Added
- Cybersource V2 Encryption
