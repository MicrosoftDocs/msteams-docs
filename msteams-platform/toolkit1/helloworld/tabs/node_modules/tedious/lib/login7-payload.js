"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _sprintfJs = require("sprintf-js");

var _tdsVersions = require("./tds-versions");

const FLAGS_1 = {
  ENDIAN_LITTLE: 0x00,
  ENDIAN_BIG: 0x01,
  CHARSET_ASCII: 0x00,
  CHARSET_EBCDIC: 0x02,
  FLOAT_IEEE_754: 0x00,
  FLOAT_VAX: 0x04,
  FLOAT_ND5000: 0x08,
  BCP_DUMPLOAD_ON: 0x00,
  BCP_DUMPLOAD_OFF: 0x10,
  USE_DB_ON: 0x00,
  USE_DB_OFF: 0x20,
  INIT_DB_WARN: 0x00,
  INIT_DB_FATAL: 0x40,
  SET_LANG_WARN_OFF: 0x00,
  SET_LANG_WARN_ON: 0x80
};
const FLAGS_2 = {
  INIT_LANG_WARN: 0x00,
  INIT_LANG_FATAL: 0x01,
  ODBC_OFF: 0x00,
  ODBC_ON: 0x02,
  F_TRAN_BOUNDARY: 0x04,
  F_CACHE_CONNECT: 0x08,
  USER_NORMAL: 0x00,
  USER_SERVER: 0x10,
  USER_REMUSER: 0x20,
  USER_SQLREPL: 0x40,
  INTEGRATED_SECURITY_OFF: 0x00,
  INTEGRATED_SECURITY_ON: 0x80
};
const TYPE_FLAGS = {
  SQL_DFLT: 0x00,
  SQL_TSQL: 0x08,
  OLEDB_OFF: 0x00,
  OLEDB_ON: 0x10,
  READ_WRITE_INTENT: 0x00,
  READ_ONLY_INTENT: 0x20
};
const FLAGS_3 = {
  CHANGE_PASSWORD_NO: 0x00,
  CHANGE_PASSWORD_YES: 0x01,
  BINARY_XML: 0x02,
  SPAWN_USER_INSTANCE: 0x04,
  UNKNOWN_COLLATION_HANDLING: 0x08,
  EXTENSION_USED: 0x10
};
const FEDAUTH_OPTIONS = {
  FEATURE_ID: 0x02,
  LIBRARY_SECURITYTOKEN: 0x01,
  LIBRARY_ADAL: 0x02,
  FEDAUTH_YES_ECHO: 0x01,
  FEDAUTH_NO_ECHO: 0x00,
  ADAL_WORKFLOW_USER_PASS: 0x01,
  ADAL_WORKFLOW_INTEGRATED: 0x02
};
const FEATURE_EXT_TERMINATOR = 0xFF;

/*
  s2.2.6.3
 */
class Login7Payload {
  constructor({
    tdsVersion,
    packetSize,
    clientProgVer,
    clientPid,
    connectionId,
    clientTimeZone,
    clientLcid
  }) {
    this.tdsVersion = void 0;
    this.packetSize = void 0;
    this.clientProgVer = void 0;
    this.clientPid = void 0;
    this.connectionId = void 0;
    this.clientTimeZone = void 0;
    this.clientLcid = void 0;
    this.readOnlyIntent = void 0;
    this.initDbFatal = void 0;
    this.userName = void 0;
    this.password = void 0;
    this.serverName = void 0;
    this.appName = void 0;
    this.hostname = void 0;
    this.libraryName = void 0;
    this.language = void 0;
    this.database = void 0;
    this.clientId = void 0;
    this.sspi = void 0;
    this.attachDbFile = void 0;
    this.changePassword = void 0;
    this.fedAuth = void 0;
    this.tdsVersion = tdsVersion;
    this.packetSize = packetSize;
    this.clientProgVer = clientProgVer;
    this.clientPid = clientPid;
    this.connectionId = connectionId;
    this.clientTimeZone = clientTimeZone;
    this.clientLcid = clientLcid;
    this.readOnlyIntent = false;
    this.initDbFatal = false;
    this.fedAuth = undefined;
    this.userName = undefined;
    this.password = undefined;
    this.serverName = undefined;
    this.appName = undefined;
    this.hostname = undefined;
    this.libraryName = undefined;
    this.language = undefined;
    this.database = undefined;
    this.clientId = undefined;
    this.sspi = undefined;
    this.attachDbFile = undefined;
    this.changePassword = undefined;
  }

  toBuffer() {
    const fixedData = Buffer.alloc(94);
    const buffers = [fixedData];
    let offset = 0;
    let dataOffset = fixedData.length; // Length: 4-byte

    offset = fixedData.writeUInt32LE(0, offset); // TDSVersion: 4-byte

    offset = fixedData.writeUInt32LE(this.tdsVersion, offset); // PacketSize: 4-byte

    offset = fixedData.writeUInt32LE(this.packetSize, offset); // ClientProgVer: 4-byte

    offset = fixedData.writeUInt32LE(this.clientProgVer, offset); // ClientPID: 4-byte

    offset = fixedData.writeUInt32LE(this.clientPid, offset); // ConnectionID: 4-byte

    offset = fixedData.writeUInt32LE(this.connectionId, offset); // OptionFlags1: 1-byte

    offset = fixedData.writeUInt8(this.buildOptionFlags1(), offset); // OptionFlags2: 1-byte

    offset = fixedData.writeUInt8(this.buildOptionFlags2(), offset); // TypeFlags: 1-byte

    offset = fixedData.writeUInt8(this.buildTypeFlags(), offset); // OptionFlags3: 1-byte

    offset = fixedData.writeUInt8(this.buildOptionFlags3(), offset); // ClientTimZone: 4-byte

    offset = fixedData.writeInt32LE(this.clientTimeZone, offset); // ClientLCID: 4-byte

    offset = fixedData.writeUInt32LE(this.clientLcid, offset); // ibHostName: 2-byte

    offset = fixedData.writeUInt16LE(dataOffset, offset); // cchHostName: 2-byte

    if (this.hostname) {
      const buffer = Buffer.from(this.hostname, 'ucs2');
      offset = fixedData.writeUInt16LE(buffer.length / 2, offset);
      dataOffset += buffer.length;
      buffers.push(buffer);
    } else {
      offset = fixedData.writeUInt16LE(dataOffset, offset);
    } // ibUserName: 2-byte


    offset = fixedData.writeUInt16LE(dataOffset, offset); // cchUserName: 2-byte

    if (this.userName) {
      const buffer = Buffer.from(this.userName, 'ucs2');
      offset = fixedData.writeUInt16LE(buffer.length / 2, offset);
      dataOffset += buffer.length;
      buffers.push(buffer);
    } else {
      offset = fixedData.writeUInt16LE(0, offset);
    } // ibPassword: 2-byte


    offset = fixedData.writeUInt16LE(dataOffset, offset); // cchPassword: 2-byte

    if (this.password) {
      const buffer = Buffer.from(this.password, 'ucs2');
      offset = fixedData.writeUInt16LE(buffer.length / 2, offset);
      dataOffset += buffer.length;
      buffers.push(this.scramblePassword(buffer));
    } else {
      offset = fixedData.writeUInt16LE(0, offset);
    } // ibAppName: 2-byte


    offset = fixedData.writeUInt16LE(dataOffset, offset); // cchAppName: 2-byte

    if (this.appName) {
      const buffer = Buffer.from(this.appName, 'ucs2');
      offset = fixedData.writeUInt16LE(buffer.length / 2, offset);
      dataOffset += buffer.length;
      buffers.push(buffer);
    } else {
      offset = fixedData.writeUInt16LE(0, offset);
    } // ibServerName: 2-byte


    offset = fixedData.writeUInt16LE(dataOffset, offset); // cchServerName: 2-byte

    if (this.serverName) {
      const buffer = Buffer.from(this.serverName, 'ucs2');
      offset = fixedData.writeUInt16LE(buffer.length / 2, offset);
      dataOffset += buffer.length;
      buffers.push(buffer);
    } else {
      offset = fixedData.writeUInt16LE(0, offset);
    } // (ibUnused / ibExtension): 2-byte


    offset = fixedData.writeUInt16LE(dataOffset, offset); // (cchUnused / cbExtension): 2-byte

    const extensions = this.buildFeatureExt();
    offset = fixedData.writeUInt16LE(4, offset);
    const extensionOffset = Buffer.alloc(4);
    extensionOffset.writeUInt32LE(dataOffset += 4, 0);
    dataOffset += extensions.length;
    buffers.push(extensionOffset, extensions); // ibCltIntName: 2-byte

    offset = fixedData.writeUInt16LE(dataOffset, offset); // cchCltIntName: 2-byte

    if (this.libraryName) {
      const buffer = Buffer.from(this.libraryName, 'ucs2');
      offset = fixedData.writeUInt16LE(buffer.length / 2, offset);
      dataOffset += buffer.length;
      buffers.push(buffer);
    } else {
      offset = fixedData.writeUInt16LE(0, offset);
    } // ibLanguage: 2-byte


    offset = fixedData.writeUInt16LE(dataOffset, offset); // cchLanguage: 2-byte

    if (this.language) {
      const buffer = Buffer.from(this.language, 'ucs2');
      offset = fixedData.writeUInt16LE(buffer.length / 2, offset);
      dataOffset += buffer.length;
      buffers.push(buffer);
    } else {
      offset = fixedData.writeUInt16LE(0, offset);
    } // ibDatabase: 2-byte


    offset = fixedData.writeUInt16LE(dataOffset, offset); // cchDatabase: 2-byte

    if (this.database) {
      const buffer = Buffer.from(this.database, 'ucs2');
      offset = fixedData.writeUInt16LE(buffer.length / 2, offset);
      dataOffset += buffer.length;
      buffers.push(buffer);
    } else {
      offset = fixedData.writeUInt16LE(0, offset);
    } // ClientID: 6-byte


    if (this.clientId) {
      this.clientId.copy(fixedData, offset, 0, 6);
    }

    offset += 6; // ibSSPI: 2-byte

    offset = fixedData.writeUInt16LE(dataOffset, offset); // cbSSPI: 2-byte

    if (this.sspi) {
      if (this.sspi.length > 65535) {
        offset = fixedData.writeUInt16LE(65535, offset);
      } else {
        offset = fixedData.writeUInt16LE(this.sspi.length, offset);
      }

      buffers.push(this.sspi);
    } else {
      offset = fixedData.writeUInt16LE(0, offset);
    } // ibAtchDBFile: 2-byte


    offset = fixedData.writeUInt16LE(dataOffset, offset); // cchAtchDBFile: 2-byte

    if (this.attachDbFile) {
      const buffer = Buffer.from(this.attachDbFile, 'ucs2');
      offset = fixedData.writeUInt16LE(buffer.length / 2, offset);
      dataOffset += buffer.length;
      buffers.push(buffer);
    } else {
      offset = fixedData.writeUInt16LE(0, offset);
    } // ibChangePassword: 2-byte


    offset = fixedData.writeUInt16LE(dataOffset, offset); // cchChangePassword: 2-byte

    if (this.changePassword) {
      const buffer = Buffer.from(this.changePassword, 'ucs2');
      offset = fixedData.writeUInt16LE(buffer.length / 2, offset);
      dataOffset += buffer.length;
      buffers.push(buffer);
    } else {
      offset = fixedData.writeUInt16LE(0, offset);
    } // cbSSPILong: 4-byte


    if (this.sspi && this.sspi.length > 65535) {
      fixedData.writeUInt32LE(this.sspi.length, offset);
    } else {
      fixedData.writeUInt32LE(0, offset);
    }

    const data = Buffer.concat(buffers);
    data.writeUInt32LE(data.length, 0);
    return data;
  }

