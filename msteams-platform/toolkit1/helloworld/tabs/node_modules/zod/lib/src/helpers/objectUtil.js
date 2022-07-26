"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("../types/base");
var intersection_1 = require("../types/intersection");
var object_1 = require("../types/object");
var objectUtil;
(function (objectUtil) {
    objectUtil.mergeShapes = function (first, second) {
        var firstKeys = Object.keys(first);
        var secondKeys = Object.keys(second);
        var sharedKeys = firstKeys.filter(function (k) { return secondKeys.indexOf(k) !== -1; });
        var sharedShape = {};
        for (var _i = 0, sharedKeys_1 = sharedKeys; _i < sharedKeys_1.length; _i++) {
            var k = sharedKeys_1[_i];
            sharedShape[k] = intersection_1.ZodIntersection.create(first[k], second[k]);
        }
        return __assign({}, first, second, sharedShape);
    };
    objectUtil.mergeObjects = function (first) { return function (second) {
        var mergedShape = objectUtil.mergeShapes(first._def.shape(), second._def.shape());
        var merged = new object_1.ZodObject({
            t: base_1.ZodTypes.object,
            checks: (first._def.checks || []).concat((second._def.checks || [])),
            params: {
                strict: first.params.strict && second.params.strict,
            },
            shape: function () { return mergedShape; },
        });
        return merged;
    }; };
})(objectUtil = exports.objectUtil || (exports.objectUtil = {}));
//# sourceMappingURL=objectUtil.js.map