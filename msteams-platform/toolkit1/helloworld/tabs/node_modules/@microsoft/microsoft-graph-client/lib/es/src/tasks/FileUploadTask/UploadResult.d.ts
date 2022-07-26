/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/**
 * Class representing a successful file upload result
 */
export declare class UploadResult {
    /**
     * @private
     * Location value looked up in the response header
     */
    private _location;
    /**
     * @private
     * Response body of the final raw response
     */
    private _responseBody;
    /**
     * @public
     * Get of the location value.
     * Location value is looked up in the response header
     */
    get location(): string;
    /**
     * @public
     * Set the location value
     * Location value is looked up in the response header
     */
    set location(location: string);
    /**
     * @public
     * Get The response body from the completed upload response
     */
    get responseBody(): unknown;
    /**
     * @public
     * Set the response body from the completed upload response
     */
    set responseBody(responseBody: unknown);
    /**
     * @public
     * @param {responseBody} responsebody - The response body from the completed upload response
     * @param {location} location - The location value from the headers from the completed upload response
     */
    constructor(responseBody: unknown, location: string);
    /**
     * @public
     * @param {responseBody} responseBody - The response body from the completed upload response
     * @param {responseHeaders} responseHeaders - The headers from the completed upload response
     */
    static CreateUploadResult(responseBody?: unknown, responseHeaders?: Headers): UploadResult;
}
