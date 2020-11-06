import btoa from 'btoa';

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