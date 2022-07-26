'use strict';

var AdvanceStringIndex = require('es-abstract/2021/AdvanceStringIndex');
var CreateDataPropertyOrThrow = require('es-abstract/2021/CreateDataPropertyOrThrow');
var CreateMethodProperty = require('es-abstract/2021/CreateMethodProperty');
var GetMethod = require('es-abstract/2021/GetMethod');
var IsArray = require('es-abstract/2021/IsArray');
var IterableToList = require('es-abstract/2021/IterableToList');
var OrdinarySetPrototypeOf = require('es-abstract/2021/OrdinarySetPrototypeOf');
var Type = require('es-abstract/2021/Type');
var GetIntrinsic = require('get-intrinsic');
var getIteratorMethod = require('es-abstract/helpers/getIteratorMethod');
var hasPropertyDescriptors = require('has-property-descriptors')();

var $Error = GetIntrinsic('%Error%');

// eslint-disable-next-line func-style
function AggregateError(errors, message) {
	var error = new $Error(message);
	OrdinarySetPrototypeOf(error, proto); // eslint-disable-line no-use-before-define
	delete error.constructor;

	var errorsList = IterableToList(errors, getIteratorMethod({
		AdvanceStringIndex: AdvanceStringIndex,
		GetMethod: GetMethod,
		IsArray: IsArray,
		Type: Type
	}, errors));
	CreateDataPropertyOrThrow(error, 'errors', errorsList);

	return error;
}
if (hasPropertyDescriptors) {
	Object.defineProperty(AggregateError, 'prototype', { writable: false });
}
var proto = AggregateError.prototype;

if (
	!CreateMethodProperty(proto, 'constructor', AggregateError)
	|| !CreateMethodProperty(proto, 'message', '')
	|| !CreateMethodProperty(proto, 'name', 'AggregateError')
) {
	throw new $Error('unable to install AggregateError.prototype properties; please report this!');
}

OrdinarySetPrototypeOf(AggregateError.prototype, Error.prototype);

module.exports = AggregateError;
