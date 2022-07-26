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
var errorUtil_1 = require("../helpers/errorUtil");
var ZodNumber = /** @class */ (function (_super) {
    __extends(ZodNumber, _super);
    function ZodNumber() {
        // opt optional: () => ZodUnion<[this, ZodUndefined]> = () => ZodUnion.create([this, ZodUndefined.create()]);
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // null nullable: () => ZodUnion<[this, ZodNull]> = () => ZodUnion.create([this, ZodNull.create()]);
        _this.toJSON = function () { return _this._def; };
        _this.min = function (minimum, message) {
            return _this._refinement(__assign({ check: function (data) { return data >= minimum; }, code: ZodError_1.ZodErrorCode.too_small, minimum: minimum, type: 'number', inclusive: true }, errorUtil_1.errorUtil.errToObj(message)));
        };
        _this.max = function (maximum, message) {
            return _this._refinement(__assign({ check: function (data) { return data <= maximum; }, code: ZodError_1.ZodErrorCode.too_big, maximum: maximum, type: 'number', inclusive: true }, errorUtil_1.errorUtil.errToObj(message)));
        };
        _this.int = function (message) {
            return _this._refinement(__assign({ check: function (data) { return Number.isInteger(data); }, code: ZodError_1.ZodErrorCode.invalid_type, expected: 'integer', received: 'number' }, errorUtil_1.errorUtil.errToObj(message)));
        };
        _this.positive = function (message) {
            return _this._refinement(__assign({ check: function (data) { return data > 0; }, code: ZodError_1.ZodErrorCode.too_small, minimum: 0, type: 'number', inclusive: false }, errorUtil_1.errorUtil.errToObj(message)));
        };
        _this.negative = function (message) {
            return _this._refinement(__assign({ check: function (data) { return data < 0; }, code: ZodError_1.ZodErrorCode.too_big, maximum: 0, type: 'number', inclusive: false }, errorUtil_1.errorUtil.errToObj(message)));
        };
        _this.nonpositive = function (message) {
            return _this._refinement(__assign({ check: function (data) { return data <= 0; }, code: ZodError_1.ZodErrorCode.too_big, maximum: 0, type: 'number', inclusive: true }, errorUtil_1.errorUtil.errToObj(message)));
        };
        _this.nonnegative = function (message) {
            return _this._refinement(__assign({ check: function (data) { return data >= 0; }, code: ZodError_1.ZodErrorCode.too_small, minimum: 0, type: 'number', inclusive: true }, errorUtil_1.errorUtil.errToObj(message)));
        };
        return _this;
    }
    ZodNumber.create = function () {
        return new ZodNumber({
            t: z.ZodTypes.number,
        });
    };
    return ZodNumber;
}(z.ZodType));
exports.ZodNumber = ZodNumber;
//# sourceMappingURL=number.js.map