# RSA Authentication with Bybit APIs in Node.js

## Creating RSA Keys

Officially, bybit recommends using their key generator or following their instructions for creating RSA keys. Guidance for this can be found on the bybit website when trying to add a new RSA API key:

https://www.bybit.com/en/help-center/article/How-to-Create-an-RSA-Key-on-Bybit

However, openssl can be used to create the public & private key files using the following steps:

```bash
# Generate a private key with either 2048 or 4096 bit length
openssl genrsa -out rsa-private-key.pem 4096

# Generate a corresponding public key
openssl rsa -in rsa-private-key.pem -pubout -out rsa-public-key.pem
```

## Using the RSA public key to get an API key from Bybit

Once created, keep your **private key** completely secret! The **public** key needs to be provided to bybit when creating new API credentials with the "Self-generated" option.

Your public key should look something like this:

```pem
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAxFd5fW6r6GVOt9pHJVBe
BjUyob6JTfXXVvmi/RXOH1NB/4JgjlCxqdZDBYf8O8FnBFFSLuXfiEcSfuYPaSpa
vgwwboJSXPyhhtyJVF4HCbNiVVxSOjBoDxL3a1LL33NQ/UJZiH4SZIGl81T4TviN
TcsX1PzKRVxeDpentzUEWw7A5Uv+TseLcjUkh4H/IS2UZ2mVVDwL4Zce3oRTzQ5P
RtW+QaLaDdgYoteJATMBvkf619QAIJelnaDzT0/PDLKFvtNaiPd4/RxqbDEwH6JS
w7QQx8FFpcMzKCuJPiT75lHKINxIiclbjrWpPQw73/ZZkteeiuqJEJQ0JRzZskza
PQIDAQAB
-----END PUBLIC KEY-----
```

Submit this in the "Upload public key" form, shown when creating a new API key on bybit and choosing the "self-generated" option.

Note: the "-----BEGIN PUBLIC KEY-----" and "-----END PUBLIC KEY-----" header & footer can be included.

After using the public key to create a new API key, you will be given an API Key such as the following:

```
your-api-key-here
```

This is the first piece, used as the "key" in the [RSA-sign.ts](./RSA-sign.ts) example.

## Using the RSA private key for RSA authentication with bybit APIs in Node.js

Your private key, if generated with the above steps, should look something like this:

```pem
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDEV3l9bqvoZU63
2kclUF4GNTKhvolN9ddW+aL9Fc4fU0H/gmCOULGp1kMFh/w7wWcEUVIu5d+IRxJ+
5g9pKlq+DDBuglJc/KGG3IlUXgcJs2JVXFI6MGgPEvdrUsvfc1D9QlmIfhJkgaXz
VPhO+I1NyxfU/MpFXF4Ol6e3NQRbDsDlS/5Ox4tyNSSHgf8hLZRnaZVUPAvhlx7e
hFPNDk9G1b5BotoN2Bii14kBMwG+R/rX1AAgl6WdoPNPT88MsoW+01qI93j9HGps
MTAfolLDtBDHwUWlwzMoK4k+JPvmUcog3EiJyVuOtak9DDvf9lmS156K6okQlDQl
HNmyTNo9AgMBAAECggEAMIVMhvinX4hPpoQ5Aknk3oRdhZasYFmBdKM/CevOUzP0
UqQh3/GloirKx85mAU9neavuExxoPAmSUs1gYBUhNSeWfWzT1VpyQX11K6YL97P+
uEkXIf2t7ZG6lqlwrAEXseqobSB4w6E9hU+JiJyIcQHgWxh4lSEBNnp4bkBaGfUx
RquXlkZ/XM07+uiDTjMrPDnxAwZFRo/xl0edAhsAHqZiDCO4NUTM26bvxYMLPtNW
ttsCmrNdQXys85CALMgvslqGXAV6AtYChm4ZA+fnSeVx5X3SwieQmQUqNcQ3Z8E9
KI3eUhQrIubIBKiVhD3wjLW53o43IfRuW4+CGmb5CQKBgQD4XphiZMxjv84VGyRL
KS7v0IKcRNkShWAvCViLGhkbMOLSDg7UaZm21KIDogebmfrUzaMi5dKA6LuNpz1V
WR2n/45CUogsYmLk9zwgCF4f4DIL5gnBEJKTZZMo4zk5EpsyDYvwFDNG2scsy9Cq
4eketMN6IT3VeosweNOS2N0qpQKBgQDKX69fbJX6i2TvCowBTqCRIheuYNp4pkr0
GNHzT2tizsaP7hSIQHfeY9qB+F7DMYa2MnBaIlJbPumiXa7busqg+FcTP6YOien9
lIdv2u8Pr8PjdanPQvBl1eAJNuEKm/gM9O/jPQCwa65L9NtRLw+PjpY4tkGe3Wev
5ORQOFuVuQKBgCiv1mbH/HOayDfM6nUlmfrPPZY78ROHpeoOreKbs+EwcPfYNbW2
VugMjT3rHTPwVZbm2QKug316or7h1rpUjvcmdjeHLaeXtnurxL26oTC3mXs5g/+M
p3Zd/W2FS6p90c6xSWta48uHq3k7KkPUHkxZcGxhZa/DE2otYPt9az3BAoGAYXug
DbZPtIWLFD6fXE3UuLSUdbI/6tgnyNdf4vVBxDHYoiJMD6oGU8ED05GhjCMCQief
yTs5MqzmfAjmnv+mdc3KnAIP6nbymO0AJJhwibzf/mSCbM1Q4a0ZozalRqgE37Dp
ESwkddcY+Yu0TbH+q+dCY4UfrPf351m5xQ6wxzkCgYEAmVdilDWFYhY6b4S+IKLZ
9OmY7i7/Rpq0U7IZmE6q/vwaEz0hKc/iAgci/s5Furyd/d/4ChPa3zr6mbjWGjTk
77tJ39eN1eSascL06gvAK5lVym4hJD61HQXpyXEAm5D1liRtvNA8CDynXYU19C9j
Dj5BEbMNzhbwWKTxLDpqUso=
-----END PRIVATE KEY-----
```

