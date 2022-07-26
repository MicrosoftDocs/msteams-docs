"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _events = require("events");

var _writableTrackingBuffer = _interopRequireDefault(require("./tracking-buffer/writable-tracking-buffer"));

var _stream = require("stream");

var _token = require("./token/token");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @private
 */
const FLAGS = {
  nullable: 1 << 0,
  caseSen: 1 << 1,
  updateableReadWrite: 1 << 2,
  updateableUnknown: 1 << 3,
  identity: 1 << 4,
  computed: 1 << 5,
  // introduced in TDS 7.2
  fixedLenCLRType: 1 << 8,
  // introduced in TDS 7.2
  sparseColumnSet: 1 << 10,
  // introduced in TDS 7.3.B
  hidden: 1 << 13,
  // introduced in TDS 7.2
  key: 1 << 14,
  // introduced in TDS 7.2
  nullableUnknown: 1 << 15 // introduced in TDS 7.2

};
/**
 * @private
 */

const DONE_STATUS = {
  FINAL: 0x00,
  MORE: 0x1,
  ERROR: 0x2,
  INXACT: 0x4,
  COUNT: 0x10,
  ATTN: 0x20,
  SRVERROR: 0x100
};
/**
 * @private
 */

const rowTokenBuffer = Buffer.from([_token.TYPE.ROW]);
const textPointerAndTimestampBuffer = Buffer.from([// TextPointer length
0x10, // TextPointer
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // Timestamp
0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]);
const textPointerNullBuffer = Buffer.from([0x00]); // A transform that converts rows to packets.

class RowTransform extends _stream.Transform {
  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */
  constructor(bulkLoad) {
    super({
      writableObjectMode: true
    });
    this.columnMetadataWritten = void 0;
    this.bulkLoad = void 0;
    this.mainOptions = void 0;
    this.columns = void 0;
    this.bulkLoad = bulkLoad;
    this.mainOptions = bulkLoad.options;
    this.columns = bulkLoad.columns;
    this.columnMetadataWritten = false;
  }
  /**
   * @private
   */


  _transform(row, _encoding, callback) {
    if (!this.columnMetadataWritten) {
      this.push(this.bulkLoad.getColMetaData());
      this.columnMetadataWritten = true;
    }

    this.push(rowTokenBuffer);

    for (let i = 0; i < this.columns.length; i++) {
      const c = this.columns[i];
      let value = Array.isArray(row) ? row[i] : row[c.objName];

      if (!this.bulkLoad.firstRowWritten) {
        try {
          value = c.type.validate(value, c.collation);
        } catch (error) {
          return callback(error);
        }
      }

      const parameter = {
        length: c.length,
        scale: c.scale,
        precision: c.precision,
        value: value
      };

      if (c.type.name === 'Text' || c.type.name === 'Image' || c.type.name === 'NText') {
        if (value == null) {
          this.push(textPointerNullBuffer);
          continue;
        }

        this.push(textPointerAndTimestampBuffer);
      }

      this.push(c.type.generateParameterLength(parameter, this.mainOptions));

      for (const chunk of c.type.generateParameterData(parameter, this.mainOptions)) {
        this.push(chunk);
      }
    }

    process.nextTick(callback);
  }
  /**
   * @private
   */


  _flush(callback) {
    this.push(this.bulkLoad.createDoneToken());
    process.nextTick(callback);
  }

}
/**
 * A BulkLoad instance is used to perform a bulk insert.
 *
 * Use [[Connection.newBulkLoad]] to create a new instance, and [[Connection.execBulkLoad]] to execute it.
 *
 * Example of BulkLoad Usages:
 *
 * ```js
 * // optional BulkLoad options
 * const options = { keepNulls: true };
 *
 * // instantiate - provide the table where you'll be inserting to, options and a callback
 * const bulkLoad = connection.newBulkLoad('MyTable', options, (error, rowCount) => {
 *   console.log('inserted %d rows', rowCount);
 * });
 *
 * // setup your columns - always indicate whether the column is nullable
 * bulkLoad.addColumn('myInt', TYPES.Int, { nullable: false });
 * bulkLoad.addColumn('myString', TYPES.NVarChar, { length: 50, nullable: true });
 *
 * // execute
 * connection.execBulkLoad(bulkLoad, [
 *   { myInt: 7, myString: 'hello' },
 *   { myInt: 23, myString: 'world' }
 * ]);
 * ```
 */


class BulkLoad extends _events.EventEmitter {
  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */

  /**
   * @private
   */
  constructor(table, collation, connectionOptions, {
    checkConstraints = false,
    fireTriggers = false,
    keepNulls = false,
    lockTable = false,
    order = {}
  }, callback) {
    if (typeof checkConstraints !== 'boolean') {
      throw new TypeError('The "options.checkConstraints" property must be of type boolean.');
    }

    if (typeof fireTriggers !== 'boolean') {
      throw new TypeError('The "options.fireTriggers" property must be of type boolean.');
    }

    if (typeof keepNulls !== 'boolean') {
      throw new TypeError('The "options.keepNulls" property must be of type boolean.');
    }

    if (typeof lockTable !== 'boolean') {
      throw new TypeError('The "options.lockTable" property must be of type boolean.');
    }

    if (typeof order !== 'object' || order === null) {
      throw new TypeError('The "options.order" property must be of type object.');
    }

    for (const [column, direction] of Object.entries(order)) {
      if (direction !== 'ASC' && direction !== 'DESC') {
        throw new TypeError('The value of the "' + column + '" key in the "options.order" object must be either "ASC" or "DESC".');
      }
    }

    super();
    this.error = void 0;
    this.canceled = void 0;
    this.executionStarted = void 0;
    this.streamingMode = void 0;
    this.table = void 0;
    this.timeout = void 0;
    this.options = void 0;
    this.callback = void 0;
    this.columns = void 0;
    this.columnsByName = void 0;
    this.firstRowWritten = void 0;
    this.rowToPacketTransform = void 0;
    this.bulkOptions = void 0;
    this.connection = void 0;
    this.rows = void 0;
    this.rst = void 0;
    this.rowCount = void 0;
    this.collation = void 0;
    this.error = undefined;
    this.canceled = false;
    this.executionStarted = false;
    this.collation = collation;
    this.table = table;
    this.options = connectionOptions;
    this.callback = callback;
    this.columns = [];
    this.columnsByName = {};
    this.firstRowWritten = false;
    this.streamingMode = false;
    this.rowToPacketTransform = new RowTransform(this); // eslint-disable-line no-use-before-define

    this.bulkOptions = {
      checkConstraints,
      fireTriggers,
      keepNulls,
      lockTable,
      order
    };
  }
  /**
   * Adds a column to the bulk load.
   *
   * The column definitions should match the table you are trying to insert into.
   * Attempting to call addColumn after the first row has been added will throw an exception.
   *
   * ```js
   * bulkLoad.addColumn('MyIntColumn', TYPES.Int, { nullable: false });
   * ```
   *
   * @param name The name of the column.
   * @param type One of the supported `data types`.
   * @param __namedParameters Additional column type information. At a minimum, `nullable` must be set to true or false.
   * @param length For VarChar, NVarChar, VarBinary. Use length as `Infinity` for VarChar(max), NVarChar(max) and VarBinary(max).
   * @param nullable Indicates whether the column accepts NULL values.
   * @param objName If the name of the column is different from the name of the property found on `rowObj` arguments passed to [[addRow]] or [[Connection.execBulkLoad]], then you can use this option to specify the property name.
   * @param precision For Numeric, Decimal.
   * @param scale For Numeric, Decimal, Time, DateTime2, DateTimeOffset.
  */


  addColumn(name, type, {
    output = false,
    length,
    precision,
    scale,
    objName = name,
    nullable = true
  }) {
    if (this.firstRowWritten) {
      throw new Error('Columns cannot be added to bulk insert after the first row has been written.');
    }

    if (this.executionStarted) {
      throw new Error('Columns cannot be added to bulk insert after execution has started.');
    }

    const column = {
      type: type,
      name: name,
      value: null,
      output: output,
      length: length,
      precision: precision,
      scale: scale,
      objName: objName,
      nullable: nullable,
      collation: this.collation
    };

    if ((type.id & 0x30) === 0x20) {
      if (column.length == null && type.resolveLength) {
        column.length = type.resolveLength(column);
      }
    }

    if (type.resolvePrecision && column.precision == null) {
      column.precision = type.resolvePrecision(column);
    }

    if (type.resolveScale && column.scale == null) {
      column.scale = type.resolveScale(column);
    }

    this.columns.push(column);
    this.columnsByName[name] = column;
  }
  /**
   * @private
   */


  getOptionsSql() {
    const addOptions = [];

    if (this.bulkOptions.checkConstraints) {
      addOptions.push('CHECK_CONSTRAINTS');
    }

    if (this.bulkOptions.fireTriggers) {
      addOptions.push('FIRE_TRIGGERS');
    }

    if (this.bulkOptions.keepNulls) {
      addOptions.push('KEEP_NULLS');
    }

    if (this.bulkOptions.lockTable) {
      addOptions.push('TABLOCK');
    }

    if (this.bulkOptions.order) {
      const orderColumns = [];

      for (const [column, direction] of Object.entries(this.bulkOptions.order)) {
        orderColumns.push(`${column} ${direction}`);
      }

      if (orderColumns.length) {
        addOptions.push(`ORDER (${orderColumns.join(', ')})`);
      }
    }

    if (addOptions.length > 0) {
      return ` WITH (${addOptions.join(',')})`;
    } else {
      return '';
    }
  }
  /**
   * @private
   */


  getBulkInsertSql() {
    let sql = 'insert bulk ' + this.table + '(';

    for (let i = 0, len = this.columns.length; i < len; i++) {
      const c = this.columns[i];

      if (i !== 0) {
        sql += ', ';
      }

      sql += '[' + c.name + '] ' + c.type.declaration(c);
    }

    sql += ')';
    sql += this.getOptionsSql();
    return sql;
  }
  /**
   * This is simply a helper utility function which returns a `CREATE TABLE SQL` statement based on the columns added to the bulkLoad object.
   * This may be particularly handy when you want to insert into a temporary table (a table which starts with `#`).
   *
   * ```js
   * var sql = bulkLoad.getTableCreationSql();
   * ```
   *
   * A side note on bulk inserting into temporary tables: if you want to access a local temporary table after executing the bulk load,
   * you'll need to use the same connection and execute your requests using [[Connection.execSqlBatch]] instead of [[Connection.execSql]]
   */


  getTableCreationSql() {
    let sql = 'CREATE TABLE ' + this.table + '(\n';

    for (let i = 0, len = this.columns.length; i < len; i++) {
      const c = this.columns[i];

      if (i !== 0) {
        sql += ',\n';
      }

      sql += '[' + c.name + '] ' + c.type.declaration(c);

      if (c.nullable !== undefined) {
        sql += ' ' + (c.nullable ? 'NULL' : 'NOT NULL');
      }
    }

    sql += '\n)';
    return sql;
  }
  /**
   * @private
   */


  getColMetaData() {
    const tBuf = new _writableTrackingBuffer.default(100, null, true); // TokenType

    tBuf.writeUInt8(_token.TYPE.COLMETADATA); // Count

    tBuf.writeUInt16LE(this.columns.length);

    for (let j = 0, len = this.columns.length; j < len; j++) {
      const c = this.columns[j]; // UserType

      if (this.options.tdsVersion < '7_2') {
        tBuf.writeUInt16LE(0);
      } else {
        tBuf.writeUInt32LE(0);
      } // Flags


      let flags = FLAGS.updateableReadWrite;

      if (c.nullable) {
        flags |= FLAGS.nullable;
      } else if (c.nullable === undefined && this.options.tdsVersion >= '7_2') {
        flags |= FLAGS.nullableUnknown;
      }

      tBuf.writeUInt16LE(flags); // TYPE_INFO

      tBuf.writeBuffer(c.type.generateTypeInfo(c, this.options)); // TableName

      if (c.type.hasTableName) {
        tBuf.writeUsVarchar(this.table, 'ucs2');
      } // ColName


      tBuf.writeBVarchar(c.name, 'ucs2');
    }

    return tBuf.data;
  }
  /**
   * Sets a timeout for this bulk load.
   *
   * ```js
   * bulkLoad.setTimeout(timeout);
   * ```
   *
   * @param timeout The number of milliseconds before the bulk load is considered failed, or 0 for no timeout.
   *   When no timeout is set for the bulk load, the [[ConnectionOptions.requestTimeout]] of the Connection is used.
   */


  setTimeout(timeout) {
    this.timeout = timeout;
  }
  /**
   * @private
   */


  createDoneToken() {
    // It might be nice to make DoneToken a class if anything needs to create them, but for now, just do it here
    const tBuf = new _writableTrackingBuffer.default(this.options.tdsVersion < '7_2' ? 9 : 13);
    tBuf.writeUInt8(_token.TYPE.DONE);
    const status = DONE_STATUS.FINAL;
    tBuf.writeUInt16LE(status);
    tBuf.writeUInt16LE(0); // CurCmd (TDS ignores this)

    tBuf.writeUInt32LE(0); // row count - doesn't really matter

    if (this.options.tdsVersion >= '7_2') {
      tBuf.writeUInt32LE(0); // row count is 64 bits in >= TDS 7.2
    }

    return tBuf.data;
  }
  /**
   * @private
   */


  cancel() {
    if (this.canceled) {
      return;
    }

    this.canceled = true;
    this.emit('cancel');
  }

}

