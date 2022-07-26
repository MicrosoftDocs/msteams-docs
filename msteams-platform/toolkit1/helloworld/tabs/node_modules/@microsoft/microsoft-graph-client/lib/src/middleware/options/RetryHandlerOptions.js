"use strict";
/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetryHandlerOptions = void 0;
/**
 * @class
 * @implements MiddlewareOptions
 * Class for RetryHandlerOptions
 */
var RetryHandlerOptions = /** @class */ (function () {
    /**
     * @public
     * @constructor
     * To create an instance of RetryHandlerOptions
     * @param {number} [delay = RetryHandlerOptions.DEFAULT_DELAY] - The delay value in seconds
     * @param {number} [maxRetries = RetryHandlerOptions.DEFAULT_MAX_RETRIES] - The maxRetries value
     * @param {ShouldRetry} [shouldRetry = RetryHandlerOptions.DEFAULT_SHOULD_RETRY] - The shouldRetry callback function
     * @returns An instance of RetryHandlerOptions
     */
    function RetryHandlerOptions(delay, maxRetries, shouldRetry) {
        if (delay === void 0) { delay = RetryHandlerOptions.DEFAULT_DELAY; }
        if (maxRetries === void 0) { maxRetries = RetryHandlerOptions.DEFAULT_MAX_RETRIES; }
        if (shouldRetry === void 0) { shouldRetry = RetryHandlerOptions.defaultShouldRetry; }
        if (delay > RetryHandlerOptions.MAX_DELAY && maxRetries > RetryHandlerOptions.MAX_MAX_RETRIES) {
            var error = new Error("Delay and MaxRetries should not be more than ".concat(RetryHandlerOptions.MAX_DELAY, " and ").concat(RetryHandlerOptions.MAX_MAX_RETRIES));
            error.name = "MaxLimitExceeded";
            throw error;
        }
        else if (delay > RetryHandlerOptions.MAX_DELAY) {
            var error = new Error("Delay should not be more than ".concat(RetryHandlerOptions.MAX_DELAY));
            error.name = "MaxLimitExceeded";
            throw error;
        }
        else if (maxRetries > RetryHandlerOptions.MAX_MAX_RETRIES) {
            var error = new Error("MaxRetries should not be more than ".concat(RetryHandlerOptions.MAX_MAX_RETRIES));
            error.name = "MaxLimitExceeded";
            throw error;
        }
        else if (delay < 0 && maxRetries < 0) {
            var error = new Error("Delay and MaxRetries should not be negative");
            error.name = "MinExpectationNotMet";
            throw error;
        }
        else if (delay < 0) {
            var error = new Error("Delay should not be negative");
            error.name = "MinExpectationNotMet";
            throw error;
        }
        else if (maxRetries < 0) {
            var error = new Error("MaxRetries should not be negative");
            error.name = "MinExpectationNotMet";
            throw error;
        }
        this.delay = Math.min(delay, RetryHandlerOptions.MAX_DELAY);
        this.maxRetries = Math.min(maxRetries, RetryHandlerOptions.MAX_MAX_RETRIES);
        this.shouldRetry = shouldRetry;
    }
    /**
     * @public
     * To get the maximum delay
     * @returns A maximum delay
     */
    RetryHandlerOptions.prototype.getMaxDelay = function () {
        return RetryHandlerOptions.MAX_DELAY;
    };
    /**
     * @private
     * @static
     * A member holding default delay value in seconds
     */
    RetryHandlerOptions.DEFAULT_DELAY = 3;
    /**
     * @private
     * @static
     * A member holding default maxRetries value
     */
    RetryHandlerOptions.DEFAULT_MAX_RETRIES = 3;
    /**
     * @private
     * @static
     * A member holding maximum delay value in seconds
     */
    RetryHandlerOptions.MAX_DELAY = 180;
    /**
     * @private
     * @static
     * A member holding maximum maxRetries value
     */
    RetryHandlerOptions.MAX_MAX_RETRIES = 10;
    /**
     * @private
     * A member holding default shouldRetry callback
     */
    RetryHandlerOptions.defaultShouldRetry = function () { return true; };
    return RetryHandlerOptions;
}());
exports.RetryHandlerOptions = RetryHandlerOptions;
//# sourceMappingURL=RetryHandlerOptions.js.map