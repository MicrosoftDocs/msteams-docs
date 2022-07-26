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
// import { ZodUndefined } from './undefined';
// import { ZodNull } from './null';
// import { ZodUnion } from './union';
var ZodError_1 = require("../ZodError");
var ZodArray = /** @class */ (function (_super) {
    __extends(ZodArray, _super);
    function ZodArray() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toJSON = function () {
            return {
                t: _this._def.t,
                nonempty: _this._def.nonempty,
                type: _this._def.type.toJSON(),
            };
        };
        // opt optional: () => ZodUnion<[this, ZodUndefined]> = () => ZodUnion.create([this, ZodUndefined.create()]);
        // null nullable: () => ZodUnion<[this, ZodNull]> = () => ZodUnion.create([this, ZodNull.create()]);
        _this.min = function (minLength, message) {
            return _this._refinement(__assign({ check: function (data) { return data.length >= minLength; }, code: ZodError_1.ZodErrorCode.too_small, type: 'array', inclusive: true, minimum: minLength }, (typeof message === 'string' ? { message: message } : message)));
        };
        _this.max = function (maxLength, message) {
            return _this._refinement(__assign({ check: function (data) { return data.length <= maxLength; }, code: ZodError_1.ZodErrorCode.too_big, type: 'array', inclusive: true, maximum: maxLength }, (typeof message === 'string' ? { message: message } : message)));
        };
        _this.length = function (len, message) { return _this.min(len, { message: message }).max(len, { message: message }); };
        _this.nonempty = function () {
            return new ZodNonEmptyArray(__assign({}, _this._def, { nonempty: true }));
        };
        return _this;
    }
    Object.defineProperty(ZodArray.prototype, "element", {
        get: function () {
            return this._def.type;
        },
        enumerable: true,
        configurable: true
    });
    ZodArray.create = function (schema) {
        return new ZodArray({
            t: z.ZodTypes.array,
            type: schema,
            nonempty: false,
        });
    };
    return ZodArray;
}(z.ZodType));
exports.ZodArray = ZodArray;
var ZodNonEmptyArray = /** @class */ (function (_super) {
    __extends(ZodNonEmptyArray, _super);
    function ZodNonEmptyArray() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toJSON = function () {
            return {
                t: _this._def.t,
                type: _this._def.type.toJSON(),
            };
        };
        // opt optional: () => ZodUnion<[this, ZodUndefined]> = () => ZodUnion.create([this, ZodUndefined.create()]);
        // null nullable: () => ZodUnion<[this, ZodNull]> = () => ZodUnion.create([this, ZodNull.create()]);
        _this.min = function (minLength, message) {
            return _this._refinement(__assign({ check: function (data) { return data.length >= minLength; }, code: ZodError_1.ZodErrorCode.too_small, minimum: minLength, type: 'array', inclusive: true }, (typeof message === 'string' ? { message: message } : message)));
        };
        _this.max = function (maxLength, message) {
            return _this._refinement(__assign({ check: function (data) { return data.length <= maxLength; }, code: ZodError_1.ZodErrorCode.too_big, maximum: maxLength, type: 'array', inclusive: true }, (typeof message === 'string' ? { message: message } : message)));
        };
        _this.length = function (len, message) { return _this.min(len, { message: message }).max(len, { message: message }); };
        return _this;
    }
    return ZodNonEmptyArray;
}(z.ZodType));
exports.ZodNonEmptyArray = ZodNonEmptyArray;
//# sourceMappingURL=array.js.map