var _default = BulkLoad;
exports.default = _default;
module.exports = BulkLoad;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJGTEFHUyIsIm51bGxhYmxlIiwiY2FzZVNlbiIsInVwZGF0ZWFibGVSZWFkV3JpdGUiLCJ1cGRhdGVhYmxlVW5rbm93biIsImlkZW50aXR5IiwiY29tcHV0ZWQiLCJmaXhlZExlbkNMUlR5cGUiLCJzcGFyc2VDb2x1bW5TZXQiLCJoaWRkZW4iLCJrZXkiLCJudWxsYWJsZVVua25vd24iLCJET05FX1NUQVRVUyIsIkZJTkFMIiwiTU9SRSIsIkVSUk9SIiwiSU5YQUNUIiwiQ09VTlQiLCJBVFROIiwiU1JWRVJST1IiLCJyb3dUb2tlbkJ1ZmZlciIsIkJ1ZmZlciIsImZyb20iLCJUT0tFTl9UWVBFIiwiUk9XIiwidGV4dFBvaW50ZXJBbmRUaW1lc3RhbXBCdWZmZXIiLCJ0ZXh0UG9pbnRlck51bGxCdWZmZXIiLCJSb3dUcmFuc2Zvcm0iLCJUcmFuc2Zvcm0iLCJjb25zdHJ1Y3RvciIsImJ1bGtMb2FkIiwid3JpdGFibGVPYmplY3RNb2RlIiwiY29sdW1uTWV0YWRhdGFXcml0dGVuIiwibWFpbk9wdGlvbnMiLCJjb2x1bW5zIiwib3B0aW9ucyIsIl90cmFuc2Zvcm0iLCJyb3ciLCJfZW5jb2RpbmciLCJjYWxsYmFjayIsInB1c2giLCJnZXRDb2xNZXRhRGF0YSIsImkiLCJsZW5ndGgiLCJjIiwidmFsdWUiLCJBcnJheSIsImlzQXJyYXkiLCJvYmpOYW1lIiwiZmlyc3RSb3dXcml0dGVuIiwidHlwZSIsInZhbGlkYXRlIiwiY29sbGF0aW9uIiwiZXJyb3IiLCJwYXJhbWV0ZXIiLCJzY2FsZSIsInByZWNpc2lvbiIsIm5hbWUiLCJnZW5lcmF0ZVBhcmFtZXRlckxlbmd0aCIsImNodW5rIiwiZ2VuZXJhdGVQYXJhbWV0ZXJEYXRhIiwicHJvY2VzcyIsIm5leHRUaWNrIiwiX2ZsdXNoIiwiY3JlYXRlRG9uZVRva2VuIiwiQnVsa0xvYWQiLCJFdmVudEVtaXR0ZXIiLCJ0YWJsZSIsImNvbm5lY3Rpb25PcHRpb25zIiwiY2hlY2tDb25zdHJhaW50cyIsImZpcmVUcmlnZ2VycyIsImtlZXBOdWxscyIsImxvY2tUYWJsZSIsIm9yZGVyIiwiVHlwZUVycm9yIiwiY29sdW1uIiwiZGlyZWN0aW9uIiwiT2JqZWN0IiwiZW50cmllcyIsImNhbmNlbGVkIiwiZXhlY3V0aW9uU3RhcnRlZCIsInN0cmVhbWluZ01vZGUiLCJ0aW1lb3V0IiwiY29sdW1uc0J5TmFtZSIsInJvd1RvUGFja2V0VHJhbnNmb3JtIiwiYnVsa09wdGlvbnMiLCJjb25uZWN0aW9uIiwicm93cyIsInJzdCIsInJvd0NvdW50IiwidW5kZWZpbmVkIiwiYWRkQ29sdW1uIiwib3V0cHV0IiwiRXJyb3IiLCJpZCIsInJlc29sdmVMZW5ndGgiLCJyZXNvbHZlUHJlY2lzaW9uIiwicmVzb2x2ZVNjYWxlIiwiZ2V0T3B0aW9uc1NxbCIsImFkZE9wdGlvbnMiLCJvcmRlckNvbHVtbnMiLCJqb2luIiwiZ2V0QnVsa0luc2VydFNxbCIsInNxbCIsImxlbiIsImRlY2xhcmF0aW9uIiwiZ2V0VGFibGVDcmVhdGlvblNxbCIsInRCdWYiLCJXcml0YWJsZVRyYWNraW5nQnVmZmVyIiwid3JpdGVVSW50OCIsIkNPTE1FVEFEQVRBIiwid3JpdGVVSW50MTZMRSIsImoiLCJ0ZHNWZXJzaW9uIiwid3JpdGVVSW50MzJMRSIsImZsYWdzIiwid3JpdGVCdWZmZXIiLCJnZW5lcmF0ZVR5cGVJbmZvIiwiaGFzVGFibGVOYW1lIiwid3JpdGVVc1ZhcmNoYXIiLCJ3cml0ZUJWYXJjaGFyIiwiZGF0YSIsInNldFRpbWVvdXQiLCJET05FIiwic3RhdHVzIiwiY2FuY2VsIiwiZW1pdCIsIm1vZHVsZSIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi9zcmMvYnVsay1sb2FkLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEV2ZW50RW1pdHRlciB9IGZyb20gJ2V2ZW50cyc7XG5pbXBvcnQgV3JpdGFibGVUcmFja2luZ0J1ZmZlciBmcm9tICcuL3RyYWNraW5nLWJ1ZmZlci93cml0YWJsZS10cmFja2luZy1idWZmZXInO1xuaW1wb3J0IENvbm5lY3Rpb24sIHsgSW50ZXJuYWxDb25uZWN0aW9uT3B0aW9ucyB9IGZyb20gJy4vY29ubmVjdGlvbic7XG5cbmltcG9ydCB7IFRyYW5zZm9ybSB9IGZyb20gJ3N0cmVhbSc7XG5pbXBvcnQgeyBUWVBFIGFzIFRPS0VOX1RZUEUgfSBmcm9tICcuL3Rva2VuL3Rva2VuJztcblxuaW1wb3J0IHsgRGF0YVR5cGUsIFBhcmFtZXRlciB9IGZyb20gJy4vZGF0YS10eXBlJztcbmltcG9ydCB7IENvbGxhdGlvbiB9IGZyb20gJy4vY29sbGF0aW9uJztcblxuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBGTEFHUyA9IHtcbiAgbnVsbGFibGU6IDEgPDwgMCxcbiAgY2FzZVNlbjogMSA8PCAxLFxuICB1cGRhdGVhYmxlUmVhZFdyaXRlOiAxIDw8IDIsXG4gIHVwZGF0ZWFibGVVbmtub3duOiAxIDw8IDMsXG4gIGlkZW50aXR5OiAxIDw8IDQsXG4gIGNvbXB1dGVkOiAxIDw8IDUsIC8vIGludHJvZHVjZWQgaW4gVERTIDcuMlxuICBmaXhlZExlbkNMUlR5cGU6IDEgPDwgOCwgLy8gaW50cm9kdWNlZCBpbiBURFMgNy4yXG4gIHNwYXJzZUNvbHVtblNldDogMSA8PCAxMCwgLy8gaW50cm9kdWNlZCBpbiBURFMgNy4zLkJcbiAgaGlkZGVuOiAxIDw8IDEzLCAvLyBpbnRyb2R1Y2VkIGluIFREUyA3LjJcbiAga2V5OiAxIDw8IDE0LCAvLyBpbnRyb2R1Y2VkIGluIFREUyA3LjJcbiAgbnVsbGFibGVVbmtub3duOiAxIDw8IDE1IC8vIGludHJvZHVjZWQgaW4gVERTIDcuMlxufTtcblxuLyoqXG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBET05FX1NUQVRVUyA9IHtcbiAgRklOQUw6IDB4MDAsXG4gIE1PUkU6IDB4MSxcbiAgRVJST1I6IDB4MixcbiAgSU5YQUNUOiAweDQsXG4gIENPVU5UOiAweDEwLFxuICBBVFROOiAweDIwLFxuICBTUlZFUlJPUjogMHgxMDBcbn07XG5cbi8qKlxuICogQHByaXZhdGVcbiAqL1xuaW50ZXJmYWNlIEludGVybmFsT3B0aW9ucyB7XG4gIGNoZWNrQ29uc3RyYWludHM6IGJvb2xlYW47XG4gIGZpcmVUcmlnZ2VyczogYm9vbGVhbjtcbiAga2VlcE51bGxzOiBib29sZWFuO1xuICBsb2NrVGFibGU6IGJvb2xlYW47XG4gIG9yZGVyOiB7IFtjb2x1bW5OYW1lOiBzdHJpbmddOiAnQVNDJyB8ICdERVNDJyB9O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIE9wdGlvbnMge1xuICAvKipcbiAgICogSG9ub3JzIGNvbnN0cmFpbnRzIGR1cmluZyBidWxrIGxvYWQsIHVzaW5nIFQtU1FMXG4gICAqIFtDSEVDS19DT05TVFJBSU5UU10oaHR0cHM6Ly90ZWNobmV0Lm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczE4NjI0Nyh2PXNxbC4xMDUpLmFzcHgpLlxuICAgKiAoZGVmYXVsdDogYGZhbHNlYClcbiAgICovXG4gIGNoZWNrQ29uc3RyYWludHM/OiBJbnRlcm5hbE9wdGlvbnNbJ2NoZWNrQ29uc3RyYWludHMnXSB8IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogSG9ub3JzIGluc2VydCB0cmlnZ2VycyBkdXJpbmcgYnVsayBsb2FkLCB1c2luZyB0aGUgVC1TUUwgW0ZJUkVfVFJJR0dFUlNdKGh0dHBzOi8vdGVjaG5ldC5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvbXMxODc2NDAodj1zcWwuMTA1KS5hc3B4KS4gKGRlZmF1bHQ6IGBmYWxzZWApXG4gICAqL1xuICBmaXJlVHJpZ2dlcnM/OiBJbnRlcm5hbE9wdGlvbnNbJ2ZpcmVUcmlnZ2VycyddIHwgdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBIb25vcnMgbnVsbCB2YWx1ZSBwYXNzZWQsIGlnbm9yZXMgdGhlIGRlZmF1bHQgdmFsdWVzIHNldCBvbiB0YWJsZSwgdXNpbmcgVC1TUUwgW0tFRVBfTlVMTFNdKGh0dHBzOi8vbXNkbi5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvbXMxODc4ODcodj1zcWwuMTIwKS5hc3B4KS4gKGRlZmF1bHQ6IGBmYWxzZWApXG4gICAqL1xuICBrZWVwTnVsbHM/OiBJbnRlcm5hbE9wdGlvbnNbJ2tlZXBOdWxscyddIHwgdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBQbGFjZXMgYSBidWxrIHVwZGF0ZShCVSkgbG9jayBvbiB0YWJsZSB3aGlsZSBwZXJmb3JtaW5nIGJ1bGsgbG9hZCwgdXNpbmcgVC1TUUwgW1RBQkxPQ0tdKGh0dHBzOi8vdGVjaG5ldC5taWNyb3NvZnQuY29tL2VuLXVzL2xpYnJhcnkvbXMxODA4NzYodj1zcWwuMTA1KS5hc3B4KS4gKGRlZmF1bHQ6IGBmYWxzZWApXG4gICAqL1xuICBsb2NrVGFibGU/OiBJbnRlcm5hbE9wdGlvbnNbJ2xvY2tUYWJsZSddIHwgdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBTcGVjaWZpZXMgdGhlIG9yZGVyaW5nIG9mIHRoZSBkYXRhIHRvIHBvc3NpYmx5IGluY3JlYXNlIGJ1bGsgaW5zZXJ0IHBlcmZvcm1hbmNlLCB1c2luZyBULVNRTCBbT1JERVJdKGh0dHBzOi8vZG9jcy5taWNyb3NvZnQuY29tL2VuLXVzL3ByZXZpb3VzLXZlcnNpb25zL3NxbC9zcWwtc2VydmVyLTIwMDgtcjIvbXMxNzc0Njgodj1zcWwuMTA1KSkuIChkZWZhdWx0OiBge31gKVxuICAgKi9cbiAgb3JkZXI/OiBJbnRlcm5hbE9wdGlvbnNbJ29yZGVyJ10gfCB1bmRlZmluZWQ7XG59XG5cblxuZXhwb3J0IHR5cGUgQ2FsbGJhY2sgPVxuICAvKipcbiAgICogQSBmdW5jdGlvbiB3aGljaCB3aWxsIGJlIGNhbGxlZCBhZnRlciB0aGUgW1tCdWxrTG9hZF1dIGZpbmlzaGVzIGV4ZWN1dGluZy5cbiAgICpcbiAgICogQHBhcmFtIHJvd0NvdW50IHRoZSBudW1iZXIgb2Ygcm93cyBpbnNlcnRlZFxuICAgKi9cbiAgKGVycjogRXJyb3IgfCB1bmRlZmluZWQgfCBudWxsLCByb3dDb3VudD86IG51bWJlcikgPT4gdm9pZDtcblxuaW50ZXJmYWNlIENvbHVtbiBleHRlbmRzIFBhcmFtZXRlciB7XG4gIG9iak5hbWU6IHN0cmluZztcbiAgY29sbGF0aW9uOiBDb2xsYXRpb24gfCB1bmRlZmluZWQ7XG59XG5cbmludGVyZmFjZSBDb2x1bW5PcHRpb25zIHtcbiAgb3V0cHV0PzogYm9vbGVhbjtcblxuICAvKipcbiAgICogRm9yIFZhckNoYXIsIE5WYXJDaGFyLCBWYXJCaW5hcnkuIFVzZSBsZW5ndGggYXMgYEluZmluaXR5YCBmb3IgVmFyQ2hhcihtYXgpLCBOVmFyQ2hhcihtYXgpIGFuZCBWYXJCaW5hcnkobWF4KS5cbiAgICovXG4gIGxlbmd0aD86IG51bWJlcjtcblxuICAvKipcbiAgICogRm9yIE51bWVyaWMsIERlY2ltYWwuXG4gICAqL1xuICBwcmVjaXNpb24/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIEZvciBOdW1lcmljLCBEZWNpbWFsLCBUaW1lLCBEYXRlVGltZTIsIERhdGVUaW1lT2Zmc2V0LlxuICAgKi9cbiAgc2NhbGU/OiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIElmIHRoZSBuYW1lIG9mIHRoZSBjb2x1bW4gaXMgZGlmZmVyZW50IGZyb20gdGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IGZvdW5kIG9uIGByb3dPYmpgIGFyZ3VtZW50cyBwYXNzZWQgdG8gW1thZGRSb3ddXSwgdGhlbiB5b3UgY2FuIHVzZSB0aGlzIG9wdGlvbiB0byBzcGVjaWZ5IHRoZSBwcm9wZXJ0eSBuYW1lLlxuICAgKi9cbiAgb2JqTmFtZT86IHN0cmluZztcblxuICAvKipcbiAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGNvbHVtbiBhY2NlcHRzIE5VTEwgdmFsdWVzLlxuICAgKi9cbiAgbnVsbGFibGU/OiBib29sZWFuO1xufVxuXG5jb25zdCByb3dUb2tlbkJ1ZmZlciA9IEJ1ZmZlci5mcm9tKFsgVE9LRU5fVFlQRS5ST1cgXSk7XG5jb25zdCB0ZXh0UG9pbnRlckFuZFRpbWVzdGFtcEJ1ZmZlciA9IEJ1ZmZlci5mcm9tKFtcbiAgLy8gVGV4dFBvaW50ZXIgbGVuZ3RoXG4gIDB4MTAsXG5cbiAgLy8gVGV4dFBvaW50ZXJcbiAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCxcblxuICAvLyBUaW1lc3RhbXBcbiAgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMCwgMHgwMFxuXSk7XG5jb25zdCB0ZXh0UG9pbnRlck51bGxCdWZmZXIgPSBCdWZmZXIuZnJvbShbMHgwMF0pO1xuXG4vLyBBIHRyYW5zZm9ybSB0aGF0IGNvbnZlcnRzIHJvd3MgdG8gcGFja2V0cy5cbmNsYXNzIFJvd1RyYW5zZm9ybSBleHRlbmRzIFRyYW5zZm9ybSB7XG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY29sdW1uTWV0YWRhdGFXcml0dGVuOiBib29sZWFuO1xuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGJ1bGtMb2FkOiBCdWxrTG9hZDtcbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBtYWluT3B0aW9uczogQnVsa0xvYWRbJ29wdGlvbnMnXTtcbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBjb2x1bW5zOiBCdWxrTG9hZFsnY29sdW1ucyddO1xuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY29uc3RydWN0b3IoYnVsa0xvYWQ6IEJ1bGtMb2FkKSB7XG4gICAgc3VwZXIoeyB3cml0YWJsZU9iamVjdE1vZGU6IHRydWUgfSk7XG5cbiAgICB0aGlzLmJ1bGtMb2FkID0gYnVsa0xvYWQ7XG4gICAgdGhpcy5tYWluT3B0aW9ucyA9IGJ1bGtMb2FkLm9wdGlvbnM7XG4gICAgdGhpcy5jb2x1bW5zID0gYnVsa0xvYWQuY29sdW1ucztcblxuICAgIHRoaXMuY29sdW1uTWV0YWRhdGFXcml0dGVuID0gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF90cmFuc2Zvcm0ocm93OiBBcnJheTx1bmtub3duPiB8IHsgW2NvbE5hbWU6IHN0cmluZ106IHVua25vd24gfSwgX2VuY29kaW5nOiBzdHJpbmcsIGNhbGxiYWNrOiAoZXJyb3I/OiBFcnJvcikgPT4gdm9pZCkge1xuICAgIGlmICghdGhpcy5jb2x1bW5NZXRhZGF0YVdyaXR0ZW4pIHtcbiAgICAgIHRoaXMucHVzaCh0aGlzLmJ1bGtMb2FkLmdldENvbE1ldGFEYXRhKCkpO1xuICAgICAgdGhpcy5jb2x1bW5NZXRhZGF0YVdyaXR0ZW4gPSB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMucHVzaChyb3dUb2tlbkJ1ZmZlcik7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuY29sdW1ucy5sZW5ndGg7IGkrKykge1xuICAgICAgY29uc3QgYyA9IHRoaXMuY29sdW1uc1tpXTtcbiAgICAgIGxldCB2YWx1ZSA9IEFycmF5LmlzQXJyYXkocm93KSA/IHJvd1tpXSA6IHJvd1tjLm9iak5hbWVdO1xuXG4gICAgICBpZiAoIXRoaXMuYnVsa0xvYWQuZmlyc3RSb3dXcml0dGVuKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgdmFsdWUgPSBjLnR5cGUudmFsaWRhdGUodmFsdWUsIGMuY29sbGF0aW9uKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnJvcik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgcGFyYW1ldGVyID0ge1xuICAgICAgICBsZW5ndGg6IGMubGVuZ3RoLFxuICAgICAgICBzY2FsZTogYy5zY2FsZSxcbiAgICAgICAgcHJlY2lzaW9uOiBjLnByZWNpc2lvbixcbiAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICB9O1xuXG4gICAgICBpZiAoYy50eXBlLm5hbWUgPT09ICdUZXh0JyB8fCBjLnR5cGUubmFtZSA9PT0gJ0ltYWdlJyB8fCBjLnR5cGUubmFtZSA9PT0gJ05UZXh0Jykge1xuICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMucHVzaCh0ZXh0UG9pbnRlck51bGxCdWZmZXIpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wdXNoKHRleHRQb2ludGVyQW5kVGltZXN0YW1wQnVmZmVyKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5wdXNoKGMudHlwZS5nZW5lcmF0ZVBhcmFtZXRlckxlbmd0aChwYXJhbWV0ZXIsIHRoaXMubWFpbk9wdGlvbnMpKTtcbiAgICAgIGZvciAoY29uc3QgY2h1bmsgb2YgYy50eXBlLmdlbmVyYXRlUGFyYW1ldGVyRGF0YShwYXJhbWV0ZXIsIHRoaXMubWFpbk9wdGlvbnMpKSB7XG4gICAgICAgIHRoaXMucHVzaChjaHVuayk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcHJvY2Vzcy5uZXh0VGljayhjYWxsYmFjayk7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9mbHVzaChjYWxsYmFjazogKCkgPT4gdm9pZCkge1xuICAgIHRoaXMucHVzaCh0aGlzLmJ1bGtMb2FkLmNyZWF0ZURvbmVUb2tlbigpKTtcblxuICAgIHByb2Nlc3MubmV4dFRpY2soY2FsbGJhY2spO1xuICB9XG59XG5cbi8qKlxuICogQSBCdWxrTG9hZCBpbnN0YW5jZSBpcyB1c2VkIHRvIHBlcmZvcm0gYSBidWxrIGluc2VydC5cbiAqXG4gKiBVc2UgW1tDb25uZWN0aW9uLm5ld0J1bGtMb2FkXV0gdG8gY3JlYXRlIGEgbmV3IGluc3RhbmNlLCBhbmQgW1tDb25uZWN0aW9uLmV4ZWNCdWxrTG9hZF1dIHRvIGV4ZWN1dGUgaXQuXG4gKlxuICogRXhhbXBsZSBvZiBCdWxrTG9hZCBVc2FnZXM6XG4gKlxuICogYGBganNcbiAqIC8vIG9wdGlvbmFsIEJ1bGtMb2FkIG9wdGlvbnNcbiAqIGNvbnN0IG9wdGlvbnMgPSB7IGtlZXBOdWxsczogdHJ1ZSB9O1xuICpcbiAqIC8vIGluc3RhbnRpYXRlIC0gcHJvdmlkZSB0aGUgdGFibGUgd2hlcmUgeW91J2xsIGJlIGluc2VydGluZyB0bywgb3B0aW9ucyBhbmQgYSBjYWxsYmFja1xuICogY29uc3QgYnVsa0xvYWQgPSBjb25uZWN0aW9uLm5ld0J1bGtMb2FkKCdNeVRhYmxlJywgb3B0aW9ucywgKGVycm9yLCByb3dDb3VudCkgPT4ge1xuICogICBjb25zb2xlLmxvZygnaW5zZXJ0ZWQgJWQgcm93cycsIHJvd0NvdW50KTtcbiAqIH0pO1xuICpcbiAqIC8vIHNldHVwIHlvdXIgY29sdW1ucyAtIGFsd2F5cyBpbmRpY2F0ZSB3aGV0aGVyIHRoZSBjb2x1bW4gaXMgbnVsbGFibGVcbiAqIGJ1bGtMb2FkLmFkZENvbHVtbignbXlJbnQnLCBUWVBFUy5JbnQsIHsgbnVsbGFibGU6IGZhbHNlIH0pO1xuICogYnVsa0xvYWQuYWRkQ29sdW1uKCdteVN0cmluZycsIFRZUEVTLk5WYXJDaGFyLCB7IGxlbmd0aDogNTAsIG51bGxhYmxlOiB0cnVlIH0pO1xuICpcbiAqIC8vIGV4ZWN1dGVcbiAqIGNvbm5lY3Rpb24uZXhlY0J1bGtMb2FkKGJ1bGtMb2FkLCBbXG4gKiAgIHsgbXlJbnQ6IDcsIG15U3RyaW5nOiAnaGVsbG8nIH0sXG4gKiAgIHsgbXlJbnQ6IDIzLCBteVN0cmluZzogJ3dvcmxkJyB9XG4gKiBdKTtcbiAqIGBgYFxuICovXG5jbGFzcyBCdWxrTG9hZCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZXJyb3I6IEVycm9yIHwgdW5kZWZpbmVkO1xuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGNhbmNlbGVkOiBib29sZWFuO1xuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGV4ZWN1dGlvblN0YXJ0ZWQ6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgc3RyZWFtaW5nTW9kZTogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICB0YWJsZTogc3RyaW5nO1xuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHRpbWVvdXQ6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIG9wdGlvbnM6IEludGVybmFsQ29ubmVjdGlvbk9wdGlvbnM7XG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY2FsbGJhY2s6IENhbGxiYWNrO1xuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY29sdW1uczogQXJyYXk8Q29sdW1uPjtcbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBjb2x1bW5zQnlOYW1lOiB7IFtuYW1lOiBzdHJpbmddOiBDb2x1bW4gfTtcblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZpcnN0Um93V3JpdHRlbjogYm9vbGVhbjtcbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICByb3dUb1BhY2tldFRyYW5zZm9ybTogUm93VHJhbnNmb3JtO1xuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgYnVsa09wdGlvbnM6IEludGVybmFsT3B0aW9ucztcblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGNvbm5lY3Rpb246IENvbm5lY3Rpb24gfCB1bmRlZmluZWQ7XG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcm93czogQXJyYXk8YW55PiB8IHVuZGVmaW5lZDtcbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICByc3Q6IEFycmF5PGFueT4gfCB1bmRlZmluZWQ7XG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgcm93Q291bnQ6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICBjb2xsYXRpb246IENvbGxhdGlvbiB8IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGNvbnN0cnVjdG9yKHRhYmxlOiBzdHJpbmcsIGNvbGxhdGlvbjogQ29sbGF0aW9uIHwgdW5kZWZpbmVkLCBjb25uZWN0aW9uT3B0aW9uczogSW50ZXJuYWxDb25uZWN0aW9uT3B0aW9ucywge1xuICAgIGNoZWNrQ29uc3RyYWludHMgPSBmYWxzZSxcbiAgICBmaXJlVHJpZ2dlcnMgPSBmYWxzZSxcbiAgICBrZWVwTnVsbHMgPSBmYWxzZSxcbiAgICBsb2NrVGFibGUgPSBmYWxzZSxcbiAgICBvcmRlciA9IHt9LFxuICB9OiBPcHRpb25zLCBjYWxsYmFjazogQ2FsbGJhY2spIHtcbiAgICBpZiAodHlwZW9mIGNoZWNrQ29uc3RyYWludHMgIT09ICdib29sZWFuJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwib3B0aW9ucy5jaGVja0NvbnN0cmFpbnRzXCIgcHJvcGVydHkgbXVzdCBiZSBvZiB0eXBlIGJvb2xlYW4uJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBmaXJlVHJpZ2dlcnMgIT09ICdib29sZWFuJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVGhlIFwib3B0aW9ucy5maXJlVHJpZ2dlcnNcIiBwcm9wZXJ0eSBtdXN0IGJlIG9mIHR5cGUgYm9vbGVhbi4nKTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIGtlZXBOdWxscyAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgXCJvcHRpb25zLmtlZXBOdWxsc1wiIHByb3BlcnR5IG11c3QgYmUgb2YgdHlwZSBib29sZWFuLicpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgbG9ja1RhYmxlICE9PSAnYm9vbGVhbicpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcIm9wdGlvbnMubG9ja1RhYmxlXCIgcHJvcGVydHkgbXVzdCBiZSBvZiB0eXBlIGJvb2xlYW4uJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvcmRlciAhPT0gJ29iamVjdCcgfHwgb3JkZXIgPT09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBcIm9wdGlvbnMub3JkZXJcIiBwcm9wZXJ0eSBtdXN0IGJlIG9mIHR5cGUgb2JqZWN0LicpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgW2NvbHVtbiwgZGlyZWN0aW9uXSBvZiBPYmplY3QuZW50cmllcyhvcmRlcikpIHtcbiAgICAgIGlmIChkaXJlY3Rpb24gIT09ICdBU0MnICYmIGRpcmVjdGlvbiAhPT0gJ0RFU0MnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSB2YWx1ZSBvZiB0aGUgXCInICsgY29sdW1uICsgJ1wiIGtleSBpbiB0aGUgXCJvcHRpb25zLm9yZGVyXCIgb2JqZWN0IG11c3QgYmUgZWl0aGVyIFwiQVNDXCIgb3IgXCJERVNDXCIuJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuZXJyb3IgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5jYW5jZWxlZCA9IGZhbHNlO1xuICAgIHRoaXMuZXhlY3V0aW9uU3RhcnRlZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5jb2xsYXRpb24gPSBjb2xsYXRpb247XG5cbiAgICB0aGlzLnRhYmxlID0gdGFibGU7XG4gICAgdGhpcy5vcHRpb25zID0gY29ubmVjdGlvbk9wdGlvbnM7XG4gICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIHRoaXMuY29sdW1ucyA9IFtdO1xuICAgIHRoaXMuY29sdW1uc0J5TmFtZSA9IHt9O1xuICAgIHRoaXMuZmlyc3RSb3dXcml0dGVuID0gZmFsc2U7XG4gICAgdGhpcy5zdHJlYW1pbmdNb2RlID0gZmFsc2U7XG5cbiAgICB0aGlzLnJvd1RvUGFja2V0VHJhbnNmb3JtID0gbmV3IFJvd1RyYW5zZm9ybSh0aGlzKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11c2UtYmVmb3JlLWRlZmluZVxuXG4gICAgdGhpcy5idWxrT3B0aW9ucyA9IHsgY2hlY2tDb25zdHJhaW50cywgZmlyZVRyaWdnZXJzLCBrZWVwTnVsbHMsIGxvY2tUYWJsZSwgb3JkZXIgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGEgY29sdW1uIHRvIHRoZSBidWxrIGxvYWQuXG4gICAqXG4gICAqIFRoZSBjb2x1bW4gZGVmaW5pdGlvbnMgc2hvdWxkIG1hdGNoIHRoZSB0YWJsZSB5b3UgYXJlIHRyeWluZyB0byBpbnNlcnQgaW50by5cbiAgICogQXR0ZW1wdGluZyB0byBjYWxsIGFkZENvbHVtbiBhZnRlciB0aGUgZmlyc3Qgcm93IGhhcyBiZWVuIGFkZGVkIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uLlxuICAgKlxuICAgKiBgYGBqc1xuICAgKiBidWxrTG9hZC5hZGRDb2x1bW4oJ015SW50Q29sdW1uJywgVFlQRVMuSW50LCB7IG51bGxhYmxlOiBmYWxzZSB9KTtcbiAgICogYGBgXG4gICAqXG4gICAqIEBwYXJhbSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBjb2x1bW4uXG4gICAqIEBwYXJhbSB0eXBlIE9uZSBvZiB0aGUgc3VwcG9ydGVkIGBkYXRhIHR5cGVzYC5cbiAgICogQHBhcmFtIF9fbmFtZWRQYXJhbWV0ZXJzIEFkZGl0aW9uYWwgY29sdW1uIHR5cGUgaW5mb3JtYXRpb24uIEF0IGEgbWluaW11bSwgYG51bGxhYmxlYCBtdXN0IGJlIHNldCB0byB0cnVlIG9yIGZhbHNlLlxuICAgKiBAcGFyYW0gbGVuZ3RoIEZvciBWYXJDaGFyLCBOVmFyQ2hhciwgVmFyQmluYXJ5LiBVc2UgbGVuZ3RoIGFzIGBJbmZpbml0eWAgZm9yIFZhckNoYXIobWF4KSwgTlZhckNoYXIobWF4KSBhbmQgVmFyQmluYXJ5KG1heCkuXG4gICAqIEBwYXJhbSBudWxsYWJsZSBJbmRpY2F0ZXMgd2hldGhlciB0aGUgY29sdW1uIGFjY2VwdHMgTlVMTCB2YWx1ZXMuXG4gICAqIEBwYXJhbSBvYmpOYW1lIElmIHRoZSBuYW1lIG9mIHRoZSBjb2x1bW4gaXMgZGlmZmVyZW50IGZyb20gdGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IGZvdW5kIG9uIGByb3dPYmpgIGFyZ3VtZW50cyBwYXNzZWQgdG8gW1thZGRSb3ddXSBvciBbW0Nvbm5lY3Rpb24uZXhlY0J1bGtMb2FkXV0sIHRoZW4geW91IGNhbiB1c2UgdGhpcyBvcHRpb24gdG8gc3BlY2lmeSB0aGUgcHJvcGVydHkgbmFtZS5cbiAgICogQHBhcmFtIHByZWNpc2lvbiBGb3IgTnVtZXJpYywgRGVjaW1hbC5cbiAgICogQHBhcmFtIHNjYWxlIEZvciBOdW1lcmljLCBEZWNpbWFsLCBUaW1lLCBEYXRlVGltZTIsIERhdGVUaW1lT2Zmc2V0LlxuICAqL1xuICBhZGRDb2x1bW4obmFtZTogc3RyaW5nLCB0eXBlOiBEYXRhVHlwZSwgeyBvdXRwdXQgPSBmYWxzZSwgbGVuZ3RoLCBwcmVjaXNpb24sIHNjYWxlLCBvYmpOYW1lID0gbmFtZSwgbnVsbGFibGUgPSB0cnVlIH06IENvbHVtbk9wdGlvbnMpIHtcbiAgICBpZiAodGhpcy5maXJzdFJvd1dyaXR0ZW4pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ29sdW1ucyBjYW5ub3QgYmUgYWRkZWQgdG8gYnVsayBpbnNlcnQgYWZ0ZXIgdGhlIGZpcnN0IHJvdyBoYXMgYmVlbiB3cml0dGVuLicpO1xuICAgIH1cbiAgICBpZiAodGhpcy5leGVjdXRpb25TdGFydGVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvbHVtbnMgY2Fubm90IGJlIGFkZGVkIHRvIGJ1bGsgaW5zZXJ0IGFmdGVyIGV4ZWN1dGlvbiBoYXMgc3RhcnRlZC4nKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb2x1bW46IENvbHVtbiA9IHtcbiAgICAgIHR5cGU6IHR5cGUsXG4gICAgICBuYW1lOiBuYW1lLFxuICAgICAgdmFsdWU6IG51bGwsXG4gICAgICBvdXRwdXQ6IG91dHB1dCxcbiAgICAgIGxlbmd0aDogbGVuZ3RoLFxuICAgICAgcHJlY2lzaW9uOiBwcmVjaXNpb24sXG4gICAgICBzY2FsZTogc2NhbGUsXG4gICAgICBvYmpOYW1lOiBvYmpOYW1lLFxuICAgICAgbnVsbGFibGU6IG51bGxhYmxlLFxuICAgICAgY29sbGF0aW9uOiB0aGlzLmNvbGxhdGlvblxuICAgIH07XG5cbiAgICBpZiAoKHR5cGUuaWQgJiAweDMwKSA9PT0gMHgyMCkge1xuICAgICAgaWYgKGNvbHVtbi5sZW5ndGggPT0gbnVsbCAmJiB0eXBlLnJlc29sdmVMZW5ndGgpIHtcbiAgICAgICAgY29sdW1uLmxlbmd0aCA9IHR5cGUucmVzb2x2ZUxlbmd0aChjb2x1bW4pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlLnJlc29sdmVQcmVjaXNpb24gJiYgY29sdW1uLnByZWNpc2lvbiA9PSBudWxsKSB7XG4gICAgICBjb2x1bW4ucHJlY2lzaW9uID0gdHlwZS5yZXNvbHZlUHJlY2lzaW9uKGNvbHVtbik7XG4gICAgfVxuXG4gICAgaWYgKHR5cGUucmVzb2x2ZVNjYWxlICYmIGNvbHVtbi5zY2FsZSA9PSBudWxsKSB7XG4gICAgICBjb2x1bW4uc2NhbGUgPSB0eXBlLnJlc29sdmVTY2FsZShjb2x1bW4pO1xuICAgIH1cblxuICAgIHRoaXMuY29sdW1ucy5wdXNoKGNvbHVtbik7XG5cbiAgICB0aGlzLmNvbHVtbnNCeU5hbWVbbmFtZV0gPSBjb2x1bW47XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGdldE9wdGlvbnNTcWwoKSB7XG4gICAgY29uc3QgYWRkT3B0aW9ucyA9IFtdO1xuXG4gICAgaWYgKHRoaXMuYnVsa09wdGlvbnMuY2hlY2tDb25zdHJhaW50cykge1xuICAgICAgYWRkT3B0aW9ucy5wdXNoKCdDSEVDS19DT05TVFJBSU5UUycpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmJ1bGtPcHRpb25zLmZpcmVUcmlnZ2Vycykge1xuICAgICAgYWRkT3B0aW9ucy5wdXNoKCdGSVJFX1RSSUdHRVJTJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuYnVsa09wdGlvbnMua2VlcE51bGxzKSB7XG4gICAgICBhZGRPcHRpb25zLnB1c2goJ0tFRVBfTlVMTFMnKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5idWxrT3B0aW9ucy5sb2NrVGFibGUpIHtcbiAgICAgIGFkZE9wdGlvbnMucHVzaCgnVEFCTE9DSycpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmJ1bGtPcHRpb25zLm9yZGVyKSB7XG4gICAgICBjb25zdCBvcmRlckNvbHVtbnMgPSBbXTtcblxuICAgICAgZm9yIChjb25zdCBbY29sdW1uLCBkaXJlY3Rpb25dIG9mIE9iamVjdC5lbnRyaWVzKHRoaXMuYnVsa09wdGlvbnMub3JkZXIpKSB7XG4gICAgICAgIG9yZGVyQ29sdW1ucy5wdXNoKGAke2NvbHVtbn0gJHtkaXJlY3Rpb259YCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcmRlckNvbHVtbnMubGVuZ3RoKSB7XG4gICAgICAgIGFkZE9wdGlvbnMucHVzaChgT1JERVIgKCR7b3JkZXJDb2x1bW5zLmpvaW4oJywgJyl9KWApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChhZGRPcHRpb25zLmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybiBgIFdJVEggKCR7YWRkT3B0aW9ucy5qb2luKCcsJyl9KWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGdldEJ1bGtJbnNlcnRTcWwoKSB7XG4gICAgbGV0IHNxbCA9ICdpbnNlcnQgYnVsayAnICsgdGhpcy50YWJsZSArICcoJztcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5jb2x1bW5zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjb25zdCBjID0gdGhpcy5jb2x1bW5zW2ldO1xuICAgICAgaWYgKGkgIT09IDApIHtcbiAgICAgICAgc3FsICs9ICcsICc7XG4gICAgICB9XG4gICAgICBzcWwgKz0gJ1snICsgYy5uYW1lICsgJ10gJyArIChjLnR5cGUuZGVjbGFyYXRpb24oYykpO1xuICAgIH1cbiAgICBzcWwgKz0gJyknO1xuXG4gICAgc3FsICs9IHRoaXMuZ2V0T3B0aW9uc1NxbCgpO1xuICAgIHJldHVybiBzcWw7XG4gIH1cblxuICAvKipcbiAgICogVGhpcyBpcyBzaW1wbHkgYSBoZWxwZXIgdXRpbGl0eSBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGEgYENSRUFURSBUQUJMRSBTUUxgIHN0YXRlbWVudCBiYXNlZCBvbiB0aGUgY29sdW1ucyBhZGRlZCB0byB0aGUgYnVsa0xvYWQgb2JqZWN0LlxuICAgKiBUaGlzIG1heSBiZSBwYXJ0aWN1bGFybHkgaGFuZHkgd2hlbiB5b3Ugd2FudCB0byBpbnNlcnQgaW50byBhIHRlbXBvcmFyeSB0YWJsZSAoYSB0YWJsZSB3aGljaCBzdGFydHMgd2l0aCBgI2ApLlxuICAgKlxuICAgKiBgYGBqc1xuICAgKiB2YXIgc3FsID0gYnVsa0xvYWQuZ2V0VGFibGVDcmVhdGlvblNxbCgpO1xuICAgKiBgYGBcbiAgICpcbiAgICogQSBzaWRlIG5vdGUgb24gYnVsayBpbnNlcnRpbmcgaW50byB0ZW1wb3JhcnkgdGFibGVzOiBpZiB5b3Ugd2FudCB0byBhY2Nlc3MgYSBsb2NhbCB0ZW1wb3JhcnkgdGFibGUgYWZ0ZXIgZXhlY3V0aW5nIHRoZSBidWxrIGxvYWQsXG4gICAqIHlvdSdsbCBuZWVkIHRvIHVzZSB0aGUgc2FtZSBjb25uZWN0aW9uIGFuZCBleGVjdXRlIHlvdXIgcmVxdWVzdHMgdXNpbmcgW1tDb25uZWN0aW9uLmV4ZWNTcWxCYXRjaF1dIGluc3RlYWQgb2YgW1tDb25uZWN0aW9uLmV4ZWNTcWxdXVxuICAgKi9cbiAgZ2V0VGFibGVDcmVhdGlvblNxbCgpIHtcbiAgICBsZXQgc3FsID0gJ0NSRUFURSBUQUJMRSAnICsgdGhpcy50YWJsZSArICcoXFxuJztcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdGhpcy5jb2x1bW5zLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjb25zdCBjID0gdGhpcy5jb2x1bW5zW2ldO1xuICAgICAgaWYgKGkgIT09IDApIHtcbiAgICAgICAgc3FsICs9ICcsXFxuJztcbiAgICAgIH1cbiAgICAgIHNxbCArPSAnWycgKyBjLm5hbWUgKyAnXSAnICsgKGMudHlwZS5kZWNsYXJhdGlvbihjKSk7XG4gICAgICBpZiAoYy5udWxsYWJsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHNxbCArPSAnICcgKyAoYy5udWxsYWJsZSA/ICdOVUxMJyA6ICdOT1QgTlVMTCcpO1xuICAgICAgfVxuICAgIH1cbiAgICBzcWwgKz0gJ1xcbiknO1xuICAgIHJldHVybiBzcWw7XG4gIH1cblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGdldENvbE1ldGFEYXRhKCkge1xuICAgIGNvbnN0IHRCdWYgPSBuZXcgV3JpdGFibGVUcmFja2luZ0J1ZmZlcigxMDAsIG51bGwsIHRydWUpO1xuICAgIC8vIFRva2VuVHlwZVxuICAgIHRCdWYud3JpdGVVSW50OChUT0tFTl9UWVBFLkNPTE1FVEFEQVRBKTtcbiAgICAvLyBDb3VudFxuICAgIHRCdWYud3JpdGVVSW50MTZMRSh0aGlzLmNvbHVtbnMubGVuZ3RoKTtcblxuICAgIGZvciAobGV0IGogPSAwLCBsZW4gPSB0aGlzLmNvbHVtbnMubGVuZ3RoOyBqIDwgbGVuOyBqKyspIHtcbiAgICAgIGNvbnN0IGMgPSB0aGlzLmNvbHVtbnNbal07XG4gICAgICAvLyBVc2VyVHlwZVxuICAgICAgaWYgKHRoaXMub3B0aW9ucy50ZHNWZXJzaW9uIDwgJzdfMicpIHtcbiAgICAgICAgdEJ1Zi53cml0ZVVJbnQxNkxFKDApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdEJ1Zi53cml0ZVVJbnQzMkxFKDApO1xuICAgICAgfVxuXG4gICAgICAvLyBGbGFnc1xuICAgICAgbGV0IGZsYWdzID0gRkxBR1MudXBkYXRlYWJsZVJlYWRXcml0ZTtcbiAgICAgIGlmIChjLm51bGxhYmxlKSB7XG4gICAgICAgIGZsYWdzIHw9IEZMQUdTLm51bGxhYmxlO1xuICAgICAgfSBlbHNlIGlmIChjLm51bGxhYmxlID09PSB1bmRlZmluZWQgJiYgdGhpcy5vcHRpb25zLnRkc1ZlcnNpb24gPj0gJzdfMicpIHtcbiAgICAgICAgZmxhZ3MgfD0gRkxBR1MubnVsbGFibGVVbmtub3duO1xuICAgICAgfVxuICAgICAgdEJ1Zi53cml0ZVVJbnQxNkxFKGZsYWdzKTtcblxuICAgICAgLy8gVFlQRV9JTkZPXG4gICAgICB0QnVmLndyaXRlQnVmZmVyKGMudHlwZS5nZW5lcmF0ZVR5cGVJbmZvKGMsIHRoaXMub3B0aW9ucykpO1xuXG4gICAgICAvLyBUYWJsZU5hbWVcbiAgICAgIGlmIChjLnR5cGUuaGFzVGFibGVOYW1lKSB7XG4gICAgICAgIHRCdWYud3JpdGVVc1ZhcmNoYXIodGhpcy50YWJsZSwgJ3VjczInKTtcbiAgICAgIH1cblxuICAgICAgLy8gQ29sTmFtZVxuICAgICAgdEJ1Zi53cml0ZUJWYXJjaGFyKGMubmFtZSwgJ3VjczInKTtcbiAgICB9XG4gICAgcmV0dXJuIHRCdWYuZGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXRzIGEgdGltZW91dCBmb3IgdGhpcyBidWxrIGxvYWQuXG4gICAqXG4gICAqIGBgYGpzXG4gICAqIGJ1bGtMb2FkLnNldFRpbWVvdXQodGltZW91dCk7XG4gICAqIGBgYFxuICAgKlxuICAgKiBAcGFyYW0gdGltZW91dCBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBiZWZvcmUgdGhlIGJ1bGsgbG9hZCBpcyBjb25zaWRlcmVkIGZhaWxlZCwgb3IgMCBmb3Igbm8gdGltZW91dC5cbiAgICogICBXaGVuIG5vIHRpbWVvdXQgaXMgc2V0IGZvciB0aGUgYnVsayBsb2FkLCB0aGUgW1tDb25uZWN0aW9uT3B0aW9ucy5yZXF1ZXN0VGltZW91dF1dIG9mIHRoZSBDb25uZWN0aW9uIGlzIHVzZWQuXG4gICAqL1xuICBzZXRUaW1lb3V0KHRpbWVvdXQ/OiBudW1iZXIpIHtcbiAgICB0aGlzLnRpbWVvdXQgPSB0aW1lb3V0O1xuICB9XG5cbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBjcmVhdGVEb25lVG9rZW4oKSB7XG4gICAgLy8gSXQgbWlnaHQgYmUgbmljZSB0byBtYWtlIERvbmVUb2tlbiBhIGNsYXNzIGlmIGFueXRoaW5nIG5lZWRzIHRvIGNyZWF0ZSB0aGVtLCBidXQgZm9yIG5vdywganVzdCBkbyBpdCBoZXJlXG4gICAgY29uc3QgdEJ1ZiA9IG5ldyBXcml0YWJsZVRyYWNraW5nQnVmZmVyKHRoaXMub3B0aW9ucy50ZHNWZXJzaW9uIDwgJzdfMicgPyA5IDogMTMpO1xuICAgIHRCdWYud3JpdGVVSW50OChUT0tFTl9UWVBFLkRPTkUpO1xuICAgIGNvbnN0IHN0YXR1cyA9IERPTkVfU1RBVFVTLkZJTkFMO1xuICAgIHRCdWYud3JpdGVVSW50MTZMRShzdGF0dXMpO1xuICAgIHRCdWYud3JpdGVVSW50MTZMRSgwKTsgLy8gQ3VyQ21kIChURFMgaWdub3JlcyB0aGlzKVxuICAgIHRCdWYud3JpdGVVSW50MzJMRSgwKTsgLy8gcm93IGNvdW50IC0gZG9lc24ndCByZWFsbHkgbWF0dGVyXG4gICAgaWYgKHRoaXMub3B0aW9ucy50ZHNWZXJzaW9uID49ICc3XzInKSB7XG4gICAgICB0QnVmLndyaXRlVUludDMyTEUoMCk7IC8vIHJvdyBjb3VudCBpcyA2NCBiaXRzIGluID49IFREUyA3LjJcbiAgICB9XG4gICAgcmV0dXJuIHRCdWYuZGF0YTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgY2FuY2VsKCkge1xuICAgIGlmICh0aGlzLmNhbmNlbGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5jYW5jZWxlZCA9IHRydWU7XG4gICAgdGhpcy5lbWl0KCdjYW5jZWwnKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCdWxrTG9hZDtcbm1vZHVsZS5leHBvcnRzID0gQnVsa0xvYWQ7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFHQTs7QUFDQTs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBLE1BQU1BLEtBQUssR0FBRztFQUNaQyxRQUFRLEVBQUUsS0FBSyxDQURIO0VBRVpDLE9BQU8sRUFBRSxLQUFLLENBRkY7RUFHWkMsbUJBQW1CLEVBQUUsS0FBSyxDQUhkO0VBSVpDLGlC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