  buildOptionFlags1() {
    let flags1 = FLAGS_1.ENDIAN_LITTLE | FLAGS_1.CHARSET_ASCII | FLAGS_1.FLOAT_IEEE_754 | FLAGS_1.BCP_DUMPLOAD_OFF | FLAGS_1.USE_DB_OFF | FLAGS_1.SET_LANG_WARN_ON;

    if (this.initDbFatal) {
      flags1 |= FLAGS_1.INIT_DB_FATAL;
    } else {
      flags1 |= FLAGS_1.INIT_DB_WARN;
    }

    return flags1;
  }

  buildFeatureExt() {
    const buffers = [];
    const fedAuth = this.fedAuth;

    if (fedAuth) {
      switch (fedAuth.type) {
        case 'ADAL':
          const buffer = Buffer.alloc(7);
          buffer.writeUInt8(FEDAUTH_OPTIONS.FEATURE_ID, 0);
          buffer.writeUInt32LE(2, 1);
          buffer.writeUInt8(FEDAUTH_OPTIONS.LIBRARY_ADAL << 1 | (fedAuth.echo ? FEDAUTH_OPTIONS.FEDAUTH_YES_ECHO : FEDAUTH_OPTIONS.FEDAUTH_NO_ECHO), 5);
          buffer.writeUInt8(fedAuth.workflow === 'integrated' ? 0x02 : FEDAUTH_OPTIONS.ADAL_WORKFLOW_USER_PASS, 6);
          buffers.push(buffer);
          break;

        case 'SECURITYTOKEN':
          const token = Buffer.from(fedAuth.fedAuthToken, 'ucs2');
          const buf = Buffer.alloc(10);
          let offset = 0;
          offset = buf.writeUInt8(FEDAUTH_OPTIONS.FEATURE_ID, offset);
          offset = buf.writeUInt32LE(token.length + 4 + 1, offset);
          offset = buf.writeUInt8(FEDAUTH_OPTIONS.LIBRARY_SECURITYTOKEN << 1 | (fedAuth.echo ? FEDAUTH_OPTIONS.FEDAUTH_YES_ECHO : FEDAUTH_OPTIONS.FEDAUTH_NO_ECHO), offset);
          buf.writeInt32LE(token.length, offset);
          buffers.push(buf);
          buffers.push(token);
          break;
      }
    }

    if (this.tdsVersion >= _tdsVersions.versions['7_4']) {
      // Signal UTF-8 support: Value 0x0A, bit 0 must be set to 1. Added in TDS 7.4.
      const UTF8_SUPPORT_FEATURE_ID = 0x0a;
      const UTF8_SUPPORT_CLIENT_SUPPORTS_UTF8 = 0x01;
      const buf = Buffer.alloc(6);
      buf.writeUInt8(UTF8_SUPPORT_FEATURE_ID, 0);
      buf.writeUInt32LE(1, 1);
      buf.writeUInt8(UTF8_SUPPORT_CLIENT_SUPPORTS_UTF8, 5);
      buffers.push(buf);
    }

    buffers.push(Buffer.from([FEATURE_EXT_TERMINATOR]));
    return Buffer.concat(buffers);
  }

  buildOptionFlags2() {
    let flags2 = FLAGS_2.INIT_LANG_WARN | FLAGS_2.ODBC_OFF | FLAGS_2.USER_NORMAL;

    if (this.sspi) {
      flags2 |= FLAGS_2.INTEGRATED_SECURITY_ON;
    } else {
      flags2 |= FLAGS_2.INTEGRATED_SECURITY_OFF;
    }

    return flags2;
  }

  buildTypeFlags() {
    let typeFlags = TYPE_FLAGS.SQL_DFLT | TYPE_FLAGS.OLEDB_OFF;

    if (this.readOnlyIntent) {
      typeFlags |= TYPE_FLAGS.READ_ONLY_INTENT;
    } else {
      typeFlags |= TYPE_FLAGS.READ_WRITE_INTENT;
    }

    return typeFlags;
  }

  buildOptionFlags3() {
    return FLAGS_3.CHANGE_PASSWORD_NO | FLAGS_3.UNKNOWN_COLLATION_HANDLING | FLAGS_3.EXTENSION_USED;
  }

  scramblePassword(password) {
    for (let b = 0, len = password.length; b < len; b++) {
      let byte = password[b];
      const lowNibble = byte & 0x0f;
      const highNibble = byte >> 4;
      byte = lowNibble << 4 | highNibble;
      byte = byte ^ 0xa5;
      password[b] = byte;
    }

    return password;
  }

