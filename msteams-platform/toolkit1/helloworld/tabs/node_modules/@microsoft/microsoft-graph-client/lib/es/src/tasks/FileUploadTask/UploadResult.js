/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/**
 * Class representing a successful file upload result
 */
export class UploadResult {
    /**
     * @public
     * @param {responseBody} responsebody - The response body from the completed upload response
     * @param {location} location - The location value from the headers from the completed upload response
     */
    constructor(responseBody, location) {
        // Response body or the location parameter can be undefined.
        this._location = location;
        this._responseBody = responseBody;
    }
    /**
     * @public
     * Get of the location value.
     * Location value is looked up in the response header
     */
    get location() {
        return this._location;
    }
    /**
     * @public
     * Set the location value
     * Location value is looked up in the response header
     */
    set location(location) {
        this._location = location;
    }
    /**
     * @public
     * Get The response body from the completed upload response
     */
    get responseBody() {
        return this._responseBody;
    }
    /**
     * @public
     * Set the response body from the completed upload response
     */
    set responseBody(responseBody) {
        this._responseBody = responseBody;
    }
    /**
     * @public
     * @param {responseBody} responseBody - The response body from the completed upload response
     * @param {responseHeaders} responseHeaders - The headers from the completed upload response
     */
    static CreateUploadResult(responseBody, responseHeaders) {
        return new UploadResult(responseBody, responseHeaders.get("location"));
    }
}
//# sourceMappingURL=UploadResult.js.map