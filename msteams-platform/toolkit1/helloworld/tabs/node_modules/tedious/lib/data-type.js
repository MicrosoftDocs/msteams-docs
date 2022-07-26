"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeByName = exports.TYPES = exports.TYPE = void 0;

var _null = _interopRequireDefault(require("./data-types/null"));

var _tinyint = _interopRequireDefault(require("./data-types/tinyint"));

var _bit = _interopRequireDefault(require("./data-types/bit"));

var _smallint = _interopRequireDefault(require("./data-types/smallint"));

var _int = _interopRequireDefault(require("./data-types/int"));

var _smalldatetime = _interopRequireDefault(require("./data-types/smalldatetime"));

var _real = _interopRequireDefault(require("./data-types/real"));

var _money = _interopRequireDefault(require("./data-types/money"));

var _datetime = _interopRequireDefault(require("./data-types/datetime"));

var _float = _interopRequireDefault(require("./data-types/float"));

var _decimal = _interopRequireDefault(require("./data-types/decimal"));

var _numeric = _interopRequireDefault(require("./data-types/numeric"));

var _smallmoney = _interopRequireDefault(require("./data-types/smallmoney"));

var _bigint = _interopRequireDefault(require("./data-types/bigint"));

var _image = _interopRequireDefault(require("./data-types/image"));

var _text = _interopRequireDefault(require("./data-types/text"));

var _uniqueidentifier = _interopRequireDefault(require("./data-types/uniqueidentifier"));

var _intn = _interopRequireDefault(require("./data-types/intn"));

var _ntext = _interopRequireDefault(require("./data-types/ntext"));

var _bitn = _interopRequireDefault(require("./data-types/bitn"));

var _decimaln = _interopRequireDefault(require("./data-types/decimaln"));

var _numericn = _interopRequireDefault(require("./data-types/numericn"));

var _floatn = _interopRequireDefault(require("./data-types/floatn"));

var _moneyn = _interopRequireDefault(require("./data-types/moneyn"));

var _datetimen = _interopRequireDefault(require("./data-types/datetimen"));

var _varbinary = _interopRequireDefault(require("./data-types/varbinary"));

var _varchar = _interopRequireDefault(require("./data-types/varchar"));

var _binary = _interopRequireDefault(require("./data-types/binary"));

var _char = _interopRequireDefault(require("./data-types/char"));

var _nvarchar = _interopRequireDefault(require("./data-types/nvarchar"));

var _nchar = _interopRequireDefault(require("./data-types/nchar"));

var _xml = _interopRequireDefault(require("./data-types/xml"));

var _time = _interopRequireDefault(require("./data-types/time"));

var _date = _interopRequireDefault(require("./data-types/date"));

var _datetime2 = _interopRequireDefault(require("./data-types/datetime2"));

var _datetimeoffset = _interopRequireDefault(require("./data-types/datetimeoffset"));

var _udt = _interopRequireDefault(require("./data-types/udt"));

var _tvp = _interopRequireDefault(require("./data-types/tvp"));

