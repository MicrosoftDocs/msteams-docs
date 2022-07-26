var crypto = require('crypto');
var getPem = require('../index');

var pems = { 
    "public": "-----BEGIN RSA PUBLIC KEY-----\nMIIBCgKCAQEAniqcAxl7LclB0kE6q9AcAd8EE+0W6AsriR9Fs9T+6QVXl8uiCiAbh/KCyy8X\n8C2bHsFpNBvwGTqMwHbqZqWBVUvYRtfCFcy3Xmertb09DnOBeWqKS4181kss97JDO6G07QNb\nuLSWwkkO82CHD1kUmeF5/dof0Ra6bsRXqppdo86NzlgFud+E2s5BM3XwewZVSpA69bwEiXaR\nDhrsg5mqeOm68VyxE8LQu+895kKsBnTvTueZTrXT+HNaIveoYe8+Lb7b/mZYtlhrDK0i/8ED\nox85vxnzKZ7wNswqqcDg6vfC2911phSTPh13jv2FIOkjO/WHhHEzRnS2VQqivqIbsQIDAQAB\n-----END RSA PUBLIC KEY-----\n"
    ,"private": "-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAniqcAxl7LclB0kE6q9AcAd8EE+0W6AsriR9Fs9T+6QVXl8uiCiAbh/KC\nyy8X8C2bHsFpNBvwGTqMwHbqZqWBVUvYRtfCFcy3Xmertb09DnOBeWqKS4181kss97JDO6G0\n7QNbuLSWwkkO82CHD1kUmeF5/dof0Ra6bsRXqppdo86NzlgFud+E2s5BM3XwewZVSpA69bwE\niXaRDhrsg5mqeOm68VyxE8LQu+895kKsBnTvTueZTrXT+HNaIveoYe8+Lb7b/mZYtlhrDK0i\n/8EDox85vxnzKZ7wNswqqcDg6vfC2911phSTPh13jv2FIOkjO/WHhHEzRnS2VQqivqIbsQID\nAQABAoIBACFcPWHN+xQyMebmCTj6AR5H6rVFOaKh0IHwjaQbldSSYuJKehgGo6ft97ZhbXwk\nMmavRsBN8DtyBQQHUPNrjzbtc2Wl1nMApeCMn0QK8RjeNf3lAdxjsGQGoSpxeArY1a90GOGB\nfZbnD/c3ceVD1buLOk7XtgRE9fetBAyg2IVXE1oDcU9zTy/ewwYn1+6vnBgrQhxc88SFWnPs\nhnNQDeqKLfedcpQxOImWWto20tKKc3bYO+KYRXczADEl+e8EXBSpUrGvt5y4gLDIGvn3w+Bk\nUnUgSR+ASQv9/3b/cserqlG1zSxvVzqoJDLxqdliMfXlYG8qcvSkema8xylXUN0CgYEA4PlT\nNn7NWAwj18QP3GgRmyHdOWfjZm71RyQzx7OMpNMd9ZIja6R3jDG/3Rk1YfEq+DM6lEFfWP0V\nFHf1yLQ0ebFGbB61UhdvvOsaLENloejfG15CxkRRdm/3f0J3cJ+ot90uKSqpnFLdh/okQGd9\ndBikeclKrGKVt4cCgfcAiWcCgYEAs/qnqskgFxSGBbUN7Bkv5vZuCG6VXpvTs9xUCJwmHLsc\nTfDy5GW5E7TbWGtiWbUJQbzXXHNS4uzXDSlBCyBX8ZmmeIW7odiYnHn5H7NJedZln8lojTiw\no66WYPjkQBD2hKnTFM6ZeV90erg0pjZDHoiAvHSz/3PkWMUxx/TUSycCgYAeEVSMyP+6z8yO\njtar14Da4fjGLltXGmdPvcfp3dZjRRAQ/RoczdtoclG5RCA9WdUrXPVsURxkMVb66FmCHIuS\n5B2MX8JOGXHGpwlVdyCDNjNzXfLAuurEUIycho6eD8il4jrEJ76JdQ3Emar0rKA4vv5khIGl\nbnuiDrpIEnIQ6wKBgF0T40RS0ZK+HXW0JegVOo3CojMgJYWRJxIcfyUYxCkVp1SzqJnv9aA4\nZzu6BVoJYykpJWN9jL8o5yq6TBYZ+wFKiipIVzojTwGVnv4C9ZvaAiJ5weVPDSMJdmHeNgTg\nAO2o+i4Hjp2TfSS+QRQ4ecu/onxUCoaxA8XY7Z7Qgj3/AoGBANOAo97y5gAqq8J5oP7VJT9i\nJowFuPNrdjaqQBuBenBByD/hfmy5p0+68wQV3bhJYsSNnJGnaP7pIRu8UCPlaJ9oOCjsTcjk\nH6uDT5YVvdDcfxvdFdQ/5p6YatcWidSXG/WKaCOMuruTGsiuwLtB1n/PDIBhwnWTCVSUWCaF\nWXaM\n-----END RSA PRIVATE KEY-----\n"
    ,"public_modulus": "niqcAxl7LclB0kE6q9AcAd8EE+0W6AsriR9Fs9T+6QVXl8uiCiAbh/KCyy8X8C2bHsFpNBvwGTqMwHbqZqWBVUvYRtfCFcy3Xmertb09DnOBeWqKS4181kss97JDO6G07QNbuLSWwkkO82CHD1kUmeF5/dof0Ra6bsRXqppdo86NzlgFud+E2s5BM3XwewZVSpA69bwEiXaRDhrsg5mqeOm68VyxE8LQu+895kKsBnTvTueZTrXT+HNaIveoYe8+Lb7b/mZYtlhrDK0i/8EDox85vxnzKZ7wNswqqcDg6vfC2911phSTPh13jv2FIOkjO/WHhHEzRnS2VQqivqIbsQ"
    ,"public_exponent": "AQAB"
};

