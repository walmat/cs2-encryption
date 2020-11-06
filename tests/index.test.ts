import decode from 'jwt-decode';
import { encrypt } from '../src'; // change to dist to test production package

const paymentKey = "eyJraWQiOiJsbiIsImFsZyI6IlJTMjU2In0.eyJmbHgiOnsicGF0aCI6Ii9mbGV4L3YyL3Rva2VucyIsImRhdGEiOiJvNjV0RUdVK216QlB1TFdjdDJUbzRoQUFFUGNMMmN6TmVFc1lkWkJyRUFCWkNkMGRQZ2RRMUlpN0NIRWxtakI1WjdDQVJuZE12L3pZMklpeUErRzYxUk5nbHlsV25EM0E1akJVdVFYM1RFbmV1UmFBT1lqaVVPMkhZRk9aWG5xYkZsNlgiLCJvcmlnaW4iOiJodHRwczovL2ZsZXguY3liZXJzb3VyY2UuY29tIiwiandrIjp7Imt0eSI6IlJTQSIsImUiOiJBUUFCIiwidXNlIjoiZW5jIiwibiI6InY5RWZfSG42TTVhUExIOXcwVFlZTnczVFZhcW1SOWJwLTR2bGdwejdlMUlmeTREZ09VRF9ZVDNXaWVFdmJjdGRQcWdEc201QmwwNHkyZkFwa1JKZEYxWUhBQXdkb3duZ1dRMW1xU3RLTFNObExIU1JBUzN3dTBaNnlBZTNCRUxHNHhueWNIOEdaYmF5bmtpQmtRTElpaDZTRTdMZWhpQ1FjT1gzMldSUGs1OXQzejliVEV6TVBoMlV2WUowYmEyU1pJcW1DRVEtUkN0OEt6TzJEWHhNSVFaSHpIelc2YjlFeE9OLXpBQUF2TjVCeF9SOEhiX0lzV1R4Zi16SUJYMmdhMzI2SEYzMVJjdThfeHpMVW5kcGR6amo0N3Flc1I2cHdsYXpvMkNfMS1fdlNUR3huWnd1OXlBcUZ1VkFwMFdST0dJLWEzejZGem92ZFRPOVBvbXFOdyIsImtpZCI6IjAzd0RWckJyeXdnOEIwSFhmVmx4ZjF2azgzRUhjdEJmIn19LCJjdHgiOlt7ImRhdGEiOnsidGFyZ2V0T3JpZ2lucyI6WyJodHRwczovL3d3dy5wb2tlbW9uY2VudGVyLmNvbSIsImh0dHBzOi8vdGVzdC5wb2tlbW9uY2VudGVyLmNvbSIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMCJdLCJtZk9yaWdpbiI6Imh0dHBzOi8vZmxleC5jeWJlcnNvdXJjZS5jb20ifSwidHlwZSI6Im1mLTAuMTEuMCJ9XSwiaXNzIjoiRmxleCBBUEkiLCJleHAiOjE2MDQ2OTI3NTQsImlhdCI6MTYwNDY5MTg1NCwianRpIjoiTUhIc1B2RXNleDhHZWZjRSJ9.C1ED5bRUfstLixKkFatiX0HriBC5YpoAgd8j_02CNpzDap_ED-BTN_yuqCT26FIh8CX9-TqbxPyc2lrkEO5vqpftmN123R0CWvRLPk4ujGr5Mt1iSYl9ZrzBw5aPF7QKeFWmS0zdHqQcX9CKsKxCeYlZi2ObVJmUGMHlQ1ArgbOvYdUJsxhjDT2NG-_VPtrpsSfE48RZRuGGvNr5J1VGqb83t7ftA2Fh1H-gj9gujr_rFwYJy4mGOJSe87YTg1TAHaxQab56OMWkXzWM17V-2oZsA2g-y-btw9t_v6mL9Kj2KTaFK1fsSj5uPV61ISP89pc4nmpOknHgqAxzHriIqA";

describe('Ecnryption', () => {
  it('Returns correctly encrypted JWT', async () => {
    const data = {
      number: "4242424242424242",
      securityCode: "123",
      expirationMonth: "10",
      expirationYear: "2021",
      type: "001",
    };

    const keyId: any = decode(paymentKey);
    const context = paymentKey;
    const encrypted = await encrypt(data, keyId, context);

    console.log('Encrypted Cybersource v2 JWT: ', encrypted);

    return expect(encrypted).toBeTruthy();
  });
});