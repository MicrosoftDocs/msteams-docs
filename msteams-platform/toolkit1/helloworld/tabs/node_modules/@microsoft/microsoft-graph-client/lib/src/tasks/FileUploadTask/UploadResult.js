"use strict";
/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadResult = void 0;
/**
 * Class representing a successful file upload result
 */
var UploadResult = /** @class */ (function () {
    /**
     * @public
     * @param {responseBody} responsebody - The response body from the completed upload response
     * @param {location} location - The location value from the headers from the completed upload response
     */
    function UploadResult(responseBody, location) {
        // Response body or the location parameter can be undefined.
        this._location = location;
        this._responseBody = responseBody;
    }
    Object.defineProperty(UploadResult.prototype, "location", {
        /**
         * @public
         * Get of the location value.
         * Location value is looked up in the response header
         */
        get: function () {
            return this._location;
        },
        /**
         * @public
         * Set the location value
         * Location value is looked up in the response header
         */
        set: function (location) {
            this._location = location;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(UploadResult.prototype, "responseBody", {
        /**
         * @public
         * Get The response body from the completed upload response
         */
        get: function () {
            return this._responseBody;
        },
        /**
         * @public
         * Set the response body from the completed upload response
         */
        set: function (responseBody) {
            this._responseBody = responseBody;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @public
     * @param {responseBody} responseBody - The response body from the completed upload response
     * @param {responseHeaders} responseHeaders - The headers from the completed upload response
     */
    UploadResult.CreateUploadResult = function (responseBody, responseHeaders) {
        return new UploadResult(responseBody, responseHeaders.get("location"));
    };
    return UploadResult;
}());
exports.UploadResult = UploadResult;
//# sourceMappingURL=UploadResult.js.map