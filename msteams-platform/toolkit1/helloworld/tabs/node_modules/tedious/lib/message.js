"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _stream = require("stream");

class Message extends _stream.PassThrough {
  constructor({
    type,
    resetConnection = false
  }) {
    super();
    this.type = void 0;
    this.resetConnection = void 0;
    this.ignore = void 0;
    this.type = type;
    this.resetConnection = resetConnection;
    this.ignore = false;
  }

}

var _default = Message;
exports.default = _default;
module.exports = Message;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJNZXNzYWdlIiwiUGFzc1Rocm91Z2giLCJjb25zdHJ1Y3RvciIsInR5cGUiLCJyZXNldENvbm5lY3Rpb24iLCJpZ25vcmUiLCJtb2R1bGUiLCJleHBvcnRzIl0sInNvdXJjZXMiOlsiLi4vc3JjL21lc3NhZ2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGFzc1Rocm91Z2ggfSBmcm9tICdzdHJlYW0nO1xuXG5jbGFzcyBNZXNzYWdlIGV4dGVuZHMgUGFzc1Rocm91Z2gge1xuICB0eXBlOiBudW1iZXI7XG4gIHJlc2V0Q29ubmVjdGlvbjogYm9vbGVhbjtcbiAgaWdub3JlOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHsgdHlwZSwgcmVzZXRDb25uZWN0aW9uID0gZmFsc2UgfTogeyB0eXBlOiBudW1iZXIsIHJlc2V0Q29ubmVjdGlvbj86IGJvb2xlYW4gfCB1bmRlZmluZWQgfSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgIHRoaXMucmVzZXRDb25uZWN0aW9uID0gcmVzZXRDb25uZWN0aW9uO1xuICAgIHRoaXMuaWdub3JlID0gZmFsc2U7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZTtcbm1vZHVsZS5leHBvcnRzID0gTWVzc2FnZTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUVBLE1BQU1BLE9BQU4sU0FBc0JDLG1CQUF0QixDQUFrQztFQUtoQ0MsV0FBVyxDQUFDO0lBQUVDLElBQUY7SUFBUUMsZUFBZSxHQUFHO0VBQTFCLENBQUQsRUFBNkY7SUFDdEc7SUFEc0csS0FKeEdELElBSXdHO0lBQUEsS0FIeEdDLGVBR3dHO0lBQUEsS0FGeEdDLE1BRXdHO0lBR3RHLEtBQUtGLElBQUwsR0FBWUEsSUFBWjtJQUNBLEtBQUtDLGVBQUwsR0FBdUJBLGVBQXZCO0lBQ0EsS0FBS0MsTUFBTCxHQUFjLEtBQWQ7RUFDRDs7QUFYK0I7O2VBY25CTCxPOztBQUNmTSxNQUFNLENBQUNDLE9BQVAsR0FBaUJQLE9BQWpCIn0=