"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _bl = _interopRequireDefault(require("bl"));

var _stream = require("stream");

var _message = _interopRequireDefault(require("./message"));

var _packet = require("./packet");

var _errors = require("./errors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
  IncomingMessageStream
  Transform received TDS data into individual IncomingMessage streams.
*/
class IncomingMessageStream extends _stream.Transform {
  constructor(debug) {
    super({
      readableObjectMode: true
    });
    this.debug = void 0;
    this.bl = void 0;
    this.currentMessage = void 0;
    this.debug = debug;
    this.currentMessage = undefined;
    this.bl = new _bl.default();
  }

  pause() {
    super.pause();

    if (this.currentMessage) {
      this.currentMessage.pause();
    }

    return this;
  }

  resume() {
    super.resume();

    if (this.currentMessage) {
      this.currentMessage.resume();
    }

    return this;
  }

  processBufferedData(callback) {
    // The packet header is always 8 bytes of length.
    while (this.bl.length >= _packet.HEADER_LENGTH) {
      // Get the full packet length
      const length = this.bl.readUInt16BE(2);

      if (length < _packet.HEADER_LENGTH) {
        return callback(new _errors.ConnectionError('Unable to process incoming packet'));
      }

      if (this.bl.length >= length) {
        const data = this.bl.slice(0, length);
        this.bl.consume(length); // TODO: Get rid of creating `Packet` instances here.

        const packet = new _packet.Packet(data);
        this.debug.packet('Received', packet);
        this.debug.data(packet);
        let message = this.currentMessage;

        if (message === undefined) {
          this.currentMessage = message = new _message.default({
            type: packet.type(),
            resetConnection: false
          });
          this.push(message);
        }

        if (packet.isLast()) {
          // Wait until the current message was fully processed before we
          // continue processing any remaining messages.
          message.once('end', () => {
            this.currentMessage = undefined;
            this.processBufferedData(callback);
          });
          message.end(packet.data());
          return;
        } else if (!message.write(packet.data())) {
          // If too much data is buffering up in the
          // current message, wait for it to drain.
          message.once('drain', () => {
            this.processBufferedData(callback);
          });
          return;
        }
      } else {
        break;
      }
    } // Not enough data to read the next packet. Stop here and wait for
    // the next call to `_transform`.


    callback();
  }

  _transform(chunk, _encoding, callback) {
    this.bl.append(chunk);
    this.processBufferedData(callback);
  }

}

var _default = IncomingMessageStream;
exports.default = _default;
module.exports = IncomingMessageStream;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJJbmNvbWluZ01lc3NhZ2VTdHJlYW0iLCJUcmFuc2Zvcm0iLCJjb25zdHJ1Y3RvciIsImRlYnVnIiwicmVhZGFibGVPYmplY3RNb2RlIiwiYmwiLCJjdXJyZW50TWVzc2FnZSIsInVuZGVmaW5lZCIsIkJ1ZmZlckxpc3QiLCJwYXVzZSIsInJlc3VtZSIsInByb2Nlc3NCdWZmZXJlZERhdGEiLCJjYWxsYmFjayIsImxlbmd0aCIsIkhFQURFUl9MRU5HVEgiLCJyZWFkVUludDE2QkUiLCJDb25uZWN0aW9uRXJyb3IiLCJkYXRhIiwic2xpY2UiLCJjb25zdW1lIiwicGFja2V0IiwiUGFja2V0IiwibWVzc2FnZSIsIk1lc3NhZ2UiLCJ0eXBlIiwicmVzZXRDb25uZWN0aW9uIiwicHVzaCIsImlzTGFzdCIsIm9uY2UiLCJlbmQiLCJ3cml0ZSIsIl90cmFuc2Zvcm0iLCJjaHVuayIsIl9lbmNvZGluZyIsImFwcGVuZCIsIm1vZHVsZSIsImV4cG9ydHMiXSwic291cmNlcyI6WyIuLi9zcmMvaW5jb21pbmctbWVzc2FnZS1zdHJlYW0udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEJ1ZmZlckxpc3QgZnJvbSAnYmwnO1xuaW1wb3J0IHsgVHJhbnNmb3JtIH0gZnJvbSAnc3RyZWFtJztcblxuaW1wb3J0IERlYnVnIGZyb20gJy4vZGVidWcnO1xuaW1wb3J0IE1lc3NhZ2UgZnJvbSAnLi9tZXNzYWdlJztcbmltcG9ydCB7IFBhY2tldCwgSEVBREVSX0xFTkdUSCB9IGZyb20gJy4vcGFja2V0JztcbmltcG9ydCB7IENvbm5lY3Rpb25FcnJvciB9IGZyb20gJy4vZXJyb3JzJztcblxuLyoqXG4gIEluY29taW5nTWVzc2FnZVN0cmVhbVxuICBUcmFuc2Zvcm0gcmVjZWl2ZWQgVERTIGRhdGEgaW50byBpbmRpdmlkdWFsIEluY29taW5nTWVzc2FnZSBzdHJlYW1zLlxuKi9cbmNsYXNzIEluY29taW5nTWVzc2FnZVN0cmVhbSBleHRlbmRzIFRyYW5zZm9ybSB7XG4gIGRlYnVnOiBEZWJ1ZztcbiAgYmw6IGFueTtcbiAgY3VycmVudE1lc3NhZ2U6IE1lc3NhZ2UgfCB1bmRlZmluZWQ7XG5cbiAgY29uc3RydWN0b3IoZGVidWc6IERlYnVnKSB7XG4gICAgc3VwZXIoeyByZWFkYWJsZU9iamVjdE1vZGU6IHRydWUgfSk7XG5cbiAgICB0aGlzLmRlYnVnID0gZGVidWc7XG5cbiAgICB0aGlzLmN1cnJlbnRNZXNzYWdlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuYmwgPSBuZXcgQnVmZmVyTGlzdCgpO1xuICB9XG5cbiAgcGF1c2UoKSB7XG4gICAgc3VwZXIucGF1c2UoKTtcblxuICAgIGlmICh0aGlzLmN1cnJlbnRNZXNzYWdlKSB7XG4gICAgICB0aGlzLmN1cnJlbnRNZXNzYWdlLnBhdXNlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICByZXN1bWUoKSB7XG4gICAgc3VwZXIucmVzdW1lKCk7XG5cbiAgICBpZiAodGhpcy5jdXJyZW50TWVzc2FnZSkge1xuICAgICAgdGhpcy5jdXJyZW50TWVzc2FnZS5yZXN1bWUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHByb2Nlc3NCdWZmZXJlZERhdGEoY2FsbGJhY2s6IChlcnI/OiBDb25uZWN0aW9uRXJyb3IpID0+IHZvaWQpIHtcbiAgICAvLyBUaGUgcGFja2V0IGhlYWRlciBpcyBhbHdheXMgOCBieXRlcyBvZiBsZW5ndGguXG4gICAgd2hpbGUgKHRoaXMuYmwubGVuZ3RoID49IEhFQURFUl9MRU5HVEgpIHtcbiAgICAgIC8vIEdldCB0aGUgZnVsbCBwYWNrZXQgbGVuZ3RoXG4gICAgICBjb25zdCBsZW5ndGggPSB0aGlzLmJsLnJlYWRVSW50MTZCRSgyKTtcbiAgICAgIGlmIChsZW5ndGggPCBIRUFERVJfTEVOR1RIKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhuZXcgQ29ubmVjdGlvbkVycm9yKCdVbmFibGUgdG8gcHJvY2VzcyBpbmNvbWluZyBwYWNrZXQnKSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmJsLmxlbmd0aCA+PSBsZW5ndGgpIHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuYmwuc2xpY2UoMCwgbGVuZ3RoKTtcbiAgICAgICAgdGhpcy5ibC5jb25zdW1lKGxlbmd0aCk7XG5cbiAgICAgICAgLy8gVE9ETzogR2V0IHJpZCBvZiBjcmVhdGluZyBgUGFja2V0YCBpbnN0YW5jZXMgaGVyZS5cbiAgICAgICAgY29uc3QgcGFja2V0ID0gbmV3IFBhY2tldChkYXRhKTtcbiAgICAgICAgdGhpcy5kZWJ1Zy5wYWNrZXQoJ1JlY2VpdmVkJywgcGFja2V0KTtcbiAgICAgICAgdGhpcy5kZWJ1Zy5kYXRhKHBhY2tldCk7XG5cbiAgICAgICAgbGV0IG1lc3NhZ2UgPSB0aGlzLmN1cnJlbnRNZXNzYWdlO1xuICAgICAgICBpZiAobWVzc2FnZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhpcy5jdXJyZW50TWVzc2FnZSA9IG1lc3NhZ2UgPSBuZXcgTWVzc2FnZSh7IHR5cGU6IHBhY2tldC50eXBlKCksIHJlc2V0Q29ubmVjdGlvbjogZmFsc2UgfSk7XG4gICAgICAgICAgdGhpcy5wdXNoKG1lc3NhZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhY2tldC5pc0xhc3QoKSkge1xuICAgICAgICAgIC8vIFdhaXQgdW50aWwgdGhlIGN1cnJlbnQgbWVzc2FnZSB3YXMgZnVsbHkgcHJvY2Vzc2VkIGJlZm9yZSB3ZVxuICAgICAgICAgIC8vIGNvbnRpbnVlIHByb2Nlc3NpbmcgYW55IHJlbWFpbmluZyBtZXNzYWdlcy5cbiAgICAgICAgICBtZXNzYWdlLm9uY2UoJ2VuZCcsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudE1lc3NhZ2UgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NCdWZmZXJlZERhdGEoY2FsbGJhY2spO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIG1lc3NhZ2UuZW5kKHBhY2tldC5kYXRhKCkpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmICghbWVzc2FnZS53cml0ZShwYWNrZXQuZGF0YSgpKSkge1xuICAgICAgICAgIC8vIElmIHRvbyBtdWNoIGRhdGEgaXMgYnVmZmVyaW5nIHVwIGluIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgbWVzc2FnZSwgd2FpdCBmb3IgaXQgdG8gZHJhaW4uXG4gICAgICAgICAgbWVzc2FnZS5vbmNlKCdkcmFpbicsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc0J1ZmZlcmVkRGF0YShjYWxsYmFjayk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBOb3QgZW5vdWdoIGRhdGEgdG8gcmVhZCB0aGUgbmV4dCBwYWNrZXQuIFN0b3AgaGVyZSBhbmQgd2FpdCBmb3JcbiAgICAvLyB0aGUgbmV4dCBjYWxsIHRvIGBfdHJhbnNmb3JtYC5cbiAgICBjYWxsYmFjaygpO1xuICB9XG5cbiAgX3RyYW5zZm9ybShjaHVuazogQnVmZmVyLCBfZW5jb2Rpbmc6IHN0cmluZywgY2FsbGJhY2s6ICgpID0+IHZvaWQpIHtcbiAgICB0aGlzLmJsLmFwcGVuZChjaHVuayk7XG4gICAgdGhpcy5wcm9jZXNzQnVmZmVyZWREYXRhKGNhbGxiYWNrKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBJbmNvbWluZ01lc3NhZ2VTdHJlYW07XG5tb2R1bGUuZXhwb3J0cyA9IEluY29taW5nTWVzc2FnZVN0cmVhbTtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUNBOztBQUdBOztBQUNBOztBQUNBOzs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNQSxxQkFBTixTQUFvQ0MsaUJBQXBDLENBQThDO0VBSzVDQyxXQUFXLENBQUNDLEtBQUQsRUFBZTtJQUN4QixNQUFNO01BQUVDLGtCQUFrQixFQUFFO0lBQXRCLENBQU47SUFEd0IsS0FKMUJELEtBSTBCO0lBQUEsS0FIMUJFLEVBRzBCO0lBQUEsS0FGMUJDLGNBRTBCO0lBR3hCLEtBQUtILEtBQUwsR0FBYUEsS0FBYjtJQUVBLEtBQUtHLGNBQUwsR0FBc0JDLFNBQXRCO0lBQ0EsS0FBS0YsRUFBTCxHQUFVLElBQUlHLFdBQUosRUFBVjtFQUNEOztFQUVEQyxLQUFLLEdBQUc7SUFDTixNQUFNQSxLQUFOOztJQUVBLElBQUksS0FBS0gsY0FBVCxFQUF5QjtNQUN2QixLQUFLQSxjQUFMLENBQW9CRyxLQUFwQjtJQUNEOztJQUVELE9BQU8sSUFBUDtFQUNEOztFQUVEQyxNQUFNLEdBQUc7SUFDUCxNQUFNQSxNQUFOOztJQUVBLElBQUksS0FBS0osY0FBVCxFQUF5QjtNQUN2QixLQUFLQSxjQUFMLENBQW9CSSxNQUFwQjtJQUNEOztJQUVELE9BQU8sSUFBUDtFQUNEOztFQUVEQyxtQkFBbUIsQ0FBQ0MsUUFBRCxFQUE0QztJQUM3RDtJQUNBLE9BQU8sS0FBS1AsRUFBTCxDQUFRUSxNQUFSLElBQWtCQyxxQkFBekIsRUFBd0M7TUFDdEM7TUFDQSxNQUFNRCxNQUFNLEdBQUcsS0FBS1IsRUFBTCxDQUFRVSxZQUFSLENBQXFCLENBQXJCLENBQWY7O01BQ0EsSUFBSUYsTUFBTSxHQUFHQyxxQkFBYixFQUE0QjtRQUMxQixPQUFPRixRQUFRLENBQUMsSUFBSUksdUJBQUosQ0FBb0IsbUNBQXBCLENBQUQsQ0FBZjtNQUNEOztNQUVELElBQUksS0FBS1gsRUFBTCxDQUFRUSxNQUFSLElBQWtCQSxNQUF0QixFQUE4QjtRQUM1QixNQUFNSSxJQUFJLEdBQUcsS0FBS1osRUFBTCxDQUFRYSxLQUFSLENBQWMsQ0FBZCxFQUFpQkwsTUFBakIsQ0FBYjtRQUNBLEtBQUtSLEVBQUwsQ0FBUWMsT0FBUixDQUFnQk4sTUFBaEIsRUFGNEIsQ0FJNUI7O1FBQ0EsTUFBTU8sTUFBTSxHQUFHLElBQUlDLGNBQUosQ0FBV0osSUFBWCxDQUFmO1FBQ0EsS0FBS2QsS0FBTCxDQUFXaUIsTUFBWCxDQUFrQixVQUFsQixFQUE4QkEsTUFBOUI7UUFDQSxLQUFLakIsS0FBTCxDQUFXYyxJQUFYLENBQWdCRyxNQUFoQjtRQUVBLElBQUlFLE9BQU8sR0FBRyxLQUFLaEIsY0FBbkI7O1FBQ0EsSUFBSWdCLE9BQU8sS0FBS2YsU0FBaEIsRUFBMkI7VUFDekIsS0FBS0QsY0FBTCxHQUFzQmdCLE9BQU8sR0FBRyxJQUFJQyxnQkFBSixDQUFZO1lBQUVDLElBQUksRUFBRUosTUFBTSxDQUFDSSxJQUFQLEVBQVI7WUFBdUJDLGVBQWUsRUFBRTtVQUF4QyxDQUFaLENBQWhDO1VBQ0EsS0FBS0MsSUFBTCxDQUFVSixPQUFWO1FBQ0Q7O1FBRUQsSUFBSUYsTUFBTSxDQUFDTyxNQUFQLEVBQUosRUFBcUI7VUFDbkI7VUFDQTtVQUNBTCxPQUFPLENBQUNNLElBQVIsQ0FBYSxLQUFiLEVBQW9CLE1BQU07WUFDeEIsS0FBS3RCLGNBQUwsR0FBc0JDLFNBQXRCO1lBQ0EsS0FBS0ksbUJBQUwsQ0FBeUJDLFFBQXpCO1VBQ0QsQ0FIRDtVQUlBVSxPQUFPLENBQUNPLEdBQVIsQ0FBWVQsTUFBTSxDQUFDSCxJQUFQLEVBQVo7VUFDQTtRQUNELENBVEQsTUFTTyxJQUFJLENBQUNLLE9BQU8sQ0FBQ1EsS0FBUixDQUFjVixNQUFNLENBQUNILElBQVAsRUFBZCxDQUFMLEVBQW1DO1VBQ3hDO1VBQ0E7VUFDQUssT0FBTyxDQUFDTSxJQUFSLENBQWEsT0FBYixFQUFzQixNQUFNO1lBQzFCLEtBQUtqQixtQkFBTCxDQUF5QkMsUUFBekI7VUFDRCxDQUZEO1VBR0E7UUFDRDtNQUNGLENBaENELE1BZ0NPO1FBQ0w7TUFDRDtJQUNGLENBNUM0RCxDQThDN0Q7SUFDQTs7O0lBQ0FBLFFBQVE7RUFDVDs7RUFFRG1CLFVBQVUsQ0FBQ0MsS0FBRCxFQUFnQkMsU0FBaEIsRUFBbUNyQixRQUFuQyxFQUF5RDtJQUNqRSxLQUFLUCxFQUFMLENBQVE2QixNQUFSLENBQWVGLEtBQWY7SUFDQSxLQUFLckIsbUJBQUwsQ0FBeUJDLFFBQXpCO0VBQ0Q7O0FBeEYyQzs7ZUEyRi9CWixxQjs7QUFDZm1DLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnBDLHFCQUFqQiJ9