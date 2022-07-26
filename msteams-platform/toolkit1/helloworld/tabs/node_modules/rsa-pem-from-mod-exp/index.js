module.exports = rsaPublicKeyPem;

//http://stackoverflow.com/questions/18835132/xml-to-pem-in-node-js
function rsaPublicKeyPem(modulus_b64, exponent_b64) {
 
    var modulus = new Buffer(modulus_b64, 'base64');
    var exponent = new Buffer(exponent_b64, 'base64');
 
    var modulus_hex = modulus.toString('hex')
    var exponent_hex = exponent.toString('hex')
 
    modulus_hex = prepadSigned(modulus_hex)
    exponent_hex = prepadSigned(exponent_hex)
 
    var modlen = modulus_hex.length/2
    var explen = exponent_hex.length/2
 
    var encoded_modlen = encodeLengthHex(modlen)
    var encoded_explen = encodeLengthHex(explen)
    var encoded_pubkey = '30' + 
        encodeLengthHex(
            modlen + 
            explen + 
            encoded_modlen.length/2 + 
            encoded_explen.length/2 + 2
        ) + 
        '02' + encoded_modlen + modulus_hex +
        '02' + encoded_explen + exponent_hex;

    var der_b64 = new Buffer(encoded_pubkey, 'hex').toString('base64');

    var pem = '-----BEGIN RSA PUBLIC KEY-----\n' 
        + der_b64.match(/.{1,64}/g).join('\n') 
        + '\n-----END RSA PUBLIC KEY-----\n';
 
    return pem
}

function prepadSigned(hexStr) {
    var msb = hexStr[0]
    if (msb < '0' || msb > '7') {
        return '00'+hexStr;
    } else {
        return hexStr;
    }
}

function toHex(number) {
    var nstr = number.toString(16);
    if (nstr.length%2) return '0'+nstr;
    return nstr;
}

// encode ASN.1 DER length field
// if <=127, short form
// if >=128, long form
function encodeLengthHex(n) {
    if (n<=127) return toHex(n)
    else {
        var n_hex = toHex(n)
        var length_of_length_byte = 128 + n_hex.length/2 // 0x80+numbytes
        return toHex(length_of_length_byte)+n_hex
    }
}
