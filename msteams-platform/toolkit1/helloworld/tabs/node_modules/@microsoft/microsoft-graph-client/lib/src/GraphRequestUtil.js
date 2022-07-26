"use strict";
/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCustomHost = exports.isGraphURL = exports.serializeContent = exports.urlJoin = exports.oDataQueryNames = void 0;
/**
 * @module GraphRequestUtil
 */
var Constants_1 = require("./Constants");
var GraphClientError_1 = require("./GraphClientError");
/**
 * To hold list of OData query params
 */
exports.oDataQueryNames = ["$select", "$expand", "$orderby", "$filter", "$top", "$skip", "$skipToken", "$count"];
/**
 * To construct the URL by appending the segments with "/"
 * @param {string[]} urlSegments - The array of strings
 * @returns The constructed URL string
 */
var urlJoin = function (urlSegments) {
    var removePostSlash = function (s) { return s.replace(/\/+$/, ""); };
    var removePreSlash = function (s) { return s.replace(/^\/+/, ""); };
    var joiner = function (pre, cur) { return [removePostSlash(pre), removePreSlash(cur)].join("/"); };
    var parts = Array.prototype.slice.call(urlSegments);
    return parts.reduce(joiner);
};
exports.urlJoin = urlJoin;
/**
 * Serializes the content
 * @param {any} content - The content value that needs to be serialized
 * @returns The serialized content
 *
 * Note:
 * This conversion is required due to the following reasons:
 * Body parameter of Request method of isomorphic-fetch only accepts Blob, ArrayBuffer, FormData, TypedArrays string.
 * Node.js platform does not support Blob, FormData. Javascript File object inherits from Blob so it is also not supported in node. Therefore content of type Blob, File, FormData will only come from browsers.
 * Parallel to ArrayBuffer in javascript, node provides Buffer interface. Node's Buffer is able to send the arbitrary binary data to the server successfully for both Browser and Node platform. Whereas sending binary data via ArrayBuffer or TypedArrays was only possible using Browser. To support both Node and Browser, `serializeContent` converts TypedArrays or ArrayBuffer to `Node Buffer`.
 * If the data received is in JSON format, `serializeContent` converts the JSON to string.
 */
var serializeContent = function (content) {
    var className = content && content.constructor && content.constructor.name;
    if (className === "Buffer" || className === "Blob" || className === "File" || className === "FormData" || typeof content === "string") {
        return content;
    }
    if (className === "ArrayBuffer") {
        content = Buffer.from(content);
    }
    else if (className === "Int8Array" || className === "Int16Array" || className === "Int32Array" || className === "Uint8Array" || className === "Uint16Array" || className === "Uint32Array" || className === "Uint8ClampedArray" || className === "Float32Array" || className === "Float64Array" || className === "DataView") {
        content = Buffer.from(content.buffer);
    }
    else {
        try {
            content = JSON.stringify(content);
        }
        catch (error) {
            throw new Error("Unable to stringify the content");
        }
    }
    return content;
};
exports.serializeContent = serializeContent;
/**
 * Checks if the url is one of the service root endpoints for Microsoft Graph and Graph Explorer.
 * @param {string} url - The url to be verified
 * @returns {boolean} - Returns true if the url is a Graph URL
 */
var isGraphURL = function (url) {
    return isValidEndpoint(url);
};
exports.isGraphURL = isGraphURL;
/**
 * Checks if the url is for one of the custom hosts provided during client initialization
 * @param {string} url - The url to be verified
 * @param {Set} customHosts - The url to be verified
 * @returns {boolean} - Returns true if the url is a for a custom host
 */
var isCustomHost = function (url, customHosts) {
    customHosts.forEach(function (host) { return isCustomHostValid(host); });
    return isValidEndpoint(url, customHosts);
};
exports.isCustomHost = isCustomHost;
/**
 * Checks if the url is for one of the provided hosts.
 * @param {string} url - The url to be verified
 * @param {Set<string>} allowedHosts - A set of hosts.
 * @returns {boolean} - Returns true is for one of the provided endpoints.
 */
var isValidEndpoint = function (url, allowedHosts) {
    if (allowedHosts === void 0) { allowedHosts = Constants_1.GRAPH_URLS; }
    // Valid Graph URL pattern - https://graph.microsoft.com/{version}/{resource}?{query-parameters}
    // Valid Graph URL example - https://graph.microsoft.com/v1.0/
    url = url.toLowerCase();
    if (url.indexOf("https://") !== -1) {
        url = url.replace("https://", "");
        // Find where the host ends
        var startofPortNoPos = url.indexOf(":");
        var endOfHostStrPos = url.indexOf("/");
        var hostName = "";
        if (endOfHostStrPos !== -1) {
            if (startofPortNoPos !== -1 && startofPortNoPos < endOfHostStrPos) {
                hostName = url.substring(0, startofPortNoPos);
                return allowedHosts.has(hostName);
            }
            // Parse out the host
            hostName = url.substring(0, endOfHostStrPos);
            return allowedHosts.has(hostName);
        }
    }
    return false;
};
/**
 * Throws error if the string is not a valid host/hostname and contains other url parts.
 * @param {string} host - The host to be verified
 */
var isCustomHostValid = function (host) {
    if (host.indexOf("/") !== -1) {
        throw new GraphClientError_1.GraphClientError("Please add only hosts or hostnames to the CustomHosts config. If the url is `http://example.com:3000/`, host is `example:3000`");
    }
};
//# sourceMappingURL=GraphRequestUtil.js.map