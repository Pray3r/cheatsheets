// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/dom101/matches.js":[function(require,module,exports) {
/**
 * matches : matches(el, selector)
 * Checks if a given element `el` matches `selector`.
 * Compare with [$.fn.is](http://api.jquery.com/is/).
 *
 *     var matches = require('dom101/matches');
 *
 *     matches(button, ':focus');
 */

function matches (el, selector) {
  var _matches = el.matches ||
    el.matchesSelector ||
    el.msMatchesSelector ||
    el.mozMatchesSelector ||
    el.webkitMatchesSelector ||
    el.oMatchesSelector

  if (_matches) {
    return _matches.call(el, selector)
  } else if (el.parentNode) {
    // IE8 and below
    var nodes = el.parentNode.querySelectorAll(selector)
    for (var i = nodes.length; i--; 0) {
      if (nodes[i] === el) return true
    }
    return false
  }
}

module.exports = matches

},{}],"../node_modules/dom101/each.js":[function(require,module,exports) {
/**
 * each : each(list, fn)
 * Iterates through `list` (an array or an object). This is useful when dealing
 * with NodeLists like `document.querySelectorAll`.
 *
 *     var each = require('dom101/each');
 *     var qa = require('dom101/query-selector-all');
 *
 *     each(qa('.button'), function (el) {
 *       addClass('el', 'selected');
 *     });
 */

function each (list, fn) {
  var i
  var len = list.length
  var idx

  if (typeof len === 'number') {
    for (i = 0; i < len; i++) {
      fn(list[i], i)
    }
  } else {
    idx = 0
    for (i in list) {
      if (list.hasOwnProperty(i)) {
        fn(list[i], i, idx++)
      }
    }
  }

  return list
}

module.exports = each

},{}],"../node_modules/dom101/add-class.js":[function(require,module,exports) {
var each = require('./each')

/**
 * addClass : addClass(el, className)
 * Adds a class name to an element. Compare with `$.fn.addClass`.
 *
 *     var addClass = require('dom101/add-class');
 *
 *     addClass(el, 'active');
 */

function addClass (el, className) {
  if (!className) return

  if (Array.isArray(className)) {
    each(className, function (className) {
      addClass(el, className)
    })

    return
  }

  if (el.classList) {
    var classNames = className.split(' ').filter(Boolean)
    each(classNames, function (className) {
      el.classList.add(className)
    })
  } else {
    el.className += ' ' + className
  }
}

module.exports = addClass

},{"./each":"../node_modules/dom101/each.js"}],"helpers/dom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appendMany = appendMany;
exports.nextUntil = nextUntil;
exports.before = before;
exports.findChildren = findChildren;
exports.createDiv = createDiv;

var _matches = _interopRequireDefault(require("dom101/matches"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/*
 * Just like jQuery.append
 */
function appendMany(el, children) {
  children.forEach(function (child) {
    el.appendChild(child);
  });
}
/*
 * Just like jQuery.nextUntil
 */


function nextUntil(el, selector) {
  var nextEl = el.nextSibling;
  return nextUntilTick(nextEl, selector, []);
}

function nextUntilTick(el, selector, acc) {
  if (!el) return acc;
  var isMatch = (0, _matches.default)(el, selector);
  if (isMatch) return acc;
  return nextUntilTick(el.nextSibling, selector, [].concat(_toConsumableArray(acc), [el]));
}
/*
 * Just like jQuery.before
 */


function before(reference, newNode) {
  reference.parentNode.insertBefore(newNode, reference);
}
/*
 * Like jQuery.children('selector')
 */


function findChildren(el, selector) {
  return [].slice.call(el.children).filter(function (child) {
    return (0, _matches.default)(child, selector);
  });
}
/**
 * Creates a div
 * @private
 *
 * @example
 *
 *     createDiv({ class: 'foo' })
 */


function createDiv(props) {
  var d = document.createElement('div');
  Object.keys(props).forEach(function (key) {
    d.setAttribute(key, props[key]);
  });
  return d;
}
},{"dom101/matches":"../node_modules/dom101/matches.js"}],"wrapify/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = wrapify;
exports.groupify = groupify;

var _matches = _interopRequireDefault(require("dom101/matches"));

var _addClass = _interopRequireDefault(require("dom101/add-class"));

var _dom = require("../helpers/dom");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Wraps h2 sections into h2-section.
 * Wraps h3 sections into h3-section.
 *
 * @private
 */
