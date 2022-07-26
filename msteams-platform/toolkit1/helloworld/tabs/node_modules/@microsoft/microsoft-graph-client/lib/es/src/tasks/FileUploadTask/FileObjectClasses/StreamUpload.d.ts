import { FileObject, SliceType } from "../../LargeFileUploadTask";
import { Range } from "../Range";
/**
 * @class
 * FileObject class for Readable Stream upload
 */
export declare class StreamUpload implements FileObject<NodeStream> {
    content: NodeStream;
    name: string;
    size: number;
    /**
     * @private
     * Represents a cache of the last attempted upload slice.
     * This can be used when resuming a previously failed slice upload.
     */
    private previousSlice;
    constructor(content: NodeStream, name: string, size: number);
    /**
     * @public
     * Slices the file content to the given range
     * @param {Range} range - The range value
     * @returns The sliced file part
     */
    sliceFile(range: Range): Promise<SliceType>;
    /**
     * @private
     * Reads the specified byte size from the stream
     * @param {number} size - The size of bytes to be read
     * @returns Buffer with the given length of data.
     */
    private readNBytesFromStream;
}
