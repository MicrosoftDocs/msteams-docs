"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UnexpectedTokenError = exports.TokenHandler = exports.RequestTokenHandler = exports.Login7TokenHandler = exports.InitialSqlTokenHandler = exports.AttentionTokenHandler = void 0;

var _request = _interopRequireDefault(require("../request"));

var _errors = require("../errors");

var _esAggregateError = _interopRequireDefault(require("es-aggregate-error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UnexpectedTokenError extends Error {
  constructor(handler, token) {
    super('Unexpected token `' + token.name + '` in `' + handler.constructor.name + '`');
  }

}

exports.UnexpectedTokenError = UnexpectedTokenError;

class TokenHandler {
  onInfoMessage(token) {
    throw new UnexpectedTokenError(this, token);
  }

  onErrorMessage(token) {
    throw new UnexpectedTokenError(this, token);
  }

  onSSPI(token) {
    throw new UnexpectedTokenError(this, token);
  }

  onDatabaseChange(token) {
    throw new UnexpectedTokenError(this, token);
  }

  onLanguageChange(token) {
    throw new UnexpectedTokenError(this, token);
  }

  onCharsetChange(token) {
    throw new UnexpectedTokenError(this, token);
  }

  onSqlCollationChange(token) {
    throw new UnexpectedTokenError(this, token);
  }

  onRoutingChange(token) {
    throw new UnexpectedTokenError(this, token);
  }

  onPacketSizeChange(token) {
    throw new UnexpectedTokenError(this, token);
  }

  onResetConnection(token) {
    throw new UnexpectedTokenError(this, token);
  }

  onBeginTransaction(token) {
    throw new UnexpectedTokenError(this, token);
  }

  onCommitTransaction(token) {
    throw new UnexpectedTokenError(this, token);
  }

  onRollbackTransaction(token) {
    throw new UnexpectedTokenError(this, token);
  }

  onFedAuthInfo(token) {
    throw new UnexpectedTokenError(this, token);
  }

  onFeatureExtAck(token) {
    throw new UnexpectedTokenError(this, token);
  }

  onLoginAck(token) {
    throw new UnexpectedTokenError(this, token);
  }

  onColMetadata(token) {
    throw new UnexpectedTokenError(this, token);
  }

  onOrder(token) {
    throw new UnexpectedTokenError(this, token);
  }

  onRow(token) {
    throw new UnexpectedTokenError(this, token);
  }

  onReturnStatus(token) {
    throw new UnexpectedTokenError(this, token);
  }

  onReturnValue(token) {
    throw new UnexpectedTokenError(this, token);
  }

  onDoneProc(token) {
    throw new UnexpectedTokenError(this, token);
  }

  onDoneInProc(token) {
    throw new UnexpectedTokenError(this, token);
  }

  onDone(token) {
    throw new UnexpectedTokenError(this, token);
  }

  onDatabaseMirroringPartner(token) {
    throw new UnexpectedTokenError(this, token);
  }

}
/**
 * A handler for tokens received in the response message to the initial SQL Batch request
 * that sets up different connection settings.
 */


exports.TokenHandler = TokenHandler;

class InitialSqlTokenHandler extends TokenHandler {
  constructor(connection) {
    super();
    this.connection = void 0;
    this.connection = connection;
  }

  onInfoMessage(token) {
    this.connection.emit('infoMessage', token);
  }

  onErrorMessage(token) {
    this.connection.emit('errorMessage', token);
  }

  onDatabaseChange(token) {
    this.connection.emit('databaseChange', token.newValue);
  }

  onLanguageChange(token) {
    this.connection.emit('languageChange', token.newValue);
  }

  onCharsetChange(token) {
    this.connection.emit('charsetChange', token.newValue);
  }

  onSqlCollationChange(token) {
    this.connection.databaseCollation = token.newValue;
  }

  onPacketSizeChange(token) {
    this.connection.messageIo.packetSize(token.newValue);
  }

  onBeginTransaction(token) {
    this.connection.transactionDescriptors.push(token.newValue);
    this.connection.inTransaction = true;
  }

  onCommitTransaction(token) {
    this.connection.transactionDescriptors.length = 1;
    this.connection.inTransaction = false;
  }

  onRollbackTransaction(token) {
    this.connection.transactionDescriptors.length = 1; // An outermost transaction was rolled back. Reset the transaction counter

    this.connection.inTransaction = false;
    this.connection.emit('rollbackTransaction');
  }

  onColMetadata(token) {
    this.connection.emit('error', new Error("Received 'columnMetadata' when no sqlRequest is in progress"));
    this.connection.close();
  }

  onOrder(token) {
    this.connection.emit('error', new Error("Received 'order' when no sqlRequest is in progress"));
    this.connection.close();
  }

  onRow(token) {
    this.connection.emit('error', new Error("Received 'row' when no sqlRequest is in progress"));
    this.connection.close();
  }

  onReturnStatus(token) {// Do nothing
  }

  onReturnValue(token) {// Do nothing
  }

  onDoneProc(token) {// Do nothing
  }

  onDoneInProc(token) {// Do nothing
  }

  onDone(token) {// Do nothing
  }

  onResetConnection(token) {
    this.connection.emit('resetConnection');
  }

}
/**
 * A handler for tokens received in the response message to a Login7 message.
 */


exports.InitialSqlTokenHandler = InitialSqlTokenHandler;

class Login7TokenHandler extends TokenHandler {
  constructor(connection) {
    super();
    this.connection = void 0;
    this.fedAuthInfoToken = void 0;
    this.routingData = void 0;
    this.loginAckReceived = false;
    this.connection = connection;
  }

  onInfoMessage(token) {
    this.connection.emit('infoMessage', token);
  }

  onErrorMessage(token) {
    this.connection.emit('errorMessage', token);
    const error = new _errors.ConnectionError(token.message, 'ELOGIN');
    const isLoginErrorTransient = this.connection.transientErrorLookup.isTransientError(token.number);

    if (isLoginErrorTransient && this.connection.curTransientRetryCount !== this.connection.config.options.maxRetriesOnTransientErrors) {
      error.isTransient = true;
    }

    this.connection.loginError = error;
  }

  onSSPI(token) {
    if (token.ntlmpacket) {
      this.connection.ntlmpacket = token.ntlmpacket;
      this.connection.ntlmpacketBuffer = token.ntlmpacketBuffer;
    }
  }

  onDatabaseChange(token) {
    this.connection.emit('databaseChange', token.newValue);
  }

  onLanguageChange(token) {
    this.connection.emit('languageChange', token.newValue);
  }

  onCharsetChange(token) {
    this.connection.emit('charsetChange', token.newValue);
  }

  onSqlCollationChange(token) {
    this.connection.databaseCollation = token.newValue;
  }

  onFedAuthInfo(token) {
    this.fedAuthInfoToken = token;
  }

  onFeatureExtAck(token) {
    const {
      authentication
    } = this.connection.config;

    if (authentication.type === 'azure-active-directory-password' || authentication.type === 'azure-active-directory-access-token' || authentication.type === 'azure-active-directory-msi-vm' || authentication.type === 'azure-active-directory-msi-app-service' || authentication.type === 'azure-active-directory-service-principal-secret' || authentication.type === 'azure-active-directory-default') {
      if (token.fedAuth === undefined) {
        this.connection.loginError = new _errors.ConnectionError('Did not receive Active Directory authentication acknowledgement');
      } else if (token.fedAuth.length !== 0) {
        this.connection.loginError = new _errors.ConnectionError(`Active Directory authentication acknowledgment for ${authentication.type} authentication method includes extra data`);
      }
    } else if (token.fedAuth === undefined && token.utf8Support === undefined) {
      this.connection.loginError = new _errors.ConnectionError('Received acknowledgement for unknown feature');
    } else if (token.fedAuth) {
      this.connection.loginError = new _errors.ConnectionError('Did not request Active Directory authentication, but received the acknowledgment');
    }
  }

  onLoginAck(token) {
    if (!token.tdsVersion) {
      // unsupported TDS version
      this.connection.loginError = new _errors.ConnectionError('Server responded with unknown TDS version.', 'ETDS');
      return;
    }

    if (!token.interface) {
      // unsupported interface
      this.connection.loginError = new _errors.ConnectionError('Server responded with unsupported interface.', 'EINTERFACENOTSUPP');
      return;
    } // use negotiated version


    this.connection.config.options.tdsVersion = token.tdsVersion;
    this.loginAckReceived = true;
  }

  onRoutingChange(token) {
    // Removes instance name attached to the redirect url. E.g., redirect.db.net\instance1 --> redirect.db.net
    const [server] = token.newValue.server.split('\\');
    this.routingData = {
      server,
      port: token.newValue.port
    };
  }

  onDoneInProc(token) {// Do nothing
  }

  onDone(token) {// Do nothing
  }

  onPacketSizeChange(token) {
    this.connection.messageIo.packetSize(token.newValue);
  }

  onDatabaseMirroringPartner(token) {// Do nothing
  }

}
/**
 * A handler for tokens received in the response message to a RPC Request,
 * a SQL Batch Request, a Bulk Load BCP Request or a Transaction Manager Request.
 */


exports.Login7TokenHandler = Login7TokenHandler;

class RequestTokenHandler extends TokenHandler {
  constructor(connection, request) {
    super();
    this.connection = void 0;
    this.request = void 0;
    this.errors = void 0;
    this.connection = connection;
    this.request = request;
    this.errors = [];
  }

  onInfoMessage(token) {
    this.connection.emit('infoMessage', token);
  }

  onErrorMessage(token) {
    this.connection.emit('errorMessage', token);

    if (!this.request.canceled) {
      const error = new _errors.RequestError(token.message, 'EREQUEST');
      error.number = token.number;
      error.state = token.state;
      error.class = token.class;
      error.serverName = token.serverName;
      error.procName = token.procName;
      error.lineNumber = token.lineNumber;
      this.errors.push(error);
      this.request.error = error;

      if (this.request instanceof _request.default && this.errors.length > 1) {
        this.request.error = new _esAggregateError.default(this.errors);
      }
    }
  }

  onDatabaseChange(token) {
    this.connection.emit('databaseChange', token.newValue);
  }

  onLanguageChange(token) {
    this.connection.emit('languageChange', token.newValue);
  }

  onCharsetChange(token) {
    this.connection.emit('charsetChange', token.newValue);
  }

  onSqlCollationChange(token) {
    this.connection.databaseCollation = token.newValue;
  }

  onPacketSizeChange(token) {
    this.connection.messageIo.packetSize(token.newValue);
  }

  onBeginTransaction(token) {
    this.connection.transactionDescriptors.push(token.newValue);
    this.connection.inTransaction = true;
  }

  onCommitTransaction(token) {
    this.connection.transactionDescriptors.length = 1;
    this.connection.inTransaction = false;
  }

  onRollbackTransaction(token) {
    this.connection.transactionDescriptors.length = 1; // An outermost transaction was rolled back. Reset the transaction counter

    this.connection.inTransaction = false;
    this.connection.emit('rollbackTransaction');
  }

  onColMetadata(token) {
    if (!this.request.canceled) {
      if (this.connection.config.options.useColumnNames) {
        const columns = Object.create(null);

        for (let j = 0, len = token.columns.length; j < len; j++) {
          const col = token.columns[j];

          if (columns[col.colName] == null) {
            columns[col.colName] = col;
          }
        }

        this.request.emit('columnMetadata', columns);
      } else {
        this.request.emit('columnMetadata', token.columns);
      }
    }
  }

  onOrder(token) {
    if (!this.request.canceled) {
      this.request.emit('order', token.orderColumns);
    }
  }

  onRow(token) {
    if (!this.request.canceled) {
      if (this.connection.config.options.rowCollectionOnRequestCompletion) {
        this.request.rows.push(token.columns);
      }

      if (this.connection.config.options.rowCollectionOnDone) {
        this.request.rst.push(token.columns);
      }

      this.request.emit('row', token.columns);
    }
  }

  onReturnStatus(token) {
    if (!this.request.canceled) {
      // Keep value for passing in 'doneProc' event.
      this.connection.procReturnStatusValue = token.value;
    }
  }

  onReturnValue(token) {
    if (!this.request.canceled) {
      this.request.emit('returnValue', token.paramName, token.value, token.metadata);
    }
  }

  onDoneProc(token) {
    if (!this.request.canceled) {
      if (token.sqlError && !this.request.error) {
        // check if the DONE_ERROR flags was set, but an ERROR token was not sent.
        this.request.error = new _errors.RequestError('An unknown error has occurred.', 'UNKNOWN');
      }

      this.request.emit('doneProc', token.rowCount, token.more, this.connection.procReturnStatusValue, this.request.rst);
      this.connection.procReturnStatusValue = undefined;

      if (token.rowCount !== undefined) {
        this.request.rowCount += token.rowCount;
      }

      if (this.connection.config.options.rowCollectionOnDone) {
        this.request.rst = [];
      }
    }
  }

  onDoneInProc(token) {
    if (!this.request.canceled) {
      this.request.emit('doneInProc', token.rowCount, token.more, this.request.rst);

      if (token.rowCount !== undefined) {
        this.request.rowCount += token.rowCount;
      }

      if (this.connection.config.options.rowCollectionOnDone) {
        this.request.rst = [];
      }
    }
  }

  onDone(token) {
    if (!this.request.canceled) {
      if (token.sqlError && !this.request.error) {
        // check if the DONE_ERROR flags was set, but an ERROR token was not sent.
        this.request.error = new _errors.RequestError('An unknown error has occurred.', 'UNKNOWN');
      }

      this.request.emit('done', token.rowCount, token.more, this.request.rst);

      if (token.rowCount !== undefined) {
        this.request.rowCount += token.rowCount;
      }

      if (this.connection.config.options.rowCollectionOnDone) {
        this.request.rst = [];
      }
    }
  }

  onResetConnection(token) {
    this.connection.emit('resetConnection');
  }

}
/**
 * A handler for the attention acknowledgement message.
 *
 * This message only contains a `DONE` token that acknowledges
 * that the attention message was received by the server.
 */


exports.RequestTokenHandler = RequestTokenHandler;

class AttentionTokenHandler extends TokenHandler {
  /**
   * Returns whether an attention acknowledgement was received.
   */
  constructor(connection, request) {
    super();
    this.connection = void 0;
    this.request = void 0;
    this.attentionReceived = void 0;
    this.connection = connection;
    this.request = request;
    this.attentionReceived = false;
  }

  onDone(token) {
    if (token.attention) {
      this.attentionReceived = true;
    }
  }

}

exports.AttentionTokenHandler = AttentionTokenHandler;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJVbmV4cGVjdGVkVG9rZW5FcnJvciIsIkVycm9yIiwiY29uc3RydWN0b3IiLCJoYW5kbGVyIiwidG9rZW4iLCJuYW1lIiwiVG9rZW5IYW5kbGVyIiwib25JbmZvTWVzc2FnZSIsIm9uRXJyb3JNZXNzYWdlIiwib25TU1BJIiwib25EYXRhYmFzZUNoYW5nZSIsIm9uTGFuZ3VhZ2VDaGFuZ2UiLCJvbkNoYXJzZXRDaGFuZ2UiLCJvblNxbENvbGxhdGlvbkNoYW5nZSIsIm9uUm91dGluZ0NoYW5nZSIsIm9uUGFja2V0U2l6ZUNoYW5nZSIsIm9uUmVzZXRDb25uZWN0aW9uIiwib25CZWdpblRyYW5zYWN0aW9uIiwib25Db21taXRUcmFuc2FjdGlvbiIsIm9uUm9sbGJhY2tUcmFuc2FjdGlvbiIsIm9uRmVkQXV0aEluZm8iLCJvbkZlYXR1cmVFeHRBY2siLCJvbkxvZ2luQWNrIiwib25Db2xNZXRhZGF0YSIsIm9uT3JkZXIiLCJvblJvdyIsIm9uUmV0dXJuU3RhdHVzIiwib25SZXR1cm5WYWx1ZSIsIm9uRG9uZVByb2MiLCJvbkRvbmVJblByb2MiLCJvbkRvbmUiLCJvbkRhdGFiYXNlTWlycm9yaW5nUGFydG5lciIsIkluaXRpYWxTcWxUb2tlbkhhbmRsZXIiLCJjb25uZWN0aW9uIiwiZW1pdCIsIm5ld1ZhbHVlIiwiZGF0YWJhc2VDb2xsYXRpb24iLCJtZXNzYWdlSW8iLCJwYWNrZXRTaXplIiwidHJhbnNhY3Rpb25EZXNjcmlwdG9ycyIsInB1c2giLCJpblRyYW5zYWN0aW9uIiwibGVuZ3RoIiwiY2xvc2UiLCJMb2dpbjdUb2tlbkhhbmRsZXIiLCJmZWRBdXRoSW5mb1Rva2VuIiwicm91dGluZ0RhdGEiLCJsb2dpbkFja1JlY2VpdmVkIiwiZXJyb3IiLCJDb25uZWN0aW9uRXJyb3IiLCJtZXNzYWdlIiwiaXNMb2dpbkVycm9yVHJhbnNpZW50IiwidHJhbnNpZW50RXJyb3JMb29rdXAiLCJpc1RyYW5zaWVudEVycm9yIiwibnVtYmVyIiwiY3VyVHJhbnNpZW50UmV0cnlDb3VudCIsImNvbmZpZyIsIm9wdGlvbnMiLCJtYXhSZXRyaWVzT25UcmFuc2llbnRFcnJvcnMiLCJpc1RyYW5zaWVudCIsImxvZ2luRXJyb3IiLCJudGxtcGFja2V0IiwibnRsbXBhY2tldEJ1ZmZlciIsImF1dGhlbnRpY2F0aW9uIiwidHlwZSIsImZlZEF1dGgiLCJ1bmRlZmluZWQiLCJ1dGY4U3VwcG9ydCIsInRkc1ZlcnNpb24iLCJpbnRlcmZhY2UiLCJzZXJ2ZXIiLCJzcGxpdCIsInBvcnQiLCJSZXF1ZXN0VG9rZW5IYW5kbGVyIiwicmVxdWVzdCIsImVycm9ycyIsImNhbmNlbGVkIiwiUmVxdWVzdEVycm9yIiwic3RhdGUiLCJjbGFzcyIsInNlcnZlck5hbWUiLCJwcm9jTmFtZSIsImxpbmVOdW1iZXIiLCJSZXF1ZXN0IiwiQWdncmVnYXRlRXJyb3IiLCJ1c2VDb2x1bW5OYW1lcyIsImNvbHVtbnMiLCJPYmplY3QiLCJjcmVhdGUiLCJqIiwibGVuIiwiY29sIiwiY29sTmFtZSIsIm9yZGVyQ29sdW1ucyIsInJvd0NvbGxlY3Rpb25PblJlcXVlc3RDb21wbGV0aW9uIiwicm93cyIsInJvd0NvbGxlY3Rpb25PbkRvbmUiLCJyc3QiLCJwcm9jUmV0dXJuU3RhdHVzVmFsdWUiLCJ2YWx1ZSIsInBhcmFtTmFtZSIsIm1ldGFkYXRhIiwic3FsRXJyb3IiLCJyb3dDb3VudCIsIm1vcmUiLCJBdHRlbnRpb25Ub2tlbkhhbmRsZXIiLCJhdHRlbnRpb25SZWNlaXZlZCIsImF0dGVudGlvbiJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90b2tlbi9oYW5kbGVyLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDb25uZWN0aW9uIGZyb20gJy4uL2Nvbm5lY3Rpb24nO1xuaW1wb3J0IFJlcXVlc3QgZnJvbSAnLi4vcmVxdWVzdCc7XG5pbXBvcnQgeyBDb25uZWN0aW9uRXJyb3IsIFJlcXVlc3RFcnJvciB9IGZyb20gJy4uL2Vycm9ycyc7XG5pbXBvcnQgeyBDb2x1bW5NZXRhZGF0YSB9IGZyb20gJy4vY29sbWV0YWRhdGEtdG9rZW4tcGFyc2VyJztcbmltcG9ydCB7XG4gIEJlZ2luVHJhbnNhY3Rpb25FbnZDaGFuZ2VUb2tlbixcbiAgQ2hhcnNldEVudkNoYW5nZVRva2VuLFxuICBDb2xsYXRpb25DaGFuZ2VUb2tlbixcbiAgQ29sTWV0YWRhdGFUb2tlbixcbiAgQ29tbWl0VHJhbnNhY3Rpb25FbnZDaGFuZ2VUb2tlbixcbiAgRGF0YWJhc2VFbnZDaGFuZ2VUb2tlbixcbiAgRGF0YWJhc2VNaXJyb3JpbmdQYXJ0bmVyRW52Q2hhbmdlVG9rZW4sXG4gIERvbmVJblByb2NUb2tlbixcbiAgRG9uZVByb2NUb2tlbixcbiAgRG9uZVRva2VuLFxuICBFcnJvck1lc3NhZ2VUb2tlbixcbiAgRmVhdHVyZUV4dEFja1Rva2VuLFxuICBGZWRBdXRoSW5mb1Rva2VuLFxuICBJbmZvTWVzc2FnZVRva2VuLFxuICBMYW5ndWFnZUVudkNoYW5nZVRva2VuLFxuICBMb2dpbkFja1Rva2VuLFxuICBOQkNSb3dUb2tlbixcbiAgT3JkZXJUb2tlbixcbiAgUGFja2V0U2l6ZUVudkNoYW5nZVRva2VuLFxuICBSZXNldENvbm5lY3Rpb25FbnZDaGFuZ2VUb2tlbixcbiAgUmV0dXJuU3RhdHVzVG9rZW4sXG4gIFJldHVyblZhbHVlVG9rZW4sXG4gIFJvbGxiYWNrVHJhbnNhY3Rpb25FbnZDaGFuZ2VUb2tlbixcbiAgUm91dGluZ0VudkNoYW5nZVRva2VuLFxuICBSb3dUb2tlbixcbiAgU1NQSVRva2VuLFxuICBUb2tlblxufSBmcm9tICcuL3Rva2VuJztcbmltcG9ydCBCdWxrTG9hZCBmcm9tICcuLi9idWxrLWxvYWQnO1xuXG5pbXBvcnQgQWdncmVnYXRlRXJyb3IgZnJvbSAnZXMtYWdncmVnYXRlLWVycm9yJztcblxuZXhwb3J0IGNsYXNzIFVuZXhwZWN0ZWRUb2tlbkVycm9yIGV4dGVuZHMgRXJyb3Ige1xuICBjb25zdHJ1Y3RvcihoYW5kbGVyOiBUb2tlbkhhbmRsZXIsIHRva2VuOiBUb2tlbikge1xuICAgIHN1cGVyKCdVbmV4cGVjdGVkIHRva2VuIGAnICsgdG9rZW4ubmFtZSArICdgIGluIGAnICsgaGFuZGxlci5jb25zdHJ1Y3Rvci5uYW1lICsgJ2AnKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgVG9rZW5IYW5kbGVyIHtcbiAgb25JbmZvTWVzc2FnZSh0b2tlbjogSW5mb01lc3NhZ2VUb2tlbikge1xuICAgIHRocm93IG5ldyBVbmV4cGVjdGVkVG9rZW5FcnJvcih0aGlzLCB0b2tlbik7XG4gIH1cblxuICBvbkVycm9yTWVzc2FnZSh0b2tlbjogRXJyb3JNZXNzYWdlVG9rZW4pIHtcbiAgICB0aHJvdyBuZXcgVW5leHBlY3RlZFRva2VuRXJyb3IodGhpcywgdG9rZW4pO1xuICB9XG5cbiAgb25TU1BJKHRva2VuOiBTU1BJVG9rZW4pIHtcbiAgICB0aHJvdyBuZXcgVW5leHBlY3RlZFRva2VuRXJyb3IodGhpcywgdG9rZW4pO1xuICB9XG5cbiAgb25EYXRhYmFzZUNoYW5nZSh0b2tlbjogRGF0YWJhc2VFbnZDaGFuZ2VUb2tlbikge1xuICAgIHRocm93IG5ldyBVbmV4cGVjdGVkVG9rZW5FcnJvcih0aGlzLCB0b2tlbik7XG4gIH1cblxuICBvbkxhbmd1YWdlQ2hhbmdlKHRva2VuOiBMYW5ndWFnZUVudkNoYW5nZVRva2VuKSB7XG4gICAgdGhyb3cgbmV3IFVuZXhwZWN0ZWRUb2tlbkVycm9yKHRoaXMsIHRva2VuKTtcbiAgfVxuXG4gIG9uQ2hhcnNldENoYW5nZSh0b2tlbjogQ2hhcnNldEVudkNoYW5nZVRva2VuKSB7XG4gICAgdGhyb3cgbmV3IFVuZXhwZWN0ZWRUb2tlbkVycm9yKHRoaXMsIHRva2VuKTtcbiAgfVxuXG4gIG9uU3FsQ29sbGF0aW9uQ2hhbmdlKHRva2VuOiBDb2xsYXRpb25DaGFuZ2VUb2tlbikge1xuICAgIHRocm93IG5ldyBVbmV4cGVjdGVkVG9rZW5FcnJvcih0aGlzLCB0b2tlbik7XG4gIH1cblxuICBvblJvdXRpbmdDaGFuZ2UodG9rZW46IFJvdXRpbmdFbnZDaGFuZ2VUb2tlbikge1xuICAgIHRocm93IG5ldyBVbmV4cGVjdGVkVG9rZW5FcnJvcih0aGlzLCB0b2tlbik7XG4gIH1cblxuICBvblBhY2tldFNpemVDaGFuZ2UodG9rZW46IFBhY2tldFNpemVFbnZDaGFuZ2VUb2tlbikge1xuICAgIHRocm93IG5ldyBVbmV4cGVjdGVkVG9rZW5FcnJvcih0aGlzLCB0b2tlbik7XG4gIH1cblxuICBvblJlc2V0Q29ubmVjdGlvbih0b2tlbjogUmVzZXRDb25uZWN0aW9uRW52Q2hhbmdlVG9rZW4pIHtcbiAgICB0aHJvdyBuZXcgVW5leHBlY3RlZFRva2VuRXJyb3IodGhpcywgdG9rZW4pO1xuICB9XG5cbiAgb25CZWdpblRyYW5zYWN0aW9uKHRva2VuOiBCZWdpblRyYW5zYWN0aW9uRW52Q2hhbmdlVG9rZW4pIHtcbiAgICB0aHJvdyBuZXcgVW5leHBlY3RlZFRva2VuRXJyb3IodGhpcywgdG9rZW4pO1xuICB9XG5cbiAgb25Db21taXRUcmFuc2FjdGlvbih0b2tlbjogQ29tbWl0VHJhbnNhY3Rpb25FbnZDaGFuZ2VUb2tlbikge1xuICAgIHRocm93IG5ldyBVbmV4cGVjdGVkVG9rZW5FcnJvcih0aGlzLCB0b2tlbik7XG4gIH1cblxuICBvblJvbGxiYWNrVHJhbnNhY3Rpb24odG9rZW46IFJvbGxiYWNrVHJhbnNhY3Rpb25FbnZDaGFuZ2VUb2tlbikge1xuICAgIHRocm93IG5ldyBVbmV4cGVjdGVkVG9rZW5FcnJvcih0aGlzLCB0b2tlbik7XG4gIH1cblxuICBvbkZlZEF1dGhJbmZvKHRva2VuOiBGZWRBdXRoSW5mb1Rva2VuKSB7XG4gICAgdGhyb3cgbmV3IFVuZXhwZWN0ZWRUb2tlbkVycm9yKHRoaXMsIHRva2VuKTtcbiAgfVxuXG4gIG9uRmVhdHVyZUV4dEFjayh0b2tlbjogRmVhdHVyZUV4dEFja1Rva2VuKSB7XG4gICAgdGhyb3cgbmV3IFVuZXhwZWN0ZWRUb2tlbkVycm9yKHRoaXMsIHRva2VuKTtcbiAgfVxuXG4gIG9uTG9naW5BY2sodG9rZW46IExvZ2luQWNrVG9rZW4pIHtcbiAgICB0aHJvdyBuZXcgVW5leHBlY3RlZFRva2VuRXJyb3IodGhpcywgdG9rZW4pO1xuICB9XG5cbiAgb25Db2xNZXRhZGF0YSh0b2tlbjogQ29sTWV0YWRhdGFUb2tlbikge1xuICAgIHRocm93IG5ldyBVbmV4cGVjdGVkVG9rZW5FcnJvcih0aGlzLCB0b2tlbik7XG4gIH1cblxuICBvbk9yZGVyKHRva2VuOiBPcmRlclRva2VuKSB7XG4gICAgdGhyb3cgbmV3IFVuZXhwZWN0ZWRUb2tlbkVycm9yKHRoaXMsIHRva2VuKTtcbiAgfVxuXG4gIG9uUm93KHRva2VuOiBSb3dUb2tlbiB8IE5CQ1Jvd1Rva2VuKSB7XG4gICAgdGhyb3cgbmV3IFVuZXhwZWN0ZWRUb2tlbkVycm9yKHRoaXMsIHRva2VuKTtcbiAgfVxuXG4gIG9uUmV0dXJuU3RhdHVzKHRva2VuOiBSZXR1cm5TdGF0dXNUb2tlbikge1xuICAgIHRocm93IG5ldyBVbmV4cGVjdGVkVG9rZW5FcnJvcih0aGlzLCB0b2tlbik7XG4gIH1cblxuICBvblJldHVyblZhbHVlKHRva2VuOiBSZXR1cm5WYWx1ZVRva2VuKSB7XG4gICAgdGhyb3cgbmV3IFVuZXhwZWN0ZWRUb2tlbkVycm9yKHRoaXMsIHRva2VuKTtcbiAgfVxuXG4gIG9uRG9uZVByb2ModG9rZW46IERvbmVQcm9jVG9rZW4pIHtcbiAgICB0aHJvdyBuZXcgVW5leHBlY3RlZFRva2VuRXJyb3IodGhpcywgdG9rZW4pO1xuICB9XG5cbiAgb25Eb25lSW5Qcm9jKHRva2VuOiBEb25lSW5Qcm9jVG9rZW4pIHtcbiAgICB0aHJvdyBuZXcgVW5leHBlY3RlZFRva2VuRXJyb3IodGhpcywgdG9rZW4pO1xuICB9XG5cbiAgb25Eb25lKHRva2VuOiBEb25lVG9rZW4pIHtcbiAgICB0aHJvdyBuZXcgVW5leHBlY3RlZFRva2VuRXJyb3IodGhpcywgdG9rZW4pO1xuICB9XG5cbiAgb25EYXRhYmFzZU1pcnJvcmluZ1BhcnRuZXIodG9rZW46IERhdGFiYXNlTWlycm9yaW5nUGFydG5lckVudkNoYW5nZVRva2VuKSB7XG4gICAgdGhyb3cgbmV3IFVuZXhwZWN0ZWRUb2tlbkVycm9yKHRoaXMsIHRva2VuKTtcbiAgfVxufVxuXG4vKipcbiAqIEEgaGFuZGxlciBmb3IgdG9rZW5zIHJlY2VpdmVkIGluIHRoZSByZXNwb25zZSBtZXNzYWdlIHRvIHRoZSBpbml0aWFsIFNRTCBCYXRjaCByZXF1ZXN0XG4gKiB0aGF0IHNldHMgdXAgZGlmZmVyZW50IGNvbm5lY3Rpb24gc2V0dGluZ3MuXG4gKi9cbmV4cG9ydCBjbGFzcyBJbml0aWFsU3FsVG9rZW5IYW5kbGVyIGV4dGVuZHMgVG9rZW5IYW5kbGVyIHtcbiAgY29ubmVjdGlvbjogQ29ubmVjdGlvbjtcblxuICBjb25zdHJ1Y3Rvcihjb25uZWN0aW9uOiBDb25uZWN0aW9uKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuY29ubmVjdGlvbiA9IGNvbm5lY3Rpb247XG4gIH1cblxuICBvbkluZm9NZXNzYWdlKHRva2VuOiBJbmZvTWVzc2FnZVRva2VuKSB7XG4gICAgdGhpcy5jb25uZWN0aW9uLmVtaXQoJ2luZm9NZXNzYWdlJywgdG9rZW4pO1xuICB9XG5cbiAgb25FcnJvck1lc3NhZ2UodG9rZW46IEVycm9yTWVzc2FnZVRva2VuKSB7XG4gICAgdGhpcy5jb25uZWN0aW9uLmVtaXQoJ2Vycm9yTWVzc2FnZScsIHRva2VuKTtcbiAgfVxuXG4gIG9uRGF0YWJhc2VDaGFuZ2UodG9rZW46IERhdGFiYXNlRW52Q2hhbmdlVG9rZW4pIHtcbiAgICB0aGlzLmNvbm5lY3Rpb24uZW1pdCgnZGF0YWJhc2VDaGFuZ2UnLCB0b2tlbi5uZXdWYWx1ZSk7XG4gIH1cblxuICBvbkxhbmd1YWdlQ2hhbmdlKHRva2VuOiBMYW5ndWFnZUVudkNoYW5nZVRva2VuKSB7XG4gICAgdGhpcy5jb25uZWN0aW9uLmVtaXQoJ2xhbmd1YWdlQ2hhbmdlJywgdG9rZW4ubmV3VmFsdWUpO1xuICB9XG5cbiAgb25DaGFyc2V0Q2hhbmdlKHRva2VuOiBDaGFyc2V0RW52Q2hhbmdlVG9rZW4pIHtcbiAgICB0aGlzLmNvbm5lY3Rpb24uZW1pdCgnY2hhcnNldENoYW5nZScsIHRva2VuLm5ld1ZhbHVlKTtcbiAgfVxuXG4gIG9uU3FsQ29sbGF0aW9uQ2hhbmdlKHRva2VuOiBDb2xsYXRpb25DaGFuZ2VUb2tlbikge1xuICAgIHRoaXMuY29ubmVjdGlvbi5kYXRhYmFzZUNvbGxhdGlvbiA9IHRva2VuLm5ld1ZhbHVlO1xuICB9XG5cbiAgb25QYWNrZXRTaXplQ2hhbmdlKHRva2VuOiBQYWNrZXRTaXplRW52Q2hhbmdlVG9rZW4pIHtcbiAgICB0aGlzLmNvbm5lY3Rpb24ubWVzc2FnZUlvLnBhY2tldFNpemUodG9rZW4ubmV3VmFsdWUpO1xuICB9XG5cbiAgb25CZWdpblRyYW5zYWN0aW9uKHRva2VuOiBCZWdpblRyYW5zYWN0aW9uRW52Q2hhbmdlVG9rZW4pIHtcbiAgICB0aGlzLmNvbm5lY3Rpb24udHJhbnNhY3Rpb25EZXNjcmlwdG9ycy5wdXNoKHRva2VuLm5ld1ZhbHVlKTtcbiAgICB0aGlzLmNvbm5lY3Rpb24uaW5UcmFuc2FjdGlvbiA9IHRydWU7XG4gIH1cblxuICBvbkNvbW1pdFRyYW5zYWN0aW9uKHRva2VuOiBDb21taXRUcmFuc2FjdGlvbkVudkNoYW5nZVRva2VuKSB7XG4gICAgdGhpcy5jb25uZWN0aW9uLnRyYW5zYWN0aW9uRGVzY3JpcHRvcnMubGVuZ3RoID0gMTtcbiAgICB0aGlzLmNvbm5lY3Rpb24uaW5UcmFuc2FjdGlvbiA9IGZhbHNlO1xuICB9XG5cbiAgb25Sb2xsYmFja1RyYW5zYWN0aW9uKHRva2VuOiBSb2xsYmFja1RyYW5zYWN0aW9uRW52Q2hhbmdlVG9rZW4pIHtcbiAgICB0aGlzLmNvbm5lY3Rpb24udHJhbnNhY3Rpb25EZXNjcmlwdG9ycy5sZW5ndGggPSAxO1xuICAgIC8vIEFuIG91dGVybW9zdCB0cmFuc2FjdGlvbiB3YXMgcm9sbGVkIGJhY2suIFJlc2V0IHRoZSB0cmFuc2FjdGlvbiBjb3VudGVyXG4gICAgdGhpcy5jb25uZWN0aW9uLmluVHJhbnNhY3Rpb24gPSBmYWxzZTtcbiAgICB0aGlzLmNvbm5lY3Rpb24uZW1pdCgncm9sbGJhY2tUcmFuc2FjdGlvbicpO1xuICB9XG5cbiAgb25Db2xNZXRhZGF0YSh0b2tlbjogQ29sTWV0YWRhdGFUb2tlbikge1xuICAgIHRoaXMuY29ubmVjdGlvbi5lbWl0KCdlcnJvcicsIG5ldyBFcnJvcihcIlJlY2VpdmVkICdjb2x1bW5NZXRhZGF0YScgd2hlbiBubyBzcWxSZXF1ZXN0IGlzIGluIHByb2dyZXNzXCIpKTtcbiAgICB0aGlzLmNvbm5lY3Rpb24uY2xvc2UoKTtcbiAgfVxuXG4gIG9uT3JkZXIodG9rZW46IE9yZGVyVG9rZW4pIHtcbiAgICB0aGlzLmNvbm5lY3Rpb24uZW1pdCgnZXJyb3InLCBuZXcgRXJyb3IoXCJSZWNlaXZlZCAnb3JkZXInIHdoZW4gbm8gc3FsUmVxdWVzdCBpcyBpbiBwcm9ncmVzc1wiKSk7XG4gICAgdGhpcy5jb25uZWN0aW9uLmNsb3NlKCk7XG4gIH1cblxuICBvblJvdyh0b2tlbjogUm93VG9rZW4gfCBOQkNSb3dUb2tlbikge1xuICAgIHRoaXMuY29ubmVjdGlvbi5lbWl0KCdlcnJvcicsIG5ldyBFcnJvcihcIlJlY2VpdmVkICdyb3cnIHdoZW4gbm8gc3FsUmVxdWVzdCBpcyBpbiBwcm9ncmVzc1wiKSk7XG4gICAgdGhpcy5jb25uZWN0aW9uLmNsb3NlKCk7XG4gIH1cblxuICBvblJldHVyblN0YXR1cyh0b2tlbjogUmV0dXJuU3RhdHVzVG9rZW4pIHtcbiAgICAvLyBEbyBub3RoaW5nXG4gIH1cblxuICBvblJldHVyblZhbHVlKHRva2VuOiBSZXR1cm5WYWx1ZVRva2VuKSB7XG4gICAgLy8gRG8gbm90aGluZ1xuICB9XG5cbiAgb25Eb25lUHJvYyh0b2tlbjogRG9uZVByb2NUb2tlbikge1xuICAgIC8vIERvIG5vdGhpbmdcbiAgfVxuXG4gIG9uRG9uZUluUHJvYyh0b2tlbjogRG9uZUluUHJvY1Rva2VuKSB7XG4gICAgLy8gRG8gbm90aGluZ1xuICB9XG5cbiAgb25Eb25lKHRva2VuOiBEb25lVG9rZW4pIHtcbiAgICAvLyBEbyBub3RoaW5nXG4gIH1cblxuICBvblJlc2V0Q29ubmVjdGlvbih0b2tlbjogUmVzZXRDb25uZWN0aW9uRW52Q2hhbmdlVG9rZW4pIHtcbiAgICB0aGlzLmNvbm5lY3Rpb24uZW1pdCgncmVzZXRDb25uZWN0aW9uJyk7XG4gIH1cbn1cblxuLyoqXG4gKiBBIGhhbmRsZXIgZm9yIHRva2VucyByZWNlaXZlZCBpbiB0aGUgcmVzcG9uc2UgbWVzc2FnZSB0byBhIExvZ2luNyBtZXNzYWdlLlxuICovXG5leHBvcnQgY2xhc3MgTG9naW43VG9rZW5IYW5kbGVyIGV4dGVuZHMgVG9rZW5IYW5kbGVyIHtcbiAgY29ubmVjdGlvbjogQ29ubmVjdGlvbjtcblxuICBmZWRBdXRoSW5mb1Rva2VuOiBGZWRBdXRoSW5mb1Rva2VuIHwgdW5kZWZpbmVkO1xuICByb3V0aW5nRGF0YTogeyBzZXJ2ZXI6IHN0cmluZywgcG9ydDogbnVtYmVyIH0gfCB1bmRlZmluZWQ7XG5cbiAgbG9naW5BY2tSZWNlaXZlZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKGNvbm5lY3Rpb246IENvbm5lY3Rpb24pIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5jb25uZWN0aW9uID0gY29ubmVjdGlvbjtcbiAgfVxuXG4gIG9uSW5mb01lc3NhZ2UodG9rZW46IEluZm9NZXNzYWdlVG9rZW4pIHtcbiAgICB0aGlzLmNvbm5lY3Rpb24uZW1pdCgnaW5mb01lc3NhZ2UnLCB0b2tlbik7XG4gIH1cblxuICBvbkVycm9yTWVzc2FnZSh0b2tlbjogRXJyb3JNZXNzYWdlVG9rZW4pIHtcbiAgICB0aGlzLmNvbm5lY3Rpb24uZW1pdCgnZXJyb3JNZXNzYWdlJywgdG9rZW4pO1xuXG4gICAgY29uc3QgZXJyb3IgPSBuZXcgQ29ubmVjdGlvbkVycm9yKHRva2VuLm1lc3NhZ2UsICdFTE9HSU4nKTtcblxuICAgIGNvbnN0IGlzTG9naW5FcnJvclRyYW5zaWVudCA9IHRoaXMuY29ubmVjdGlvbi50cmFuc2llbnRFcnJvckxvb2t1cC5pc1RyYW5zaWVudEVycm9yKHRva2VuLm51bWJlcik7XG4gICAgaWYgKGlzTG9naW5FcnJvclRyYW5zaWVudCAmJiB0aGlzLmNvbm5lY3Rpb24uY3VyVHJhbnNpZW50UmV0cnlDb3VudCAhPT0gdGhpcy5jb25uZWN0aW9uLmNvbmZpZy5vcHRpb25zLm1heFJldHJpZXNPblRyYW5zaWVudEVycm9ycykge1xuICAgICAgZXJyb3IuaXNUcmFuc2llbnQgPSB0cnVlO1xuICAgIH1cblxuICAgIHRoaXMuY29ubmVjdGlvbi5sb2dpbkVycm9yID0gZXJyb3I7XG4gIH1cblxuICBvblNTUEkodG9rZW46IFNTUElUb2tlbikge1xuICAgIGlmICh0b2tlbi5udGxtcGFja2V0KSB7XG4gICAgICB0aGlzLmNvbm5lY3Rpb24ubnRsbXBhY2tldCA9IHRva2VuLm50bG1wYWNrZXQ7XG4gICAgICB0aGlzLmNvbm5lY3Rpb24ubnRsbXBhY2tldEJ1ZmZlciA9IHRva2VuLm50bG1wYWNrZXRCdWZmZXI7XG4gICAgfVxuICB9XG5cbiAgb25EYXRhYmFzZUNoYW5nZSh0b2tlbjogRGF0YWJhc2VFbnZDaGFuZ2VUb2tlbikge1xuICAgIHRoaXMuY29ubmVjdGlvbi5lbWl0KCdkYXRhYmFzZUNoYW5nZScsIHRva2VuLm5ld1ZhbHVlKTtcbiAgfVxuXG4gIG9uTGFuZ3VhZ2VDaGFuZ2UodG9rZW46IExhbmd1YWdlRW52Q2hhbmdlVG9rZW4pIHtcbiAgICB0aGlzLmNvbm5lY3Rpb24uZW1pdCgnbGFuZ3VhZ2VDaGFuZ2UnLCB0b2tlbi5uZXdWYWx1ZSk7XG4gIH1cblxuICBvbkNoYXJzZXRDaGFuZ2UodG9rZW46IENoYXJzZXRFbnZDaGFuZ2VUb2tlbikge1xuICAgIHRoaXMuY29ubmVjdGlvbi5lbWl0KCdjaGFyc2V0Q2hhbmdlJywgdG9rZW4ubmV3VmFsdWUpO1xuICB9XG5cbiAgb25TcWxDb2xsYXRpb25DaGFuZ2UodG9rZW46IENvbGxhdGlvbkNoYW5nZVRva2VuKSB7XG4gICAgdGhpcy5jb25uZWN0aW9uLmRhdGFiYXNlQ29sbGF0aW9uID0gdG9rZW4ubmV3VmFsdWU7XG4gIH1cblxuICBvbkZlZEF1dGhJbmZvKHRva2VuOiBGZWRBdXRoSW5mb1Rva2VuKSB7XG4gICAgdGhpcy5mZWRBdXRoSW5mb1Rva2VuID0gdG9rZW47XG4gIH1cblxuICBvbkZlYXR1cmVFeHRBY2sodG9rZW46IEZlYXR1cmVFeHRBY2tUb2tlbikge1xuICAgIGNvbnN0IHsgYXV0aGVudGljYXRpb24gfSA9IHRoaXMuY29ubmVjdGlvbi5jb25maWc7XG5cbiAgICBpZiAoYXV0aGVudGljYXRpb24udHlwZSA9PT0gJ2F6dXJlLWFjdGl2ZS1kaXJlY3RvcnktcGFzc3dvcmQnIHx8IGF1dGhlbnRpY2F0aW9uLnR5cGUgPT09ICdhenVyZS1hY3RpdmUtZGlyZWN0b3J5LWFjY2Vzcy10b2tlbicgfHwgYXV0aGVudGljYXRpb24udHlwZSA9PT0gJ2F6dXJlLWFjdGl2ZS1kaXJlY3RvcnktbXNpLXZtJyB8fCBhdXRoZW50aWNhdGlvbi50eXBlID09PSAnYXp1cmUtYWN0aXZlLWRpcmVjdG9yeS1tc2ktYXBwLXNlcnZpY2UnIHx8IGF1dGhlbnRpY2F0aW9uLnR5cGUgPT09ICdhenVyZS1hY3RpdmUtZGlyZWN0b3J5LXNlcnZpY2UtcHJpbmNpcGFsLXNlY3JldCcgfHwgYXV0aGVudGljYXRpb24udHlwZSA9PT0gJ2F6dXJlLWFjdGl2ZS1kaXJlY3RvcnktZGVmYXVsdCcpIHtcbiAgICAgIGlmICh0b2tlbi5mZWRBdXRoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLmxvZ2luRXJyb3IgPSBuZXcgQ29ubmVjdGlvbkVycm9yKCdEaWQgbm90IHJlY2VpdmUgQWN0aXZlIERpcmVjdG9yeSBhdXRoZW50aWNhdGlvbiBhY2tub3dsZWRnZW1lbnQnKTtcbiAgICAgIH0gZWxzZSBpZiAodG9rZW4uZmVkQXV0aC5sZW5ndGggIT09IDApIHtcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLmxvZ2luRXJyb3IgPSBuZXcgQ29ubmVjdGlvbkVycm9yKGBBY3RpdmUgRGlyZWN0b3J5IGF1dGhlbnRpY2F0aW9uIGFja25vd2xlZGdtZW50IGZvciAke2F1dGhlbnRpY2F0aW9uLnR5cGV9IGF1dGhlbnRpY2F0aW9uIG1ldGhvZCBpbmNsdWRlcyBleHRyYSBkYXRhYCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0b2tlbi5mZWRBdXRoID09PSB1bmRlZmluZWQgJiYgdG9rZW4udXRmOFN1cHBvcnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5jb25uZWN0aW9uLmxvZ2luRXJyb3IgPSBuZXcgQ29ubmVjdGlvbkVycm9yKCdSZWNlaXZlZCBhY2tub3dsZWRnZW1lbnQgZm9yIHVua25vd24gZmVhdHVyZScpO1xuICAgIH0gZWxzZSBpZiAodG9rZW4uZmVkQXV0aCkge1xuICAgICAgdGhpcy5jb25uZWN0aW9uLmxvZ2luRXJyb3IgPSBuZXcgQ29ubmVjdGlvbkVycm9yKCdEaWQgbm90IHJlcXVlc3QgQWN0aXZlIERpcmVjdG9yeSBhdXRoZW50aWNhdGlvbiwgYnV0IHJlY2VpdmVkIHRoZSBhY2tub3dsZWRnbWVudCcpO1xuICAgIH1cbiAgfVxuXG4gIG9uTG9naW5BY2sodG9rZW46IExvZ2luQWNrVG9rZW4pIHtcbiAgICBpZiAoIXRva2VuLnRkc1ZlcnNpb24pIHtcbiAgICAgIC8vIHVuc3VwcG9ydGVkIFREUyB2ZXJzaW9uXG4gICAgICB0aGlzLmNvbm5lY3Rpb24ubG9naW5FcnJvciA9IG5ldyBDb25uZWN0aW9uRXJyb3IoJ1NlcnZlciByZXNwb25kZWQgd2l0aCB1bmtub3duIFREUyB2ZXJzaW9uLicsICdFVERTJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF0b2tlbi5pbnRlcmZhY2UpIHtcbiAgICAgIC8vIHVuc3VwcG9ydGVkIGludGVyZmFjZVxuICAgICAgdGhpcy5jb25uZWN0aW9uLmxvZ2luRXJyb3IgPSBuZXcgQ29ubmVjdGlvbkVycm9yKCdTZXJ2ZXIgcmVzcG9uZGVkIHdpdGggdW5zdXBwb3J0ZWQgaW50ZXJmYWNlLicsICdFSU5URVJGQUNFTk9UU1VQUCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIHVzZSBuZWdvdGlhdGVkIHZlcnNpb25cbiAgICB0aGlzLmNvbm5lY3Rpb24uY29uZmlnLm9wdGlvbnMudGRzVmVyc2lvbiA9IHRva2VuLnRkc1ZlcnNpb247XG5cbiAgICB0aGlzLmxvZ2luQWNrUmVjZWl2ZWQgPSB0cnVlO1xuICB9XG5cbiAgb25Sb3V0aW5nQ2hhbmdlKHRva2VuOiBSb3V0aW5nRW52Q2hhbmdlVG9rZW4pIHtcbiAgICAvLyBSZW1vdmVzIGluc3RhbmNlIG5hbWUgYXR0YWNoZWQgdG8gdGhlIHJlZGlyZWN0IHVybC4gRS5nLiwgcmVkaXJlY3QuZGIubmV0XFxpbnN0YW5jZTEgLS0+IHJlZGlyZWN0LmRiLm5ldFxuICAgIGNvbnN0IFsgc2VydmVyIF0gPSB0b2tlbi5uZXdWYWx1ZS5zZXJ2ZXIuc3BsaXQoJ1xcXFwnKTtcblxuICAgIHRoaXMucm91dGluZ0RhdGEgPSB7XG4gICAgICBzZXJ2ZXIsIHBvcnQ6IHRva2VuLm5ld1ZhbHVlLnBvcnRcbiAgICB9O1xuICB9XG5cbiAgb25Eb25lSW5Qcm9jKHRva2VuOiBEb25lSW5Qcm9jVG9rZW4pIHtcbiAgICAvLyBEbyBub3RoaW5nXG4gIH1cblxuICBvbkRvbmUodG9rZW46IERvbmVUb2tlbikge1xuICAgIC8vIERvIG5vdGhpbmdcbiAgfVxuXG4gIG9uUGFja2V0U2l6ZUNoYW5nZSh0b2tlbjogUGFja2V0U2l6ZUVudkNoYW5nZVRva2VuKSB7XG4gICAgdGhpcy5jb25uZWN0aW9uLm1lc3NhZ2VJby5wYWNrZXRTaXplKHRva2VuLm5ld1ZhbHVlKTtcbiAgfVxuXG4gIG9uRGF0YWJhc2VNaXJyb3JpbmdQYXJ0bmVyKHRva2VuOiBEYXRhYmFzZU1pcnJvcmluZ1BhcnRuZXJFbnZDaGFuZ2VUb2tlbikge1xuICAgIC8vIERvIG5vdGhpbmdcbiAgfVxufVxuXG4vKipcbiAqIEEgaGFuZGxlciBmb3IgdG9rZW5zIHJlY2VpdmVkIGluIHRoZSByZXNwb25zZSBtZXNzYWdlIHRvIGEgUlBDIFJlcXVlc3QsXG4gKiBhIFNRTCBCYXRjaCBSZXF1ZXN0LCBhIEJ1bGsgTG9hZCBCQ1AgUmVxdWVzdCBvciBhIFRyYW5zYWN0aW9uIE1hbmFnZXIgUmVxdWVzdC5cbiAqL1xuZXhwb3J0IGNsYXNzIFJlcXVlc3RUb2tlbkhhbmRsZXIgZXh0ZW5kcyBUb2tlbkhhbmRsZXIge1xuICBjb25uZWN0aW9uOiBDb25uZWN0aW9uO1xuICByZXF1ZXN0OiBSZXF1ZXN0IHwgQnVsa0xvYWQ7XG4gIGVycm9yczogUmVxdWVzdEVycm9yW107XG5cbiAgY29uc3RydWN0b3IoY29ubmVjdGlvbjogQ29ubmVjdGlvbiwgcmVxdWVzdDogUmVxdWVzdCB8IEJ1bGtMb2FkKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMuY29ubmVjdGlvbiA9IGNvbm5lY3Rpb247XG4gICAgdGhpcy5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICB0aGlzLmVycm9ycyA9IFtdO1xuICB9XG5cbiAgb25JbmZvTWVzc2FnZSh0b2tlbjogSW5mb01lc3NhZ2VUb2tlbikge1xuICAgIHRoaXMuY29ubmVjdGlvbi5lbWl0KCdpbmZvTWVzc2FnZScsIHRva2VuKTtcbiAgfVxuXG4gIG9uRXJyb3JNZXNzYWdlKHRva2VuOiBFcnJvck1lc3NhZ2VUb2tlbikge1xuICAgIHRoaXMuY29ubmVjdGlvbi5lbWl0KCdlcnJvck1lc3NhZ2UnLCB0b2tlbik7XG5cbiAgICBpZiAoIXRoaXMucmVxdWVzdC5jYW5jZWxlZCkge1xuICAgICAgY29uc3QgZXJyb3IgPSBuZXcgUmVxdWVzdEVycm9yKHRva2VuLm1lc3NhZ2UsICdFUkVRVUVTVCcpO1xuXG4gICAgICBlcnJvci5udW1iZXIgPSB0b2tlbi5udW1iZXI7XG4gICAgICBlcnJvci5zdGF0ZSA9IHRva2VuLnN0YXRlO1xuICAgICAgZXJyb3IuY2xhc3MgPSB0b2tlbi5jbGFzcztcbiAgICAgIGVycm9yLnNlcnZlck5hbWUgPSB0b2tlbi5zZXJ2ZXJOYW1lO1xuICAgICAgZXJyb3IucHJvY05hbWUgPSB0b2tlbi5wcm9jTmFtZTtcbiAgICAgIGVycm9yLmxpbmVOdW1iZXIgPSB0b2tlbi5saW5lTnVtYmVyO1xuICAgICAgdGhpcy5lcnJvcnMucHVzaChlcnJvcik7XG4gICAgICB0aGlzLnJlcXVlc3QuZXJyb3IgPSBlcnJvcjtcbiAgICAgIGlmICh0aGlzLnJlcXVlc3QgaW5zdGFuY2VvZiBSZXF1ZXN0ICYmIHRoaXMuZXJyb3JzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0LmVycm9yID0gbmV3IEFnZ3JlZ2F0ZUVycm9yKHRoaXMuZXJyb3JzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkRhdGFiYXNlQ2hhbmdlKHRva2VuOiBEYXRhYmFzZUVudkNoYW5nZVRva2VuKSB7XG4gICAgdGhpcy5jb25uZWN0aW9uLmVtaXQoJ2RhdGFiYXNlQ2hhbmdlJywgdG9rZW4ubmV3VmFsdWUpO1xuICB9XG5cbiAgb25MYW5ndWFnZUNoYW5nZSh0b2tlbjogTGFuZ3VhZ2VFbnZDaGFuZ2VUb2tlbikge1xuICAgIHRoaXMuY29ubmVjdGlvbi5lbWl0KCdsYW5ndWFnZUNoYW5nZScsIHRva2VuLm5ld1ZhbHVlKTtcbiAgfVxuXG4gIG9uQ2hhcnNldENoYW5nZSh0b2tlbjogQ2hhcnNldEVudkNoYW5nZVRva2VuKSB7XG4gICAgdGhpcy5jb25uZWN0aW9uLmVtaXQoJ2NoYXJzZXRDaGFuZ2UnLCB0b2tlbi5uZXdWYWx1ZSk7XG4gIH1cblxuICBvblNxbENvbGxhdGlvbkNoYW5nZSh0b2tlbjogQ29sbGF0aW9uQ2hhbmdlVG9rZW4pIHtcbiAgICB0aGlzLmNvbm5lY3Rpb24uZGF0YWJhc2VDb2xsYXRpb24gPSB0b2tlbi5uZXdWYWx1ZTtcbiAgfVxuXG4gIG9uUGFja2V0U2l6ZUNoYW5nZSh0b2tlbjogUGFja2V0U2l6ZUVudkNoYW5nZVRva2VuKSB7XG4gICAgdGhpcy5jb25uZWN0aW9uLm1lc3NhZ2VJby5wYWNrZXRTaXplKHRva2VuLm5ld1ZhbHVlKTtcbiAgfVxuXG4gIG9uQmVnaW5UcmFuc2FjdGlvbih0b2tlbjogQmVnaW5UcmFuc2FjdGlvbkVudkNoYW5nZVRva2VuKSB7XG4gICAgdGhpcy5jb25uZWN0aW9uLnRyYW5zYWN0aW9uRGVzY3JpcHRvcnMucHVzaCh0b2tlbi5uZXdWYWx1ZSk7XG4gICAgdGhpcy5jb25uZWN0aW9uLmluVHJhbnNhY3Rpb24gPSB0cnVlO1xuICB9XG5cbiAgb25Db21taXRUcmFuc2FjdGlvbih0b2tlbjogQ29tbWl0VHJhbnNhY3Rpb25FbnZDaGFuZ2VUb2tlbikge1xuICAgIHRoaXMuY29ubmVjdGlvbi50cmFuc2FjdGlvbkRlc2NyaXB0b3JzLmxlbmd0aCA9IDE7XG4gICAgdGhpcy5jb25uZWN0aW9uLmluVHJhbnNhY3Rpb24gPSBmYWxzZTtcbiAgfVxuXG4gIG9uUm9sbGJhY2tUcmFuc2FjdGlvbih0b2tlbjogUm9sbGJhY2tUcmFuc2FjdGlvbkVudkNoYW5nZVRva2VuKSB7XG4gICAgdGhpcy5jb25uZWN0aW9uLnRyYW5zYWN0aW9uRGVzY3JpcHRvcnMubGVuZ3RoID0gMTtcbiAgICAvLyBBbiBvdXRlcm1vc3QgdHJhbnNhY3Rpb24gd2FzIHJvbGxlZCBiYWNrLiBSZXNldCB0aGUgdHJhbnNhY3Rpb24gY291bnRlclxuICAgIHRoaXMuY29ubmVjdGlvbi5pblRyYW5zYWN0aW9uID0gZmFsc2U7XG4gICAgdGhpcy5jb25uZWN0aW9uLmVtaXQoJ3JvbGxiYWNrVHJhbnNhY3Rpb24nKTtcbiAgfVxuXG4gIG9uQ29sTWV0YWRhdGEodG9rZW46IENvbE1ldGFkYXRhVG9rZW4pIHtcbiAgICBpZiAoIXRoaXMucmVxdWVzdC5jYW5jZWxlZCkge1xuICAgICAgaWYgKHRoaXMuY29ubmVjdGlvbi5jb25maWcub3B0aW9ucy51c2VDb2x1bW5OYW1lcykge1xuICAgICAgICBjb25zdCBjb2x1bW5zOiB7IFtrZXk6IHN0cmluZ106IENvbHVtbk1ldGFkYXRhIH0gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gICAgICAgIGZvciAobGV0IGogPSAwLCBsZW4gPSB0b2tlbi5jb2x1bW5zLmxlbmd0aDsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgICAgY29uc3QgY29sID0gdG9rZW4uY29sdW1uc1tqXTtcbiAgICAgICAgICBpZiAoY29sdW1uc1tjb2wuY29sTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICAgICAgY29sdW1uc1tjb2wuY29sTmFtZV0gPSBjb2w7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5yZXF1ZXN0LmVtaXQoJ2NvbHVtbk1ldGFkYXRhJywgY29sdW1ucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlcXVlc3QuZW1pdCgnY29sdW1uTWV0YWRhdGEnLCB0b2tlbi5jb2x1bW5zKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbk9yZGVyKHRva2VuOiBPcmRlclRva2VuKSB7XG4gICAgaWYgKCF0aGlzLnJlcXVlc3QuY2FuY2VsZWQpIHtcbiAgICAgIHRoaXMucmVxdWVzdC5lbWl0KCdvcmRlcicsIHRva2VuLm9yZGVyQ29sdW1ucyk7XG4gICAgfVxuICB9XG5cbiAgb25Sb3codG9rZW46IFJvd1Rva2VuIHwgTkJDUm93VG9rZW4pIHtcbiAgICBpZiAoIXRoaXMucmVxdWVzdC5jYW5jZWxlZCkge1xuICAgICAgaWYgKHRoaXMuY29ubmVjdGlvbi5jb25maWcub3B0aW9ucy5yb3dDb2xsZWN0aW9uT25SZXF1ZXN0Q29tcGxldGlvbikge1xuICAgICAgICB0aGlzLnJlcXVlc3Qucm93cyEucHVzaCh0b2tlbi5jb2x1bW5zKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuY29ubmVjdGlvbi5jb25maWcub3B0aW9ucy5yb3dDb2xsZWN0aW9uT25Eb25lKSB7XG4gICAgICAgIHRoaXMucmVxdWVzdC5yc3QhLnB1c2godG9rZW4uY29sdW1ucyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVxdWVzdC5lbWl0KCdyb3cnLCB0b2tlbi5jb2x1bW5zKTtcbiAgICB9XG4gIH1cblxuICBvblJldHVyblN0YXR1cyh0b2tlbjogUmV0dXJuU3RhdHVzVG9rZW4pIHtcbiAgICBpZiAoIXRoaXMucmVxdWVzdC5jYW5jZWxlZCkge1xuICAgICAgLy8gS2VlcCB2YWx1ZSBmb3IgcGFzc2luZyBpbiAnZG9uZVByb2MnIGV2ZW50LlxuICAgICAgdGhpcy5jb25uZWN0aW9uLnByb2NSZXR1cm5TdGF0dXNWYWx1ZSA9IHRva2VuLnZhbHVlO1xuICAgIH1cbiAgfVxuXG4gIG9uUmV0dXJuVmFsdWUodG9rZW46IFJldHVyblZhbHVlVG9rZW4pIHtcbiAgICBpZiAoIXRoaXMucmVxdWVzdC5jYW5jZWxlZCkge1xuICAgICAgdGhpcy5yZXF1ZXN0LmVtaXQoJ3JldHVyblZhbHVlJywgdG9rZW4ucGFyYW1OYW1lLCB0b2tlbi52YWx1ZSwgdG9rZW4ubWV0YWRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIG9uRG9uZVByb2ModG9rZW46IERvbmVQcm9jVG9rZW4pIHtcbiAgICBpZiAoIXRoaXMucmVxdWVzdC5jYW5jZWxlZCkge1xuICAgICAgaWYgKHRva2VuLnNxbEVycm9yICYmICF0aGlzLnJlcXVlc3QuZXJyb3IpIHtcbiAgICAgICAgLy8gY2hlY2sgaWYgdGhlIERPTkVfRVJST1IgZmxhZ3Mgd2FzIHNldCwgYnV0IGFuIEVSUk9SIHRva2VuIHdhcyBub3Qgc2VudC5cbiAgICAgICAgdGhpcy5yZXF1ZXN0LmVycm9yID0gbmV3IFJlcXVlc3RFcnJvcignQW4gdW5rbm93biBlcnJvciBoYXMgb2NjdXJyZWQuJywgJ1VOS05PV04nKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5yZXF1ZXN0LmVtaXQoJ2RvbmVQcm9jJywgdG9rZW4ucm93Q291bnQsIHRva2VuLm1vcmUsIHRoaXMuY29ubmVjdGlvbi5wcm9jUmV0dXJuU3RhdHVzVmFsdWUsIHRoaXMucmVxdWVzdC5yc3QpO1xuXG4gICAgICB0aGlzLmNvbm5lY3Rpb24ucHJvY1JldHVyblN0YXR1c1ZhbHVlID0gdW5kZWZpbmVkO1xuXG4gICAgICBpZiAodG9rZW4ucm93Q291bnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnJlcXVlc3Qucm93Q291bnQhICs9IHRva2VuLnJvd0NvdW50O1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jb25uZWN0aW9uLmNvbmZpZy5vcHRpb25zLnJvd0NvbGxlY3Rpb25PbkRvbmUpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0LnJzdCA9IFtdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uRG9uZUluUHJvYyh0b2tlbjogRG9uZUluUHJvY1Rva2VuKSB7XG4gICAgaWYgKCF0aGlzLnJlcXVlc3QuY2FuY2VsZWQpIHtcbiAgICAgIHRoaXMucmVxdWVzdC5lbWl0KCdkb25lSW5Qcm9jJywgdG9rZW4ucm93Q291bnQsIHRva2VuLm1vcmUsIHRoaXMucmVxdWVzdC5yc3QpO1xuXG4gICAgICBpZiAodG9rZW4ucm93Q291bnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnJlcXVlc3Qucm93Q291bnQhICs9IHRva2VuLnJvd0NvdW50O1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jb25uZWN0aW9uLmNvbmZpZy5vcHRpb25zLnJvd0NvbGxlY3Rpb25PbkRvbmUpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0LnJzdCA9IFtdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uRG9uZSh0b2tlbjogRG9uZVRva2VuKSB7XG4gICAgaWYgKCF0aGlzLnJlcXVlc3QuY2FuY2VsZWQpIHtcbiAgICAgIGlmICh0b2tlbi5zcWxFcnJvciAmJiAhdGhpcy5yZXF1ZXN0LmVycm9yKSB7XG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSBET05FX0VSUk9SIGZsYWdzIHdhcyBzZXQsIGJ1dCBhbiBFUlJPUiB0b2tlbiB3YXMgbm90IHNlbnQuXG4gICAgICAgIHRoaXMucmVxdWVzdC5lcnJvciA9IG5ldyBSZXF1ZXN0RXJyb3IoJ0FuIHVua25vd24gZXJyb3IgaGFzIG9jY3VycmVkLicsICdVTktOT1dOJyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucmVxdWVzdC5lbWl0KCdkb25lJywgdG9rZW4ucm93Q291bnQsIHRva2VuLm1vcmUsIHRoaXMucmVxdWVzdC5yc3QpO1xuXG4gICAgICBpZiAodG9rZW4ucm93Q291bnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLnJlcXVlc3Qucm93Q291bnQhICs9IHRva2VuLnJvd0NvdW50O1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5jb25uZWN0aW9uLmNvbmZpZy5vcHRpb25zLnJvd0NvbGxlY3Rpb25PbkRvbmUpIHtcbiAgICAgICAgdGhpcy5yZXF1ZXN0LnJzdCA9IFtdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uUmVzZXRDb25uZWN0aW9uKHRva2VuOiBSZXNldENvbm5lY3Rpb25FbnZDaGFuZ2VUb2tlbikge1xuICAgIHRoaXMuY29ubmVjdGlvbi5lbWl0KCdyZXNldENvbm5lY3Rpb24nKTtcbiAgfVxufVxuXG4vKipcbiAqIEEgaGFuZGxlciBmb3IgdGhlIGF0dGVudGlvbiBhY2tub3dsZWRnZW1lbnQgbWVzc2FnZS5cbiAqXG4gKiBUaGlzIG1lc3NhZ2Ugb25seSBjb250YWlucyBhIGBET05FYCB0b2tlbiB0aGF0IGFja25vd2xlZGdlc1xuICogdGhhdCB0aGUgYXR0ZW50aW9uIG1lc3NhZ2Ugd2FzIHJlY2VpdmVkIGJ5IHRoZSBzZXJ2ZXIuXG4gKi9cbmV4cG9ydCBjbGFzcyBBdHRlbnRpb25Ub2tlbkhhbmRsZXIgZXh0ZW5kcyBUb2tlbkhhbmRsZXIge1xuICBjb25uZWN0aW9uOiBDb25uZWN0aW9uO1xuICByZXF1ZXN0OiBSZXF1ZXN0IHwgQnVsa0xvYWQ7XG5cbiAgLyoqXG4gICAqIFJldHVybnMgd2hldGhlciBhbiBhdHRlbnRpb24gYWNrbm93bGVkZ2VtZW50IHdhcyByZWNlaXZlZC5cbiAgICovXG4gIGF0dGVudGlvblJlY2VpdmVkOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKGNvbm5lY3Rpb246IENvbm5lY3Rpb24sIHJlcXVlc3Q6IFJlcXVlc3QgfCBCdWxrTG9hZCkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLmNvbm5lY3Rpb24gPSBjb25uZWN0aW9uO1xuICAgIHRoaXMucmVxdWVzdCA9IHJlcXVlc3Q7XG5cbiAgICB0aGlzLmF0dGVudGlvblJlY2VpdmVkID0gZmFsc2U7XG4gIH1cblxuICBvbkRvbmUodG9rZW46IERvbmVUb2tlbikge1xuICAgIGlmICh0b2tlbi5hdHRlbnRpb24pIHtcbiAgICAgIHRoaXMuYXR0ZW50aW9uUmVjZWl2ZWQgPSB0cnVlO1xuICAgIH1cbiAgfVxufVxuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0E7O0FBQ0E7O0FBaUNBOzs7O0FBRU8sTUFBTUEsb0JBQU4sU0FBbUNDLEtBQW5DLENBQXlDO0VBQzlDQyxXQUFXLENBQUNDLE9BQUQsRUFBd0JDLEtBQXhCLEVBQXNDO0lBQy9DLE1BQU0sdUJBQXVCQSxLQUFLLENBQUNDLElBQTdCLEdBQW9DLFFBQXBDLEdBQStDRixPQUFPLENBQUNELFdBQVIsQ0FBb0JHLElBQW5FLEdBQTBFLEdBQWhGO0VBQ0Q7O0FBSDZDOzs7O0FBTXpDLE1BQU1DLFlBQU4sQ0FBbUI7RUFDeEJDLGFBQWEsQ0FBQ0gsS0FBRCxFQUEwQjtJQUNyQyxNQUFNLElBQUlKLG9CQUFKLENBQXlCLElBQXpCLEVBQStCSSxLQUEvQixDQUFOO0VBQ0Q7O0VBRURJLGNBQWMsQ0FBQ0osS0FBRCxFQUEyQjtJQUN2QyxNQUFNLElBQUlKLG9CQUFKLENBQXlCLElBQXpCLEVBQStCSSxLQUEvQixDQUFOO0VBQ0Q7O0VBRURLLE1BQU0sQ0FBQ0wsS0FBRCxFQUFtQjtJQUN2QixNQUFNLElBQUlKLG9CQUFKLENBQXlCLElBQXpCLEVBQStCSSxLQUEvQixDQUFOO0VBQ0Q7O0VBRURNLGdCQUFnQixDQUFDTixLQUFELEVBQWdDO0lBQzlDLE1BQU0sSUFBSUosb0JBQUosQ0FBeUIsSUFBekIsRUFBK0JJLEtBQS9CLENBQU47RUFDRDs7RUFFRE8s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