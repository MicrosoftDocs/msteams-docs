"use strict";
/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUpload = void 0;
var GraphClientError_1 = require("../../../GraphClientError");
/**
 * @class
 * Class used for creating LargeFileUploadTask fileobject.
 * This class accepts files of type ArrayBuffer, Blob, Uint8Array.
 */
var FileUpload = /** @class */ (function () {
    /**
     * @public
     * @constructor
     * @param {ArrayBuffer | Blob | Uint8Array} content - The file to be uploaded
     * @param {string} name - The name of the file to be uploaded
     * @param {number} size - The total size of the file to be uploaded
     * @returns An instance of the FileUpload class
     */
    function FileUpload(content, name, size) {
        this.content = content;
        this.name = name;
        this.size = size;
        if (!content || !name || !size) {
            throw new GraphClientError_1.GraphClientError("Please provide the upload content, name of the file and size of the file");
        }
    }
    /**
     * @public
     * Slices the file content to the given range
     * @param {Range} range - The range value
     * @returns The sliced file part
     */
    FileUpload.prototype.sliceFile = function (range) {
        return this.content.slice(range.minValue, range.maxValue + 1);
    };
    return FileUpload;
}());
exports.FileUpload = FileUpload;
//# sourceMappingURL=FileUpload.js.map