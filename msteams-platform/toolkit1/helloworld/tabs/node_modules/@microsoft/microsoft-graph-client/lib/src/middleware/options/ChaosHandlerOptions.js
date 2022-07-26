"use strict";
/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChaosHandlerOptions = void 0;
/**
 * @module ChaosHandlerOptions
 */
var ChaosStrategy_1 = require("./ChaosStrategy");
/**
 * Class representing ChaosHandlerOptions
 * @class
 * Class
 * @implements MiddlewareOptions
 */
var ChaosHandlerOptions = /** @class */ (function () {
    /**
     * @public
     * @constructor
     * To create an instance of Testing Handler Options
     * @param {ChaosStrategy} chaosStrategy - Specifies the startegy used for the Testing Handler -> RAMDOM/MANUAL
     * @param {string} statusMessage - The Message to be returned in the response
     * @param {number?} statusCode - The statusCode to be returned in the response
     * @param {number?} chaosPercentage - The percentage of randomness/chaos in the handler
     * @param {any?} responseBody - The response body to be returned in the response
     * @returns An instance of ChaosHandlerOptions
     */
    function ChaosHandlerOptions(chaosStrategy, statusMessage, statusCode, chaosPercentage, responseBody, headers) {
        if (chaosStrategy === void 0) { chaosStrategy = ChaosStrategy_1.ChaosStrategy.RANDOM; }
        if (statusMessage === void 0) { statusMessage = "Some error Happened"; }
        this.chaosStrategy = chaosStrategy;
        this.statusCode = statusCode;
        this.statusMessage = statusMessage;
        this.chaosPercentage = chaosPercentage !== undefined ? chaosPercentage : 10;
        this.responseBody = responseBody;
        this.headers = headers;
        if (this.chaosPercentage > 100) {
            throw new Error("Error Pecentage can not be more than 100");
        }
    }
    return ChaosHandlerOptions;
}());
exports.ChaosHandlerOptions = ChaosHandlerOptions;
//# sourceMappingURL=ChaosHandlerOptions.js.map