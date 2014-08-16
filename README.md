# Signature Verify

Verify digital signature information

## Install
Note: this middleware depends upon [bitauth](https://github.com/bitpay/bitauth)

Note: this middleware expects the following properties
on the request object:
- publicKey
- signature
- signedURI (optional - used for proxied requests)

```bash
$ npm install bitauth signature-verify
```

## API

```js
var express             = require('express')
var signatureVerify    = require('signature-verify');
var options             = {};
var app = express();
app.use(signatureVerify(options));
```

### signatureVerify(options)

Returns the signature extract middleware using the given `options`.

```js
app.use(signatureVerify({
  reject : false,
  includeBody: true
}))
```

#### Options

`reject = false`      - reject request if verification fails (401 Unauthorized)
`includeBody = true`  - function to hash signature

## Examples

### Server-Sent Events

```js
var express = require('express');
var app = express();
var signatureVerify = require('signature-verify');
app.use(...)
app.use(signatureVerify());
app.use(function(req,res){
    console.log(req.verification.result);//Log Verification Result
    console.log(req.verification.error);//Log Verification Error
})
app.use(...)
app.listen(8080);
```
## See Also
- [Signature Extraction Middleware](https://github.com/johnhenry/signature-extract)
- [Signature Storage Middleware](https://github.com/johnhenry/signature-store)

## Credits
  - [John Henry](http://github.com/johnhenry)

## License

The MIT License (MIT)

Copyright (c) 2014 John Henry john@iamjohnhenry.com

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