  toString(indent = '') {
    return indent + 'Login7 - ' + (0, _sprintfJs.sprintf)('TDS:0x%08X, PacketSize:0x%08X, ClientProgVer:0x%08X, ClientPID:0x%08X, ConnectionID:0x%08X', this.tdsVersion, this.packetSize, this.clientProgVer, this.clientPid, this.connectionId) + '\n' + indent + '         ' + (0, _sprintfJs.sprintf)('Flags1:0x%02X, Flags2:0x%02X, TypeFlags:0x%02X, Flags3:0x%02X, ClientTimezone:%d, ClientLCID:0x%08X', this.buildOptionFlags1(), this.buildOptionFlags2(), this.buildTypeFlags(), this.buildOptionFlags3(), this.clientTimeZone, this.clientLcid) + '\n' + indent + '         ' + (0, _sprintfJs.sprintf)("Hostname:'%s', Username:'%s', Password:'%s', AppName:'%s', ServerName:'%s', LibraryName:'%s'", this.hostname, this.userName, this.password, this.appName, this.serverName, this.libraryName) + '\n' + indent + '         ' + (0, _sprintfJs.sprintf)("Language:'%s', Database:'%s', SSPI:'%s', AttachDbFile:'%s', ChangePassword:'%s'", this.language, this.database, this.sspi, this.attachDbFile, this.changePassword);
  }

}

