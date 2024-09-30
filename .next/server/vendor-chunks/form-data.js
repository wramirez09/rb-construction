/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/form-data";
exports.ids = ["vendor-chunks/form-data"];
exports.modules = {

/***/ "(ssr)/./node_modules/form-data/lib/form_data.js":
/*!*************************************************!*\
  !*** ./node_modules/form-data/lib/form_data.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var CombinedStream = __webpack_require__(/*! combined-stream */ \"(ssr)/./node_modules/combined-stream/lib/combined_stream.js\");\nvar util = __webpack_require__(/*! util */ \"util\");\nvar path = __webpack_require__(/*! path */ \"path\");\nvar http = __webpack_require__(/*! http */ \"http\");\nvar https = __webpack_require__(/*! https */ \"https\");\nvar parseUrl = (__webpack_require__(/*! url */ \"url\").parse);\nvar fs = __webpack_require__(/*! fs */ \"fs\");\nvar Stream = (__webpack_require__(/*! stream */ \"stream\").Stream);\nvar mime = __webpack_require__(/*! mime-types */ \"(ssr)/./node_modules/mime-types/index.js\");\nvar asynckit = __webpack_require__(/*! asynckit */ \"(ssr)/./node_modules/asynckit/index.js\");\nvar populate = __webpack_require__(/*! ./populate.js */ \"(ssr)/./node_modules/form-data/lib/populate.js\");\n\n// Public API\nmodule.exports = FormData;\n\n// make it a Stream\nutil.inherits(FormData, CombinedStream);\n\n/**\n * Create readable \"multipart/form-data\" streams.\n * Can be used to submit forms\n * and file uploads to other web applications.\n *\n * @constructor\n * @param {Object} options - Properties to be added/overriden for FormData and CombinedStream\n */\nfunction FormData(options) {\n  if (!(this instanceof FormData)) {\n    return new FormData(options);\n  }\n\n  this._overheadLength = 0;\n  this._valueLength = 0;\n  this._valuesToMeasure = [];\n\n  CombinedStream.call(this);\n\n  options = options || {};\n  for (var option in options) {\n    this[option] = options[option];\n  }\n}\n\nFormData.LINE_BREAK = '\\r\\n';\nFormData.DEFAULT_CONTENT_TYPE = 'application/octet-stream';\n\nFormData.prototype.append = function(field, value, options) {\n\n  options = options || {};\n\n  // allow filename as single option\n  if (typeof options == 'string') {\n    options = {filename: options};\n  }\n\n  var append = CombinedStream.prototype.append.bind(this);\n\n  // all that streamy business can't handle numbers\n  if (typeof value == 'number') {\n    value = '' + value;\n  }\n\n  // https://github.com/felixge/node-form-data/issues/38\n  if (util.isArray(value)) {\n    // Please convert your array into string\n    // the way web server expects it\n    this._error(new Error('Arrays are not supported.'));\n    return;\n  }\n\n  var header = this._multiPartHeader(field, value, options);\n  var footer = this._multiPartFooter();\n\n  append(header);\n  append(value);\n  append(footer);\n\n  // pass along options.knownLength\n  this._trackLength(header, value, options);\n};\n\nFormData.prototype._trackLength = function(header, value, options) {\n  var valueLength = 0;\n\n  // used w/ getLengthSync(), when length is known.\n  // e.g. for streaming directly from a remote server,\n  // w/ a known file a size, and not wanting to wait for\n  // incoming file to finish to get its size.\n  if (options.knownLength != null) {\n    valueLength += +options.knownLength;\n  } else if (Buffer.isBuffer(value)) {\n    valueLength = value.length;\n  } else if (typeof value === 'string') {\n    valueLength = Buffer.byteLength(value);\n  }\n\n  this._valueLength += valueLength;\n\n  // @check why add CRLF? does this account for custom/multiple CRLFs?\n  this._overheadLength +=\n    Buffer.byteLength(header) +\n    FormData.LINE_BREAK.length;\n\n  // empty or either doesn't have path or not an http response or not a stream\n  if (!value || ( !value.path && !(value.readable && value.hasOwnProperty('httpVersion')) && !(value instanceof Stream))) {\n    return;\n  }\n\n  // no need to bother with the length\n  if (!options.knownLength) {\n    this._valuesToMeasure.push(value);\n  }\n};\n\nFormData.prototype._lengthRetriever = function(value, callback) {\n\n  if (value.hasOwnProperty('fd')) {\n\n    // take read range into a account\n    // `end` = Infinity –> read file till the end\n    //\n    // TODO: Looks like there is bug in Node fs.createReadStream\n    // it doesn't respect `end` options without `start` options\n    // Fix it when node fixes it.\n    // https://github.com/joyent/node/issues/7819\n    if (value.end != undefined && value.end != Infinity && value.start != undefined) {\n\n      // when end specified\n      // no need to calculate range\n      // inclusive, starts with 0\n      callback(null, value.end + 1 - (value.start ? value.start : 0));\n\n    // not that fast snoopy\n    } else {\n      // still need to fetch file size from fs\n      fs.stat(value.path, function(err, stat) {\n\n        var fileSize;\n\n        if (err) {\n          callback(err);\n          return;\n        }\n\n        // update final size based on the range options\n        fileSize = stat.size - (value.start ? value.start : 0);\n        callback(null, fileSize);\n      });\n    }\n\n  // or http response\n  } else if (value.hasOwnProperty('httpVersion')) {\n    callback(null, +value.headers['content-length']);\n\n  // or request stream http://github.com/mikeal/request\n  } else if (value.hasOwnProperty('httpModule')) {\n    // wait till response come back\n    value.on('response', function(response) {\n      value.pause();\n      callback(null, +response.headers['content-length']);\n    });\n    value.resume();\n\n  // something else\n  } else {\n    callback('Unknown stream');\n  }\n};\n\nFormData.prototype._multiPartHeader = function(field, value, options) {\n  // custom header specified (as string)?\n  // it becomes responsible for boundary\n  // (e.g. to handle extra CRLFs on .NET servers)\n  if (typeof options.header == 'string') {\n    return options.header;\n  }\n\n  var contentDisposition = this._getContentDisposition(value, options);\n  var contentType = this._getContentType(value, options);\n\n  var contents = '';\n  var headers  = {\n    // add custom disposition as third element or keep it two elements if not\n    'Content-Disposition': ['form-data', 'name=\"' + field + '\"'].concat(contentDisposition || []),\n    // if no content type. allow it to be empty array\n    'Content-Type': [].concat(contentType || [])\n  };\n\n  // allow custom headers.\n  if (typeof options.header == 'object') {\n    populate(headers, options.header);\n  }\n\n  var header;\n  for (var prop in headers) {\n    if (!headers.hasOwnProperty(prop)) continue;\n    header = headers[prop];\n\n    // skip nullish headers.\n    if (header == null) {\n      continue;\n    }\n\n    // convert all headers to arrays.\n    if (!Array.isArray(header)) {\n      header = [header];\n    }\n\n    // add non-empty headers.\n    if (header.length) {\n      contents += prop + ': ' + header.join('; ') + FormData.LINE_BREAK;\n    }\n  }\n\n  return '--' + this.getBoundary() + FormData.LINE_BREAK + contents + FormData.LINE_BREAK;\n};\n\nFormData.prototype._getContentDisposition = function(value, options) {\n\n  var filename\n    , contentDisposition\n    ;\n\n  if (typeof options.filepath === 'string') {\n    // custom filepath for relative paths\n    filename = path.normalize(options.filepath).replace(/\\\\/g, '/');\n  } else if (options.filename || value.name || value.path) {\n    // custom filename take precedence\n    // formidable and the browser add a name property\n    // fs- and request- streams have path property\n    filename = path.basename(options.filename || value.name || value.path);\n  } else if (value.readable && value.hasOwnProperty('httpVersion')) {\n    // or try http response\n    filename = path.basename(value.client._httpMessage.path || '');\n  }\n\n  if (filename) {\n    contentDisposition = 'filename=\"' + filename + '\"';\n  }\n\n  return contentDisposition;\n};\n\nFormData.prototype._getContentType = function(value, options) {\n\n  // use custom content-type above all\n  var contentType = options.contentType;\n\n  // or try `name` from formidable, browser\n  if (!contentType && value.name) {\n    contentType = mime.lookup(value.name);\n  }\n\n  // or try `path` from fs-, request- streams\n  if (!contentType && value.path) {\n    contentType = mime.lookup(value.path);\n  }\n\n  // or if it's http-reponse\n  if (!contentType && value.readable && value.hasOwnProperty('httpVersion')) {\n    contentType = value.headers['content-type'];\n  }\n\n  // or guess it from the filepath or filename\n  if (!contentType && (options.filepath || options.filename)) {\n    contentType = mime.lookup(options.filepath || options.filename);\n  }\n\n  // fallback to the default content type if `value` is not simple value\n  if (!contentType && typeof value == 'object') {\n    contentType = FormData.DEFAULT_CONTENT_TYPE;\n  }\n\n  return contentType;\n};\n\nFormData.prototype._multiPartFooter = function() {\n  return function(next) {\n    var footer = FormData.LINE_BREAK;\n\n    var lastPart = (this._streams.length === 0);\n    if (lastPart) {\n      footer += this._lastBoundary();\n    }\n\n    next(footer);\n  }.bind(this);\n};\n\nFormData.prototype._lastBoundary = function() {\n  return '--' + this.getBoundary() + '--' + FormData.LINE_BREAK;\n};\n\nFormData.prototype.getHeaders = function(userHeaders) {\n  var header;\n  var formHeaders = {\n    'content-type': 'multipart/form-data; boundary=' + this.getBoundary()\n  };\n\n  for (header in userHeaders) {\n    if (userHeaders.hasOwnProperty(header)) {\n      formHeaders[header.toLowerCase()] = userHeaders[header];\n    }\n  }\n\n  return formHeaders;\n};\n\nFormData.prototype.setBoundary = function(boundary) {\n  this._boundary = boundary;\n};\n\nFormData.prototype.getBoundary = function() {\n  if (!this._boundary) {\n    this._generateBoundary();\n  }\n\n  return this._boundary;\n};\n\nFormData.prototype.getBuffer = function() {\n  var dataBuffer = new Buffer.alloc( 0 );\n  var boundary = this.getBoundary();\n\n  // Create the form content. Add Line breaks to the end of data.\n  for (var i = 0, len = this._streams.length; i < len; i++) {\n    if (typeof this._streams[i] !== 'function') {\n\n      // Add content to the buffer.\n      if(Buffer.isBuffer(this._streams[i])) {\n        dataBuffer = Buffer.concat( [dataBuffer, this._streams[i]]);\n      }else {\n        dataBuffer = Buffer.concat( [dataBuffer, Buffer.from(this._streams[i])]);\n      }\n\n      // Add break after content.\n      if (typeof this._streams[i] !== 'string' || this._streams[i].substring( 2, boundary.length + 2 ) !== boundary) {\n        dataBuffer = Buffer.concat( [dataBuffer, Buffer.from(FormData.LINE_BREAK)] );\n      }\n    }\n  }\n\n  // Add the footer and return the Buffer object.\n  return Buffer.concat( [dataBuffer, Buffer.from(this._lastBoundary())] );\n};\n\nFormData.prototype._generateBoundary = function() {\n  // This generates a 50 character boundary similar to those used by Firefox.\n  // They are optimized for boyer-moore parsing.\n  var boundary = '--------------------------';\n  for (var i = 0; i < 24; i++) {\n    boundary += Math.floor(Math.random() * 10).toString(16);\n  }\n\n  this._boundary = boundary;\n};\n\n// Note: getLengthSync DOESN'T calculate streams length\n// As workaround one can calculate file size manually\n// and add it as knownLength option\nFormData.prototype.getLengthSync = function() {\n  var knownLength = this._overheadLength + this._valueLength;\n\n  // Don't get confused, there are 3 \"internal\" streams for each keyval pair\n  // so it basically checks if there is any value added to the form\n  if (this._streams.length) {\n    knownLength += this._lastBoundary().length;\n  }\n\n  // https://github.com/form-data/form-data/issues/40\n  if (!this.hasKnownLength()) {\n    // Some async length retrievers are present\n    // therefore synchronous length calculation is false.\n    // Please use getLength(callback) to get proper length\n    this._error(new Error('Cannot calculate proper length in synchronous way.'));\n  }\n\n  return knownLength;\n};\n\n// Public API to check if length of added values is known\n// https://github.com/form-data/form-data/issues/196\n// https://github.com/form-data/form-data/issues/262\nFormData.prototype.hasKnownLength = function() {\n  var hasKnownLength = true;\n\n  if (this._valuesToMeasure.length) {\n    hasKnownLength = false;\n  }\n\n  return hasKnownLength;\n};\n\nFormData.prototype.getLength = function(cb) {\n  var knownLength = this._overheadLength + this._valueLength;\n\n  if (this._streams.length) {\n    knownLength += this._lastBoundary().length;\n  }\n\n  if (!this._valuesToMeasure.length) {\n    process.nextTick(cb.bind(this, null, knownLength));\n    return;\n  }\n\n  asynckit.parallel(this._valuesToMeasure, this._lengthRetriever, function(err, values) {\n    if (err) {\n      cb(err);\n      return;\n    }\n\n    values.forEach(function(length) {\n      knownLength += length;\n    });\n\n    cb(null, knownLength);\n  });\n};\n\nFormData.prototype.submit = function(params, cb) {\n  var request\n    , options\n    , defaults = {method: 'post'}\n    ;\n\n  // parse provided url if it's string\n  // or treat it as options object\n  if (typeof params == 'string') {\n\n    params = parseUrl(params);\n    options = populate({\n      port: params.port,\n      path: params.pathname,\n      host: params.hostname,\n      protocol: params.protocol\n    }, defaults);\n\n  // use custom params\n  } else {\n\n    options = populate(params, defaults);\n    // if no port provided use default one\n    if (!options.port) {\n      options.port = options.protocol == 'https:' ? 443 : 80;\n    }\n  }\n\n  // put that good code in getHeaders to some use\n  options.headers = this.getHeaders(params.headers);\n\n  // https if specified, fallback to http in any other case\n  if (options.protocol == 'https:') {\n    request = https.request(options);\n  } else {\n    request = http.request(options);\n  }\n\n  // get content length and fire away\n  this.getLength(function(err, length) {\n    if (err && err !== 'Unknown stream') {\n      this._error(err);\n      return;\n    }\n\n    // add content length\n    if (length) {\n      request.setHeader('Content-Length', length);\n    }\n\n    this.pipe(request);\n    if (cb) {\n      var onResponse;\n\n      var callback = function (error, responce) {\n        request.removeListener('error', callback);\n        request.removeListener('response', onResponse);\n\n        return cb.call(this, error, responce);\n      };\n\n      onResponse = callback.bind(this, null);\n\n      request.on('error', callback);\n      request.on('response', onResponse);\n    }\n  }.bind(this));\n\n  return request;\n};\n\nFormData.prototype._error = function(err) {\n  if (!this.error) {\n    this.error = err;\n    this.pause();\n    this.emit('error', err);\n  }\n};\n\nFormData.prototype.toString = function () {\n  return '[object FormData]';\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZm9ybS1kYXRhL2xpYi9mb3JtX2RhdGEuanMiLCJtYXBwaW5ncyI6IkFBQUEscUJBQXFCLG1CQUFPLENBQUMsb0ZBQWlCO0FBQzlDLFdBQVcsbUJBQU8sQ0FBQyxrQkFBTTtBQUN6QixXQUFXLG1CQUFPLENBQUMsa0JBQU07QUFDekIsV0FBVyxtQkFBTyxDQUFDLGtCQUFNO0FBQ3pCLFlBQVksbUJBQU8sQ0FBQyxvQkFBTztBQUMzQixlQUFlLDZDQUFvQjtBQUNuQyxTQUFTLG1CQUFPLENBQUMsY0FBSTtBQUNyQixhQUFhLG9EQUF3QjtBQUNyQyxXQUFXLG1CQUFPLENBQUMsNERBQVk7QUFDL0IsZUFBZSxtQkFBTyxDQUFDLHdEQUFVO0FBQ2pDLGVBQWUsbUJBQU8sQ0FBQyxxRUFBZTs7QUFFdEM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGVBQWU7QUFDZjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNO0FBQ047QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLCtDQUErQztBQUMvQztBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMENBQTBDO0FBQzFDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4Q0FBOEMsU0FBUztBQUN2RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFFBQVE7QUFDMUI7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3BsYXktbmV4dGpzLy4vbm9kZV9tb2R1bGVzL2Zvcm0tZGF0YS9saWIvZm9ybV9kYXRhLmpzPzY0OTMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIENvbWJpbmVkU3RyZWFtID0gcmVxdWlyZSgnY29tYmluZWQtc3RyZWFtJyk7XG52YXIgdXRpbCA9IHJlcXVpcmUoJ3V0aWwnKTtcbnZhciBwYXRoID0gcmVxdWlyZSgncGF0aCcpO1xudmFyIGh0dHAgPSByZXF1aXJlKCdodHRwJyk7XG52YXIgaHR0cHMgPSByZXF1aXJlKCdodHRwcycpO1xudmFyIHBhcnNlVXJsID0gcmVxdWlyZSgndXJsJykucGFyc2U7XG52YXIgZnMgPSByZXF1aXJlKCdmcycpO1xudmFyIFN0cmVhbSA9IHJlcXVpcmUoJ3N0cmVhbScpLlN0cmVhbTtcbnZhciBtaW1lID0gcmVxdWlyZSgnbWltZS10eXBlcycpO1xudmFyIGFzeW5ja2l0ID0gcmVxdWlyZSgnYXN5bmNraXQnKTtcbnZhciBwb3B1bGF0ZSA9IHJlcXVpcmUoJy4vcG9wdWxhdGUuanMnKTtcblxuLy8gUHVibGljIEFQSVxubW9kdWxlLmV4cG9ydHMgPSBGb3JtRGF0YTtcblxuLy8gbWFrZSBpdCBhIFN0cmVhbVxudXRpbC5pbmhlcml0cyhGb3JtRGF0YSwgQ29tYmluZWRTdHJlYW0pO1xuXG4vKipcbiAqIENyZWF0ZSByZWFkYWJsZSBcIm11bHRpcGFydC9mb3JtLWRhdGFcIiBzdHJlYW1zLlxuICogQ2FuIGJlIHVzZWQgdG8gc3VibWl0IGZvcm1zXG4gKiBhbmQgZmlsZSB1cGxvYWRzIHRvIG90aGVyIHdlYiBhcHBsaWNhdGlvbnMuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFByb3BlcnRpZXMgdG8gYmUgYWRkZWQvb3ZlcnJpZGVuIGZvciBGb3JtRGF0YSBhbmQgQ29tYmluZWRTdHJlYW1cbiAqL1xuZnVuY3Rpb24gRm9ybURhdGEob3B0aW9ucykge1xuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRm9ybURhdGEpKSB7XG4gICAgcmV0dXJuIG5ldyBGb3JtRGF0YShvcHRpb25zKTtcbiAgfVxuXG4gIHRoaXMuX292ZXJoZWFkTGVuZ3RoID0gMDtcbiAgdGhpcy5fdmFsdWVMZW5ndGggPSAwO1xuICB0aGlzLl92YWx1ZXNUb01lYXN1cmUgPSBbXTtcblxuICBDb21iaW5lZFN0cmVhbS5jYWxsKHRoaXMpO1xuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBmb3IgKHZhciBvcHRpb24gaW4gb3B0aW9ucykge1xuICAgIHRoaXNbb3B0aW9uXSA9IG9wdGlvbnNbb3B0aW9uXTtcbiAgfVxufVxuXG5Gb3JtRGF0YS5MSU5FX0JSRUFLID0gJ1xcclxcbic7XG5Gb3JtRGF0YS5ERUZBVUxUX0NPTlRFTlRfVFlQRSA9ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nO1xuXG5Gb3JtRGF0YS5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24oZmllbGQsIHZhbHVlLCBvcHRpb25zKSB7XG5cbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cbiAgLy8gYWxsb3cgZmlsZW5hbWUgYXMgc2luZ2xlIG9wdGlvblxuICBpZiAodHlwZW9mIG9wdGlvbnMgPT0gJ3N0cmluZycpIHtcbiAgICBvcHRpb25zID0ge2ZpbGVuYW1lOiBvcHRpb25zfTtcbiAgfVxuXG4gIHZhciBhcHBlbmQgPSBDb21iaW5lZFN0cmVhbS5wcm90b3R5cGUuYXBwZW5kLmJpbmQodGhpcyk7XG5cbiAgLy8gYWxsIHRoYXQgc3RyZWFteSBidXNpbmVzcyBjYW4ndCBoYW5kbGUgbnVtYmVyc1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdudW1iZXInKSB7XG4gICAgdmFsdWUgPSAnJyArIHZhbHVlO1xuICB9XG5cbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZlbGl4Z2Uvbm9kZS1mb3JtLWRhdGEvaXNzdWVzLzM4XG4gIGlmICh1dGlsLmlzQXJyYXkodmFsdWUpKSB7XG4gICAgLy8gUGxlYXNlIGNvbnZlcnQgeW91ciBhcnJheSBpbnRvIHN0cmluZ1xuICAgIC8vIHRoZSB3YXkgd2ViIHNlcnZlciBleHBlY3RzIGl0XG4gICAgdGhpcy5fZXJyb3IobmV3IEVycm9yKCdBcnJheXMgYXJlIG5vdCBzdXBwb3J0ZWQuJykpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHZhciBoZWFkZXIgPSB0aGlzLl9tdWx0aVBhcnRIZWFkZXIoZmllbGQsIHZhbHVlLCBvcHRpb25zKTtcbiAgdmFyIGZvb3RlciA9IHRoaXMuX211bHRpUGFydEZvb3RlcigpO1xuXG4gIGFwcGVuZChoZWFkZXIpO1xuICBhcHBlbmQodmFsdWUpO1xuICBhcHBlbmQoZm9vdGVyKTtcblxuICAvLyBwYXNzIGFsb25nIG9wdGlvbnMua25vd25MZW5ndGhcbiAgdGhpcy5fdHJhY2tMZW5ndGgoaGVhZGVyLCB2YWx1ZSwgb3B0aW9ucyk7XG59O1xuXG5Gb3JtRGF0YS5wcm90b3R5cGUuX3RyYWNrTGVuZ3RoID0gZnVuY3Rpb24oaGVhZGVyLCB2YWx1ZSwgb3B0aW9ucykge1xuICB2YXIgdmFsdWVMZW5ndGggPSAwO1xuXG4gIC8vIHVzZWQgdy8gZ2V0TGVuZ3RoU3luYygpLCB3aGVuIGxlbmd0aCBpcyBrbm93bi5cbiAgLy8gZS5nLiBmb3Igc3RyZWFtaW5nIGRpcmVjdGx5IGZyb20gYSByZW1vdGUgc2VydmVyLFxuICAvLyB3LyBhIGtub3duIGZpbGUgYSBzaXplLCBhbmQgbm90IHdhbnRpbmcgdG8gd2FpdCBmb3JcbiAgLy8gaW5jb21pbmcgZmlsZSB0byBmaW5pc2ggdG8gZ2V0IGl0cyBzaXplLlxuICBpZiAob3B0aW9ucy5rbm93bkxlbmd0aCAhPSBudWxsKSB7XG4gICAgdmFsdWVMZW5ndGggKz0gK29wdGlvbnMua25vd25MZW5ndGg7XG4gIH0gZWxzZSBpZiAoQnVmZmVyLmlzQnVmZmVyKHZhbHVlKSkge1xuICAgIHZhbHVlTGVuZ3RoID0gdmFsdWUubGVuZ3RoO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICB2YWx1ZUxlbmd0aCA9IEJ1ZmZlci5ieXRlTGVuZ3RoKHZhbHVlKTtcbiAgfVxuXG4gIHRoaXMuX3ZhbHVlTGVuZ3RoICs9IHZhbHVlTGVuZ3RoO1xuXG4gIC8vIEBjaGVjayB3aHkgYWRkIENSTEY/IGRvZXMgdGhpcyBhY2NvdW50IGZvciBjdXN0b20vbXVsdGlwbGUgQ1JMRnM/XG4gIHRoaXMuX292ZXJoZWFkTGVuZ3RoICs9XG4gICAgQnVmZmVyLmJ5dGVMZW5ndGgoaGVhZGVyKSArXG4gICAgRm9ybURhdGEuTElORV9CUkVBSy5sZW5ndGg7XG5cbiAgLy8gZW1wdHkgb3IgZWl0aGVyIGRvZXNuJ3QgaGF2ZSBwYXRoIG9yIG5vdCBhbiBodHRwIHJlc3BvbnNlIG9yIG5vdCBhIHN0cmVhbVxuICBpZiAoIXZhbHVlIHx8ICggIXZhbHVlLnBhdGggJiYgISh2YWx1ZS5yZWFkYWJsZSAmJiB2YWx1ZS5oYXNPd25Qcm9wZXJ0eSgnaHR0cFZlcnNpb24nKSkgJiYgISh2YWx1ZSBpbnN0YW5jZW9mIFN0cmVhbSkpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gbm8gbmVlZCB0byBib3RoZXIgd2l0aCB0aGUgbGVuZ3RoXG4gIGlmICghb3B0aW9ucy5rbm93bkxlbmd0aCkge1xuICAgIHRoaXMuX3ZhbHVlc1RvTWVhc3VyZS5wdXNoKHZhbHVlKTtcbiAgfVxufTtcblxuRm9ybURhdGEucHJvdG90eXBlLl9sZW5ndGhSZXRyaWV2ZXIgPSBmdW5jdGlvbih2YWx1ZSwgY2FsbGJhY2spIHtcblxuICBpZiAodmFsdWUuaGFzT3duUHJvcGVydHkoJ2ZkJykpIHtcblxuICAgIC8vIHRha2UgcmVhZCByYW5nZSBpbnRvIGEgYWNjb3VudFxuICAgIC8vIGBlbmRgID0gSW5maW5pdHkg4oCTPiByZWFkIGZpbGUgdGlsbCB0aGUgZW5kXG4gICAgLy9cbiAgICAvLyBUT0RPOiBMb29rcyBsaWtlIHRoZXJlIGlzIGJ1ZyBpbiBOb2RlIGZzLmNyZWF0ZVJlYWRTdHJlYW1cbiAgICAvLyBpdCBkb2Vzbid0IHJlc3BlY3QgYGVuZGAgb3B0aW9ucyB3aXRob3V0IGBzdGFydGAgb3B0aW9uc1xuICAgIC8vIEZpeCBpdCB3aGVuIG5vZGUgZml4ZXMgaXQuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2pveWVudC9ub2RlL2lzc3Vlcy83ODE5XG4gICAgaWYgKHZhbHVlLmVuZCAhPSB1bmRlZmluZWQgJiYgdmFsdWUuZW5kICE9IEluZmluaXR5ICYmIHZhbHVlLnN0YXJ0ICE9IHVuZGVmaW5lZCkge1xuXG4gICAgICAvLyB3aGVuIGVuZCBzcGVjaWZpZWRcbiAgICAgIC8vIG5vIG5lZWQgdG8gY2FsY3VsYXRlIHJhbmdlXG4gICAgICAvLyBpbmNsdXNpdmUsIHN0YXJ0cyB3aXRoIDBcbiAgICAgIGNhbGxiYWNrKG51bGwsIHZhbHVlLmVuZCArIDEgLSAodmFsdWUuc3RhcnQgPyB2YWx1ZS5zdGFydCA6IDApKTtcblxuICAgIC8vIG5vdCB0aGF0IGZhc3Qgc25vb3B5XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHN0aWxsIG5lZWQgdG8gZmV0Y2ggZmlsZSBzaXplIGZyb20gZnNcbiAgICAgIGZzLnN0YXQodmFsdWUucGF0aCwgZnVuY3Rpb24oZXJyLCBzdGF0KSB7XG5cbiAgICAgICAgdmFyIGZpbGVTaXplO1xuXG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVwZGF0ZSBmaW5hbCBzaXplIGJhc2VkIG9uIHRoZSByYW5nZSBvcHRpb25zXG4gICAgICAgIGZpbGVTaXplID0gc3RhdC5zaXplIC0gKHZhbHVlLnN0YXJ0ID8gdmFsdWUuc3RhcnQgOiAwKTtcbiAgICAgICAgY2FsbGJhY2sobnVsbCwgZmlsZVNpemUpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gIC8vIG9yIGh0dHAgcmVzcG9uc2VcbiAgfSBlbHNlIGlmICh2YWx1ZS5oYXNPd25Qcm9wZXJ0eSgnaHR0cFZlcnNpb24nKSkge1xuICAgIGNhbGxiYWNrKG51bGwsICt2YWx1ZS5oZWFkZXJzWydjb250ZW50LWxlbmd0aCddKTtcblxuICAvLyBvciByZXF1ZXN0IHN0cmVhbSBodHRwOi8vZ2l0aHViLmNvbS9taWtlYWwvcmVxdWVzdFxuICB9IGVsc2UgaWYgKHZhbHVlLmhhc093blByb3BlcnR5KCdodHRwTW9kdWxlJykpIHtcbiAgICAvLyB3YWl0IHRpbGwgcmVzcG9uc2UgY29tZSBiYWNrXG4gICAgdmFsdWUub24oJ3Jlc3BvbnNlJywgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIHZhbHVlLnBhdXNlKCk7XG4gICAgICBjYWxsYmFjayhudWxsLCArcmVzcG9uc2UuaGVhZGVyc1snY29udGVudC1sZW5ndGgnXSk7XG4gICAgfSk7XG4gICAgdmFsdWUucmVzdW1lKCk7XG5cbiAgLy8gc29tZXRoaW5nIGVsc2VcbiAgfSBlbHNlIHtcbiAgICBjYWxsYmFjaygnVW5rbm93biBzdHJlYW0nKTtcbiAgfVxufTtcblxuRm9ybURhdGEucHJvdG90eXBlLl9tdWx0aVBhcnRIZWFkZXIgPSBmdW5jdGlvbihmaWVsZCwgdmFsdWUsIG9wdGlvbnMpIHtcbiAgLy8gY3VzdG9tIGhlYWRlciBzcGVjaWZpZWQgKGFzIHN0cmluZyk/XG4gIC8vIGl0IGJlY29tZXMgcmVzcG9uc2libGUgZm9yIGJvdW5kYXJ5XG4gIC8vIChlLmcuIHRvIGhhbmRsZSBleHRyYSBDUkxGcyBvbiAuTkVUIHNlcnZlcnMpXG4gIGlmICh0eXBlb2Ygb3B0aW9ucy5oZWFkZXIgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5oZWFkZXI7XG4gIH1cblxuICB2YXIgY29udGVudERpc3Bvc2l0aW9uID0gdGhpcy5fZ2V0Q29udGVudERpc3Bvc2l0aW9uKHZhbHVlLCBvcHRpb25zKTtcbiAgdmFyIGNvbnRlbnRUeXBlID0gdGhpcy5fZ2V0Q29udGVudFR5cGUodmFsdWUsIG9wdGlvbnMpO1xuXG4gIHZhciBjb250ZW50cyA9ICcnO1xuICB2YXIgaGVhZGVycyAgPSB7XG4gICAgLy8gYWRkIGN1c3RvbSBkaXNwb3NpdGlvbiBhcyB0aGlyZCBlbGVtZW50IG9yIGtlZXAgaXQgdHdvIGVsZW1lbnRzIGlmIG5vdFxuICAgICdDb250ZW50LURpc3Bvc2l0aW9uJzogWydmb3JtLWRhdGEnLCAnbmFtZT1cIicgKyBmaWVsZCArICdcIiddLmNvbmNhdChjb250ZW50RGlzcG9zaXRpb24gfHwgW10pLFxuICAgIC8vIGlmIG5vIGNvbnRlbnQgdHlwZS4gYWxsb3cgaXQgdG8gYmUgZW1wdHkgYXJyYXlcbiAgICAnQ29udGVudC1UeXBlJzogW10uY29uY2F0KGNvbnRlbnRUeXBlIHx8IFtdKVxuICB9O1xuXG4gIC8vIGFsbG93IGN1c3RvbSBoZWFkZXJzLlxuICBpZiAodHlwZW9mIG9wdGlvbnMuaGVhZGVyID09ICdvYmplY3QnKSB7XG4gICAgcG9wdWxhdGUoaGVhZGVycywgb3B0aW9ucy5oZWFkZXIpO1xuICB9XG5cbiAgdmFyIGhlYWRlcjtcbiAgZm9yICh2YXIgcHJvcCBpbiBoZWFkZXJzKSB7XG4gICAgaWYgKCFoZWFkZXJzLmhhc093blByb3BlcnR5KHByb3ApKSBjb250aW51ZTtcbiAgICBoZWFkZXIgPSBoZWFkZXJzW3Byb3BdO1xuXG4gICAgLy8gc2tpcCBudWxsaXNoIGhlYWRlcnMuXG4gICAgaWYgKGhlYWRlciA9PSBudWxsKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBjb252ZXJ0IGFsbCBoZWFkZXJzIHRvIGFycmF5cy5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkoaGVhZGVyKSkge1xuICAgICAgaGVhZGVyID0gW2hlYWRlcl07XG4gICAgfVxuXG4gICAgLy8gYWRkIG5vbi1lbXB0eSBoZWFkZXJzLlxuICAgIGlmIChoZWFkZXIubGVuZ3RoKSB7XG4gICAgICBjb250ZW50cyArPSBwcm9wICsgJzogJyArIGhlYWRlci5qb2luKCc7ICcpICsgRm9ybURhdGEuTElORV9CUkVBSztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gJy0tJyArIHRoaXMuZ2V0Qm91bmRhcnkoKSArIEZvcm1EYXRhLkxJTkVfQlJFQUsgKyBjb250ZW50cyArIEZvcm1EYXRhLkxJTkVfQlJFQUs7XG59O1xuXG5Gb3JtRGF0YS5wcm90b3R5cGUuX2dldENvbnRlbnREaXNwb3NpdGlvbiA9IGZ1bmN0aW9uKHZhbHVlLCBvcHRpb25zKSB7XG5cbiAgdmFyIGZpbGVuYW1lXG4gICAgLCBjb250ZW50RGlzcG9zaXRpb25cbiAgICA7XG5cbiAgaWYgKHR5cGVvZiBvcHRpb25zLmZpbGVwYXRoID09PSAnc3RyaW5nJykge1xuICAgIC8vIGN1c3RvbSBmaWxlcGF0aCBmb3IgcmVsYXRpdmUgcGF0aHNcbiAgICBmaWxlbmFtZSA9IHBhdGgubm9ybWFsaXplKG9wdGlvbnMuZmlsZXBhdGgpLnJlcGxhY2UoL1xcXFwvZywgJy8nKTtcbiAgfSBlbHNlIGlmIChvcHRpb25zLmZpbGVuYW1lIHx8IHZhbHVlLm5hbWUgfHwgdmFsdWUucGF0aCkge1xuICAgIC8vIGN1c3RvbSBmaWxlbmFtZSB0YWtlIHByZWNlZGVuY2VcbiAgICAvLyBmb3JtaWRhYmxlIGFuZCB0aGUgYnJvd3NlciBhZGQgYSBuYW1lIHByb3BlcnR5XG4gICAgLy8gZnMtIGFuZCByZXF1ZXN0LSBzdHJlYW1zIGhhdmUgcGF0aCBwcm9wZXJ0eVxuICAgIGZpbGVuYW1lID0gcGF0aC5iYXNlbmFtZShvcHRpb25zLmZpbGVuYW1lIHx8IHZhbHVlLm5hbWUgfHwgdmFsdWUucGF0aCk7XG4gIH0gZWxzZSBpZiAodmFsdWUucmVhZGFibGUgJiYgdmFsdWUuaGFzT3duUHJvcGVydHkoJ2h0dHBWZXJzaW9uJykpIHtcbiAgICAvLyBvciB0cnkgaHR0cCByZXNwb25zZVxuICAgIGZpbGVuYW1lID0gcGF0aC5iYXNlbmFtZSh2YWx1ZS5jbGllbnQuX2h0dHBNZXNzYWdlLnBhdGggfHwgJycpO1xuICB9XG5cbiAgaWYgKGZpbGVuYW1lKSB7XG4gICAgY29udGVudERpc3Bvc2l0aW9uID0gJ2ZpbGVuYW1lPVwiJyArIGZpbGVuYW1lICsgJ1wiJztcbiAgfVxuXG4gIHJldHVybiBjb250ZW50RGlzcG9zaXRpb247XG59O1xuXG5Gb3JtRGF0YS5wcm90b3R5cGUuX2dldENvbnRlbnRUeXBlID0gZnVuY3Rpb24odmFsdWUsIG9wdGlvbnMpIHtcblxuICAvLyB1c2UgY3VzdG9tIGNvbnRlbnQtdHlwZSBhYm92ZSBhbGxcbiAgdmFyIGNvbnRlbnRUeXBlID0gb3B0aW9ucy5jb250ZW50VHlwZTtcblxuICAvLyBvciB0cnkgYG5hbWVgIGZyb20gZm9ybWlkYWJsZSwgYnJvd3NlclxuICBpZiAoIWNvbnRlbnRUeXBlICYmIHZhbHVlLm5hbWUpIHtcbiAgICBjb250ZW50VHlwZSA9IG1pbWUubG9va3VwKHZhbHVlLm5hbWUpO1xuICB9XG5cbiAgLy8gb3IgdHJ5IGBwYXRoYCBmcm9tIGZzLSwgcmVxdWVzdC0gc3RyZWFtc1xuICBpZiAoIWNvbnRlbnRUeXBlICYmIHZhbHVlLnBhdGgpIHtcbiAgICBjb250ZW50VHlwZSA9IG1pbWUubG9va3VwKHZhbHVlLnBhdGgpO1xuICB9XG5cbiAgLy8gb3IgaWYgaXQncyBodHRwLXJlcG9uc2VcbiAgaWYgKCFjb250ZW50VHlwZSAmJiB2YWx1ZS5yZWFkYWJsZSAmJiB2YWx1ZS5oYXNPd25Qcm9wZXJ0eSgnaHR0cFZlcnNpb24nKSkge1xuICAgIGNvbnRlbnRUeXBlID0gdmFsdWUuaGVhZGVyc1snY29udGVudC10eXBlJ107XG4gIH1cblxuICAvLyBvciBndWVzcyBpdCBmcm9tIHRoZSBmaWxlcGF0aCBvciBmaWxlbmFtZVxuICBpZiAoIWNvbnRlbnRUeXBlICYmIChvcHRpb25zLmZpbGVwYXRoIHx8IG9wdGlvbnMuZmlsZW5hbWUpKSB7XG4gICAgY29udGVudFR5cGUgPSBtaW1lLmxvb2t1cChvcHRpb25zLmZpbGVwYXRoIHx8IG9wdGlvbnMuZmlsZW5hbWUpO1xuICB9XG5cbiAgLy8gZmFsbGJhY2sgdG8gdGhlIGRlZmF1bHQgY29udGVudCB0eXBlIGlmIGB2YWx1ZWAgaXMgbm90IHNpbXBsZSB2YWx1ZVxuICBpZiAoIWNvbnRlbnRUeXBlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jykge1xuICAgIGNvbnRlbnRUeXBlID0gRm9ybURhdGEuREVGQVVMVF9DT05URU5UX1RZUEU7XG4gIH1cblxuICByZXR1cm4gY29udGVudFR5cGU7XG59O1xuXG5Gb3JtRGF0YS5wcm90b3R5cGUuX211bHRpUGFydEZvb3RlciA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gZnVuY3Rpb24obmV4dCkge1xuICAgIHZhciBmb290ZXIgPSBGb3JtRGF0YS5MSU5FX0JSRUFLO1xuXG4gICAgdmFyIGxhc3RQYXJ0ID0gKHRoaXMuX3N0cmVhbXMubGVuZ3RoID09PSAwKTtcbiAgICBpZiAobGFzdFBhcnQpIHtcbiAgICAgIGZvb3RlciArPSB0aGlzLl9sYXN0Qm91bmRhcnkoKTtcbiAgICB9XG5cbiAgICBuZXh0KGZvb3Rlcik7XG4gIH0uYmluZCh0aGlzKTtcbn07XG5cbkZvcm1EYXRhLnByb3RvdHlwZS5fbGFzdEJvdW5kYXJ5ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAnLS0nICsgdGhpcy5nZXRCb3VuZGFyeSgpICsgJy0tJyArIEZvcm1EYXRhLkxJTkVfQlJFQUs7XG59O1xuXG5Gb3JtRGF0YS5wcm90b3R5cGUuZ2V0SGVhZGVycyA9IGZ1bmN0aW9uKHVzZXJIZWFkZXJzKSB7XG4gIHZhciBoZWFkZXI7XG4gIHZhciBmb3JtSGVhZGVycyA9IHtcbiAgICAnY29udGVudC10eXBlJzogJ211bHRpcGFydC9mb3JtLWRhdGE7IGJvdW5kYXJ5PScgKyB0aGlzLmdldEJvdW5kYXJ5KClcbiAgfTtcblxuICBmb3IgKGhlYWRlciBpbiB1c2VySGVhZGVycykge1xuICAgIGlmICh1c2VySGVhZGVycy5oYXNPd25Qcm9wZXJ0eShoZWFkZXIpKSB7XG4gICAgICBmb3JtSGVhZGVyc1toZWFkZXIudG9Mb3dlckNhc2UoKV0gPSB1c2VySGVhZGVyc1toZWFkZXJdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmb3JtSGVhZGVycztcbn07XG5cbkZvcm1EYXRhLnByb3RvdHlwZS5zZXRCb3VuZGFyeSA9IGZ1bmN0aW9uKGJvdW5kYXJ5KSB7XG4gIHRoaXMuX2JvdW5kYXJ5ID0gYm91bmRhcnk7XG59O1xuXG5Gb3JtRGF0YS5wcm90b3R5cGUuZ2V0Qm91bmRhcnkgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCF0aGlzLl9ib3VuZGFyeSkge1xuICAgIHRoaXMuX2dlbmVyYXRlQm91bmRhcnkoKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzLl9ib3VuZGFyeTtcbn07XG5cbkZvcm1EYXRhLnByb3RvdHlwZS5nZXRCdWZmZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGRhdGFCdWZmZXIgPSBuZXcgQnVmZmVyLmFsbG9jKCAwICk7XG4gIHZhciBib3VuZGFyeSA9IHRoaXMuZ2V0Qm91bmRhcnkoKTtcblxuICAvLyBDcmVhdGUgdGhlIGZvcm0gY29udGVudC4gQWRkIExpbmUgYnJlYWtzIHRvIHRoZSBlbmQgb2YgZGF0YS5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRoaXMuX3N0cmVhbXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBpZiAodHlwZW9mIHRoaXMuX3N0cmVhbXNbaV0gIT09ICdmdW5jdGlvbicpIHtcblxuICAgICAgLy8gQWRkIGNvbnRlbnQgdG8gdGhlIGJ1ZmZlci5cbiAgICAgIGlmKEJ1ZmZlci5pc0J1ZmZlcih0aGlzLl9zdHJlYW1zW2ldKSkge1xuICAgICAgICBkYXRhQnVmZmVyID0gQnVmZmVyLmNvbmNhdCggW2RhdGFCdWZmZXIsIHRoaXMuX3N0cmVhbXNbaV1dKTtcbiAgICAgIH1lbHNlIHtcbiAgICAgICAgZGF0YUJ1ZmZlciA9IEJ1ZmZlci5jb25jYXQoIFtkYXRhQnVmZmVyLCBCdWZmZXIuZnJvbSh0aGlzLl9zdHJlYW1zW2ldKV0pO1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgYnJlYWsgYWZ0ZXIgY29udGVudC5cbiAgICAgIGlmICh0eXBlb2YgdGhpcy5fc3RyZWFtc1tpXSAhPT0gJ3N0cmluZycgfHwgdGhpcy5fc3RyZWFtc1tpXS5zdWJzdHJpbmcoIDIsIGJvdW5kYXJ5Lmxlbmd0aCArIDIgKSAhPT0gYm91bmRhcnkpIHtcbiAgICAgICAgZGF0YUJ1ZmZlciA9IEJ1ZmZlci5jb25jYXQoIFtkYXRhQnVmZmVyLCBCdWZmZXIuZnJvbShGb3JtRGF0YS5MSU5FX0JSRUFLKV0gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBBZGQgdGhlIGZvb3RlciBhbmQgcmV0dXJuIHRoZSBCdWZmZXIgb2JqZWN0LlxuICByZXR1cm4gQnVmZmVyLmNvbmNhdCggW2RhdGFCdWZmZXIsIEJ1ZmZlci5mcm9tKHRoaXMuX2xhc3RCb3VuZGFyeSgpKV0gKTtcbn07XG5cbkZvcm1EYXRhLnByb3RvdHlwZS5fZ2VuZXJhdGVCb3VuZGFyeSA9IGZ1bmN0aW9uKCkge1xuICAvLyBUaGlzIGdlbmVyYXRlcyBhIDUwIGNoYXJhY3RlciBib3VuZGFyeSBzaW1pbGFyIHRvIHRob3NlIHVzZWQgYnkgRmlyZWZveC5cbiAgLy8gVGhleSBhcmUgb3B0aW1pemVkIGZvciBib3llci1tb29yZSBwYXJzaW5nLlxuICB2YXIgYm91bmRhcnkgPSAnLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0nO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IDI0OyBpKyspIHtcbiAgICBib3VuZGFyeSArPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCkudG9TdHJpbmcoMTYpO1xuICB9XG5cbiAgdGhpcy5fYm91bmRhcnkgPSBib3VuZGFyeTtcbn07XG5cbi8vIE5vdGU6IGdldExlbmd0aFN5bmMgRE9FU04nVCBjYWxjdWxhdGUgc3RyZWFtcyBsZW5ndGhcbi8vIEFzIHdvcmthcm91bmQgb25lIGNhbiBjYWxjdWxhdGUgZmlsZSBzaXplIG1hbnVhbGx5XG4vLyBhbmQgYWRkIGl0IGFzIGtub3duTGVuZ3RoIG9wdGlvblxuRm9ybURhdGEucHJvdG90eXBlLmdldExlbmd0aFN5bmMgPSBmdW5jdGlvbigpIHtcbiAgdmFyIGtub3duTGVuZ3RoID0gdGhpcy5fb3ZlcmhlYWRMZW5ndGggKyB0aGlzLl92YWx1ZUxlbmd0aDtcblxuICAvLyBEb24ndCBnZXQgY29uZnVzZWQsIHRoZXJlIGFyZSAzIFwiaW50ZXJuYWxcIiBzdHJlYW1zIGZvciBlYWNoIGtleXZhbCBwYWlyXG4gIC8vIHNvIGl0IGJhc2ljYWxseSBjaGVja3MgaWYgdGhlcmUgaXMgYW55IHZhbHVlIGFkZGVkIHRvIHRoZSBmb3JtXG4gIGlmICh0aGlzLl9zdHJlYW1zLmxlbmd0aCkge1xuICAgIGtub3duTGVuZ3RoICs9IHRoaXMuX2xhc3RCb3VuZGFyeSgpLmxlbmd0aDtcbiAgfVxuXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mb3JtLWRhdGEvZm9ybS1kYXRhL2lzc3Vlcy80MFxuICBpZiAoIXRoaXMuaGFzS25vd25MZW5ndGgoKSkge1xuICAgIC8vIFNvbWUgYXN5bmMgbGVuZ3RoIHJldHJpZXZlcnMgYXJlIHByZXNlbnRcbiAgICAvLyB0aGVyZWZvcmUgc3luY2hyb25vdXMgbGVuZ3RoIGNhbGN1bGF0aW9uIGlzIGZhbHNlLlxuICAgIC8vIFBsZWFzZSB1c2UgZ2V0TGVuZ3RoKGNhbGxiYWNrKSB0byBnZXQgcHJvcGVyIGxlbmd0aFxuICAgIHRoaXMuX2Vycm9yKG5ldyBFcnJvcignQ2Fubm90IGNhbGN1bGF0ZSBwcm9wZXIgbGVuZ3RoIGluIHN5bmNocm9ub3VzIHdheS4nKSk7XG4gIH1cblxuICByZXR1cm4ga25vd25MZW5ndGg7XG59O1xuXG4vLyBQdWJsaWMgQVBJIHRvIGNoZWNrIGlmIGxlbmd0aCBvZiBhZGRlZCB2YWx1ZXMgaXMga25vd25cbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mb3JtLWRhdGEvZm9ybS1kYXRhL2lzc3Vlcy8xOTZcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mb3JtLWRhdGEvZm9ybS1kYXRhL2lzc3Vlcy8yNjJcbkZvcm1EYXRhLnByb3RvdHlwZS5oYXNLbm93bkxlbmd0aCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgaGFzS25vd25MZW5ndGggPSB0cnVlO1xuXG4gIGlmICh0aGlzLl92YWx1ZXNUb01lYXN1cmUubGVuZ3RoKSB7XG4gICAgaGFzS25vd25MZW5ndGggPSBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBoYXNLbm93bkxlbmd0aDtcbn07XG5cbkZvcm1EYXRhLnByb3RvdHlwZS5nZXRMZW5ndGggPSBmdW5jdGlvbihjYikge1xuICB2YXIga25vd25MZW5ndGggPSB0aGlzLl9vdmVyaGVhZExlbmd0aCArIHRoaXMuX3ZhbHVlTGVuZ3RoO1xuXG4gIGlmICh0aGlzLl9zdHJlYW1zLmxlbmd0aCkge1xuICAgIGtub3duTGVuZ3RoICs9IHRoaXMuX2xhc3RCb3VuZGFyeSgpLmxlbmd0aDtcbiAgfVxuXG4gIGlmICghdGhpcy5fdmFsdWVzVG9NZWFzdXJlLmxlbmd0aCkge1xuICAgIHByb2Nlc3MubmV4dFRpY2soY2IuYmluZCh0aGlzLCBudWxsLCBrbm93bkxlbmd0aCkpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGFzeW5ja2l0LnBhcmFsbGVsKHRoaXMuX3ZhbHVlc1RvTWVhc3VyZSwgdGhpcy5fbGVuZ3RoUmV0cmlldmVyLCBmdW5jdGlvbihlcnIsIHZhbHVlcykge1xuICAgIGlmIChlcnIpIHtcbiAgICAgIGNiKGVycik7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFsdWVzLmZvckVhY2goZnVuY3Rpb24obGVuZ3RoKSB7XG4gICAgICBrbm93bkxlbmd0aCArPSBsZW5ndGg7XG4gICAgfSk7XG5cbiAgICBjYihudWxsLCBrbm93bkxlbmd0aCk7XG4gIH0pO1xufTtcblxuRm9ybURhdGEucHJvdG90eXBlLnN1Ym1pdCA9IGZ1bmN0aW9uKHBhcmFtcywgY2IpIHtcbiAgdmFyIHJlcXVlc3RcbiAgICAsIG9wdGlvbnNcbiAgICAsIGRlZmF1bHRzID0ge21ldGhvZDogJ3Bvc3QnfVxuICAgIDtcblxuICAvLyBwYXJzZSBwcm92aWRlZCB1cmwgaWYgaXQncyBzdHJpbmdcbiAgLy8gb3IgdHJlYXQgaXQgYXMgb3B0aW9ucyBvYmplY3RcbiAgaWYgKHR5cGVvZiBwYXJhbXMgPT0gJ3N0cmluZycpIHtcblxuICAgIHBhcmFtcyA9IHBhcnNlVXJsKHBhcmFtcyk7XG4gICAgb3B0aW9ucyA9IHBvcHVsYXRlKHtcbiAgICAgIHBvcnQ6IHBhcmFtcy5wb3J0LFxuICAgICAgcGF0aDogcGFyYW1zLnBhdGhuYW1lLFxuICAgICAgaG9zdDogcGFyYW1zLmhvc3RuYW1lLFxuICAgICAgcHJvdG9jb2w6IHBhcmFtcy5wcm90b2NvbFxuICAgIH0sIGRlZmF1bHRzKTtcblxuICAvLyB1c2UgY3VzdG9tIHBhcmFtc1xuICB9IGVsc2Uge1xuXG4gICAgb3B0aW9ucyA9IHBvcHVsYXRlKHBhcmFtcywgZGVmYXVsdHMpO1xuICAgIC8vIGlmIG5vIHBvcnQgcHJvdmlkZWQgdXNlIGRlZmF1bHQgb25lXG4gICAgaWYgKCFvcHRpb25zLnBvcnQpIHtcbiAgICAgIG9wdGlvbnMucG9ydCA9IG9wdGlvbnMucHJvdG9jb2wgPT0gJ2h0dHBzOicgPyA0NDMgOiA4MDtcbiAgICB9XG4gIH1cblxuICAvLyBwdXQgdGhhdCBnb29kIGNvZGUgaW4gZ2V0SGVhZGVycyB0byBzb21lIHVzZVxuICBvcHRpb25zLmhlYWRlcnMgPSB0aGlzLmdldEhlYWRlcnMocGFyYW1zLmhlYWRlcnMpO1xuXG4gIC8vIGh0dHBzIGlmIHNwZWNpZmllZCwgZmFsbGJhY2sgdG8gaHR0cCBpbiBhbnkgb3RoZXIgY2FzZVxuICBpZiAob3B0aW9ucy5wcm90b2NvbCA9PSAnaHR0cHM6Jykge1xuICAgIHJlcXVlc3QgPSBodHRwcy5yZXF1ZXN0KG9wdGlvbnMpO1xuICB9IGVsc2Uge1xuICAgIHJlcXVlc3QgPSBodHRwLnJlcXVlc3Qob3B0aW9ucyk7XG4gIH1cblxuICAvLyBnZXQgY29udGVudCBsZW5ndGggYW5kIGZpcmUgYXdheVxuICB0aGlzLmdldExlbmd0aChmdW5jdGlvbihlcnIsIGxlbmd0aCkge1xuICAgIGlmIChlcnIgJiYgZXJyICE9PSAnVW5rbm93biBzdHJlYW0nKSB7XG4gICAgICB0aGlzLl9lcnJvcihlcnIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGFkZCBjb250ZW50IGxlbmd0aFxuICAgIGlmIChsZW5ndGgpIHtcbiAgICAgIHJlcXVlc3Quc2V0SGVhZGVyKCdDb250ZW50LUxlbmd0aCcsIGxlbmd0aCk7XG4gICAgfVxuXG4gICAgdGhpcy5waXBlKHJlcXVlc3QpO1xuICAgIGlmIChjYikge1xuICAgICAgdmFyIG9uUmVzcG9uc2U7XG5cbiAgICAgIHZhciBjYWxsYmFjayA9IGZ1bmN0aW9uIChlcnJvciwgcmVzcG9uY2UpIHtcbiAgICAgICAgcmVxdWVzdC5yZW1vdmVMaXN0ZW5lcignZXJyb3InLCBjYWxsYmFjayk7XG4gICAgICAgIHJlcXVlc3QucmVtb3ZlTGlzdGVuZXIoJ3Jlc3BvbnNlJywgb25SZXNwb25zZSk7XG5cbiAgICAgICAgcmV0dXJuIGNiLmNhbGwodGhpcywgZXJyb3IsIHJlc3BvbmNlKTtcbiAgICAgIH07XG5cbiAgICAgIG9uUmVzcG9uc2UgPSBjYWxsYmFjay5iaW5kKHRoaXMsIG51bGwpO1xuXG4gICAgICByZXF1ZXN0Lm9uKCdlcnJvcicsIGNhbGxiYWNrKTtcbiAgICAgIHJlcXVlc3Qub24oJ3Jlc3BvbnNlJywgb25SZXNwb25zZSk7XG4gICAgfVxuICB9LmJpbmQodGhpcykpO1xuXG4gIHJldHVybiByZXF1ZXN0O1xufTtcblxuRm9ybURhdGEucHJvdG90eXBlLl9lcnJvciA9IGZ1bmN0aW9uKGVycikge1xuICBpZiAoIXRoaXMuZXJyb3IpIHtcbiAgICB0aGlzLmVycm9yID0gZXJyO1xuICAgIHRoaXMucGF1c2UoKTtcbiAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgfVxufTtcblxuRm9ybURhdGEucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gJ1tvYmplY3QgRm9ybURhdGFdJztcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/form-data/lib/form_data.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/form-data/lib/populate.js":
/*!************************************************!*\
  !*** ./node_modules/form-data/lib/populate.js ***!
  \************************************************/
/***/ ((module) => {

eval("// populates missing values\nmodule.exports = function(dst, src) {\n\n  Object.keys(src).forEach(function(prop)\n  {\n    dst[prop] = dst[prop] || src[prop];\n  });\n\n  return dst;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZm9ybS1kYXRhL2xpYi9wb3B1bGF0ZS5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3BsYXktbmV4dGpzLy4vbm9kZV9tb2R1bGVzL2Zvcm0tZGF0YS9saWIvcG9wdWxhdGUuanM/YTdlZCJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBwb3B1bGF0ZXMgbWlzc2luZyB2YWx1ZXNcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZHN0LCBzcmMpIHtcblxuICBPYmplY3Qua2V5cyhzcmMpLmZvckVhY2goZnVuY3Rpb24ocHJvcClcbiAge1xuICAgIGRzdFtwcm9wXSA9IGRzdFtwcm9wXSB8fCBzcmNbcHJvcF07XG4gIH0pO1xuXG4gIHJldHVybiBkc3Q7XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/form-data/lib/populate.js\n");

/***/ })

};
;