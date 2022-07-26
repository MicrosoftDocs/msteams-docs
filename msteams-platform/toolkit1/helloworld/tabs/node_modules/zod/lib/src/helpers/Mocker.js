"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
var Mocker = /** @class */ (function () {
    function Mocker() {
        this.pick = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return args[getRandomInt(args.length)];
        };
    }
    Object.defineProperty(Mocker.prototype, "string", {
        get: function () {
            return Math.random()
                .toString(36)
                .substring(7);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mocker.prototype, "number", {
        get: function () {
            return Math.random() * 100;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mocker.prototype, "bigint", {
        get: function () {
            return BigInt(Math.floor(Math.random() * 10000));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mocker.prototype, "boolean", {
        get: function () {
            return Math.random() < 0.5;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mocker.prototype, "date", {
        get: function () {
            return new Date(Math.floor(Date.now() * Math.random()));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mocker.prototype, "null", {
        get: function () {
            return null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mocker.prototype, "undefined", {
        get: function () {
            return undefined;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mocker.prototype, "stringOptional", {
        get: function () {
            return this.pick(this.string, this.undefined);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mocker.prototype, "stringNullable", {
        get: function () {
            return this.pick(this.string, this.null);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mocker.prototype, "numberOptional", {
        get: function () {
            return this.pick(this.number, this.undefined);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mocker.prototype, "numberNullable", {
        get: function () {
            return this.pick(this.number, this.null);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mocker.prototype, "booleanOptional", {
        get: function () {
            return this.pick(this.boolean, this.undefined);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Mocker.prototype, "booleanNullable", {
        get: function () {
            return this.pick(this.boolean, this.null);
        },
        enumerable: true,
        configurable: true
    });
    return Mocker;
}());
exports.Mocker = Mocker;
//# sourceMappingURL=Mocker.js.map