import arrayReduce from 'fast-loops/lib/arrayReduce';

import getFontUrl from './getFontUrl';
import getFontFormat from './getFontFormat';

export default function generateFontSource() {
  var files = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var fontLocals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  var localSource = arrayReduce(fontLocals, function (src, local, index) {
    var prefix = index > 0 ? ',' : '';
    var localUrl = getFontUrl(local);

    return '' + src + prefix + 'local(' + localUrl + ')';
  }, '');
  var urlSource = arrayReduce(files, function (src, fileSource, index) {
    var prefix = index > 0 ? ',' : '';
    var fileFormat = getFontFormat(fileSource);
    var fileUrl = getFontUrl(fileSource);

    return '' + src + prefix + 'url(' + fileUrl + ') format(\'' + fileFormat + '\')';
  }, '');
  var delimiter = localSource.length > 0 && urlSource.length > 0 ? ',' : '';

  return '' + localSource + delimiter + urlSource;
}