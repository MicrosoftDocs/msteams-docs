"use strict";
/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedirectHandlerOptions = void 0;
/**
 * @class
 * @implements MiddlewareOptions
 * A class representing RedirectHandlerOptions
 */
var RedirectHandlerOptions = /** @class */ (function () {
    /**
     * @public
     * @constructor
     * To create an instance of RedirectHandlerOptions
     * @param {number} [maxRedirects = RedirectHandlerOptions.DEFAULT_MAX_REDIRECTS] - The max redirects value
     * @param {ShouldRedirect} [shouldRedirect = RedirectHandlerOptions.DEFAULT_SHOULD_RETRY] - The should redirect callback
     * @returns An instance of RedirectHandlerOptions
     */
    function RedirectHandlerOptions(maxRedirects, shouldRedirect) {
        if (maxRedirects === void 0) { maxRedirects = RedirectHandlerOptions.DEFAULT_MAX_REDIRECTS; }
        if (shouldRedirect === void 0) { shouldRedirect = RedirectHandlerOptions.defaultShouldRedirect; }
        if (maxRedirects > RedirectHandlerOptions.MAX_MAX_REDIRECTS) {
            var error = new Error("MaxRedirects should not be more than ".concat(RedirectHandlerOptions.MAX_MAX_REDIRECTS));
            error.name = "MaxLimitExceeded";
            throw error;
        }
        if (maxRedirects < 0) {
            var error = new Error("MaxRedirects should not be negative");
            error.name = "MinExpectationNotMet";
            throw error;
        }
        this.maxRedirects = maxRedirects;
        this.shouldRedirect = shouldRedirect;
    }
    /**
     * @private
     * @static
     * A member holding default max redirects value
     */
    RedirectHandlerOptions.DEFAULT_MAX_REDIRECTS = 5;
    /**
     * @private
     * @static
     * A member holding maximum max redirects value
     */
    RedirectHandlerOptions.MAX_MAX_REDIRECTS = 20;
    /**
     * @private
     * A member holding default shouldRedirect callback
     */
    RedirectHandlerOptions.defaultShouldRedirect = function () { return true; };
    return RedirectHandlerOptions;
}());
exports.RedirectHandlerOptions = RedirectHandlerOptions;
//# sourceMappingURL=RedirectHandlerOptions.js.map