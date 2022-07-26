"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SymmetricKey = void 0;

// This code is based on the `mssql-jdbc` library published under the conditions of MIT license.
// Copyright (c) 2019 Microsoft Corporation
class SymmetricKey {
  constructor(rootKey) {
    this.rootKey = void 0;

    if (!rootKey) {
      throw new Error('Column encryption key cannot be null.');
    } else if (0 === rootKey.length) {
      throw new Error('Empty column encryption key specified.');
    }

    this.rootKey = rootKey;
  }

  zeroOutKey() {
    this.rootKey = Buffer.alloc(this.rootKey.length);
  }

}

exports.SymmetricKey = SymmetricKey;
var _default = SymmetricKey;
exports.default = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJTeW1tZXRyaWNLZXkiLCJjb25zdHJ1Y3RvciIsInJvb3RLZXkiLCJFcnJvciIsImxlbmd0aCIsInplcm9PdXRLZXkiLCJCdWZmZXIiLCJhbGxvYyJdLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hbHdheXMtZW5jcnlwdGVkL3N5bW1ldHJpYy1rZXkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhpcyBjb2RlIGlzIGJhc2VkIG9uIHRoZSBgbXNzcWwtamRiY2AgbGlicmFyeSBwdWJsaXNoZWQgdW5kZXIgdGhlIGNvbmRpdGlvbnMgb2YgTUlUIGxpY2Vuc2UuXG4vLyBDb3B5cmlnaHQgKGMpIDIwMTkgTWljcm9zb2Z0IENvcnBvcmF0aW9uXG5cbmV4cG9ydCBjbGFzcyBTeW1tZXRyaWNLZXkge1xuICByb290S2V5OiBCdWZmZXI7XG5cbiAgY29uc3RydWN0b3Iocm9vdEtleTogQnVmZmVyKSB7XG4gICAgaWYgKCFyb290S2V5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvbHVtbiBlbmNyeXB0aW9uIGtleSBjYW5ub3QgYmUgbnVsbC4nKTtcbiAgICB9IGVsc2UgaWYgKDAgPT09IHJvb3RLZXkubGVuZ3RoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0VtcHR5IGNvbHVtbiBlbmNyeXB0aW9uIGtleSBzcGVjaWZpZWQuJyk7XG4gICAgfVxuICAgIHRoaXMucm9vdEtleSA9IHJvb3RLZXk7XG4gIH1cblxuICB6ZXJvT3V0S2V5KCkge1xuICAgIHRoaXMucm9vdEtleSA9IEJ1ZmZlci5hbGxvYyh0aGlzLnJvb3RLZXkubGVuZ3RoKTtcbiAgfVxufVxuZXhwb3J0IGRlZmF1bHQgU3ltbWV0cmljS2V5O1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7QUFDQTtBQUVPLE1BQU1BLFlBQU4sQ0FBbUI7RUFHeEJDLFdBQVcsQ0FBQ0MsT0FBRCxFQUFrQjtJQUFBLEtBRjdCQSxPQUU2Qjs7SUFDM0IsSUFBSSxDQUFDQSxPQUFMLEVBQWM7TUFDWixNQUFNLElBQUlDLEtBQUosQ0FBVSx1Q0FBVixDQUFOO0lBQ0QsQ0FGRCxNQUVPLElBQUksTUFBTUQsT0FBTyxDQUFDRSxNQUFsQixFQUEwQjtNQUMvQixNQUFNLElBQUlELEtBQUosQ0FBVSx3Q0FBVixDQUFOO0lBQ0Q7O0lBQ0QsS0FBS0QsT0FBTCxHQUFlQSxPQUFmO0VBQ0Q7O0VBRURHLFVBQVUsR0FBRztJQUNYLEtBQUtILE9BQUwsR0FBZUksTUFBTSxDQUFDQyxLQUFQLENBQWEsS0FBS0wsT0FBTCxDQUFhRSxNQUExQixDQUFmO0VBQ0Q7O0FBZHVCOzs7ZUFnQlhKLFkifQ==