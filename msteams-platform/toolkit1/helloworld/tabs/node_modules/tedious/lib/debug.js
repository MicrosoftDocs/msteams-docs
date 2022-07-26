"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _events = require("events");

var util = _interopRequireWildcard(require("util"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

class Debug extends _events.EventEmitter {
  /*
    @options    Which debug details should be sent.
                data    - dump of packet data
                payload - details of decoded payload
  */
  constructor({
    data = false,
    payload = false,
    packet = false,
    token = false
  } = {}) {
    super();
    this.options = void 0;
    this.indent = void 0;
    this.options = {
      data,
      payload,
      packet,
      token
    };
    this.indent = '  ';
  }

  packet(direction, packet) {
    if (this.haveListeners() && this.options.packet) {
      this.log('');
      this.log(direction);
      this.log(packet.headerToString(this.indent));
    }
  }

  data(packet) {
    if (this.haveListeners() && this.options.data) {
      this.log(packet.dataToString(this.indent));
    }
  }

  payload(generatePayloadText) {
    if (this.haveListeners() && this.options.payload) {
      this.log(generatePayloadText());
    }
  }

  token(token) {
    if (this.haveListeners() && this.options.token) {
      this.log(util.inspect(token, {
        showHidden: false,
        depth: 5,
        colors: true
      }));
    }
  }

  haveListeners() {
    return this.listeners('debug').length > 0;
  }

  log(text) {
    this.emit('debug', text);
  }

}

var _default = Debug;
exports.default = _default;
module.exports = Debug;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJEZWJ1ZyIsIkV2ZW50RW1pdHRlciIsImNvbnN0cnVjdG9yIiwiZGF0YSIsInBheWxvYWQiLCJwYWNrZXQiLCJ0b2tlbiIsIm9wdGlvbnMiLCJpbmRlbnQiLCJkaXJlY3Rpb24iLCJoYXZlTGlzdGVuZXJzIiwibG9nIiwiaGVhZGVyVG9TdHJpbmciLCJkYXRhVG9TdHJpbmciLCJnZW5lcmF0ZVBheWxvYWRUZXh0IiwidXRpbCIsImluc3BlY3QiLCJzaG93SGlkZGVuIiwiZGVwdGgiLCJjb2xvcnMiLCJsaXN0ZW5lcnMiLCJsZW5ndGgiLCJ0ZXh0IiwiZW1pdCIsIm1vZHVsZSIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi9zcmMvZGVidWcudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSAnZXZlbnRzJztcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSAndXRpbCc7XG5pbXBvcnQgeyBQYWNrZXQgfSBmcm9tICcuL3BhY2tldCc7XG5cbmNsYXNzIERlYnVnIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgb3B0aW9uczoge1xuICAgIGRhdGE6IGJvb2xlYW47XG4gICAgcGF5bG9hZDogYm9vbGVhbjtcbiAgICBwYWNrZXQ6IGJvb2xlYW47XG4gICAgdG9rZW46IGJvb2xlYW47XG4gIH07XG5cbiAgaW5kZW50OiBzdHJpbmc7XG5cbiAgLypcbiAgICBAb3B0aW9ucyAgICBXaGljaCBkZWJ1ZyBkZXRhaWxzIHNob3VsZCBiZSBzZW50LlxuICAgICAgICAgICAgICAgIGRhdGEgICAgLSBkdW1wIG9mIHBhY2tldCBkYXRhXG4gICAgICAgICAgICAgICAgcGF5bG9hZCAtIGRldGFpbHMgb2YgZGVjb2RlZCBwYXlsb2FkXG4gICovXG4gIGNvbnN0cnVjdG9yKHsgZGF0YSA9IGZhbHNlLCBwYXlsb2FkID0gZmFsc2UsIHBhY2tldCA9IGZhbHNlLCB0b2tlbiA9IGZhbHNlIH0gPSB7fSkge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLm9wdGlvbnMgPSB7IGRhdGEsIHBheWxvYWQsIHBhY2tldCwgdG9rZW4gfTtcbiAgICB0aGlzLmluZGVudCA9ICcgICc7XG4gIH1cblxuICBwYWNrZXQoZGlyZWN0aW9uOiAnUmVjZWl2ZWQnIHwgJ1NlbnQnLCBwYWNrZXQ6IFBhY2tldCkge1xuICAgIGlmICh0aGlzLmhhdmVMaXN0ZW5lcnMoKSAmJiB0aGlzLm9wdGlvbnMucGFja2V0KSB7XG4gICAgICB0aGlzLmxvZygnJyk7XG4gICAgICB0aGlzLmxvZyhkaXJlY3Rpb24pO1xuICAgICAgdGhpcy5sb2cocGFja2V0LmhlYWRlclRvU3RyaW5nKHRoaXMuaW5kZW50KSk7XG4gICAgfVxuICB9XG5cbiAgZGF0YShwYWNrZXQ6IFBhY2tldCkge1xuICAgIGlmICh0aGlzLmhhdmVMaXN0ZW5lcnMoKSAmJiB0aGlzLm9wdGlvbnMuZGF0YSkge1xuICAgICAgdGhpcy5sb2cocGFja2V0LmRhdGFUb1N0cmluZyh0aGlzLmluZGVudCkpO1xuICAgIH1cbiAgfVxuXG4gIHBheWxvYWQoZ2VuZXJhdGVQYXlsb2FkVGV4dDogKCkgPT4gc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuaGF2ZUxpc3RlbmVycygpICYmIHRoaXMub3B0aW9ucy5wYXlsb2FkKSB7XG4gICAgICB0aGlzLmxvZyhnZW5lcmF0ZVBheWxvYWRUZXh0KCkpO1xuICAgIH1cbiAgfVxuXG4gIHRva2VuKHRva2VuOiBhbnkpIHtcbiAgICBpZiAodGhpcy5oYXZlTGlzdGVuZXJzKCkgJiYgdGhpcy5vcHRpb25zLnRva2VuKSB7XG4gICAgICB0aGlzLmxvZyh1dGlsLmluc3BlY3QodG9rZW4sIHsgc2hvd0hpZGRlbjogZmFsc2UsIGRlcHRoOiA1LCBjb2xvcnM6IHRydWUgfSkpO1xuICAgIH1cbiAgfVxuXG4gIGhhdmVMaXN0ZW5lcnMoKSB7XG4gICAgcmV0dXJuIHRoaXMubGlzdGVuZXJzKCdkZWJ1ZycpLmxlbmd0aCA+IDA7XG4gIH1cblxuICBsb2codGV4dDogc3RyaW5nKSB7XG4gICAgdGhpcy5lbWl0KCdkZWJ1ZycsIHRleHQpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERlYnVnO1xubW9kdWxlLmV4cG9ydHMgPSBEZWJ1ZztcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOzs7Ozs7QUFHQSxNQUFNQSxLQUFOLFNBQW9CQyxvQkFBcEIsQ0FBaUM7RUFVL0I7QUFDRjtBQUNBO0FBQ0E7QUFDQTtFQUNFQyxXQUFXLENBQUM7SUFBRUMsSUFBSSxHQUFHLEtBQVQ7SUFBZ0JDLE9BQU8sR0FBRyxLQUExQjtJQUFpQ0MsTUFBTSxHQUFHLEtBQTFDO0lBQWlEQyxLQUFLLEdBQUc7RUFBekQsSUFBbUUsRUFBcEUsRUFBd0U7SUFDakY7SUFEaUYsS0FkbkZDLE9BY21GO0lBQUEsS0FQbkZDLE1BT21GO0lBR2pGLEtBQUtELE9BQUwsR0FBZTtNQUFFSixJQUFGO01BQVFDLE9BQVI7TUFBaUJDLE1BQWpCO01BQXlCQztJQUF6QixDQUFmO0lBQ0EsS0FBS0UsTUFBTCxHQUFjLElBQWQ7RUFDRDs7RUFFREgsTUFBTSxDQUFDSSxTQUFELEVBQWlDSixNQUFqQyxFQUFpRDtJQUNyRCxJQUFJLEtBQUtLLGFBQUwsTUFBd0IsS0FBS0gsT0FBTCxDQUFhRixNQUF6QyxFQUFpRDtNQUMvQyxLQUFLTSxHQUFMLENBQVMsRUFBVDtNQUNBLEtBQUtBLEdBQUwsQ0FBU0YsU0FBVDtNQUNBLEtBQUtFLEdBQUwsQ0FBU04sTUFBTSxDQUFDTyxjQUFQLENBQXNCLEtBQUtKLE1BQTNCLENBQVQ7SUFDRDtFQUNGOztFQUVETCxJQUFJLENBQUNFLE1BQUQsRUFBaUI7SUFDbkIsSUFBSSxLQUFLSyxhQUFMLE1BQXdCLEtBQUtILE9BQUwsQ0FBYUosSUFBekMsRUFBK0M7TUFDN0MsS0FBS1EsR0FBTCxDQUFTTixNQUFNLENBQUNRLFlBQVAsQ0FBb0IsS0FBS0wsTUFBekIsQ0FBVDtJQUNEO0VBQ0Y7O0VBRURKLE9BQU8sQ0FBQ1UsbUJBQUQsRUFBb0M7SUFDekMsSUFBSSxLQUFLSixhQUFMLE1BQXdCLEtBQUtILE9BQUwsQ0FBYUgsT0FBekMsRUFBa0Q7TUFDaEQsS0FBS08sR0FBTCxDQUFTRyxtQkFBbUIsRUFBNUI7SUFDRDtFQUNGOztFQUVEUixLQUFLLENBQUNBLEtBQUQsRUFBYTtJQUNoQixJQUFJLEtBQUtJLGFBQUwsTUFBd0IsS0FBS0gsT0FBTCxDQUFhRCxLQUF6QyxFQUFnRDtNQUM5QyxLQUFLSyxHQUFMLENBQVNJLElBQUksQ0FBQ0MsT0FBTCxDQUFhVixLQUFiLEVBQW9CO1FBQUVXLFVBQVUsRUFBRSxLQUFkO1FBQXFCQyxLQUFLLEVBQUUsQ0FBNUI7UUFBK0JDLE1BQU0sRUFBRTtNQUF2QyxDQUFwQixDQUFUO0lBQ0Q7RUFDRjs7RUFFRFQsYUFBYSxHQUFHO0lBQ2QsT0FBTyxLQUFLVSxTQUFMLENBQWUsT0FBZixFQUF3QkMsTUFBeEIsR0FBaUMsQ0FBeEM7RUFDRDs7RUFFRFYsR0FBRyxDQUFDVyxJQUFELEVBQWU7SUFDaEIsS0FBS0MsSUFBTCxDQUFVLE9BQVYsRUFBbUJELElBQW5CO0VBQ0Q7O0FBdEQ4Qjs7ZUF5RGxCdEIsSzs7QUFDZndCLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnpCLEtBQWpCIn0=