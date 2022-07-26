"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var z = __importStar(require("./base"));
var objectUtil_1 = require("../helpers/objectUtil");
var isScalar_1 = require("../isScalar");
var AugmentFactory = function (def) { return function (augmentation) {
    return new ZodObject(__assign({}, def, { shape: function () { return (__assign({}, def.shape(), augmentation)); } }));
}; };
var objectDefToJson = function (def) { return ({
    t: def.t,
    shape: Object.assign({}, Object.keys(def.shape()).map(function (k) {
        var _a;
        return (_a = {},
            _a[k] = def.shape()[k].toJSON(),
            _a);
    })),
}); };
var ZodObject = /** @class */ (function (_super) {
    __extends(ZodObject, _super);
    function ZodObject() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toJSON = function () { return objectDefToJson(_this._def); };
        _this.nonstrict = function () {
            return new ZodObject({
                shape: _this._def.shape,
                t: z.ZodTypes.object,
                params: __assign({}, _this._params, { strict: false }),
            });
        };
        // opt optional: () => ZodUnion<[this, ZodUndefined]> = () => ZodUnion.create([this, ZodUndefined.create()]);
        // nullable: () => ZodUnion<[this, ZodNull]> = () => ZodUnion.create([this, ZodNull.create()]);
        _this.augment = AugmentFactory(_this._def);
        _this.extend = AugmentFactory(_this._def);
        /**
         * Prior to zod@1.0.12 there was a bug in the
         * inferred type of merged objects. Please
         * upgrade if you are experiencing issues.
         */
        _this.merge = objectUtil_1.objectUtil.mergeObjects(_this);
        _this.pick = function (mask) {
            var shape = {};
            Object.keys(mask).map(function (key) {
                shape[key] = _this.shape[key];
            });
            return new ZodObject(__assign({}, _this._def, { shape: function () { return shape; } }));
        };
        _this.omit = function (mask) {
            var shape = {};
            Object.keys(_this.shape).map(function (key) {
                if (Object.keys(mask).indexOf(key) === -1) {
                    shape[key] = _this.shape[key];
                }
            });
            return new ZodObject(__assign({}, _this._def, { shape: function () { return shape; } }));
        };
        _this.partial = function () {
            var newShape = {};
            for (var key in _this.shape) {
                newShape[key] = _this.shape[key].optional();
            }
            return new ZodObject(__assign({}, _this._def, { shape: function () { return newShape; } }));
        };
        _this.primitives = function () {
            var newShape = {};
            for (var key in _this.shape) {
                if (isScalar_1.isScalar(_this.shape[key])) {
                    newShape[key] = _this.shape[key];
                }
            }
            return new ZodObject(__assign({}, _this._def, { shape: function () { return newShape; } }));
        };
        _this.nonprimitives = function () {
            var newShape = {};
            for (var key in _this.shape) {
                if (!isScalar_1.isScalar(_this.shape[key])) {
                    newShape[key] = _this.shape[key];
                }
            }
            return new ZodObject(__assign({}, _this._def, { shape: function () { return newShape; } }));
        };
        _this.deepPartial = function () {
            var newShape = {};
            for (var key in _this.shape) {
                var fieldSchema = _this.shape[key];
                if (fieldSchema instanceof ZodObject) {
                    newShape[key] = fieldSchema.deepPartial().optional();
                }
                else {
                    newShape[key] = _this.shape[key].optional();
                }
            }
            return new ZodObject(__assign({}, _this._def, { shape: function () { return newShape; } }));
        };
        return _this;
    }
    Object.defineProperty(ZodObject.prototype, "shape", {
        get: function () {
            return this._def.shape();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ZodObject.prototype, "params", {
        get: function () {
            return this._def.params;
        },
        enumerable: true,
        configurable: true
    });
    ZodObject.create = function (shape) {
        return new ZodObject({
            t: z.ZodTypes.object,
            shape: function () { return shape; },
            params: {
                strict: true,
            },
        });
    };
    ZodObject.lazycreate = function (shape) {
        return new ZodObject({
            t: z.ZodTypes.object,
            shape: shape,
            params: {
                strict: true,
            },
        });
    };
    return ZodObject;
}(z.ZodType));
exports.ZodObject = ZodObject;
//# sourceMappingURL=object.js.map