describe('Signature', function(){
    var signer = crypto.createSign('RSA-SHA256');
    var data = crypto.randomBytes(256);

    signer.update(data);
    var signature = signer.sign(pems.private);

    it('will verify a signature against a generated pem, slightly different than generated', function(){
        var verifier = crypto.createVerify('RSA-SHA256');
        verifier.update(data);
        var valid = verifier.verify(getPem(pems.public_modulus, pems.public_exponent), signature);

        valid.should.equal(true);
    });

    it('will verify a signature against the pre-generated pem', function(){
        var verifier = crypto.createVerify('SHA256');
        verifier.update(data);
        var valid = verifier.verify(pems.public, signature);
        valid.should.equal(true);
    });

    it('will not verify invalid data/signature', function(){
        var verifier = crypto.createVerify('SHA256');
        verifier.update(data + 'fail');
        var valid = verifier.verify(pems.public, signature);
        valid.should.equal(false);
    });
});

describe('Known signature', function(){
    it('will verify a known, signed value', function(){
        var pem = getPem(
            /*modulus*/ "1f3YJ3vE0LQx8TggbCLGCtmtqm4f6JhAJr8UEVADeZzcYRMFqgCvvYzf1hEa2ZulwxbtRZaGnbEhd5z-BAs0a2eSFb6wCHYioARdgYDZS__CsEhsoIiE7imtvbA_8G4l0c7La9_0DbbiFbOIAQrkDTcV0fY1kf8-wnemCZ4Ky_hJzm13rItgpDG6Z5Z96BMHzVTBq9Ws0FvXPHj30ek0eQRZ279zcv6JQdIB1LKA8g3qgADBO4RfSe8a15ikum02UWvUNU7R-DQvG7CJHiBSTyCx0GO-A9g0r_vkO07OoXG_2FFae6zxnKFBd1_UdQZuWCqGT8e26L0rNMFGnscSVQ"
            ,/*exponent*/ "AQAB"
        );
     
        // Token inputs
        var rawToken = "eyJhbGciOiJSUzI1NiIsImtpZCI6ImF1dGhLZXkgMi4wIn0.eyJzaG9wcGVySWQiOiI5MDc1NTQiLCJmaXJzdG5hbWUiOiIiLCJwbGlkIjoiMSIsImV4cCI6MTM3OTAwMzEyMSwiaWF0IjoxMzc4OTU5OTIxLCJ0eXAiOiJpZHAifQ.HEuUAYI-LqhFkNoZuBlbDA4aRbwCRX_uAJmJ-h5jmmLJWRwgbd-e8LiFXCoLAhqBeCIfaVch4KG4vYO-C-vjEVR7RG1wzCgwh6rGYSn7BK-_7ILlAUvK4j0TQVxDXPxV2uRwuk_N3JhX0gNrK6PmwUctenPt65kcCxn4QExWmabPGnNasePMq-oyDXvIpfEAcsmyZqftoa7-aFuyIlJSxMKF-zPg8wwJ13u677KXbXIcC3w7niYar3DBim3vUWTpbdJzuBqJ13d_rXcFBJUO5YGXGoheqWnJGwH_a-z8kiIayo6RspxT4V68BlzQ6m1H0_tJl9rjN9rtP5Iddjcq3A";
     
        var parts = rawToken.split(/\./g);
        var bytesToVerify = new Buffer(parts[0] + '.' + parts[1], 'utf8');
        var signedBytes = new Buffer(parts[2], 'base64');

        var verifier = crypto.createVerify('sha256');
        verifier.update(bytesToVerify);
        
        var success = verifier.verify(pem, signedBytes);
        success.should.equal(true);

    });
});