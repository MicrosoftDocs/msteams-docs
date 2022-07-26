/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
/**
 * To hold list of OData query params
 */
export declare const oDataQueryNames: string[];
/**
 * To construct the URL by appending the segments with "/"
 * @param {string[]} urlSegments - The array of strings
 * @returns The constructed URL string
 */
export declare const urlJoin: (urlSegments: string[]) => string;
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
export declare const serializeContent: (content: any) => any;
/**
 * Checks if the url is one of the service root endpoints for Microsoft Graph and Graph Explorer.
 * @param {string} url - The url to be verified
 * @returns {boolean} - Returns true if the url is a Graph URL
 */
export declare const isGraphURL: (url: string) => boolean;
/**
 * Checks if the url is for one of the custom hosts provided during client initialization
 * @param {string} url - The url to be verified
 * @param {Set} customHosts - The url to be verified
 * @returns {boolean} - Returns true if the url is a for a custom host
 */
export declare const isCustomHost: (url: string, customHosts: Set<string>) => boolean;