var _default = Login7Payload;
exports.default = _default;
module.exports = Login7Payload;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJGTEFHU18xIiwiRU5ESUFOX0xJVFRMRSIsIkVORElBTl9CSUciLCJDSEFSU0VUX0FTQ0lJIiwiQ0hBUlNFVF9FQkNESUMiLCJGTE9BVF9JRUVFXzc1NCIsIkZMT0FUX1ZBWCIsIkZMT0FUX05ENTAwMCIsIkJDUF9EVU1QTE9BRF9PTiIsIkJDUF9EVU1QTE9BRF9PRkYiLCJVU0VfREJfT04iLCJVU0VfREJfT0ZGIiwiSU5JVF9EQl9XQVJOIiwiSU5JVF9EQl9GQVRBTCIsIlNFVF9MQU5HX1dBUk5fT0ZGIiwiU0VUX0xBTkdfV0FSTl9PTiIsIkZMQUdTXzIiLCJJTklUX0xBTkdfV0FSTiIsIklOSVRfTEFOR19GQVRBTCIsIk9EQkNfT0ZGIiwiT0RCQ19PTiIsIkZfVFJBTl9CT1VOREFSWSIsIkZfQ0FDSEVfQ09OTkVDVCIsIlVTRVJfTk9STUFMIiwiVVNFUl9TRVJWRVIiLCJVU0VSX1JFTVVTRVIiLCJVU0VSX1NRTFJFUEwiLCJJTlRFR1JBVEVEX1NFQ1VSSVRZX09GRiIsIklOVEVHUkFURURfU0VDVVJJVFlfT04iLCJUWVBFX0ZMQUdTIiwiU1FMX0RGTFQiLCJTUUxfVFNRTCIsIk9MRURCX09GRiIsIk9MRURCX09OIiwiUkVBRF9XUklURV9JTlRFTlQiLCJSRUFEX09OTFlfSU5URU5UIiwiRkxBR1NfMyIsIkNIQU5HRV9QQVNTV09SRF9OTyIsIkNIQU5HRV9QQVNTV09SRF9ZRVMiLCJCSU5BUllfWE1MIiwiU1BBV05fVVNFUl9JTlNUQU5DRSIsIlVOS05PV05fQ09MTEFUSU9OX0hBTkRMSU5HIiwiRVhURU5TSU9OX1VTRUQiLCJGRURBVVRIX09QVElPTlMiLCJGRUFUVVJFX0lEIiwiTElCUkFSWV9TRUNVUklUWVRPS0VOIiwiTElCUkFSWV9BREFMIiwiRkVEQVVUSF9ZRVNfRUNITyIsIkZFREFVVEhfTk9fRUNITyIsIkFEQUxfV09SS0ZMT1dfVVNFUl9QQVNTIiwiQURBTF9XT1JLRkxPV19JTlRFR1JBVEVEIiwiRkVBVFVSRV9FWFRfVEVSTUlOQVRPUiIsIkxvZ2luN1BheWxvYWQiLCJjb25zdHJ1Y3RvciIsInRkc1ZlcnNpb24iLCJwYWNrZXRTaXplIiwiY2xpZW50UHJvZ1ZlciIsImNsaWVudFBpZCIsImNvbm5lY3Rpb25JZCIsImNsaWVudFRpbWVab25lIiwiY2xpZW50TGNpZCIsInJlYWRPbmx5SW50ZW50IiwiaW5pdERiRmF0YWwiLCJ1c2VyTmFtZSIsInBhc3N3b3JkIiwic2VydmVyTmFtZSIsImFwcE5hbWUiLCJob3N0bmFtZSIsImxpYnJhcnlOYW1lIiwibGFuZ3VhZ2UiLCJkYXRhYmFzZSIsImNsaWVudElkIiwic3NwaSIsImF0dGFjaERiRmlsZSIsImNoYW5nZVBhc3N3b3JkIiwiZmVkQXV0aCIsInVuZGVmaW5lZCIsInRvQnVmZmVyIiwiZml4ZWREYXRhIiwiQnVmZmVyIiwiYWxsb2MiLCJidWZmZXJzIiwib2Zmc2V0IiwiZGF0YU9mZnNldCIsImxlbmd0aCIsIndyaXRlVUludDMyTEUiLCJ3cml0ZVVJbnQ4IiwiYnVpbGRPcHRpb25GbGFnczEiLCJidWlsZE9wdGlvbkZsYWdzMiIsImJ1aWxkVHlwZUZsYWdzIiwiYnVpbGRPcHRpb25GbGFnczMiLCJ3cml0ZUludDMyTEUiLCJ3cml0ZVVJbnQxNkxFIiwiYnVmZmVyIiwiZnJvbSIsInB1c2giLCJzY3JhbWJsZVBhc3N3b3JkIiwiZXh0ZW5zaW9ucyIsImJ1aWxkRmVhdHVyZUV4dCIsImV4dGVuc2lvbk9mZnNldCIsImNvcHkiLCJkYXRhIiwiY29uY2F0IiwiZmxhZ3MxIiwidHlwZSIsImVjaG8iLCJ3b3JrZmxvdyIsInRva2VuIiwiZmVkQXV0aFRva2VuIiwiYnVmIiwidmVyc2lvbnMiLCJVVEY4X1NVUFBPUlRfRkVBVFVSRV9JRCIsIlVURjhfU1VQUE9SVF9DTElFTlRfU1VQUE9SVFNfVVRGOCIsImZsYWdzMiIsInR5cGVGbGFncyIsImIiLCJsZW4iLCJieXRlIiwibG93TmliYmxlIiwiaGlnaE5pYmJsZSIsInRvU3RyaW5nIiwiaW5kZW50IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJzb3VyY2VzIjpbIi4uL3NyYy9sb2dpbjctcGF5bG9hZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzcHJpbnRmIH0gZnJvbSAnc3ByaW50Zi1qcyc7XG5pbXBvcnQgeyB2ZXJzaW9ucyB9IGZyb20gJy4vdGRzLXZlcnNpb25zJztcblxuY29uc3QgRkxBR1NfMSA9IHtcbiAgRU5ESUFOX0xJVFRMRTogMHgwMCxcbiAgRU5ESUFOX0JJRzogMHgwMSxcbiAgQ0hBUlNFVF9BU0NJSTogMHgwMCxcbiAgQ0hBUlNFVF9FQkNESUM6IDB4MDIsXG4gIEZMT0FUX0lFRUVfNzU0OiAweDAwLFxuICBGTE9BVF9WQVg6IDB4MDQsXG4gIEZMT0FUX05ENTAwMDogMHgwOCxcbiAgQkNQX0RVTVBMT0FEX09OOiAweDAwLFxuICBCQ1BfRFVNUExPQURfT0ZGOiAweDEwLFxuICBVU0VfREJfT046IDB4MDAsXG4gIFVTRV9EQl9PRkY6IDB4MjAsXG4gIElOSVRfREJfV0FSTjogMHgwMCxcbiAgSU5JVF9EQl9GQVRBTDogMHg0MCxcbiAgU0VUX0xBTkdfV0FSTl9PRkY6IDB4MDAsXG4gIFNFVF9MQU5HX1dBUk5fT046IDB4ODBcbn07XG5cbmNvbnN0IEZMQUdTXzIgPSB7XG4gIElOSVRfTEFOR19XQVJOOiAweDAwLFxuICBJTklUX0xBTkdfRkFUQUw6IDB4MDEsXG4gIE9EQkNfT0ZGOiAweDAwLFxuICBPREJDX09OOiAweDAyLFxuICBGX1RSQU5fQk9VTkRBUlk6IDB4MDQsXG4gIEZfQ0FDSEVfQ09OTkVDVDogMHgwOCxcbiAgVVNFUl9OT1JNQUw6IDB4MDAsXG4gIFVTRVJfU0VSVkVSOiAweDEwLFxuICBVU0VSX1JFTVVTRVI6IDB4MjAsXG4gIFVTRVJfU1FMUkVQTDogMHg0MCxcbiAgSU5URUdSQVRFRF9TRUNVUklUWV9PRkY6IDB4MDAsXG4gIElOVEVHUkFURURfU0VDVVJJVFlfT046IDB4ODBcbn07XG5cbmNvbnN0IFRZUEVfRkxBR1MgPSB7XG4gIFNRTF9ERkxUOiAweDAwLFxuICBTUUxfVFNRTDogMHgwOCxcbiAgT0xFREJfT0ZGOiAweDAwLFxuICBPTEVEQl9PTjogMHgxMCxcbiAgUkVBRF9XUklURV9JTlRFTlQ6IDB4MDAsXG4gIFJFQURfT05MWV9JTlRFTlQ6IDB4MjBcbn07XG5cbmNvbnN0IEZMQUdTXzMgPSB7XG4gIENIQU5HRV9QQVNTV09SRF9OTzogMHgwMCxcbiAgQ0hBTkdFX1BBU1NXT1JEX1lFUzogMHgwMSxcbiAgQklOQVJZX1hNTDogMHgwMixcbiAgU1BBV05fVVNFUl9JTlNUQU5DRTogMHgwNCxcbiAgVU5LTk9XTl9DT0xMQVRJT05fSEFORExJTkc6IDB4MDgsXG4gIEVYVEVOU0lPTl9VU0VEOiAweDEwXG59O1xuXG5jb25zdCBGRURBVVRIX09QVElPTlMgPSB7XG4gIEZFQVRVUkVfSUQ6IDB4MDIsXG4gIExJQlJBUllfU0VDVVJJVFlUT0tFTjogMHgwMSxcbiAgTElCUkFSWV9BREFMOiAweDAyLFxuICBGRURBVVRIX1lFU19FQ0hPOiAweDAxLFxuICBGRURBVVRIX05PX0VDSE86IDB4MDAsXG4gIEFEQUxfV09SS0ZMT1dfVVNFUl9QQVNTOiAweDAxLFxuICBBREFMX1dPUktGTE9XX0lOVEVHUkFURUQ6IDB4MDJcbn07XG5cbmNvbnN0IEZFQVRVUkVfRVhUX1RFUk1JTkFUT1IgPSAweEZGO1xuXG5pbnRlcmZhY2UgT3B0aW9ucyB7XG4gIHRkc1ZlcnNpb246IG51bWJlcjtcbiAgcGFja2V0U2l6ZTogbnVtYmVyO1xuICBjbGllbnRQcm9nVmVyOiBudW1iZXI7XG4gIGNsaWVudFBpZDogbnVtYmVyO1xuICBjb25uZWN0aW9uSWQ6IG51bWJlcjtcbiAgY2xpZW50VGltZVpvbmU6IG51bWJlcjtcbiAgY2xpZW50TGNpZDogbnVtYmVyO1xufVxuXG4vKlxuICBzMi4yLjYuM1xuICovXG5jbGFzcyBMb2dpbjdQYXlsb2FkIHtcbiAgdGRzVmVyc2lvbjogbnVtYmVyO1xuICBwYWNrZXRTaXplOiBudW1iZXI7XG4gIGNsaWVudFByb2dWZXI6IG51bWJlcjtcbiAgY2xpZW50UGlkOiBudW1iZXI7XG4gIGNvbm5lY3Rpb25JZDogbnVtYmVyO1xuICBjbGllbnRUaW1lWm9uZTogbnVtYmVyO1xuICBjbGllbnRMY2lkOiBudW1iZXI7XG5cbiAgcmVhZE9ubHlJbnRlbnQ6IGJvb2xlYW47XG4gIGluaXREYkZhdGFsOiBib29sZWFuO1xuXG4gIHVzZXJOYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHBhc3N3b3JkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHNlcnZlck5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgYXBwTmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBob3N0bmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBsaWJyYXJ5TmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBsYW5ndWFnZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBkYXRhYmFzZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBjbGllbnRJZDogQnVmZmVyIHwgdW5kZWZpbmVkO1xuICBzc3BpOiBCdWZmZXIgfCB1bmRlZmluZWQ7XG4gIGF0dGFjaERiRmlsZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBjaGFuZ2VQYXNzd29yZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gIGZlZEF1dGg6IHsgdHlwZTogJ0FEQUwnLCBlY2hvOiBib29sZWFuLCB3b3JrZmxvdzogJ2RlZmF1bHQnIHwgJ2ludGVncmF0ZWQnIH0gfCB7IHR5cGU6ICdTRUNVUklUWVRPS0VOJywgZWNobzogYm9vbGVhbiwgZmVkQXV0aFRva2VuOiBzdHJpbmcgfSB8IHVuZGVmaW5lZDtcblxuICBjb25zdHJ1Y3Rvcih7IHRkc1ZlcnNpb24sIHBhY2tldFNpemUsIGNsaWVudFByb2dWZXIsIGNsaWVudFBpZCwgY29ubmVjdGlvbklkLCBjbGllbnRUaW1lWm9uZSwgY2xpZW50TGNpZCB9OiBPcHRpb25zKSB7XG4gICAgdGhpcy50ZHNWZXJzaW9uID0gdGRzVmVyc2lvbjtcbiAgICB0aGlzLnBhY2tldFNpemUgPSBwYWNrZXRTaXplO1xuICAgIHRoaXMuY2xpZW50UHJvZ1ZlciA9IGNsaWVudFByb2dWZXI7XG4gICAgdGhpcy5jbGllbnRQaWQgPSBjbGllbnRQaWQ7XG4gICAgdGhpcy5jb25uZWN0aW9uSWQgPSBjb25uZWN0aW9uSWQ7XG4gICAgdGhpcy5jbGllbnRUaW1lWm9uZSA9IGNsaWVudFRpbWVab25lO1xuICAgIHRoaXMuY2xpZW50TGNpZCA9IGNsaWVudExjaWQ7XG5cbiAgICB0aGlzLnJlYWRPbmx5SW50ZW50ID0gZmFsc2U7XG4gICAgdGhpcy5pbml0RGJGYXRhbCA9IGZhbHNlO1xuXG4gICAgdGhpcy5mZWRBdXRoID0gdW5kZWZpbmVkO1xuXG4gICAgdGhpcy51c2VyTmFtZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnBhc3N3b3JkID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuc2VydmVyTmFtZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmFwcE5hbWUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5ob3N0bmFtZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmxpYnJhcnlOYW1lID0gdW5kZWZpbmVkO1xuICAgIHRoaXMubGFuZ3VhZ2UgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5kYXRhYmFzZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmNsaWVudElkID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuc3NwaSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmF0dGFjaERiRmlsZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmNoYW5nZVBhc3N3b3JkID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgdG9CdWZmZXIoKSB7XG4gICAgY29uc3QgZml4ZWREYXRhID0gQnVmZmVyLmFsbG9jKDk0KTtcbiAgICBjb25zdCBidWZmZXJzID0gW2ZpeGVkRGF0YV07XG5cbiAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICBsZXQgZGF0YU9mZnNldCA9IGZpeGVkRGF0YS5sZW5ndGg7XG5cbiAgICAvLyBMZW5ndGg6IDQtYnl0ZVxuICAgIG9mZnNldCA9IGZpeGVkRGF0YS53cml0ZVVJbnQzMkxFKDAsIG9mZnNldCk7XG5cbiAgICAvLyBURFNWZXJzaW9uOiA0LWJ5dGVcbiAgICBvZmZzZXQgPSBmaXhlZERhdGEud3JpdGVVSW50MzJMRSh0aGlzLnRkc1ZlcnNpb24sIG9mZnNldCk7XG5cbiAgICAvLyBQYWNrZXRTaXplOiA0LWJ5dGVcbiAgICBvZmZzZXQgPSBmaXhlZERhdGEud3JpdGVVSW50MzJMRSh0aGlzLnBhY2tldFNpemUsIG9mZnNldCk7XG5cbiAgICAvLyBDbGllbnRQcm9nVmVyOiA0LWJ5dGVcbiAgICBvZmZzZXQgPSBmaXhlZERhdGEud3JpdGVVSW50MzJMRSh0aGlzLmNsaWVudFByb2dWZXIsIG9mZnNldCk7XG5cbiAgICAvLyBDbGllbnRQSUQ6IDQtYnl0ZVxuICAgIG9mZnNldCA9IGZpeGVkRGF0YS53cml0ZVVJbnQzMkxFKHRoaXMuY2xpZW50UGlkLCBvZmZzZXQpO1xuXG4gICAgLy8gQ29ubmVjdGlvbklEOiA0LWJ5dGVcbiAgICBvZmZzZXQgPSBmaXhlZERhdGEud3JpdGVVSW50MzJMRSh0aGlzLmNvbm5lY3Rpb25JZCwgb2Zmc2V0KTtcblxuICAgIC8vIE9wdGlvbkZsYWdzMTogMS1ieXRlXG4gICAgb2Zmc2V0ID0gZml4ZWREYXRhLndyaXRlVUludDgodGhpcy5idWlsZE9wdGlvbkZsYWdzMSgpLCBvZmZzZXQpO1xuXG4gICAgLy8gT3B0aW9uRmxhZ3MyOiAxLWJ5dGVcbiAgICBvZmZzZXQgPSBmaXhlZERhdGEud3JpdGVVSW50OCh0aGlzLmJ1aWxkT3B0aW9uRmxhZ3MyKCksIG9mZnNldCk7XG5cbiAgICAvLyBUeXBlRmxhZ3M6IDEtYnl0ZVxuICAgIG9mZnNldCA9IGZpeGVkRGF0YS53cml0ZVVJbnQ4KHRoaXMuYnVpbGRUeXBlRmxhZ3MoKSwgb2Zmc2V0KTtcblxuICAgIC8vIE9wdGlvbkZsYWdzMzogMS1ieXRlXG4gICAgb2Zmc2V0ID0gZml4ZWREYXRhLndyaXRlVUludDgodGhpcy5idWlsZE9wdGlvbkZsYWdzMygpLCBvZmZzZXQpO1xuXG4gICAgLy8gQ2xpZW50VGltWm9uZTogNC1ieXRlXG4gICAgb2Zmc2V0ID0gZml4ZWREYXRhLndyaXRlSW50MzJMRSh0aGlzLmNsaWVudFRpbWVab25lLCBvZmZzZXQpO1xuXG4gICAgLy8gQ2xpZW50TENJRDogNC1ieXRlXG4gICAgb2Zmc2V0ID0gZml4ZWREYXRhLndyaXRlVUludDMyTEUodGhpcy5jbGllbnRMY2lkLCBvZmZzZXQpO1xuXG4gICAgLy8gaWJIb3N0TmFtZTogMi1ieXRlXG4gICAgb2Zmc2V0ID0gZml4ZWREYXRhLndyaXRlVUludDE2TEUoZGF0YU9mZnNldCwgb2Zmc2V0KTtcblxuICAgIC8vIGNjaEhvc3ROYW1lOiAyLWJ5dGVcbiAgICBpZiAodGhpcy5ob3N0bmFtZSkge1xuICAgICAgY29uc3QgYnVmZmVyID0gQnVmZmVyLmZyb20odGhpcy5ob3N0bmFtZSwgJ3VjczInKTtcblxuICAgICAgb2Zmc2V0ID0gZml4ZWREYXRhLndyaXRlVUludDE2TEUoYnVmZmVyLmxlbmd0aCAvIDIsIG9mZnNldCk7XG4gICAgICBkYXRhT2Zmc2V0ICs9IGJ1ZmZlci5sZW5ndGg7XG5cbiAgICAgIGJ1ZmZlcnMucHVzaChidWZmZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvZmZzZXQgPSBmaXhlZERhdGEud3JpdGVVSW50MTZMRShkYXRhT2Zmc2V0LCBvZmZzZXQpO1xuICAgIH1cblxuICAgIC8vIGliVXNlck5hbWU6IDItYnl0ZVxuICAgIG9mZnNldCA9IGZpeGVkRGF0YS53cml0ZVVJbnQxNkxFKGRhdGFPZmZzZXQsIG9mZnNldCk7XG5cbiAgICAvLyBjY2hVc2VyTmFtZTogMi1ieXRlXG4gICAgaWYgKHRoaXMudXNlck5hbWUpIHtcbiAgICAgIGNvbnN0IGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKHRoaXMudXNlck5hbWUsICd1Y3MyJyk7XG5cbiAgICAgIG9mZnNldCA9IGZpeGVkRGF0YS53cml0ZVVJbnQxNkxFKGJ1ZmZlci5sZW5ndGggLyAyLCBvZmZzZXQpO1xuICAgICAgZGF0YU9mZnNldCArPSBidWZmZXIubGVuZ3RoO1xuXG4gICAgICBidWZmZXJzLnB1c2goYnVmZmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb2Zmc2V0ID0gZml4ZWREYXRhLndyaXRlVUludDE2TEUoMCwgb2Zmc2V0KTtcbiAgICB9XG5cbiAgICAvLyBpYlBhc3N3b3JkOiAyLWJ5dGVcbiAgICBvZmZzZXQgPSBmaXhlZERhdGEud3JpdGVVSW50MTZMRShkYXRhT2Zmc2V0LCBvZmZzZXQpO1xuXG4gICAgLy8gY2NoUGFzc3dvcmQ6IDItYnl0ZVxuICAgIGlmICh0aGlzLnBhc3N3b3JkKSB7XG4gICAgICBjb25zdCBidWZmZXIgPSBCdWZmZXIuZnJvbSh0aGlzLnBhc3N3b3JkLCAndWNzMicpO1xuXG4gICAgICBvZmZzZXQgPSBmaXhlZERhdGEud3JpdGVVSW50MTZMRShidWZmZXIubGVuZ3RoIC8gMiwgb2Zmc2V0KTtcbiAgICAgIGRhdGFPZmZzZXQgKz0gYnVmZmVyLmxlbmd0aDtcblxuICAgICAgYnVmZmVycy5wdXNoKHRoaXMuc2NyYW1ibGVQYXNzd29yZChidWZmZXIpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb2Zmc2V0ID0gZml4ZWREYXRhLndyaXRlVUludDE2TEUoMCwgb2Zmc2V0KTtcbiAgICB9XG5cbiAgICAvLyBpYkFwcE5hbWU6IDItYnl0ZVxuICAgIG9mZnNldCA9IGZpeGVkRGF0YS53cml0ZVVJbnQxNkxFKGRhdGFPZmZzZXQsIG9mZnNldCk7XG5cbiAgICAvLyBjY2hBcHBOYW1lOiAyLWJ5dGVcbiAgICBpZiAodGhpcy5hcHBOYW1lKSB7XG4gICAgICBjb25zdCBidWZmZXIgPSBCdWZmZXIuZnJvbSh0aGlzLmFwcE5hbWUsICd1Y3MyJyk7XG5cbiAgICAgIG9mZnNldCA9IGZpeGVkRGF0YS53cml0ZVVJbnQxNkxFKGJ1ZmZlci5sZW5ndGggLyAyLCBvZmZzZXQpO1xuICAgICAgZGF0YU9mZnNldCArPSBidWZmZXIubGVuZ3RoO1xuXG4gICAgICBidWZmZXJzLnB1c2goYnVmZmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb2Zmc2V0ID0gZml4ZWREYXRhLndyaXRlVUludDE2TEUoMCwgb2Zmc2V0KTtcbiAgICB9XG5cbiAgICAvLyBpYlNlcnZlck5hbWU6IDItYnl0ZVxuICAgIG9mZnNldCA9IGZpeGVkRGF0YS53cml0ZVVJbnQxNkxFKGRhdGFPZmZzZXQsIG9mZnNldCk7XG5cbiAgICAvLyBjY2hTZXJ2ZXJOYW1lOiAyLWJ5dGVcbiAgICBpZiAodGhpcy5zZXJ2ZXJOYW1lKSB7XG4gICAgICBjb25zdCBidWZmZXIgPSBCdWZmZXIuZnJvbSh0aGlzLnNlcnZlck5hbWUsICd1Y3MyJyk7XG5cbiAgICAgIG9mZnNldCA9IGZpeGVkRGF0YS53cml0ZVVJbnQxNkxFKGJ1ZmZlci5sZW5ndGggLyAyLCBvZmZzZXQpO1xuICAgICAgZGF0YU9mZnNldCArPSBidWZmZXIubGVuZ3RoO1xuXG4gICAgICBidWZmZXJzLnB1c2goYnVmZmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb2Zmc2V0ID0gZml4ZWREYXRhLndyaXRlVUludDE2TEUoMCwgb2Zmc2V0KTtcbiAgICB9XG5cbiAgICAvLyAoaWJVbnVzZWQgLyBpYkV4dGVuc2lvbik6IDItYnl0ZVxuICAgIG9mZnNldCA9IGZpeGVkRGF0YS53cml0ZVVJbnQxNkxFKGRhdGFPZmZzZXQsIG9mZnNldCk7XG5cbiAgICAvLyAoY2NoVW51c2VkIC8gY2JFeHRlbnNpb24pOiAyLWJ5dGVcbiAgICBjb25zdCBleHRlbnNpb25zID0gdGhpcy5idWlsZEZlYXR1cmVFeHQoKTtcbiAgICBvZmZzZXQgPSBmaXhlZERhdGEud3JpdGVVSW50MTZMRSg0LCBvZmZzZXQpO1xuICAgIGNvbnN0IGV4dGVuc2lvbk9mZnNldCA9IEJ1ZmZlci5hbGxvYyg0KTtcbiAgICBleHRlbnNpb25PZmZzZXQud3JpdGVVSW50MzJMRShkYXRhT2Zmc2V0ICs9IDQsIDApO1xuICAgIGRhdGFPZmZzZXQgKz0gZXh0ZW5zaW9ucy5sZW5ndGg7XG4gICAgYnVmZmVycy5wdXNoKGV4dGVuc2lvbk9mZnNldCwgZXh0ZW5zaW9ucyk7XG5cbiAgICAvLyBpYkNsdEludE5hbWU6IDItYnl0ZVxuICAgIG9mZnNldCA9IGZpeGVkRGF0YS53cml0ZVVJbnQxNkxFKGRhdGFPZmZzZXQsIG9mZnNldCk7XG5cbiAgICAvLyBjY2hDbHRJbnROYW1lOiAyLWJ5dGVcbiAgICBpZiAodGhpcy5saWJyYXJ5TmFtZSkge1xuICAgICAgY29uc3QgYnVmZmVyID0gQnVmZmVyLmZyb20odGhpcy5saWJyYXJ5TmFtZSwgJ3VjczInKTtcblxuICAgICAgb2Zmc2V0ID0gZml4ZWREYXRhLndyaXRlVUludDE2TEUoYnVmZmVyLmxlbmd0aCAvIDIsIG9mZnNldCk7XG4gICAgICBkYXRhT2Zmc2V0ICs9IGJ1ZmZlci5sZW5ndGg7XG5cbiAgICAgIGJ1ZmZlcnMucHVzaChidWZmZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvZmZzZXQgPSBmaXhlZERhdGEud3JpdGVVSW50MTZMRSgwLCBvZmZzZXQpO1xuICAgIH1cblxuICAgIC8vIGliTGFuZ3VhZ2U6IDItYnl0ZVxuICAgIG9mZnNldCA9IGZpeGVkRGF0YS53cml0ZVVJbnQxNkxFKGRhdGFPZmZzZXQsIG9mZnNldCk7XG5cbiAgICAvLyBjY2hMYW5ndWFnZTogMi1ieXRlXG4gICAgaWYgKHRoaXMubGFuZ3VhZ2UpIHtcbiAgICAgIGNvbnN0IGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKHRoaXMubGFuZ3VhZ2UsICd1Y3MyJyk7XG5cbiAgICAgIG9mZnNldCA9IGZpeGVkRGF0YS53cml0ZVVJbnQxNkxFKGJ1ZmZlci5sZW5ndGggLyAyLCBvZmZzZXQpO1xuICAgICAgZGF0YU9mZnNldCArPSBidWZmZXIubGVuZ3RoO1xuXG4gICAgICBidWZmZXJzLnB1c2goYnVmZmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb2Zmc2V0ID0gZml4ZWREYXRhLndyaXRlVUludDE2TEUoMCwgb2Zmc2V0KTtcbiAgICB9XG5cbiAgICAvLyBpYkRhdGFiYXNlOiAyLWJ5dGVcbiAgICBvZmZzZXQgPSBmaXhlZERhdGEud3JpdGVVSW50MTZMRShkYXRhT2Zmc2V0LCBvZmZzZXQpO1xuXG4gICAgLy8gY2NoRGF0YWJhc2U6IDItYnl0ZVxuICAgIGlmICh0aGlzLmRhdGFiYXNlKSB7XG4gICAgICBjb25zdCBidWZmZXIgPSBCdWZmZXIuZnJvbSh0aGlzLmRhdGFiYXNlLCAndWNzMicpO1xuXG4gICAgICBvZmZzZXQgPSBmaXhlZERhdGEud3JpdGVVSW50MTZMRShidWZmZXIubGVuZ3RoIC8gMiwgb2Zmc2V0KTtcbiAgICAgIGRhdGFPZmZzZXQgKz0gYnVmZmVyLmxlbmd0aDtcblxuICAgICAgYnVmZmVycy5wdXNoKGJ1ZmZlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9mZnNldCA9IGZpeGVkRGF0YS53cml0ZVVJbnQxNkxFKDAsIG9mZnNldCk7XG4gICAgfVxuXG4gICAgLy8gQ2xpZW50SUQ6IDYtYnl0ZVxuICAgIGlmICh0aGlzLmNsaWVudElkKSB7XG4gICAgICB0aGlzLmNsaWVudElkLmNvcHkoZml4ZWREYXRhLCBvZmZzZXQsIDAsIDYpO1xuICAgIH1cbiAgICBvZmZzZXQgKz0gNjtcblxuICAgIC8vIGliU1NQSTogMi1ieXRlXG4gICAgb2Zmc2V0ID0gZml4ZWREYXRhLndyaXRlVUludDE2TEUoZGF0YU9mZnNldCwgb2Zmc2V0KTtcblxuICAgIC8vIGNiU1NQSTogMi1ieXRlXG4gICAgaWYgKHRoaXMuc3NwaSkge1xuICAgICAgaWYgKHRoaXMuc3NwaS5sZW5ndGggPiA2NTUzNSkge1xuICAgICAgICBvZmZzZXQgPSBmaXhlZERhdGEud3JpdGVVSW50MTZMRSg2NTUzNSwgb2Zmc2V0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9mZnNldCA9IGZpeGVkRGF0YS53cml0ZVVJbnQxNkxFKHRoaXMuc3NwaS5sZW5ndGgsIG9mZnNldCk7XG4gICAgICB9XG5cbiAgICAgIGJ1ZmZlcnMucHVzaCh0aGlzLnNzcGkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBvZmZzZXQgPSBmaXhlZERhdGEud3JpdGVVSW50MTZMRSgwLCBvZmZzZXQpO1xuICAgIH1cblxuICAgIC8vIGliQXRjaERCRmlsZTogMi1ieXRlXG4gICAgb2Zmc2V0ID0gZml4ZWREYXRhLndyaXRlVUludDE2TEUoZGF0YU9mZnNldCwgb2Zmc2V0KTtcblxuICAgIC8vIGNjaEF0Y2hEQkZpbGU6IDItYnl0ZVxuICAgIGlmICh0aGlzLmF0dGFjaERiRmlsZSkge1xuICAgICAgY29uc3QgYnVmZmVyID0gQnVmZmVyLmZyb20odGhpcy5hdHRhY2hEYkZpbGUsICd1Y3MyJyk7XG5cbiAgICAgIG9mZnNldCA9IGZpeGVkRGF0YS53cml0ZVVJbnQxNkxFKGJ1ZmZlci5sZW5ndGggLyAyLCBvZmZzZXQpO1xuICAgICAgZGF0YU9mZnNldCArPSBidWZmZXIubGVuZ3RoO1xuXG4gICAgICBidWZmZXJzLnB1c2goYnVmZmVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb2Zmc2V0ID0gZml4ZWREYXRhLndyaXRlVUludDE2TEUoMCwgb2Zmc2V0KTtcbiAgICB9XG5cbiAgICAvLyBpYkNoYW5nZVBhc3N3b3JkOiAyLWJ5dGVcbiAgICBvZmZzZXQgPSBmaXhlZERhdGEud3JpdGVVSW50MTZMRShkYXRhT2Zmc2V0LCBvZmZzZXQpO1xuXG4gICAgLy8gY2NoQ2hhbmdlUGFzc3dvcmQ6IDItYnl0ZVxuICAgIGlmICh0aGlzLmNoYW5nZVBhc3N3b3JkKSB7XG4gICAgICBjb25zdCBidWZmZXIgPSBCdWZmZXIuZnJvbSh0aGlzLmNoYW5nZVBhc3N3b3JkLCAndWNzMicpO1xuXG4gICAgICBvZmZzZXQgPSBmaXhlZERhdGEud3JpdGVVSW50MTZMRShidWZmZXIubGVuZ3RoIC8gMiwgb2Zmc2V0KTtcbiAgICAgIGRhdGFPZmZzZXQgKz0gYnVmZmVyLmxlbmd0aDtcblxuICAgICAgYnVmZmVycy5wdXNoKGJ1ZmZlcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9mZnNldCA9IGZpeGVkRGF0YS53cml0ZVVJbnQxNkxFKDAsIG9mZnNldCk7XG4gICAgfVxuXG4gICAgLy8gY2JTU1BJTG9uZzogNC1ieXRlXG4gICAgaWYgKHRoaXMuc3NwaSAmJiB0aGlzLnNzcGkubGVuZ3RoID4gNjU1MzUpIHtcbiAgICAgIGZpeGVkRGF0YS53cml0ZVVJbnQzMkxFKHRoaXMuc3NwaS5sZW5ndGgsIG9mZnNldCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpeGVkRGF0YS53cml0ZVVJbnQzMkxFKDAsIG9mZnNldCk7XG4gICAgfVxuXG4gICAgY29uc3QgZGF0YSA9IEJ1ZmZlci5jb25jYXQoYnVmZmVycyk7XG4gICAgZGF0YS53cml0ZVVJbnQzMkxFKGRhdGEubGVuZ3RoLCAwKTtcbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGJ1aWxkT3B0aW9uRmxhZ3MxKCkge1xuICAgIGxldCBmbGFnczEgPSBGTEFHU18xLkVORElBTl9MSVRUTEUgfCBGTEFHU18xLkNIQVJTRVRfQVNDSUkgfCBGTEFHU18xLkZMT0FUX0lFRUVfNzU0IHwgRkxBR1NfMS5CQ1BfRFVNUExPQURfT0ZGIHwgRkxBR1NfMS5VU0VfREJfT0ZGIHwgRkxBR1NfMS5TRVRfTEFOR19XQVJOX09OO1xuICAgIGlmICh0aGlzLmluaXREYkZhdGFsKSB7XG4gICAgICBmbGFnczEgfD0gRkxBR1NfMS5JTklUX0RCX0ZBVEFMO1xuICAgIH0gZWxzZSB7XG4gICAgICBmbGFnczEgfD0gRkxBR1NfMS5JTklUX0RCX1dBUk47XG4gICAgfVxuICAgIHJldHVybiBmbGFnczE7XG4gIH1cblxuICBidWlsZEZlYXR1cmVFeHQoKSB7XG4gICAgY29uc3QgYnVmZmVycyA9IFtdO1xuXG4gICAgY29uc3QgZmVkQXV0aCA9IHRoaXMuZmVkQXV0aDtcbiAgICBpZiAoZmVkQXV0aCkge1xuICAgICAgc3dpdGNoIChmZWRBdXRoLnR5cGUpIHtcbiAgICAgICAgY2FzZSAnQURBTCc6XG4gICAgICAgICAgY29uc3QgYnVmZmVyID0gQnVmZmVyLmFsbG9jKDcpO1xuICAgICAgICAgIGJ1ZmZlci53cml0ZVVJbnQ4KEZFREFVVEhfT1BUSU9OUy5GRUFUVVJFX0lELCAwKTtcbiAgICAgICAgICBidWZmZXIud3JpdGVVSW50MzJMRSgyLCAxKTtcbiAgICAgICAgICBidWZmZXIud3JpdGVVSW50OCgoRkVEQVVUSF9PUFRJT05TLkxJQlJBUllfQURBTCA8PCAxKSB8IChmZWRBdXRoLmVjaG8gPyBGRURBVVRIX09QVElPTlMuRkVEQVVUSF9ZRVNfRUNITyA6IEZFREFVVEhfT1BUSU9OUy5GRURBVVRIX05PX0VDSE8pLCA1KTtcbiAgICAgICAgICBidWZmZXIud3JpdGVVSW50OChmZWRBdXRoLndvcmtmbG93ID09PSAnaW50ZWdyYXRlZCcgPyAweDAyIDogRkVEQVVUSF9PUFRJT05TLkFEQUxfV09SS0ZMT1dfVVNFUl9QQVNTLCA2KTtcbiAgICAgICAgICBidWZmZXJzLnB1c2goYnVmZmVyKTtcbiAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICdTRUNVUklUWVRPS0VOJzpcbiAgICAgICAgICBjb25zdCB0b2tlbiA9IEJ1ZmZlci5mcm9tKGZlZEF1dGguZmVkQXV0aFRva2VuLCAndWNzMicpO1xuICAgICAgICAgIGNvbnN0IGJ1ZiA9IEJ1ZmZlci5hbGxvYygxMCk7XG5cbiAgICAgICAgICBsZXQgb2Zmc2V0ID0gMDtcbiAgICAgICAgICBvZmZzZXQgPSBidWYud3JpdGVVSW50OChGRURBVVRIX09QVElPTlMuRkVBVFVSRV9JRCwgb2Zmc2V0KTtcbiAgICAgICAgICBvZmZzZXQgPSBidWYud3JpdGVVSW50MzJMRSh0b2tlbi5sZW5ndGggKyA0ICsgMSwgb2Zmc2V0KTtcbiAgICAgICAgICBvZmZzZXQgPSBidWYud3JpdGVVSW50OCgoRkVEQVVUSF9PUFRJT05TLkxJQlJBUllfU0VDVVJJVFlUT0tFTiA8PCAxKSB8IChmZWRBdXRoLmVjaG8gPyBGRURBVVRIX09QVElPTlMuRkVEQVVUSF9ZRVNfRUNITyA6IEZFREFVVEhfT1BUSU9OUy5GRURBVVRIX05PX0VDSE8pLCBvZmZzZXQpO1xuICAgICAgICAgIGJ1Zi53cml0ZUludDMyTEUodG9rZW4ubGVuZ3RoLCBvZmZzZXQpO1xuXG4gICAgICAgICAgYnVmZmVycy5wdXNoKGJ1Zik7XG4gICAgICAgICAgYnVmZmVycy5wdXNoKHRva2VuKTtcblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0aGlzLnRkc1ZlcnNpb24gPj0gdmVyc2lvbnNbJzdfNCddKSB7XG4gICAgICAvLyBTaWduYWwgVVRGLTggc3VwcG9ydDogVmFsdWUgMHgwQSwgYml0IDAgbXVzdCBiZSBzZXQgdG8gMS4gQWRkZWQgaW4gVERTIDcuNC5cbiAgICAgIGNvbnN0IFVURjhfU1VQUE9SVF9GRUFUVVJFX0lEID0gMHgwYTtcbiAgICAgIGNvbnN0IFVURjhfU1VQUE9SVF9DTElFTlRfU1VQUE9SVFNfVVRGOCA9IDB4MDE7XG4gICAgICBjb25zdCBidWYgPSBCdWZmZXIuYWxsb2MoNik7XG4gICAgICBidWYud3JpdGVVSW50OChVVEY4X1NVUFBPUlRfRkVBVFVSRV9JRCwgMCk7XG4gICAgICBidWYud3JpdGVVSW50MzJMRSgxLCAxKTtcbiAgICAgIGJ1Zi53cml0ZVVJbnQ4KFVURjhfU1VQUE9SVF9DTElFTlRfU1VQUE9SVFNfVVRGOCwgNSk7XG4gICAgICBidWZmZXJzLnB1c2goYnVmKTtcbiAgICB9XG5cbiAgICBidWZmZXJzLnB1c2goQnVmZmVyLmZyb20oW0ZFQVRVUkVfRVhUX1RFUk1JTkFUT1JdKSk7XG5cbiAgICByZXR1cm4gQnVmZmVyLmNvbmNhdChidWZmZXJzKTtcbiAgfVxuXG4gIGJ1aWxkT3B0aW9uRmxhZ3MyKCkge1xuICAgIGxldCBmbGFnczIgPSBGTEFHU18yLklOSVRfTEFOR19XQVJOIHwgRkxBR1NfMi5PREJDX09GRiB8IEZMQUdTXzIuVVNFUl9OT1JNQUw7XG4gICAgaWYgKHRoaXMuc3NwaSkge1xuICAgICAgZmxhZ3MyIHw9IEZMQUdTXzIuSU5URUdSQVRFRF9TRUNVUklUWV9PTjtcbiAgICB9IGVsc2Uge1xuICAgICAgZmxhZ3MyIHw9IEZMQUdTXzIuSU5URUdSQVRFRF9TRUNVUklUWV9PRkY7XG4gICAgfVxuICAgIHJldHVybiBmbGFnczI7XG4gIH1cblxuICBidWlsZFR5cGVGbGFncygpIHtcbiAgICBsZXQgdHlwZUZsYWdzID0gVFlQRV9GTEFHUy5TUUxfREZMVCB8IFRZUEVfRkxBR1MuT0xFREJfT0ZGO1xuICAgIGlmICh0aGlzLnJlYWRPbmx5SW50ZW50KSB7XG4gICAgICB0eXBlRmxhZ3MgfD0gVFlQRV9GTEFHUy5SRUFEX09OTFlfSU5URU5UO1xuICAgIH0gZWxzZSB7XG4gICAgICB0eXBlRmxhZ3MgfD0gVFlQRV9GTEFHUy5SRUFEX1dSSVRFX0lOVEVOVDtcbiAgICB9XG4gICAgcmV0dXJuIHR5cGVGbGFncztcbiAgfVxuXG4gIGJ1aWxkT3B0aW9uRmxhZ3MzKCkge1xuICAgIHJldHVybiBGTEFHU18zLkNIQU5HRV9QQVNTV09SRF9OTyB8IEZMQUdTXzMuVU5LTk9XTl9DT0xMQVRJT05fSEFORExJTkcgfCBGTEFHU18zLkVYVEVOU0lPTl9VU0VEO1xuICB9XG5cbiAgc2NyYW1ibGVQYXNzd29yZChwYXNzd29yZDogQnVmZmVyKSB7XG4gICAgZm9yIChsZXQgYiA9IDAsIGxlbiA9IHBhc3N3b3JkLmxlbmd0aDsgYiA8IGxlbjsgYisrKSB7XG4gICAgICBsZXQgYnl0ZSA9IHBhc3N3b3JkW2JdO1xuICAgICAgY29uc3QgbG93TmliYmxlID0gYnl0ZSAmIDB4MGY7XG4gICAgICBjb25zdCBoaWdoTmliYmxlID0gYnl0ZSA+PiA0O1xuICAgICAgYnl0ZSA9IChsb3dOaWJibGUgPDwgNCkgfCBoaWdoTmliYmxlO1xuICAgICAgYnl0ZSA9IGJ5dGUgXiAweGE1O1xuICAgICAgcGFzc3dvcmRbYl0gPSBieXRlO1xuICAgIH1cbiAgICByZXR1cm4gcGFzc3dvcmQ7XG4gIH1cblxuICB0b1N0cmluZyhpbmRlbnQgPSAnJykge1xuICAgIHJldHVybiBpbmRlbnQgKyAnTG9naW43IC0gJyArXG4gICAgICBzcHJpbnRmKCdURFM6MHglMDhYLCBQYWNrZXRTaXplOjB4JTA4WCwgQ2xpZW50UHJvZ1ZlcjoweCUwOFgsIENsaWVudFBJRDoweCUwOFgsIENvbm5lY3Rpb25JRDoweCUwOFgnLFxuICAgICAgICAgICAgICB0aGlzLnRkc1ZlcnNpb24sIHRoaXMucGFja2V0U2l6ZSwgdGhpcy5jbGllbnRQcm9nVmVyLCB0aGlzLmNsaWVudFBpZCwgdGhpcy5jb25uZWN0aW9uSWRcbiAgICAgICkgKyAnXFxuJyArIGluZGVudCArICcgICAgICAgICAnICtcbiAgICAgIHNwcmludGYoJ0ZsYWdzMToweCUwMlgsIEZsYWdzMjoweCUwMlgsIFR5cGVGbGFnczoweCUwMlgsIEZsYWdzMzoweCUwMlgsIENsaWVudFRpbWV6b25lOiVkLCBDbGllbnRMQ0lEOjB4JTA4WCcsXG4gICAgICAgICAgICAgIHRoaXMuYnVpbGRPcHRpb25GbGFnczEoKSwgdGhpcy5idWlsZE9wdGlvbkZsYWdzMigpLCB0aGlzLmJ1aWxkVHlwZUZsYWdzKCksIHRoaXMuYnVpbGRPcHRpb25GbGFnczMoKSwgdGhpcy5jbGllbnRUaW1lWm9uZSwgdGhpcy5jbGllbnRMY2lkXG4gICAgICApICsgJ1xcbicgKyBpbmRlbnQgKyAnICAgICAgICAgJyArXG4gICAgICBzcHJpbnRmKFwiSG9zdG5hbWU6JyVzJywgVXNlcm5hbWU6JyVzJywgUGFzc3dvcmQ6JyVzJywgQXBwTmFtZTonJXMnLCBTZXJ2ZXJOYW1lOiclcycsIExpYnJhcnlOYW1lOiclcydcIixcbiAgICAgICAgICAgICAgdGhpcy5ob3N0bmFtZSwgdGhpcy51c2VyTmFtZSwgdGhpcy5wYXNzd29yZCwgdGhpcy5hcHBOYW1lLCB0aGlzLnNlcnZlck5hbWUsIHRoaXMubGlicmFyeU5hbWVcbiAgICAgICkgKyAnXFxuJyArIGluZGVudCArICcgICAgICAgICAnICtcbiAgICAgIHNwcmludGYoXCJMYW5ndWFnZTonJXMnLCBEYXRhYmFzZTonJXMnLCBTU1BJOiclcycsIEF0dGFjaERiRmlsZTonJXMnLCBDaGFuZ2VQYXNzd29yZDonJXMnXCIsXG4gICAgICAgICAgICAgIHRoaXMubGFuZ3VhZ2UsIHRoaXMuZGF0YWJhc2UsIHRoaXMuc3NwaSwgdGhpcy5hdHRhY2hEYkZpbGUsIHRoaXMuY2hhbmdlUGFzc3dvcmRcbiAgICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTG9naW43UGF5bG9hZDtcbm1vZHVsZS5leHBvcnRzID0gTG9naW43UGF5bG9hZDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUVBLE1BQU1BLE9BQU8sR0FBRztFQUNkQyxhQUFhLEVBQUUsSUFERDtFQUVkQyxVQUFVLEVBQUUsSUFGRTtFQUdkQyxhQUFhLEVBQUUsSUFIRDtFQUlkQyxjQUFjLEVBQUUsSUFKRjtFQUtkQyxjQUFjLEVBQUUsSUFMRjtFQU1kQyxTQUFTLEVBQUUsSUFORztFQU9kQyxZQUFZLEVBQUUsSUFQQTtFQVFkQyxlQUFlLEVBQUUsSUFSSDtFQVNkQyxnQkFBZ0IsRUFBRSxJQVRKO0VBVWRDLFNBQVMsRUFBRSxJQVZHO0VBV2RDLFVBQVUsRUFBRSxJQVhFO0VBWWRDLFlBQVksRUFBRSxJQVpBO0VBYWRDLGFBQWEsRUFBRSxJQWJEO0VBY2RDLGlCQUFpQixFQUFFLElBZEw7RUFlZEMsZ0JBQWdCLEVBQUU7QUFmSixDQUFoQjtBQWtCQSxNQUFNQyxPQUFPLEdBQUc7RUFDZEMsY0FBYyxFQUFFLElBREY7RUFFZEMsZUFBZSxFQUFFLElBRkg7RUFHZEMsUUFBUSxFQUFFLElBSEk7RUFJZEMsT0FBTyxFQUFFLElBSks7RUFLZEMsZUFBZSxFQUFFLElBTEg7RUFNZEMsZUFBZSxFQUFFLElBTkg7RUFPZEMsV0FBVyxFQUFFLElBUEM7RUFRZEMsV0FBVyxFQUFFLElBUkM7RUFTZEMsWUFBWSxFQUFFLElBVEE7RUFVZEMsWUFBWSxFQUFFLElBVkE7RUFXZEMsdUJBQXVCLEVBQUUsSUFYWDtFQVlkQyxzQkFBc0IsRUFBRTtBQVpWLENBQWhCO0FBZUEsTUFBTUMsVUFBVSxHQUFHO0VBQ2pCQyxRQUFRLEVBQUUsSUFETztFQUVqQkMsUUFBUSxFQUFFLElBRk87RUFHakJDLFNBQVMsRUFBRSxJQUhNO0VBSWpCQyxRQUFRLEVB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