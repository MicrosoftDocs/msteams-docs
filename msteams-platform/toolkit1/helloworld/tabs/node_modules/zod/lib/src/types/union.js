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
var ZodUnion = /** @class */ (function (_super) {
    __extends(ZodUnion, _super);
    function ZodUnion() {
        // opt optional: () => ZodUnion<[this, ZodUndefined]> = () => ZodUnion.create([this, ZodUndefined.create()]);
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // null nullable: () => ZodUnion<[this, ZodNull]> = () => ZodUnion.create([this, ZodNull.create()]);
        _this.toJSON = function () { return ({
            t: _this._def.t,
            options: _this._def.options.map(function (x) { return x.toJSON(); }),
        }); };
        return _this;
    }
    // distribute = <F extends (arg: T[number]) => z.ZodTypeAny>(f: F): ZodUnion<{ [k in keyof T]: ReturnType<F> }> => {
    //   return ZodUnion.create(this._def.options.map(f) as any);
    // };
    ZodUnion.create = function (types) {
        return new ZodUnion({
            t: z.ZodTypes.union,
            options: types,
        });
    };
    return ZodUnion;
}(z.ZodType));
exports.ZodUnion = ZodUnion;
//# sourceMappingURL=union.js.map