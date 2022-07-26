var should = require('should');
var input = require('./input.json');
var getPem = require('../index');

describe('index', function(){
	it('should generate the expected pem results', function(){
		for (var i=0; i<input.length; i++) {
			var val = input[i];
			if (!val || !val.modulus || !val.exponent || !val.pem) continue;
			var result = getPem(val.modulus, val.exponent);
			result.should.equal(val.pem);
		}
	});
});