/**
 * -------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation.  All Rights Reserved.  Licensed under the MIT License.
 * See License in the project root for license information.
 * -------------------------------------------------------------------------------------------
 */
import { GraphClientError } from "../../../GraphClientError";
/**
 * @class
 * Class used for creating LargeFileUploadTask fileobject.
 * This class accepts files of type ArrayBuffer, Blob, Uint8Array.
 */
export class FileUpload {
    /**
     * @public
     * @constructor
     * @param {ArrayBuffer | Blob | Uint8Array} content - The file to be uploaded
     * @param {string} name - The name of the file to be uploaded
     * @param {number} size - The total size of the file to be uploaded
     * @returns An instance of the FileUpload class
     */
    constructor(content, name, size) {
        this.content = content;
        this.name = name;
        this.size = size;
        if (!content || !name || !size) {
            throw new GraphClientError("Please provide the upload content, name of the file and size of the file");
        }
    }
    /**
     * @public
     * Slices the file content to the given range
     * @param {Range} range - The range value
     * @returns The sliced file part
     */
    sliceFile(range) {
        return this.content.slice(range.minValue, range.maxValue + 1);
    }
}
//# sourceMappingURL=FileUpload.js.map