var _sqlVariant = _interopRequireDefault(require("./data-types/sql-variant"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TYPE = {
  [_null.default.id]: _null.default,
  [_tinyint.default.id]: _tinyint.default,
  [_bit.default.id]: _bit.default,
  [_smallint.default.id]: _smallint.default,
  [_int.default.id]: _int.default,
  [_smalldatetime.default.id]: _smalldatetime.default,
  [_real.default.id]: _real.default,
  [_money.default.id]: _money.default,
  [_datetime.default.id]: _datetime.default,
  [_float.default.id]: _float.default,
  [_decimal.default.id]: _decimal.default,
  [_numeric.default.id]: _numeric.default,
  [_smallmoney.default.id]: _smallmoney.default,
  [_bigint.default.id]: _bigint.default,
  [_image.default.id]: _image.default,
  [_text.default.id]: _text.default,
  [_uniqueidentifier.default.id]: _uniqueidentifier.default,
  [_intn.default.id]: _intn.default,
  [_ntext.default.id]: _ntext.default,
  [_bitn.default.id]: _bitn.default,
  [_decimaln.default.id]: _decimaln.default,
  [_numericn.default.id]: _numericn.default,
  [_floatn.default.id]: _floatn.default,
  [_moneyn.default.id]: _moneyn.default,
  [_datetimen.default.id]: _datetimen.default,
  [_varbinary.default.id]: _varbinary.default,
  [_varchar.default.id]: _varchar.default,
  [_binary.default.id]: _binary.default,
  [_char.default.id]: _char.default,
  [_nvarchar.default.id]: _nvarchar.default,
  [_nchar.default.id]: _nchar.default,
  [_xml.default.id]: _xml.default,
  [_time.default.id]: _time.default,
  [_date.default.id]: _date.default,
  [_datetime2.default.id]: _datetime2.default,
  [_datetimeoffset.default.id]: _datetimeoffset.default,
  [_udt.default.id]: _udt.default,
  [_tvp.default.id]: _tvp.default,
  [_sqlVariant.default.id]: _sqlVariant.default
};
/**
 * <table>
 * <thead>
 *   <tr>
 *     <th>Type</th>
 *     <th>Constant</th>
 *     <th>JavaScript</th>
 *     <th>Result set</th>
 *     <th>Parameter</th>
 *   </tr>
 * </thead>
 *
 * <tbody>
 *   <tr class="group-heading">
 *     <th colspan="5">Exact numerics</th>
 *   </tr>
 *   <tr>
 *     <td><code>bit</code></td>
 *     <td><code>[[TYPES.Bit]]</code></td>
 *     <td><code>boolean</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>tinyint</code></td>
 *     <td><code>[[TYPES.TinyInt]]</code></td>
 *     <td><code>number</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>smallint</code></td>
 *     <td><code>[[TYPES.SmallInt]]</code></td>
 *     <td><code>number</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>int</code></td>
 *     <td><code>[[TYPES.Int]]</code></td>
 *     <td><code>number</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>bigint</code><sup>1</sup></td>
 *     <td><code>[[TYPES.BigInt]]</code></td>
 *     <td><code>string</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>numeric</code><sup>2</sup></td>
 *     <td><code>[[TYPES.Numeric]]</code></td>
 *     <td><code>number</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>decimal</code><sup>2</sup></td>
 *     <td><code>[[TYPES.Decimal]]</code></td>
 *     <td><code>number</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>smallmoney</code></td>
 *     <td><code>[[TYPES.SmallMoney]]</code></td>
 *     <td><code>number</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>money</code></td>
 *     <td><code>[[TYPES.Money]]</code></td>
 *     <td><code>number</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 * </tbody>
 *
 * <tbody>
 *   <tr class="group-heading">
 *     <th colspan="5">Approximate numerics</th>
 *   </tr>
 *   <tr>
 *     <td><code>float</code></td>
 *     <td><code>[[TYPES.Float]]</code></td>
 *     <td><code>number</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>real</code></td>
 *     <td><code>[[TYPES.Real]]</code></td>
 *     <td><code>number</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 * </tbody>
 *
 * <tbody>
 *   <tr class="group-heading">
 *     <th colspan="4">Date and Time</th>
 *   </tr>
 *   <tr>
 *     <td><code>smalldatetime</code></td>
 *     <td><code>[[TYPES.SmallDateTime]]</code></td>
 *     <td><code>Date</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>datetime</code></td>
 *     <td><code>[[TYPES.DateTime]]</code></td>
 *     <td><code>Date</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>datetime2</code></td>
 *     <td><code>[[TYPES.DateTime2]]</code></td>
 *     <td><code>Date</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>datetimeoffset</code></td>
 *     <td><code>[[TYPES.DateTimeOffset]]</code></td>
 *     <td><code>Date</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>time</code></td>
 *     <td><code>[[TYPES.Time]]</code></td>
 *     <td><code>Date</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>date</code></td>
 *     <td><code>[[TYPES.Date]]</code></td>
 *     <td><code>Date</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 * </tbody>
 *
 * <tbody>
 *   <tr class="group-heading">
 *     <th colspan="4">Character Strings</th>
 *   </tr>
 *   <tr>
 *     <td><code>char</code></td>
 *     <td><code>[[TYPES.Char]]</code></td>
 *     <td><code>string</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>varchar</code><sup>3</sup></td>
 *     <td><code>[[TYPES.VarChar]]</code></td>
 *     <td><code>string</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>text</code></td>
 *     <td><code>[[TYPES.Text]]</code></td>
 *     <td><code>string</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 * </tbody>
 *
 * <tbody>
 *   <tr class="group-heading">
 *     <th colspan="4">Unicode Strings</th>
 *   </tr>
 *   <tr>
 *     <td><code>nchar</code></td>
 *     <td><code>[[TYPES.NChar]]</code></td>
 *     <td><code>string</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>nvarchar</code><sup>3</sup></td>
 *     <td><code>[[TYPES.NVarChar]]</code></td>
 *     <td><code>string</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>ntext</code></td>
 *     <td><code>[[TYPES.NText]]</code></td>
 *     <td><code>string</code></td>
 *     <td>✓</td>
 *     <td>-</td>
 *   </tr>
 * </tbody>
 *
 * <tbody>
 *   <tr class="group-heading">
 *     <th colspan="5">Binary Strings<sup>4</sup></th>
 *   </tr>
 *   <tr>
 *     <td><code>binary</code></td>
 *     <td><code>[[TYPES.Binary]]</code></td>
 *     <td><code>Buffer</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>varbinary</code></td>
 *     <td><code>[[TYPES.VarBinary]]</code></td>
 *     <td><code>Buffer</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>image</code></td>
 *     <td><code>[[TYPES.Image]]</code></td>
 *     <td><code>Buffer</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 * </tbody>
 *
 * <tbody>
 *   <tr class="group-heading">
 *     <th colspan="5">Other Data Types</th>
 *   </tr>
 *   <tr>
 *     <td><code>TVP</code></td>
 *     <td><code>[[TYPES.TVP]]</code></td>
 *     <td><code>Object</code></td>
 *     <td>-</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>UDT</code></td>
 *     <td><code>[[TYPES.UDT]]</code></td>
 *     <td><code>Buffer</code></td>
 *     <td>✓</td>
 *     <td>-</td>
 *   </tr>
 *   <tr>
 *     <td><code>uniqueidentifier</code><sup>4</sup></td>
 *     <td><code>[[TYPES.UniqueIdentifier]]</code></td>
 *     <td><code>string</code></td>
 *     <td>✓</td>
 *     <td>✓</td>
 *   </tr>
 *   <tr>
 *     <td><code>variant</code></td>
 *     <td><code>[[TYPES.Variant]]</code></td>
 *     <td><code>any</code></td>
 *     <td>✓</td>
 *     <td>-</td>
 *   </tr>
 *   <tr>
 *     <td><code>xml</code></td>
 *     <td><code>[[TYPES.Xml]]</code></td>
 *     <td><code>string</code></td>
 *     <td>✓</td>
 *     <td>-</td>
 *   </tr>
 * </tbody>
 * </table>
 *
 * <ol>
 *   <li>
 *     <h4>BigInt</h4>
 *     <p>
 *       Values are returned as a string. This is because values can exceed 53 bits of significant data, which is greater than a
 *       Javascript <code>number</code> type can represent as an integer.
 *     </p>
 *   </li>
 *   <li>
 *     <h4>Numerical, Decimal</h4>
 *     <p>
 *       For input parameters, default precision is 18 and default scale is 0. Maximum supported precision is 19.
 *     </p>
 *   </li>
 *   <li>
 *     <h4>VarChar, NVarChar</h4>
 *     <p>
 *       <code>varchar(max)</code> and <code>nvarchar(max)</code> are also supported.
 *     </p>
 *   </li>
 *   <li>
 *     <h4>UniqueIdentifier</h4>
 *     <p>
 *       Values are returned as a 16 byte hexadecimal string.
 *     </p>
 *     <p>
 *       Note that the order of bytes is not the same as the character representation. See
 *       <a href="http://msdn.microsoft.com/en-us/library/ms190215.aspx">Using uniqueidentifier Data</a>
 *       for an example of the different ordering of bytes.
 *     </p>
 *   </li>
 * </ol>
 */

exports.TYPE = TYPE;
const TYPES = {
  TinyInt: _tinyint.default,
  Bit: _bit.default,
  SmallInt: _smallint.default,
  Int: _int.default,
  SmallDateTime: _smalldatetime.default,
  Real: _real.default,
  Money: _money.default,
  DateTime: _datetime.default,
  Float: _float.default,
  Decimal: _decimal.default,
  Numeric: _numeric.default,
  SmallMoney: _smallmoney.default,
  BigInt: _bigint.default,
  Image: _image.default,
  Text: _text.default,
  UniqueIdentifier: _uniqueidentifier.default,
  NText: _ntext.default,
  VarBinary: _varbinary.default,
  VarChar: _varchar.default,
  Binary: _binary.default,
  Char: _char.default,
  NVarChar: _nvarchar.default,
  NChar: _nchar.default,
  Xml: _xml.default,
  Time: _time.default,
  Date: _date.default,
  DateTime2: _datetime2.default,
  DateTimeOffset: _datetimeoffset.default,
  UDT: _udt.default,
  TVP: _tvp.default,
  Variant: _sqlVariant.default
};
exports.TYPES = TYPES;
const typeByName = TYPES;
exports.typeByName = typeByName;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJUWVBFIiwiTnVsbCIsImlkIiwiVGlueUludCIsIkJpdCIsIlNtYWxsSW50IiwiSW50IiwiU21hbGxEYXRlVGltZSIsIlJlYWwiLCJNb25leSIsIkRhdGVUaW1lIiwiRmxvYXQiLCJEZWNpbWFsIiwiTnVtZXJpYyIsIlNtYWxsTW9uZXkiLCJCaWdJbnQiLCJJbWFnZSIsIlRleHQiLCJVbmlxdWVJZGVudGlmaWVyIiwiSW50TiIsIk5UZXh0IiwiQml0TiIsIkRlY2ltYWxOIiwiTnVtZXJpY04iLCJGbG9hdE4iLCJNb25leU4iLCJEYXRlVGltZU4iLCJWYXJCaW5hcnkiLCJWYXJDaGFyIiwiQmluYXJ5IiwiQ2hhciIsIk5WYXJDaGFyIiwiTkNoYXIiLCJYbWwiLCJUaW1lIiwiRGF0ZSIsIkRhdGVUaW1lMiIsIkRhdGVUaW1lT2Zmc2V0IiwiVURUIiwiVFZQIiwiVmFyaWFudCIsIlRZUEVTIiwidHlwZUJ5TmFtZSJdLCJzb3VyY2VzIjpbIi4uL3NyYy9kYXRhLXR5cGUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE51bGwgZnJvbSAnLi9kYXRhLXR5cGVzL251bGwnO1xuaW1wb3J0IFRpbnlJbnQgZnJvbSAnLi9kYXRhLXR5cGVzL3RpbnlpbnQnO1xuaW1wb3J0IEJpdCBmcm9tICcuL2RhdGEtdHlwZXMvYml0JztcbmltcG9ydCBTbWFsbEludCBmcm9tICcuL2RhdGEtdHlwZXMvc21hbGxpbnQnO1xuaW1wb3J0IEludCBmcm9tICcuL2RhdGEtdHlwZXMvaW50JztcbmltcG9ydCBTbWFsbERhdGVUaW1lIGZyb20gJy4vZGF0YS10eXBlcy9zbWFsbGRhdGV0aW1lJztcbmltcG9ydCBSZWFsIGZyb20gJy4vZGF0YS10eXBlcy9yZWFsJztcbmltcG9ydCBNb25leSBmcm9tICcuL2RhdGEtdHlwZXMvbW9uZXknO1xuaW1wb3J0IERhdGVUaW1lIGZyb20gJy4vZGF0YS10eXBlcy9kYXRldGltZSc7XG5pbXBvcnQgRmxvYXQgZnJvbSAnLi9kYXRhLXR5cGVzL2Zsb2F0JztcbmltcG9ydCBEZWNpbWFsIGZyb20gJy4vZGF0YS10eXBlcy9kZWNpbWFsJztcbmltcG9ydCBOdW1lcmljIGZyb20gJy4vZGF0YS10eXBlcy9udW1lcmljJztcbmltcG9ydCBTbWFsbE1vbmV5IGZyb20gJy4vZGF0YS10eXBlcy9zbWFsbG1vbmV5JztcbmltcG9ydCBCaWdJbnQgZnJvbSAnLi9kYXRhLXR5cGVzL2JpZ2ludCc7XG5pbXBvcnQgSW1hZ2UgZnJvbSAnLi9kYXRhLXR5cGVzL2ltYWdlJztcbmltcG9ydCBUZXh0IGZyb20gJy4vZGF0YS10eXBlcy90ZXh0JztcbmltcG9ydCBVbmlxdWVJZGVudGlmaWVyIGZyb20gJy4vZGF0YS10eXBlcy91bmlxdWVpZGVudGlmaWVyJztcbmltcG9ydCBJbnROIGZyb20gJy4vZGF0YS10eXBlcy9pbnRuJztcbmltcG9ydCBOVGV4dCBmcm9tICcuL2RhdGEtdHlwZXMvbnRleHQnO1xuaW1wb3J0IEJpdE4gZnJvbSAnLi9kYXRhLXR5cGVzL2JpdG4nO1xuaW1wb3J0IERlY2ltYWxOIGZyb20gJy4vZGF0YS10eXBlcy9kZWNpbWFsbic7XG5pbXBvcnQgTnVtZXJpY04gZnJvbSAnLi9kYXRhLXR5cGVzL251bWVyaWNuJztcbmltcG9ydCBGbG9hdE4gZnJvbSAnLi9kYXRhLXR5cGVzL2Zsb2F0bic7XG5pbXBvcnQgTW9uZXlOIGZyb20gJy4vZGF0YS10eXBlcy9tb25leW4nO1xuaW1wb3J0IERhdGVUaW1lTiBmcm9tICcuL2RhdGEtdHlwZXMvZGF0ZXRpbWVuJztcbmltcG9ydCBWYXJCaW5hcnkgZnJvbSAnLi9kYXRhLXR5cGVzL3ZhcmJpbmFyeSc7XG5pbXBvcnQgVmFyQ2hhciBmcm9tICcuL2RhdGEtdHlwZXMvdmFyY2hhcic7XG5pbXBvcnQgQmluYXJ5IGZyb20gJy4vZGF0YS10eXBlcy9iaW5hcnknO1xuaW1wb3J0IENoYXIgZnJvbSAnLi9kYXRhLXR5cGVzL2NoYXInO1xuaW1wb3J0IE5WYXJDaGFyIGZyb20gJy4vZGF0YS10eXBlcy9udmFyY2hhcic7XG5pbXBvcnQgTkNoYXIgZnJvbSAnLi9kYXRhLXR5cGVzL25jaGFyJztcbmltcG9ydCBYbWwgZnJvbSAnLi9kYXRhLXR5cGVzL3htbCc7XG5pbXBvcnQgVGltZSBmcm9tICcuL2RhdGEtdHlwZXMvdGltZSc7XG5pbXBvcnQgRGF0ZSBmcm9tICcuL2RhdGEtdHlwZXMvZGF0ZSc7XG5pbXBvcnQgRGF0ZVRpbWUyIGZyb20gJy4vZGF0YS10eXBlcy9kYXRldGltZTInO1xuaW1wb3J0IERhdGVUaW1lT2Zmc2V0IGZyb20gJy4vZGF0YS10eXBlcy9kYXRldGltZW9mZnNldCc7XG5pbXBvcnQgVURUIGZyb20gJy4vZGF0YS10eXBlcy91ZHQnO1xuaW1wb3J0IFRWUCBmcm9tICcuL2RhdGEtdHlwZXMvdHZwJztcbmltcG9ydCBWYXJpYW50IGZyb20gJy4vZGF0YS10eXBlcy9zcWwtdmFyaWFudCc7XG5pbXBvcnQgeyBDcnlwdG9NZXRhZGF0YSB9IGZyb20gJy4vYWx3YXlzLWVuY3J5cHRlZC90eXBlcyc7XG5cbmltcG9ydCB7IEludGVybmFsQ29ubmVjdGlvbk9wdGlvbnMgfSBmcm9tICcuL2Nvbm5lY3Rpb24nO1xuaW1wb3J0IHsgQ29sbGF0aW9uIH0gZnJvbSAnLi9jb2xsYXRpb24nO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBhcmFtZXRlciB7XG4gIHR5cGU6IERhdGFUeXBlO1xuICBuYW1lOiBzdHJpbmc7XG5cbiAgdmFsdWU6IHVua25vd247XG5cbiAgb3V0cHV0OiBib29sZWFuO1xuICBsZW5ndGg/OiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gIHByZWNpc2lvbj86IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgc2NhbGU/OiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgbnVsbGFibGU/OiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gIGZvcmNlRW5jcnlwdD86IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gIGNyeXB0b01ldGFkYXRhPzogQ3J5cHRvTWV0YWRhdGEgfCB1bmRlZmluZWQ7XG4gIGVuY3J5cHRlZFZhbD86IEJ1ZmZlciB8IHVuZGVmaW5lZDtcbn1cblxuXG5leHBvcnQgaW50ZXJmYWNlIFBhcmFtZXRlckRhdGE8VCA9IGFueT4ge1xuICBsZW5ndGg/OiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gIHNjYWxlPzogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICBwcmVjaXNpb24/OiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgY29sbGF0aW9uPzogQ29sbGF0aW9uIHwgdW5kZWZpbmVkO1xuXG4gIHZhbHVlOiBUO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERhdGFUeXBlIHtcbiAgaWQ6IG51bWJlcjtcbiAgdHlwZTogc3RyaW5nO1xuICBuYW1lOiBzdHJpbmc7XG5cbiAgZGVjbGFyYXRpb24ocGFyYW1ldGVyOiBQYXJhbWV0ZXIpOiBzdHJpbmc7XG4gIGdlbmVyYXRlVHlwZUluZm8ocGFyYW1ldGVyOiBQYXJhbWV0ZXJEYXRhLCBvcHRpb25zOiBJbnRlcm5hbENvbm5lY3Rpb25PcHRpb25zKTogQnVmZmVyO1xuICBnZW5lcmF0ZVBhcmFtZXRlckxlbmd0aChwYXJhbWV0ZXI6IFBhcmFtZXRlckRhdGEsIG9wdGlvbnM6IEludGVybmFsQ29ubmVjdGlvbk9wdGlvbnMpOiBCdWZmZXI7XG4gIGdlbmVyYXRlUGFyYW1ldGVyRGF0YShwYXJhbWV0ZXI6IFBhcmFtZXRlckRhdGEsIG9wdGlvbnM6IEludGVybmFsQ29ubmVjdGlvbk9wdGlvbnMpOiBHZW5lcmF0b3I8QnVmZmVyLCB2b2lkPjtcbiAgdmFsaWRhdGUodmFsdWU6IGFueSwgY29sbGF0aW9uOiBDb2xsYXRpb24gfCB1bmRlZmluZWQpOiBhbnk7IC8vIFRPRE86IFJlZmFjdG9yICdhbnknIGFuZCByZXBsYWNlIHdpdGggbW9yZSBzcGVjaWZpYyB0eXBlLlxuXG4gIGhhc1RhYmxlTmFtZT86IGJvb2xlYW47XG5cbiAgcmVzb2x2ZUxlbmd0aD86IChwYXJhbWV0ZXI6IFBhcmFtZXRlcikgPT4gbnVtYmVyO1xuICByZXNvbHZlUHJlY2lzaW9uPzogKHBhcmFtZXRlcjogUGFyYW1ldGVyKSA9PiBudW1iZXI7XG4gIHJlc29sdmVTY2FsZT86IChwYXJhbWV0ZXI6IFBhcmFtZXRlcikgPT4gbnVtYmVyO1xufVxuXG5leHBvcnQgY29uc3QgVFlQRSA9IHtcbiAgW051bGwuaWRdOiBOdWxsLFxuICBbVGlueUludC5pZF06IFRpbnlJbnQsXG4gIFtCaXQuaWRdOiBCaXQsXG4gIFtTbWFsbEludC5pZF06IFNtYWxsSW50LFxuICBbSW50LmlkXTogSW50LFxuICBbU21hbGxEYXRlVGltZS5pZF06IFNtYWxsRGF0ZVRpbWUsXG4gIFtSZWFsLmlkXTogUmVhbCxcbiAgW01vbmV5LmlkXTogTW9uZXksXG4gIFtEYXRlVGltZS5pZF06IERhdGVUaW1lLFxuICBbRmxvYXQuaWRdOiBGbG9hdCxcbiAgW0RlY2ltYWwuaWRdOiBEZWNpbWFsLFxuICBbTnVtZXJpYy5pZF06IE51bWVyaWMsXG4gIFtTbWFsbE1vbmV5LmlkXTogU21hbGxNb25leSxcbiAgW0JpZ0ludC5pZF06IEJpZ0ludCxcbiAgW0ltYWdlLmlkXTogSW1hZ2UsXG4gIFtUZXh0LmlkXTogVGV4dCxcbiAgW1VuaXF1ZUlkZW50aWZpZXIuaWRdOiBVbmlxdWVJZGVudGlmaWVyLFxuICBbSW50Ti5pZF06IEludE4sXG4gIFtOVGV4dC5pZF06IE5UZXh0LFxuICBbQml0Ti5pZF06IEJpdE4sXG4gIFtEZWNpbWFsTi5pZF06IERlY2ltYWxOLFxuICBbTnVtZXJpY04uaWRdOiBOdW1lcmljTixcbiAgW0Zsb2F0Ti5pZF06IEZsb2F0TixcbiAgW01vbmV5Ti5pZF06IE1vbmV5TixcbiAgW0RhdGVUaW1lTi5pZF06IERhdGVUaW1lTixcbiAgW1ZhckJpbmFyeS5pZF06IFZhckJpbmFyeSxcbiAgW1ZhckNoYXIuaWRdOiBWYXJDaGFyLFxuICBbQmluYXJ5LmlkXTogQmluYXJ5LFxuICBbQ2hhci5pZF06IENoYXIsXG4gIFtOVmFyQ2hhci5pZF06IE5WYXJDaGFyLFxuICBbTkNoYXIuaWRdOiBOQ2hhcixcbiAgW1htbC5pZF06IFhtbCxcbiAgW1RpbWUuaWRdOiBUaW1lLFxuICBbRGF0ZS5pZF06IERhdGUsXG4gIFtEYXRlVGltZTIuaWRdOiBEYXRlVGltZTIsXG4gIFtEYXRlVGltZU9mZnNldC5pZF06IERhdGVUaW1lT2Zmc2V0LFxuICBbVURULmlkXTogVURULFxuICBbVFZQLmlkXTogVFZQLFxuICBbVmFyaWFudC5pZF06IFZhcmlhbnQsXG59O1xuXG4vKipcbiAqIDx0YWJsZT5cbiAqIDx0aGVhZD5cbiAqICAgPHRyPlxuICogICAgIDx0aD5UeXBlPC90aD5cbiAqICAgICA8dGg+Q29uc3RhbnQ8L3RoPlxuICogICAgIDx0aD5KYXZhU2NyaXB0PC90aD5cbiAqICAgICA8dGg+UmVzdWx0IHNldDwvdGg+XG4gKiAgICAgPHRoPlBhcmFtZXRlcjwvdGg+XG4gKiAgIDwvdHI+XG4gKiA8L3RoZWFkPlxuICpcbiAqIDx0Ym9keT5cbiAqICAgPHRyIGNsYXNzPVwiZ3JvdXAtaGVhZGluZ1wiPlxuICogICAgIDx0aCBjb2xzcGFuPVwiNVwiPkV4YWN0IG51bWVyaWNzPC90aD5cbiAqICAgPC90cj5cbiAqICAgPHRyPlxuICogICAgIDx0ZD48Y29kZT5iaXQ8L2NvZGU+PC90ZD5cbiAqICAgICA8dGQ+PGNvZGU+W1tUWVBFUy5CaXRdXTwvY29kZT48L3RkPlxuICogICAgIDx0ZD48Y29kZT5ib29sZWFuPC9jb2RlPjwvdGQ+XG4gKiAgICAgPHRkPuKckzwvdGQ+XG4gKiAgICAgPHRkPuKckzwvdGQ+XG4gKiAgIDwvdHI+XG4gKiAgIDx0cj5cbiAqICAgICA8dGQ+PGNvZGU+dGlueWludDwvY29kZT48L3RkPlxuICogICAgIDx0ZD48Y29kZT5bW1RZUEVTLlRpbnlJbnRdXTwvY29kZT48L3RkPlxuICogICAgIDx0ZD48Y29kZT5udW1iZXI8L2NvZGU+PC90ZD5cbiAqICAgICA8dGQ+4pyTPC90ZD5cbiAqICAgICA8dGQ+4pyTPC90ZD5cbiAqICAgPC90cj5cbiAqICAgPHRyPlxuICogICAgIDx0ZD48Y29kZT5zbWFsbGludDwvY29kZT48L3RkPlxuICogICAgIDx0ZD48Y29kZT5bW1RZUEVTLlNtYWxsSW50XV08L2NvZGU+PC90ZD5cbiAqICAgICA8dGQ+PGNvZGU+bnVtYmVyPC9jb2RlPjwvdGQ+XG4gKiAgICAgPHRkPuKckzwvdGQ+XG4gKiAgICAgPHRkPuKckzwvdGQ+XG4gKiAgIDwvdHI+XG4gKiAgIDx0cj5cbiAqICAgICA8dGQ+PGNvZGU+aW50PC9jb2RlPjwvdGQ+XG4gKiAgICAgPHRkPjxjb2RlPltbVFlQRVMuSW50XV08L2NvZGU+PC90ZD5cbiAqICAgICA8dGQ+PGNvZGU+bnVtYmVyPC9jb2RlPjwvdGQ+XG4gKiAgICAgPHRkPuKckzwvdGQ+XG4gKiAgICAgPHRkPuKckzwvdGQ+XG4gKiAgIDwvdHI+XG4gKiAgIDx0cj5cbiAqICAgICA8dGQ+PGNvZGU+YmlnaW50PC9jb2RlPjxzdXA+MTwvc3VwPjwvdGQ+XG4gKiAgICAgPHRkPjxjb2RlPltbVFlQRVMuQmlnSW50XV08L2NvZGU+PC90ZD5cbiAqICAgICA8dGQ+PGNvZGU+c3RyaW5nPC9jb2RlPjwvdGQ+XG4gKiAgICAgPHRkPuKckzwvdGQ+XG4gKiAgICAgPHRkPuKckzwvdGQ+XG4gKiAgIDwvdHI+XG4gKiAgIDx0cj5cbiAqICAgICA8dGQ+PGNvZGU+bnVtZXJpYzwvY29kZT48c3VwPjI8L3N1cD48L3RkPlxuICogICAgIDx0ZD48Y29kZT5bW1RZUEVTLk51bWVyaWNdXTwvY29kZT48L3RkPlxuICogICAgIDx0ZD48Y29kZT5udW1iZXI8L2NvZGU+PC90ZD5cbiAqICAgICA8dGQ+4pyTPC90ZD5cbiAqICAgICA8dGQ+4pyTPC90ZD5cbiAqICAgPC90cj5cbiAqICAgPHRyPlxuICogICAgIDx0ZD48Y29kZT5kZWNpbWFsPC9jb2RlPjxzdXA+Mjwvc3VwPjwvdGQ+XG4gKiAgICAgPHRkPjxjb2RlPltbVFlQRVMuRGVjaW1hbF1dPC9jb2RlPjwvdGQ+XG4gKiAgICAgPHRkPjxjb2RlPm51bWJlcjwvY29kZT48L3RkPlxuICogICAgIDx0ZD7inJM8L3RkPlxuICogICAgIDx0ZD7inJM8L3RkPlxuICogICA8L3RyPlxuICogICA8dHI+XG4gKiAgICAgPHRkPjxjb2RlPnNtYWxsbW9uZXk8L2NvZGU+PC90ZD5cbiAqICAgICA8dGQ+PGNvZGU+W1tUWVBFUy5TbWFsbE1vbmV5XV08L2NvZGU+PC90ZD5cbiAqICAgICA8dGQ+PGNvZGU+bnVtYmVyPC9jb2RlPjwvdGQ+XG4gKiAgICAgPHRkPuKckzwvdGQ+XG4gKiAgICAgPHRkPuKckzwvdGQ+XG4gKiAgIDwvdHI+XG4gKiAgIDx0cj5cbiAqICAgICA8dGQ+PGNvZGU+bW9uZXk8L2NvZGU+PC90ZD5cbiAqICAgICA8dGQ+PGNvZGU+W1tUWVBFUy5Nb25leV1dPC9jb2RlPjwvdGQ+XG4gKiAgICAgPHRkPjxjb2RlPm51bWJlcjwvY29kZT48L3RkPlxuICogICAgIDx0ZD7inJM8L3RkPlxuICogICAgIDx0ZD7inJM8L3RkPlxuICogICA8L3RyPlxuICogPC90Ym9keT5cbiAqXG4gKiA8dGJvZHk+XG4gKiAgIDx0ciBjbGFzcz1cImdyb3VwLWhlYWRpbmdcIj5cbiAqICAgICA8dGggY29sc3Bhbj1cIjVcIj5BcHByb3hpbWF0ZSBudW1lcmljczwvdGg+XG4gKiAgIDwvdHI+XG4gKiAgIDx0cj5cbiAqICAgICA8dGQ+PGNvZGU+ZmxvYXQ8L2NvZGU+PC90ZD5cbiAqICAgICA8dGQ+PGNvZGU+W1tUWVBFUy5GbG9hdF1dPC9jb2RlPjwvdGQ+XG4gKiAgICAgPHRkPjxjb2RlPm51bWJlcjwvY29kZT48L3RkPlxuICogICAgIDx0ZD7inJM8L3RkPlxuICogICAgIDx0ZD7inJM8L3RkPlxuICogICA8L3RyPlxuICogICA8dHI+XG4gKiAgICAgPHRkPjxjb2RlPnJlYWw8L2NvZGU+PC90ZD5cbiAqICAgICA8dGQ+PGNvZGU+W1tUWVBFUy5SZWFsXV08L2NvZGU+PC90ZD5cbiAqICAgICA8dGQ+PGNvZGU+bnVtYmVyPC9jb2RlPjwvdGQ+XG4gKiAgICAgPHRkPuKckzwvdGQ+XG4gKiAgICAgPHRkPuKckzwvdGQ+XG4gKiAgIDwvdHI+XG4gKiA8L3Rib2R5PlxuICpcbiAqIDx0Ym9keT5cbiAqICAgPHRyIGNsYXNzPVwiZ3JvdXAtaGVhZGluZ1wiPlxuICogICAgIDx0aCBjb2xzcGFuPVwiNFwiPkRhdGUgYW5kIFRpbWU8L3RoPlxuICogICA8L3RyPlxuICogICA8dHI+XG4gKiAgICAgPHRkPjxjb2RlPnNtYWxsZGF0ZXRpbWU8L2NvZGU+PC90ZD5cbiAqICAgICA8dGQ+PGNvZGU+W1tUWVBFUy5TbWFsbERhdGVUaW1lXV08L2NvZGU+PC90ZD5cbiAqICAgICA8dGQ+PGNvZGU+RGF0ZTwvY29kZT48L3RkPlxuICogICAgIDx0ZD7inJM8L3RkPlxuICogICAgIDx0ZD7inJM8L3RkPlxuICogICA8L3RyPlxuICogICA8dHI+XG4gKiAgICAgPHRkPjxjb2RlPmRhdGV0aW1lPC9jb2RlPjwvdGQ+XG4gKiAgICAgPHRkPjxjb2RlPltbVFlQRVMuRGF0ZVRpbWVdXTwvY29kZT48L3RkPlxuICogICAgIDx0ZD48Y29kZT5EYXRlPC9jb2RlPjwvdGQ+XG4gKiAgICAgPHRkPuKckzwvdGQ+XG4gKiAgICAgPHRkPuKckzwvdGQ+XG4gKiAgIDwvdHI+XG4gKiAgIDx0cj5cbiAqICAgICA8dGQ+PGNvZGU+ZGF0ZXRpbWUyPC9jb2RlPjwvdGQ+XG4gKiAgICAgPHRkPjxjb2RlPltbVFlQRVMuRGF0ZVRpbWUyXV08L2NvZGU+PC90ZD5cbiAqICAgICA8dGQ+PGNvZGU+RGF0ZTwvY29kZT48L3RkPlxuICogICAgIDx0ZD7inJM8L3RkPlxuICogICAgIDx0ZD7inJM8L3RkPlxuICogICA8L3RyPlxuICogICA8dHI+XG4gKiAgICAgPHRkPjxjb2RlPmRhdGV0aW1lb2Zmc2V0PC9jb2RlPjwvdGQ+XG4gKiAgICAgPHRkPjxjb2RlPltbVFlQRVMuRGF0ZVRpbWVPZmZzZXRdXTwvY29kZT48L3RkPlxuICogICAgIDx0ZD48Y29kZT5EYXRlPC9jb2RlPjwvdGQ+XG4gKiAgICAgPHRkPuKckzwvdGQ+XG4gKiAgICAgPHRkPuKckzwvdGQ+XG4gKiAgIDwvdHI+XG4gKiAgIDx0cj5cbiAqICAgICA8dGQ+PGNvZGU+dGltZTwvY29kZT48L3RkPlxuICogICAgIDx0ZD48Y29kZT5bW1RZUEVTLlRpbWVdXTwvY29kZT48L3RkPlxuICogICAgIDx0ZD48Y29kZT5EYXRlPC9jb2RlPjwvdGQ+XG4gKiAgICAgPHRkPuKckzwvdGQ+XG4gKiAgICAgPHRkPuKckzwvdGQ+XG4gKiAgIDwvdHI+XG4gKiAgIDx0cj5cbiAqICAgICA8dGQ+PGNvZGU+ZGF0ZTwvY29kZT48L3RkPlxuICogICAgIDx0ZD48Y29kZT5bW1RZUEVTLkRhdGVdXTwvY29kZT48L3RkPlxuICogICAgIDx0ZD48Y29kZT5EYXRlPC9jb2RlPjwvdGQ+XG4gKiAgICAgPHRkPuKckzwvdGQ+XG4gKiAgICAgPHRkPuKckzwvdGQ+XG4gKiAgIDwvdHI+XG4gKiA8L3Rib2R5PlxuICpcbiAqIDx0Ym9keT5cbiAqICAgPHRyIGNsYXNzPVwiZ3JvdXAtaGVhZGluZ1wiPlxuICogICAgIDx0aCBjb2xzcGFuPVwiNFwiPkNoYXJhY3RlciBTdHJpbmdzPC90aD5cbiAqICAgPC90cj5cbiAqICAgPHRyPlxuICogICAgIDx0ZD48Y29kZT5jaGFyPC9jb2RlPjwvdGQ+XG4gKiAgICAgPHRkPjxjb2RlPltbVFlQRVMuQ2hhcl1dPC9jb2RlPjwvdGQ+XG4gKiAgICAgPHRkPjxjb2RlPnN0cmluZzwvY29kZT48L3RkPlxuICogICAgIDx0ZD7inJM8L3RkPlxuICogICAgIDx0ZD7inJM8L3RkPlxuICogICA8L3RyPlxuICogICA8dHI+XG4gKiAgICAgPHRkPjxjb2RlPnZhcmNoYXI8L2NvZGU+PHN1cD4zPC9zdXA+PC90ZD5cbiAqICAgICA8dGQ+PGNvZGU+W1tUWVBFUy5WYXJDaGFyXV08L2NvZGU+PC90ZD5cbiAqICAgICA8dGQ+PGNvZGU+c3RyaW5nPC9jb2RlPjwvdGQ+XG4gKiAgICAgPHRkPuKckzwvdGQ+XG4gKiAgICAgPHRkPuKckzwvdGQ+XG4gKiAgIDwvdHI+XG4gKiAgIDx0cj5cbiAqICAgICA8dGQ+PGNvZGU+dGV4dDwvY29kZT48L3RkPlxuICogICAgIDx0ZD48Y29kZT5bW1RZUEVTLlRleHRdXTwvY29kZT48L3RkPlxuICogICAgIDx0ZD48Y29kZT5zdHJpbmc8L2NvZGU+PC90ZD5cbiAqICAgICA8dGQ+4pyTPC90ZD5cbiAqICAgICA8dGQ+4pyTPC90ZD5cbiAqICAgPC90cj5cbiAqIDwvdGJvZHk+XG4gKlxuICogPHRib2R5PlxuICogICA8dHIgY2xhc3M9XCJncm91cC1oZWFkaW5nXCI+XG4gKiAgICAgPHRoIGNvbHNwYW49XCI0XCI+VW5pY29kZSBTdHJpbmdzPC90aD5cbiAqICAgPC90cj5cbiAqICAgPHRyPlxuICogICAgIDx0ZD48Y29kZT5uY2hhcjwvY29kZT48L3RkPlxuICogICAgIDx0ZD48Y29kZT5bW1RZUEVTLk5DaGFyXV08L2NvZGU+PC90ZD5cbiAqICAgICA8dGQ+PGNvZGU+c3RyaW5nPC9jb2RlPjwvdGQ+XG4gKiAgICAgPHRkPuKckzwvdGQ+XG4gKiAgICAgPHRkPuKckzwvdGQ+XG4gKiAgIDwvdHI+XG4gKiAgIDx0cj5cbiAqICAgICA8dGQ+PGNvZGU+bnZhcmNoYXI8L2NvZGU+PHN1cD4zPC9zdXA+PC90ZD5cbiAqICAgICA8dGQ+PGNvZGU+W1tUWVBFUy5OVmFyQ2hhcl1dPC9jb2RlPjwvdGQ+XG4gKiAgICAgPHRkPjxjb2RlPnN0cmluZzwvY29kZT48L3RkPlxuICogICAgIDx0ZD7inJM8L3RkPlxuICogICAgIDx0ZD7inJM8L3RkPlxuICogICA8L3RyPlxuICogICA8dHI+XG4gKiAgICAgPHRkPjxjb2RlPm50ZXh0PC9jb2RlPjwvdGQ+XG4gKiAgICAgPHRkPjxjb2RlPltbVFlQRVMuTlRleHRdXTwvY29kZT48L3RkPlxuICogICAgIDx0ZD48Y29kZT5zdHJpbmc8L2NvZGU+PC90ZD5cbiAqICAgICA8dGQ+4pyTPC90ZD5cbiAqICAgICA8dGQ+LTwvdGQ+XG4gKiAgIDwvdHI+XG4gKiA8L3Rib2R5PlxuICpcbiAqIDx0Ym9keT5cbiAqICAgPHRyIGNsYXNzPVwiZ3JvdXAtaGVhZGluZ1wiPlxuICogICAgIDx0aCBjb2xzcGFuPVwiNVwiPkJpbmFyeSBTdHJpbmdzPHN1cD40PC9zdXA+PC90aD5cbiAqICAgPC90cj5cbiAqICAgPHRyPlxuICogICAgIDx0ZD48Y29kZT5iaW5hcnk8L2NvZGU+PC90ZD5cbiAqICAgICA8dGQ+PGNvZGU+W1tUWVBFUy5CaW5hcnldXTwvY29kZT48L3RkPlxuICogICAgIDx0ZD48Y29kZT5CdWZmZXI8L2NvZGU+PC90ZD5cbiAqICAgICA8dGQ+4pyTPC90ZD5cbiAqICAgICA8dGQ+4pyTPC90ZD5cbiAqICAgPC90cj5cbiAqICAgPHRyPlxuICogICAgIDx0ZD48Y29kZT52YXJiaW5hcnk8L2NvZGU+PC90ZD5cbiAqICAgICA8dGQ+PGNvZGU+W1tUWVBFUy5WYXJCaW5hcnldXTwvY29kZT48L3RkPlxuICogICAgIDx0ZD48Y29kZT5CdWZmZXI8L2NvZGU+PC90ZD5cbiAqICAgICA8dGQ+4pyTPC90ZD5cbiAqICAgICA8dGQ+4pyTPC90ZD5cbiAqICAgPC90cj5cbiAqICAgPHRyPlxuICogICAgIDx0ZD48Y29kZT5pbWFnZTwvY29kZT48L3RkPlxuICogICAgIDx0ZD48Y29kZT5bW1RZUEVTLkltYWdlXV08L2NvZGU+PC90ZD5cbiAqICAgICA8dGQ+PGNvZGU+QnVmZmVyPC9jb2RlPjwvdGQ+XG4gKiAgICAgPHRkPuKckzwvdGQ+XG4gKiAgICAgPHRkPuKckzwvdGQ+XG4gKiAgIDwvdHI+XG4gKiA8L3Rib2R5PlxuICpcbiAqIDx0Ym9keT5cbiAqICAgPHRyIGNsYXNzPVwiZ3JvdXAtaGVhZGluZ1wiPlxuICogICAgIDx0aCBjb2xzcGFuPVwiNVwiPk90aGVyIERhdGEgVHlwZXM8L3RoPlxuICogICA8L3RyPlxuICogICA8dHI+XG4gKiAgICAgPHRkPjxjb2RlPlRWUDwvY29kZT48L3RkPlxuICogICAgIDx0ZD48Y29kZT5bW1RZUEVTLlRWUF1dPC9jb2RlPjwvdGQ+XG4gKiAgICAgPHRkPjxjb2RlPk9iamVjdDwvY29kZT48L3RkPlxuICogICAgIDx0ZD4tPC90ZD5cbiAqICAgICA8dGQ+4pyTPC90ZD5cbiAqICAgPC90cj5cbiAqICAgPHRyPlxuICogICAgIDx0ZD48Y29kZT5VRFQ8L2NvZGU+PC90ZD5cbiAqICAgICA8dGQ+PGNvZGU+W1tUWVBFUy5VRFRdXTwvY29kZT48L3RkPlxuICogICAgIDx0ZD48Y29kZT5CdWZmZXI8L2NvZGU+PC90ZD5cbiAqICAgICA8dGQ+4pyTPC90ZD5cbiAqICAgICA8dGQ+LTwvdGQ+XG4gKiAgIDwvdHI+XG4gKiAgIDx0cj5cbiAqICAgICA8dGQ+PGNvZGU+dW5pcXVlaWRlbnRpZmllcjwvY29kZT48c3VwPjQ8L3N1cD48L3RkPlxuICogICAgIDx0ZD48Y29kZT5bW1RZUEVTLlVuaXF1ZUlkZW50aWZpZXJdXTwvY29kZT48L3RkPlxuICogICAgIDx0ZD48Y29kZT5zdHJpbmc8L2NvZGU+PC90ZD5cbiAqICAgICA8dGQ+4pyTPC90ZD5cbiAqICAgICA8dGQ+4pyTPC90ZD5cbiAqICAgPC90cj5cbiAqICAgPHRyPlxuICogICAgIDx0ZD48Y29kZT52YXJpYW50PC9jb2RlPjwvdGQ+XG4gKiAgICAgPHRkPjxjb2RlPltbVFlQRVMuVmFyaWFudF1dPC9jb2RlPjwvdGQ+XG4gKiAgICAgPHRkPjxjb2RlPmFueTwvY29kZT48L3RkPlxuICogICAgIDx0ZD7inJM8L3RkPlxuICogICAgIDx0ZD4tPC90ZD5cbiAqICAgPC90cj5cbiAqICAgPHRyPlxuICogICAgIDx0ZD48Y29kZT54bWw8L2NvZGU+PC90ZD5cbiAqICAgICA8dGQ+PGNvZGU+W1tUWVBFUy5YbWxdXTwvY29kZT48L3RkPlxuICogICAgIDx0ZD48Y29kZT5zdHJpbmc8L2NvZGU+PC90ZD5cbiAqICAgICA8dGQ+4pyTPC90ZD5cbiAqICAgICA8dGQ+LTwvdGQ+XG4gKiAgIDwvdHI+XG4gKiA8L3Rib2R5PlxuICogPC90YWJsZT5cbiAqXG4gKiA8b2w+XG4gKiAgIDxsaT5cbiAqICAgICA8aDQ+QmlnSW50PC9oND5cbiAqICAgICA8cD5cbiAqICAgICAgIFZhbHVlcyBhcmUgcmV0dXJuZWQgYXMgYSBzdHJpbmcuIFRoaXMgaXMgYmVjYXVzZSB2YWx1ZXMgY2FuIGV4Y2VlZCA1MyBiaXRzIG9mIHNpZ25pZmljYW50IGRhdGEsIHdoaWNoIGlzIGdyZWF0ZXIgdGhhbiBhXG4gKiAgICAgICBKYXZhc2NyaXB0IDxjb2RlPm51bWJlcjwvY29kZT4gdHlwZSBjYW4gcmVwcmVzZW50IGFzIGFuIGludGVnZXIuXG4gKiAgICAgPC9wPlxuICogICA8L2xpPlxuICogICA8bGk+XG4gKiAgICAgPGg0Pk51bWVyaWNhbCwgRGVjaW1hbDwvaDQ+XG4gKiAgICAgPHA+XG4gKiAgICAgICBGb3IgaW5wdXQgcGFyYW1ldGVycywgZGVmYXVsdCBwcmVjaXNpb24gaXMgMTggYW5kIGRlZmF1bHQgc2NhbGUgaXMgMC4gTWF4aW11bSBzdXBwb3J0ZWQgcHJlY2lzaW9uIGlzIDE5LlxuICogICAgIDwvcD5cbiAqICAgPC9saT5cbiAqICAgPGxpPlxuICogICAgIDxoND5WYXJDaGFyLCBOVmFyQ2hhcjwvaDQ+XG4gKiAgICAgPHA+XG4gKiAgICAgICA8Y29kZT52YXJjaGFyKG1heCk8L2NvZGU+IGFuZCA8Y29kZT5udmFyY2hhcihtYXgpPC9jb2RlPiBhcmUgYWxzbyBzdXBwb3J0ZWQuXG4gKiAgICAgPC9wPlxuICogICA8L2xpPlxuICogICA8bGk+XG4gKiAgICAgPGg0PlVuaXF1ZUlkZW50aWZpZXI8L2g0PlxuICogICAgIDxwPlxuICogICAgICAgVmFsdWVzIGFyZSByZXR1cm5lZCBhcyBhIDE2IGJ5dGUgaGV4YWRlY2ltYWwgc3RyaW5nLlxuICogICAgIDwvcD5cbiAqICAgICA8cD5cbiAqICAgICAgIE5vdGUgdGhhdCB0aGUgb3JkZXIgb2YgYnl0ZXMgaXMgbm90IHRoZSBzYW1lIGFzIHRoZSBjaGFyYWN0ZXIgcmVwcmVzZW50YXRpb24uIFNlZVxuICogICAgICAgPGEgaHJlZj1cImh0dHA6Ly9tc2RuLm1pY3Jvc29mdC5jb20vZW4tdXMvbGlicmFyeS9tczE5MDIxNS5hc3B4XCI+VXNpbmcgdW5pcXVlaWRlbnRpZmllciBEYXRhPC9hPlxuICogICAgICAgZm9yIGFuIGV4YW1wbGUgb2YgdGhlIGRpZmZlcmVudCBvcmRlcmluZyBvZiBieXRlcy5cbiAqICAgICA8L3A+XG4gKiAgIDwvbGk+XG4gKiA8L29sPlxuICovXG5leHBvcnQgY29uc3QgVFlQRVMgPSB7XG4gIFRpbnlJbnQsXG4gIEJpdCxcbiAgU21hbGxJbnQsXG4gIEludCxcbiAgU21hbGxEYXRlVGltZSxcbiAgUmVhbCxcbiAgTW9uZXksXG4gIERhdGVUaW1lLFxuICBGbG9hdCxcbiAgRGVjaW1hbCxcbiAgTnVtZXJpYyxcbiAgU21hbGxNb25leSxcbiAgQmlnSW50LFxuICBJbWFnZSxcbiAgVGV4dCxcbiAgVW5pcXVlSWRlbnRpZmllcixcbiAgTlRleHQsXG4gIFZhckJpbmFyeSxcbiAgVmFyQ2hhcixcbiAgQmluYXJ5LFxuICBDaGFyLFxuICBOVmFyQ2hhcixcbiAgTkNoYXIsXG4gIFhtbCxcbiAgVGltZSxcbiAgRGF0ZSxcbiAgRGF0ZVRpbWUyLFxuICBEYXRlVGltZU9mZnNldCxcbiAgVURULFxuICBUVlAsXG4gIFZhcmlhbnRcbn07XG5cbmV4cG9ydCBjb25zdCB0eXBlQnlOYW1lID0gVFlQRVM7XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQXFETyxNQUFNQSxJQUFJLEdBQUc7RUFDbEIsQ0FBQ0MsY0FBS0MsRUFBTixHQUFXRCxhQURPO0VBRWxCLENBQUNFLGlCQUFRRCxFQUFULEdBQWNDLGdCQUZJO0VBR2xCLENB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFDTyxNQUFNQyxLQUFLLEdBQUc7RUFDbkJ0QyxPQUFPLEVBQVBBLGdCQURtQjtFQUVuQkMsR0FBRyxFQUFIQSxZQUZtQjtFQUduQkMsUUFBUSxFQUFSQSxpQkFIbUI7RUFJbkJDLEdBQUcsRUFBSEEsWUFKbUI7RUFLbkJDLGFBQWEsRUFBYkEsc0JBTG1CO0VBTW5CQyxJQUFJLEVBQUpBLGFBTm1CO0VBT25CQyxLQUFLLEVBQUxBLGNBUG1CO0VBUW5CQyxRQUFRLEVBQVJBLGlCQVJtQjtFQVNuQkMsS0FBSyxFQUFMQSxjQVRtQjtFQVVuQkMsT0FBTyxFQUFQQSxnQkFWbUI7RUFXbkJDLE9BQU8sRUFBUEEsZ0JBWG1CO0VBWW5CQyxVQUFVLEVBQVZBLG1CQVptQjtFQWFuQkMsTUFBTSxFQUFOQSxlQWJtQjtFQWNuQkMsS0FBSyxFQUFMQSxjQWRtQjtFQWVuQkMsSUFBSSxFQUFKQSxhQWZtQjtFQWdCbkJDLGdCQUFnQixFQUFoQkEseUJBaEJtQjtFQWlCbkJFLEtBQUssRUFBTEEsY0FqQm1CO0VBa0JuQk8sU0FBUyxFQUFUQSxrQkFsQm1CO0VBbUJuQkMsT0FBTyxFQUFQQSxnQkFuQm1CO0VBb0JuQkMsTUFBTSxFQUFOQSxlQXBCbUI7RUFxQm5CQyxJQUFJLEVBQUpBLGFBckJtQjtFQXNCbkJDLFFBQVEsRUFBUkEsaUJBdEJtQjtFQXVCbkJDLEtBQUssRUFBTEEsY0F2Qm1CO0VBd0JuQkMsR0FBRyxFQUFIQSxZQXhCbUI7RUF5Qm5CQyxJQUFJLEVBQUpBLGFBekJtQjtFQTBCbkJDLElBQUksRUFBSkEsYUExQm1CO0VBMkJuQkMsU0FBUyxFQUFUQSxrQkEzQm1CO0VBNEJuQkMsY0FBYyxFQUFkQSx1QkE1Qm1CO0VBNkJuQkMsR0FBRyxFQUFIQSxZQTdCbUI7RUE4Qm5CQyxHQUFHLEVBQUhBLFlBOUJtQjtFQStCbkJDLE9BQU8sRUFBUEE7QUEvQm1CLENBQWQ7O0FBa0NBLE1BQU1FLFVBQVUsR0FBR0QsS0FBbkIifQ==