"use strict";
/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.GRAPH_URLS = exports.GRAPH_BASE_URL = exports.GRAPH_API_VERSION = void 0;
/**
 * @module Constants
 */
/**
 * @constant
 * A Default API endpoint version for a request
 */
exports.GRAPH_API_VERSION = "v1.0";
/**
 * @constant
 * A Default base url for a request
 */
exports.GRAPH_BASE_URL = "https://graph.microsoft.com/";
/**
 * To hold list of the service root endpoints for Microsoft Graph and Graph Explorer for each national cloud.
 * Set(iterable:Object) is not supported in Internet Explorer. The consumer is recommended to use a suitable polyfill.
 */
exports.GRAPH_URLS = new Set(["graph.microsoft.com", "graph.microsoft.us", "dod-graph.microsoft.us", "graph.microsoft.de", "microsoftgraph.chinacloudapi.cn", "canary.graph.microsoft.com"]);
//# sourceMappingURL=Constants.js.map