function wrapify(root) {
  // These are your H2 sections. Returns a list of .h2-section nodes.
  var sections = wrapifyH2(root); // For each h2 section, wrap the H3's in them

  sections.forEach(function (section) {
    var bodies = (0, _dom.findChildren)(section, '[data-js-h3-section-list]');
    bodies.forEach(function (body) {
      wrapifyH3(body);
    });
  });
}
/**
 * Wraps h2 sections into h2-section.
 * Creates and HTML structure like so:
 *
 *     .h2-section
 *       h2.
 *         (title)
 *       .body.h3-section-list.
 *         (body goes here)
 *
 * @private
 */


function wrapifyH2(root) {
  return groupify(root, {
    tag: 'h2',
    wrapperFn: function wrapperFn() {
      return (0, _dom.createDiv)({
        class: 'h2-section'
      });
    },
    bodyFn: function bodyFn() {
      return (0, _dom.createDiv)({
        class: 'body h3-section-list',
        'data-js-h3-section-list': ''
      });
    }
  });
}
/**
 * Wraps h3 sections into h3-section.
 * Creates and HTML structure like so:
 *
 *     .h3-section
 *       h3.
 *         (title)
 *       .body.
 *         (body goes here)
 *
 * @private
 */


function wrapifyH3(root) {
  return groupify(root, {
    tag: 'h3',
    wrapperFn: function wrapperFn() {
      return (0, _dom.createDiv)({
        class: 'h3-section'
      });
    },
    bodyFn: function bodyFn() {
      return (0, _dom.createDiv)({
        class: 'body'
      });
    }
  });
}
/**
 * Groups all headings (a `tag` selector) under wrappers like `.h2-section`
 * (build by `wrapperFn()`).
 * @private
 */


function groupify(el, _ref) {
  var tag = _ref.tag,
      wrapperFn = _ref.wrapperFn,
      bodyFn = _ref.bodyFn;
  var first = el.children[0];
  var result = []; // Handle the markup before the first h2

  if (first && !(0, _matches.default)(first, tag)) {
    var sibs = (0, _dom.nextUntil)(first, tag);
    result.push(wrap(first, null, [first].concat(_toConsumableArray(sibs))));
  } // Find all h3's inside it


  var children = (0, _dom.findChildren)(el, tag);
  children.forEach(function (child) {
    var sibs = (0, _dom.nextUntil)(child, tag);
    result.push(wrap(child, child, sibs));
  });
  return result;

  function wrap(pivot, first, sibs) {
    var wrap = wrapperFn();
    var pivotClass = pivot.className;
    if (pivotClass) (0, _addClass.default)(wrap, pivotClass);
    (0, _dom.before)(pivot, wrap);
    var body = bodyFn();
    if (pivotClass) (0, _addClass.default)(body, pivotClass);
    (0, _dom.appendMany)(body, sibs);
    if (first) wrap.appendChild(first);
    wrap.appendChild(body);
    return wrap;
  }
}
},{"dom101/matches":"../node_modules/dom101/matches.js","dom101/add-class":"../node_modules/dom101/add-class.js","../helpers/dom":"helpers/dom.js"}],"../node_modules/dom101/on.js":[function(require,module,exports) {
/**
 * on : on(el, event, fn)
 * Adds an event handler.
 *
 *     var on = require('dom101/on');
 *
 *     on(el, 'click', function () {
 *       ...
 *     });
 */

function on (el, event, handler) {
  if (el.addEventListener) {
    el.addEventListener(event, handler)
  } else {
    el.attachEvent('on' + event, function () {
      handler.call(el)
    })
  }
}

module.exports = on

},{}],"critical.js":[function(require,module,exports) {
"use strict";

var _wrapify = _interopRequireDefault(require("./wrapify"));

var _addClass = _interopRequireDefault(require("dom101/add-class"));

var _on = _interopRequireDefault(require("dom101/on"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * This is the "critical path" JavaScript that will be included INLINE on every
 * page. Keep this as small as possible!
 */
// Transform the main body markup to make it readable.
var body = document.querySelector('[data-js-main-body]');

if (body) {
  (0, _wrapify.default)(body);
  (0, _addClass.default)(body, '-wrapified');
} // Be "done" when we're done, or after a certain timeout.


(0, _on.default)(window, 'load', done);
setTimeout(done, 5000);
var isDone;

function done() {
  if (isDone) return;
  (0, _addClass.default)(document.documentElement, 'LoadDone');
  isDone = true;
}
},{"./wrapify":"wrapify/index.js","dom101/add-class":"../node_modules/dom101/add-class.js","dom101/on":"../node_modules/dom101/on.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53879" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","critical.js"], null)