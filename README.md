# Cybersource V2 Encryption
A small (~12kb) helper library to port NodeJS WebCrypto and perform [Cybersource V2](https://www.cybersource.com/en-us.html) MicroForm encryption. 

## Installation
```
yarn add cs2-encryption --save

// or

npm i cs2-encryption -S
```


## CardTypes
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