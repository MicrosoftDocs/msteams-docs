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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var z = __importStar(require("./base"));
var ZodPromise = /** @class */ (function (_super) {
    __extends(ZodPromise, _super);
    function ZodPromise() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.toJSON = function () {
            return {
                t: _this._def.t,
                type: _this._def.type.toJSON(),
            };
        };
        return _this;
    }
    // opt optional: () => ZodUnion<[this, ZodUndefined]> = () => ZodUnion.create([this, ZodUndefined.create()]);
    // null nullable: () => ZodUnion<[this, ZodNull]> = () => ZodUnion.create([this, ZodNull.create()]);
    ZodPromise.create = function (schema) {
        return new ZodPromise({
            t: z.ZodTypes.promise,
            type: schema,
        });
    };
    return ZodPromise;
}(z.ZodType));
exports.ZodPromise = ZodPromise;
//# sourceMappingURL=promise.js.map