This is your secret, you should never share this with anyone, not even bybit! Treat this like a password.

As part of this authentication process, your private key is used to generate a signature (using `RSA-SHA256`). This SDK handles this process automatically for you. RSA authentication is automatically detected if the "secret" parameter contains the words "PRIVATE KEY", such as the header shown in the example above.

From here, simply use the key provided by bybit as the `key` parameter and your private key (with the header) as the `secret` parameter.

Based on the above example, the following would prepare the REST client using the above credentials:

```typescript
const api_key = `your-api-key-here`;
const rsaPrivateKey = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDEV3l9bqvoZU63
2kclUF4GNTKhvolN9ddW+aL9Fc4fU0H/gmCOULGp1kMFh/w7wWcEUVIu5d+IRxJ+
5g9pKlq+DDBuglJc/KGG3IlUXgcJs2JVXFI6MGgPEvdrUsvfc1D9QlmIfhJkgaXz
VPhO+I1NyxfU/MpFXF4Ol6e3NQRbDsDlS/5Ox4tyNSSHgf8hLZRnaZVUPAvhlx7e
hFPNDk9G1b5BotoN2Bii14kBMwG+R/rX1AAgl6WdoPNPT88MsoW+01qI93j9HGps
MTAfolLDtBDHwUWlwzMoK4k+JPvmUcog3EiJyVuOtak9DDvf9lmS156K6okQlDQl
HNmyTNo9AgMBAAECggEAMIVMhvinX4hPpoQ5Aknk3oRdhZasYFmBdKM/CevOUzP0
UqQh3/GloirKx85mAU9neavuExxoPAmSUs1gYBUhNSeWfWzT1VpyQX11K6YL97P+
uEkXIf2t7ZG6lqlwrAEXseqobSB4w6E9hU+JiJyIcQHgWxh4lSEBNnp4bkBaGfUx
RquXlkZ/XM07+uiDTjMrPDnxAwZFRo/xl0edAhsAHqZiDCO4NUTM26bvxYMLPtNW
ttsCmrNdQXys85CALMgvslqGXAV6AtYChm4ZA+fnSeVx5X3SwieQmQUqNcQ3Z8E9
KI3eUhQrIubIBKiVhD3wjLW53o43IfRuW4+CGmb5CQKBgQD4XphiZMxjv84VGyRL
KS7v0IKcRNkShWAvCViLGhkbMOLSDg7UaZm21KIDogebmfrUzaMi5dKA6LuNpz1V
WR2n/45CUogsYmLk9zwgCF4f4DIL5gnBEJKTZZMo4zk5EpsyDYvwFDNG2scsy9Cq
4eketMN6IT3VeosweNOS2N0qpQKBgQDKX69fbJX6i2TvCowBTqCRIheuYNp4pkr0
GNHzT2tizsaP7hSIQHfeY9qB+F7DMYa2MnBaIlJbPumiXa7busqg+FcTP6YOien9
lIdv2u8Pr8PjdanPQvBl1eAJNuEKm/gM9O/jPQCwa65L9NtRLw+PjpY4tkGe3Wev
5ORQOFuVuQKBgCiv1mbH/HOayDfM6nUlmfrPPZY78ROHpeoOreKbs+EwcPfYNbW2
VugMjT3rHTPwVZbm2QKug316or7h1rpUjvcmdjeHLaeXtnurxL26oTC3mXs5g/+M
p3Zd/W2FS6p90c6xSWta48uHq3k7KkPUHkxZcGxhZa/DE2otYPt9az3BAoGAYXug
DbZPtIWLFD6fXE3UuLSUdbI/6tgnyNdf4vVBxDHYoiJMD6oGU8ED05GhjCMCQief
yTs5MqzmfAjmnv+mdc3KnAIP6nbymO0AJJhwibzf/mSCbM1Q4a0ZozalRqgE37Dp
ESwkddcY+Yu0TbH+q+dCY4UfrPf351m5xQ6wxzkCgYEAmVdilDWFYhY6b4S+IKLZ
9OmY7i7/Rpq0U7IZmE6q/vwaEz0hKc/iAgci/s5Furyd/d/4ChPa3zr6mbjWGjTk
77tJ39eN1eSascL06gvAK5lVym4hJD61HQXpyXEAm5D1liRtvNA8CDynXYU19C9j
Dj5BEbMNzhbwWKTxLDpqUso=
-----END PRIVATE KEY-----`;

const client = new RestClientV5({
  key: api_key,
  secret: rsaPrivateKey,
  testnet: true,
});
```

For a complete example, refer to the [RSA-sign.ts](./RSA-sign.ts) file on GitHub.
