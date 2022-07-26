node-rsa-pem-from-mod-exp
=========================

Create RSA Public Key PEM from Modulus and Exponent value in [node.js](http://nodejs.org/). There are no dependencies to other modules for use.

This allows you to use the modulus/exponent values for validating signed value.

The original code is based on the answer to [this stackoverflow question](http://stackoverflow.com/questions/18835132/xml-to-pem-in-node-js).


## Install ##
```
npm install rsa-pem-from-mod-exp
```

## Usage ##
``` javascript
//getPem = function(modulus_base);
var getPem = require('rsa-pem-from-mod-exp');

//modulus should be a base64/base64Url string
var modulus =  "niqcAxl7LclB0kE6q9AcAd8EE+0W6AsriR9Fs9T+6QVXl8uiCiAbh/KCyy8X8C2bHsFpNBvwGTqMwHbqZqWBVUvYRtfCFcy3Xmertb09DnOBeWqKS4181kss97JDO6G07QNbuLSWwkkO82CHD1kUmeF5/dof0Ra6bsRXqppdo86NzlgFud+E2s5BM3XwewZVSpA69bwEiXaRDhrsg5mqeOm68VyxE8LQu+895kKsBnTvTueZTrXT+HNaIveoYe8+Lb7b/mZYtlhrDK0i/8EDox85vxnzKZ7wNswqqcDg6vfC2911phSTPh13jv2FIOkjO/WHhHEzRnS2VQqivqIbsQ";

//exponent should be base64/base64url
var exponent = "AQAB";

var pem = getPem(modulus, exponent);
```

In the above example pem will now contain the following string.
```
-----BEGIN RSA PUBLIC KEY-----
MIIBCgKCAQEAniqcAxl7LclB0kE6q9AcAd8EE+0W6AsriR9Fs9T+6QVXl8uiCiAb
h/KCyy8X8C2bHsFpNBvwGTqMwHbqZqWBVUvYRtfCFcy3Xmertb09DnOBeWqKS418
1kss97JDO6G07QNbuLSWwkkO82CHD1kUmeF5/dof0Ra6bsRXqppdo86NzlgFud+E
2s5BM3XwewZVSpA69bwEiXaRDhrsg5mqeOm68VyxE8LQu+895kKsBnTvTueZTrXT
+HNaIveoYe8+Lb7b/mZYtlhrDK0i/8EDox85vxnzKZ7wNswqqcDg6vfC2911phST
Ph13jv2FIOkjO/WHhHEzRnS2VQqivqIbsQIDAQAB
-----END RSA PUBLIC KEY-----
```

## Testing and Code Coverage ##
```javascript
npm test
npm run cover
```