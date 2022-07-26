"use strict";
/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiddlewareControl = void 0;
/**
 * @class
 * Class representing MiddlewareControl
 */
var MiddlewareControl = /** @class */ (function () {
    /**
     * @public
     * @constructor
     * Creates an instance of MiddlewareControl
     * @param {MiddlewareOptions[]} [middlewareOptions = []] - The array of middlewareOptions
     * @returns The instance of MiddlewareControl
     */
    function MiddlewareControl(middlewareOptions) {
        if (middlewareOptions === void 0) { middlewareOptions = []; }
        this.middlewareOptions = new Map();
        for (var _i = 0, middlewareOptions_1 = middlewareOptions; _i < middlewareOptions_1.length; _i++) {
            var option = middlewareOptions_1[_i];
            var fn = option.constructor;
            this.middlewareOptions.set(fn, option);
        }
    }
    /**
     * @public
     * To get the middleware option using the class of the option
     * @param {Function} fn - The class of the strongly typed option class
     * @returns The middleware option
     * @example
     * // if you wanted to return the middleware option associated with this class (MiddlewareControl)
     * // call this function like this:
     * getMiddlewareOptions(MiddlewareControl)
     */
    MiddlewareControl.prototype.getMiddlewareOptions = function (fn) {
        return this.middlewareOptions.get(fn);
    };
    /**
     * @public
     * To set the middleware options using the class of the option
     * @param {Function} fn - The class of the strongly typed option class
     * @param {MiddlewareOptions} option - The strongly typed middleware option
     * @returns nothing
     */
    MiddlewareControl.prototype.setMiddlewareOptions = function (fn, option) {
        this.middlewareOptions.set(fn, option);
    };
    return MiddlewareControl;
}());
exports.MiddlewareControl = MiddlewareControl;
//# sourceMappingURL=MiddlewareControl.js.map