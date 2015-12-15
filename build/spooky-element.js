(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SpookyEl = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var select=require("dom-select"),style=require("dom-css"),domify=require("domify"),on=require("dom-event"),off=on.off,append=require("insert").append,prepend=require("insert").prepend,remove=require("insert").remove,mixes=require("mixes"),Signal=require("signals").Signal,atts=require("atts"),elementClass=require("element-class"),NO_VIEW_ERROR_MSG="The view is not defined in this SpookyElement",isUndefined=function(e){return"undefined"!=typeof e},isString=require("is-string"),isFunction=require("is-function"),isElement=require("is-element"),SpookyElement=function(e,i){if(!(this instanceof SpookyElement))return new SpookyElement(e,i);if(e){if(e._isSpookyElement)return e;if(e.jquery){if(!e.length)return this;e=e[0]}}if(i&&i.jquery&&(i=i.length?i[0]:null),this._view=null,this.onAppended=new Signal,this.onPrepended=new Signal,isFunction(e)){this.template=e;var t=domify(this.render(i));this.view=t}else isString(e)?0===e.indexOf("<")?this.view=domify(e):this.select(e,i):isElement(e)?this.view=e:this.template&&(this.view=domify(this.render(e)));this._isSpookyElement=!0};SpookyElement.prototype=Object.create(Array.prototype),mixes(SpookyElement,{view:{set:function(e){this._view=e,null===e?this.length=0:(this[0]=this._view,this.length=1)},get:function(){return this._view}},select:function(e,i){return i&&i._isSpookyElement&&(i=i.view),this.view=select(e,i),this},getElement:function(e){if(!this.view)throw new Error(NO_VIEW_ERROR_MSG);return e?select(e,this.view):this.view},findElement:function(e){return this.getElement(e)},find:function(e){var i=this.getElement(e);return i?new SpookyElement(i):null},findAll:function(e){if(!this.view)throw new Error(NO_VIEW_ERROR_MSG);var i=select.all(e,this.view),t=[];if(i)for(var n=0,r=i.length;r>n;n+=1){var s=i[n];t.push(SpookyElement(s))}return t},appendTo:function(e){if(!this.view)throw new Error(NO_VIEW_ERROR_MSG);var i=e;return isString(i)&&(i=select(i)),i&&i._isSpookyElement&&(i=i.view),append(i,this.view),this.onAppended.dispatch(this),this},prependTo:function(e){if(!this.view)throw new Error(NO_VIEW_ERROR_MSG);var i=e;return isString(i)&&(i=select(i)),i&&i._isSpookyElement&&(i=i.view),prepend(i,this.view),this.onPrepended.dispatch(this),this},append:function(e){if(!this.view)throw new Error(NO_VIEW_ERROR_MSG);return isString(e)&&(e=domify(e)),append(this.view,e),this},prepend:function(e){if(!this.view)throw new Error(NO_VIEW_ERROR_MSG);return isString(e)&&(e=domify(e)),prepend(this.view,e),this},render:function(e){if(this.template&&isFunction(this.template)){var i=this.template(e),t=i.replace(/^\s+|\s+$/g,"");return t}return this},on:function(e,i){if(!this.view)throw new Error(NO_VIEW_ERROR_MSG);return on(this.view,e,i),this},off:function(e,i){if(!this.view)throw new Error(NO_VIEW_ERROR_MSG);return off(this.view,e,i),this},css:function(e,i){if(!this.view)throw new Error(NO_VIEW_ERROR_MSG);return i?style(this.view,e,i):style(this.view,e),this},attr:function(e,i){if(!this.view)throw new Error(NO_VIEW_ERROR_MSG);return 2==arguments.length?(atts.attr(this.view,e,i),this):1==arguments.length?atts.attr(this.view,e):this},addClass:function(e){if(!this.view)throw new Error(NO_VIEW_ERROR_MSG);return elementClass(this.view).add(e),this},removeClass:function(e){if(!this.view)throw new Error(NO_VIEW_ERROR_MSG);return elementClass(this.view).remove(e),this},hasClass:function(e){if(!this.view)throw new Error(NO_VIEW_ERROR_MSG);return elementClass(this.view).has(e)},getWidth:function(){if(!this.view)throw new Error(NO_VIEW_ERROR_MSG);return this.view.offsetWidth},getHeight:function(){if(!this.view)throw new Error(NO_VIEW_ERROR_MSG);return this.view.offsetHeight},html:function(e){if(!this.view)throw new Error(NO_VIEW_ERROR_MSG);return isUndefined(e)?this.view.innerHTML:(this.view.innerHTML=e,this)},animateIn:function(e,i){return i&&i(),this},animateOut:function(e,i){return i&&i(),this},resize:function(e,i){return this.width=e,this.height=i,this.css({width:e,height:i}),this},destroy:function(){this.view&&this.remove(),this.view=null},remove:function(){return this.view&&remove(this.view),this.view=null,this}}),module.exports=SpookyElement;
},{"atts":2,"dom-css":3,"dom-event":9,"dom-select":10,"domify":11,"element-class":12,"insert":16,"is-element":22,"is-function":23,"is-string":24,"mixes":25,"signals":27}],2:[function(require,module,exports){
/*!
 * atts 0.3.0+201503012137
 * https://github.com/ryanve/atts
 * MIT License (c) 2015 Ryan Van Etten
 */
!function(root, name, make) {
  if (typeof module != 'undefined' && module.exports) module.exports = make();
  else root[name] = make();
}(this, 'atts', function() {

  var ssv = /\S+/g
    , effin = api.prototype
    , setAttr = 'setAttribute'
    , getAttr = 'getAttribute'
    , remAttr = 'removeAttribute'
    , owns = {}.hasOwnProperty;
    
  /**
   * @constructor
   * @param {?Node=} e
   * @return {api}
   */
  function api(e) {
    if (!(this instanceof api)) return new api(e);
    if (this.length = null == e ? 0 : 1) this[0] = e;
  }
  
  /**
   * Count (or iterate) an element's attributes.
   * @param {Element} e element 
   * @param {(Function|number)=} fn or index, fns break as in [].some
   * @param {*=} scope defaults to `e`
   * @return {number} #attributes (#iterations if any pass, 0 if none)
   */
  function anyAttr(e, fn, scope) {
    var a, o = e.attributes, l = o && o.length, i = 0;
    if (typeof fn != 'function') return +l || 0;
    scope = scope || e;
    while (i < l) if (fn.call(scope, (a = o[i++]).value, a.name, a)) return i;
    return 0;
  }
  
  function copy(v, k) {
    this[k] = v;
  }
  
  function getAtts(e) {
    var o = {};
    anyAttr(e, copy, o);
    return o;
  }
  
  function setAtts(e, o) {
    for (var n in o) owns.call(o, n) && attr(e, n, o[n]);
    return o;
  }

  /**
   * @param {Element} e
   * @param {Object=} o
   */
  function atts(e, o) {
    return void 0 === o ? getAtts(e) : setAtts(e, o);
  }

  /**
   * @param {*} v
   * @return {string|undefined}
   */
  function normalize(v) {
    return null == v ? void 0 : '' + v;
  }

  /**
   * @param {Element} e
   * @param {string=} k attribute name
   * @param {(string|boolean|null)=} v attribute value
   */  
  function attr(e, k, v) {
    if (void 0 === v) return normalize(e[getAttr](k));
    if (typeof v == 'boolean') toggleAttr(e, k, v);
    else if (null === v) e[remAttr](k);
    else e[setAttr](k, v = '' + v);
    return v;
  }
  
  /**
   * @param {Element} e
   * @param {Array|string} keys
   */
  function removeAttr(e, keys) {
    keys = typeof keys == 'string' ? keys.match(ssv) : [].concat(keys);
    for (var i = keys && keys.length; i--;) e[remAttr](keys[i]);
  }
  
  /**
   * @param {Element} e
   * @param {string} k attribute name
   * @param {boolean=} force
   * @return {boolean}
   */
  function toggleAttr(e, k, force) {
    typeof force == 'boolean' || (force = null == e[getAttr](k) || e[k] === false);
    var opposite = !force;
    force ? e[setAttr](k, '') : e[remAttr](k);
    return e[k] === opposite ? e[k] = force : force;
  }
  
  /**
   * @param {Element} e element to test on
   * @param {string} n attribute name
   * @return {boolean} true if element supports attribute
   */
  function supportAttr(e, n) {
    if (n in e) return true; // Case-sensitive check catches most inputs
    if ('class' === n) return 'className' in e;
    // Do case-insensitive check on all enumerables to cover inputs 
    // like "contenteditable" whose property is "contentEditable"
    for (var p in e) if (n.toLowerCase() === p.toLowerCase()) return true;
    return false;
  }
  
  /**
   * @param {Element} e element to test on
   * @param {string} n attribute name
   * @return {boolean} true if attribute is present
   */
  function isAttr(e, n) {
    return null != e[getAttr](n);
  }

  /** 
   * @param {{length:number}} stack
   * @param {Function} fn
   */
  function each(stack, fn) {
    for (var l = stack.length, i = 0; i < l; i++) fn(stack[i]);
    return stack;
  }
  
  api['attr'] = attr;
  api['atts'] = atts;
  api['isAttr'] = isAttr;
  api['supportAttr'] = supportAttr;
  api['anyAttr'] = anyAttr;
  api['removeAttr'] = removeAttr;
  api['toggleAttr'] = toggleAttr;
  
  /**
   * @this {{length:number}}
   * @param {Object=} o
   */  
  effin['atts'] = function(o) {
    return void 0 === o ? atts(this[0]) : each(this, function(e) {
      atts(e, o);
    });
  };
  
  /**
   * @this {{length:number}}
   * @param {string=} k
   * @param {*=} v
   */  
  effin['attr'] = function(k, v) {
    return void 0 === v ? attr(this[0], k) : each(this, function(e) {
      var x = typeof v == 'function' ? v.call(e) : v;
      void 0 === x || attr(e, k, x);
    });
  };
  
  /**
   * Remove attributes for each element in a collection.
   * @this {{length:number}}
   * @param {Array|string} keys
   */
  effin['removeAttr'] = function(keys) {
    return each(this, function(e) {
      removeAttr(e, keys);
    });
  };
  
  effin['toggleAttr'] = function(k, force) {
    return each(this, function(e) {
      toggleAttr(e, k, force);
    });
  };

  return api;
});
},{}],3:[function(require,module,exports){
var prefix = require('prefix-style')
var toCamelCase = require('to-camel-case')
var cache = { 'float': 'cssFloat' }
var addPxToStyle = require('add-px-to-style')

function style (element, property, value) {
  var camel = cache[property]
  if (typeof camel === 'undefined') {
    camel = detect(property)
  }

  // may be false if CSS prop is unsupported
  if (camel) {
    if (value === undefined) {
      return element.style[camel]
    }

    element.style[camel] = addPxToStyle(camel, value)
  }
}

function each (element, properties) {
  for (var k in properties) {
    if (properties.hasOwnProperty(k)) {
      style(element, k, properties[k])
    }
  }
}

function detect (cssProp) {
  var camel = toCamelCase(cssProp)
  var result = prefix(camel)
  cache[camel] = cache[cssProp] = cache[result] = result
  return result
}

function set () {
  if (arguments.length === 2) {
    each(arguments[0], arguments[1])
  } else {
    style(arguments[0], arguments[1], arguments[2])
  }
}

module.exports = set
module.exports.set = set

module.exports.get = function (element, properties) {
  if (Array.isArray(properties)) {
    return properties.reduce(function (obj, prop) {
      obj[prop] = style(element, prop || '')
      return obj
    }, {})
  } else {
    return style(element, properties || '')
  }
}

},{"add-px-to-style":4,"prefix-style":5,"to-camel-case":6}],4:[function(require,module,exports){
/* The following list is defined in React's core */
var IS_UNITLESS = {
  animationIterationCount: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridColumn: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  stopOpacity: true,
  strokeDashoffset: true,
  strokeOpacity: true,
  strokeWidth: true
};

module.exports = function(name, value) {
  if(typeof value === 'number' && !IS_UNITLESS[ name ]) {
    return value + 'px';
  } else {
    return value;
  }
};
},{}],5:[function(require,module,exports){
var div = null
var prefixes = [ 'Webkit', 'Moz', 'O', 'ms' ]

module.exports = function prefixStyle (prop) {
  // re-use a dummy div
  if (!div) {
    div = document.createElement('div')
  }

  var style = div.style

  // prop exists without prefix
  if (prop in style) {
    return prop
  }

  // borderRadius -> BorderRadius
  var titleCase = prop.charAt(0).toUpperCase() + prop.slice(1)

  // find the vendor-prefixed prop
  for (var i = prefixes.length; i >= 0; i--) {
    var name = prefixes[i] + titleCase
    // e.g. WebkitBorderRadius or webkitBorderRadius
    if (name in style) {
      return name
    }
  }

  return false
}

},{}],6:[function(require,module,exports){

var toSpace = require('to-space-case');


/**
 * Expose `toCamelCase`.
 */

module.exports = toCamelCase;


/**
 * Convert a `string` to camel case.
 *
 * @param {String} string
 * @return {String}
 */


function toCamelCase (string) {
  return toSpace(string).replace(/\s(\w)/g, function (matches, letter) {
    return letter.toUpperCase();
  });
}
},{"to-space-case":7}],7:[function(require,module,exports){

var clean = require('to-no-case');


/**
 * Expose `toSpaceCase`.
 */

module.exports = toSpaceCase;


/**
 * Convert a `string` to space case.
 *
 * @param {String} string
 * @return {String}
 */


function toSpaceCase (string) {
  return clean(string).replace(/[\W_]+(.|$)/g, function (matches, match) {
    return match ? ' ' + match : '';
  });
}
},{"to-no-case":8}],8:[function(require,module,exports){

/**
 * Expose `toNoCase`.
 */

module.exports = toNoCase;


/**
 * Test whether a string is camel-case.
 */

var hasSpace = /\s/;
var hasCamel = /[a-z][A-Z]/;
var hasSeparator = /[\W_]/;


/**
 * Remove any starting case from a `string`, like camel or snake, but keep
 * spaces and punctuation that may be important otherwise.
 *
 * @param {String} string
 * @return {String}
 */

function toNoCase (string) {
  if (hasSpace.test(string)) return string.toLowerCase();

  if (hasSeparator.test(string)) string = unseparate(string);
  if (hasCamel.test(string)) string = uncamelize(string);
  return string.toLowerCase();
}


/**
 * Separator splitter.
 */

var separatorSplitter = /[\W_]+(.|$)/g;


/**
 * Un-separate a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function unseparate (string) {
  return string.replace(separatorSplitter, function (m, next) {
    return next ? ' ' + next : '';
  });
}


/**
 * Camelcase splitter.
 */

var camelSplitter = /(.)([A-Z]+)/g;


/**
 * Un-camelcase a `string`.
 *
 * @param {String} string
 * @return {String}
 */

function uncamelize (string) {
  return string.replace(camelSplitter, function (m, previous, uppers) {
    return previous + ' ' + uppers.toLowerCase().split('').join(' ');
  });
}
},{}],9:[function(require,module,exports){
module.exports = on;
module.exports.on = on;
module.exports.off = off;

function on (element, event, callback, capture) {
  !element.addEventListener && (event = 'on' + event);
  (element.addEventListener || element.attachEvent).call(element, event, callback, capture);
  return callback;
}

function off (element, event, callback, capture) {
  !element.removeEventListener && (event = 'on' + event);
  (element.removeEventListener || element.detachEvent).call(element, event, callback, capture);
  return callback;
}

},{}],10:[function(require,module,exports){
module.exports = one;
module.exports.all = all;

function one (selector, parent) {
  parent || (parent = document);
  return parent.querySelector(selector);
}

function all (selector, parent) {
  parent || (parent = document);
  var selection = parent.querySelectorAll(selector);
  return  Array.prototype.slice.call(selection);
}

},{}],11:[function(require,module,exports){

/**
 * Expose `parse`.
 */

module.exports = parse;

/**
 * Tests for browser support.
 */

var innerHTMLBug = false;
var bugTestDiv;
if (typeof document !== 'undefined') {
  bugTestDiv = document.createElement('div');
  // Setup
  bugTestDiv.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
  // Make sure that link elements get serialized correctly by innerHTML
  // This requires a wrapper element in IE
  innerHTMLBug = !bugTestDiv.getElementsByTagName('link').length;
  bugTestDiv = undefined;
}

/**
 * Wrap map from jquery.
 */

var map = {
  legend: [1, '<fieldset>', '</fieldset>'],
  tr: [2, '<table><tbody>', '</tbody></table>'],
  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>'],
  // for script/link/style tags to work in IE6-8, you have to wrap
  // in a div with a non-whitespace character in front, ha!
  _default: innerHTMLBug ? [1, 'X<div>', '</div>'] : [0, '', '']
};

map.td =
map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];

map.option =
map.optgroup = [1, '<select multiple="multiple">', '</select>'];

map.thead =
map.tbody =
map.colgroup =
map.caption =
map.tfoot = [1, '<table>', '</table>'];

map.polyline =
map.ellipse =
map.polygon =
map.circle =
map.text =
map.line =
map.path =
map.rect =
map.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">','</svg>'];

/**
 * Parse `html` and return a DOM Node instance, which could be a TextNode,
 * HTML DOM Node of some kind (<div> for example), or a DocumentFragment
 * instance, depending on the contents of the `html` string.
 *
 * @param {String} html - HTML string to "domify"
 * @param {Document} doc - The `document` instance to create the Node for
 * @return {DOMNode} the TextNode, DOM Node, or DocumentFragment instance
 * @api private
 */

function parse(html, doc) {
  if ('string' != typeof html) throw new TypeError('String expected');

  // default to the global `document` object
  if (!doc) doc = document;

  // tag name
  var m = /<([\w:]+)/.exec(html);
  if (!m) return doc.createTextNode(html);

  html = html.replace(/^\s+|\s+$/g, ''); // Remove leading/trailing whitespace

  var tag = m[1];

  // body support
  if (tag == 'body') {
    var el = doc.createElement('html');
    el.innerHTML = html;
    return el.removeChild(el.lastChild);
  }

  // wrap map
  var wrap = map[tag] || map._default;
  var depth = wrap[0];
  var prefix = wrap[1];
  var suffix = wrap[2];
  var el = doc.createElement('div');
  el.innerHTML = prefix + html + suffix;
  while (depth--) el = el.lastChild;

  // one element
  if (el.firstChild == el.lastChild) {
    return el.removeChild(el.firstChild);
  }

  // several elements
  var fragment = doc.createDocumentFragment();
  while (el.firstChild) {
    fragment.appendChild(el.removeChild(el.firstChild));
  }

  return fragment;
}

},{}],12:[function(require,module,exports){
module.exports = function(opts) {
  return new ElementClass(opts)
}

function indexOf(arr, prop) {
  if (arr.indexOf) return arr.indexOf(prop)
  for (var i = 0, len = arr.length; i < len; i++)
    if (arr[i] === prop) return i
  return -1
}

function ElementClass(opts) {
  if (!(this instanceof ElementClass)) return new ElementClass(opts)
  var self = this
  if (!opts) opts = {}

  // similar doing instanceof HTMLElement but works in IE8
  if (opts.nodeType) opts = {el: opts}

  this.opts = opts
  this.el = opts.el || document.body
  if (typeof this.el !== 'object') this.el = document.querySelector(this.el)
}

ElementClass.prototype.add = function(className) {
  var el = this.el
  if (!el) return
  if (el.className === "") return el.className = className
  var classes = el.className.split(' ')
  if (indexOf(classes, className) > -1) return classes
  classes.push(className)
  el.className = classes.join(' ')
  return classes
}

ElementClass.prototype.remove = function(className) {
  var el = this.el
  if (!el) return
  if (el.className === "") return
  var classes = el.className.split(' ')
  var idx = indexOf(classes, className)
  if (idx > -1) classes.splice(idx, 1)
  el.className = classes.join(' ')
  return classes
}

ElementClass.prototype.has = function(className) {
  var el = this.el
  if (!el) return
  var classes = el.className.split(' ')
  return indexOf(classes, className) > -1
}

ElementClass.prototype.toggle = function(className) {
  var el = this.el
  if (!el) return
  if (this.has(className)) this.remove(className)
  else this.add(className)
}

},{}],13:[function(require,module,exports){
var toArray = require("to-array")

    , mutation = require("./mutation")

module.exports = after

function after(sibling, first) {
    var node = mutation(toArray(arguments, 1))
        , parent = sibling.parentNode
        , child = sibling.nextSibling

    parent.insertBefore(node, child)
    return first
}

},{"./mutation":17,"to-array":18}],14:[function(require,module,exports){
var toArray = require("to-array")

    , mutation = require("./mutation")

module.exports = append

function append(parent, first) {
    var node = mutation(toArray(arguments, 1))
    parent.appendChild(node)
    return first
}

},{"./mutation":17,"to-array":18}],15:[function(require,module,exports){
var toArray = require("to-array")

    , mutation = require("./mutation")

module.exports = before

function before(sibling, first) {
    var node = mutation(toArray(arguments, 1))
        , parent = sibling.parentNode

    parent.insertBefore(node, sibling)
    return first
}

},{"./mutation":17,"to-array":18}],16:[function(require,module,exports){
var mutation = require("./mutation")
    , prepend = require("./prepend")
    , append = require("./append")
    , after = require("./after")
    , before = require("./before")
    , remove = require("./remove")
    , replace = require("./replace")

module.exports = {
    prepend: prepend
    , append: append
    , after: after
    , before: before
    , remove: remove
    , replace: replace
    , mutation: mutation
}

},{"./after":13,"./append":14,"./before":15,"./mutation":17,"./prepend":19,"./remove":20,"./replace":21}],17:[function(require,module,exports){
module.exports = mutation

function mutation(list) {
    list = list.map(replaceStringWithTextNode)

    if (list.length === 1) {
        return list[0]
    }

    var frag = document.createDocumentFragment()
    list.forEach(appendToFragment, frag)
    return frag
}

function replaceStringWithTextNode(string) {
    if (typeof string === "string") {
        return document.createTextNode(string)
    } else if (string && string.view && string.view.nodeType) {
        return string.view
    }

    return string
}

function appendToFragment(elem) {
    this.appendChild(elem)
}

},{}],18:[function(require,module,exports){
module.exports = toArray

function toArray(list, index) {
    var array = []

    index = index || 0

    for (var i = index || 0; i < list.length; i++) {
        array[i - index] = list[i]
    }

    return array
}

},{}],19:[function(require,module,exports){
var toArray = require("to-array")

    , mutation = require("./mutation")

module.exports = prepend

function prepend(parent, first) {
    var node = mutation(toArray(arguments, 1))
    parent.insertBefore(node, parent.firstChild)
    return first
}

},{"./mutation":17,"to-array":18}],20:[function(require,module,exports){
var toArray = require("to-array")

    , mutation = require("./mutation")

module.exports = remove

function remove(first) {
    var list = toArray(arguments)
    list.map(function (elem) {
        if (elem && elem.view && elem.view.nodeType) {
            return elem.view
        }

        return elem
    }).forEach(removeFromParent)

    return first
}

function removeFromParent(elem) {
    if (!elem.parentNode) {
        return
    }

    elem.parentNode.removeChild(elem)
}

},{"./mutation":17,"to-array":18}],21:[function(require,module,exports){
var toArray = require("to-array")
    , mutation = require("./mutation")

module.exports = replace

function replace(target, first) {
    var node = mutation(toArray(arguments, 1))
        , parent = target.parentNode

    parent.replaceChild(node, target)
    return first
}

},{"./mutation":17,"to-array":18}],22:[function(require,module,exports){
(function(root) {
  function isElement(value) {
    return (value && value.nodeType === 1) &&
           (value && typeof value == 'object') &&
           (Object.prototype.toString.call(value).indexOf('Element') > -1);
  }

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = isElement;
    }
    exports.isElement = isElement;
  } else if (typeof define === 'function' && define.amd) {
    define([], function() {
      return isElement;
    });
  } else {
    root.isElement = isElement;
  }

})(this);

},{}],23:[function(require,module,exports){
module.exports = isFunction

var toString = Object.prototype.toString

function isFunction (fn) {
  var string = toString.call(fn)
  return string === '[object Function]' ||
    (typeof fn === 'function' && string !== '[object RegExp]') ||
    (typeof window !== 'undefined' &&
     // IE8 and below
     (fn === window.setTimeout ||
      fn === window.alert ||
      fn === window.confirm ||
      fn === window.prompt))
};

},{}],24:[function(require,module,exports){
'use strict';

var strValue = String.prototype.valueOf;
var tryStringObject = function tryStringObject(value) {
	try {
		strValue.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var strClass = '[object String]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isString(value) {
	if (typeof value === 'string') { return true; }
	if (typeof value !== 'object') { return false; }
	return hasToStringTag ? tryStringObject(value) : toStr.call(value) === strClass;
};

},{}],25:[function(require,module,exports){
var xtend = require('xtend')

var defaults = {
	enumerable: true,
	configurable: true
}

function mix(obj, entries) {
	for (var k in entries) {
		if (!entries.hasOwnProperty(k))
			continue
		var f = entries[k]
		if (typeof f === 'function') {
			obj[k] = f
		} else if (f && typeof f === 'object') {
			var def = xtend(defaults, f)
			Object.defineProperty(obj, k, def);
		}
	}
}

module.exports = function mixes(ctor, entries) {
	mix(ctor.prototype, entries)
}

module.exports.mix = mix
},{"xtend":26}],26:[function(require,module,exports){
module.exports = extend

var hasOwnProperty = Object.prototype.hasOwnProperty;

function extend() {
    var target = {}

    for (var i = 0; i < arguments.length; i++) {
        var source = arguments[i]

        for (var key in source) {
            if (hasOwnProperty.call(source, key)) {
                target[key] = source[key]
            }
        }
    }

    return target
}

},{}],27:[function(require,module,exports){
/*jslint onevar:true, undef:true, newcap:true, regexp:true, bitwise:true, maxerr:50, indent:4, white:false, nomen:false, plusplus:false */
/*global define:false, require:false, exports:false, module:false, signals:false */

/** @license
 * JS Signals <http://millermedeiros.github.com/js-signals/>
 * Released under the MIT license
 * Author: Miller Medeiros
 * Version: 1.0.0 - Build: 268 (2012/11/29 05:48 PM)
 */

(function(global){

    // SignalBinding -------------------------------------------------
    //================================================================

    /**
     * Object that represents a binding between a Signal and a listener function.
     * <br />- <strong>This is an internal constructor and shouldn't be called by regular users.</strong>
     * <br />- inspired by Joa Ebert AS3 SignalBinding and Robert Penner's Slot classes.
     * @author Miller Medeiros
     * @constructor
     * @internal
     * @name SignalBinding
     * @param {Signal} signal Reference to Signal object that listener is currently bound to.
     * @param {Function} listener Handler function bound to the signal.
     * @param {boolean} isOnce If binding should be executed just once.
     * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
     * @param {Number} [priority] The priority level of the event listener. (default = 0).
     */
    function SignalBinding(signal, listener, isOnce, listenerContext, priority) {

        /**
         * Handler function bound to the signal.
         * @type Function
         * @private
         */
        this._listener = listener;

        /**
         * If binding should be executed just once.
         * @type boolean
         * @private
         */
        this._isOnce = isOnce;

        /**
         * Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @memberOf SignalBinding.prototype
         * @name context
         * @type Object|undefined|null
         */
        this.context = listenerContext;

        /**
         * Reference to Signal object that listener is currently bound to.
         * @type Signal
         * @private
         */
        this._signal = signal;

        /**
         * Listener priority
         * @type Number
         * @private
         */
        this._priority = priority || 0;
    }

    SignalBinding.prototype = {

        /**
         * If binding is active and should be executed.
         * @type boolean
         */
        active : true,

        /**
         * Default parameters passed to listener during `Signal.dispatch` and `SignalBinding.execute`. (curried parameters)
         * @type Array|null
         */
        params : null,

        /**
         * Call listener passing arbitrary parameters.
         * <p>If binding was added using `Signal.addOnce()` it will be automatically removed from signal dispatch queue, this method is used internally for the signal dispatch.</p>
         * @param {Array} [paramsArr] Array of parameters that should be passed to the listener
         * @return {*} Value returned by the listener.
         */
        execute : function (paramsArr) {
            var handlerReturn, params;
            if (this.active && !!this._listener) {
                params = this.params? this.params.concat(paramsArr) : paramsArr;
                handlerReturn = this._listener.apply(this.context, params);
                if (this._isOnce) {
                    this.detach();
                }
            }
            return handlerReturn;
        },

        /**
         * Detach binding from signal.
         * - alias to: mySignal.remove(myBinding.getListener());
         * @return {Function|null} Handler function bound to the signal or `null` if binding was previously detached.
         */
        detach : function () {
            return this.isBound()? this._signal.remove(this._listener, this.context) : null;
        },

        /**
         * @return {Boolean} `true` if binding is still bound to the signal and have a listener.
         */
        isBound : function () {
            return (!!this._signal && !!this._listener);
        },

        /**
         * @return {boolean} If SignalBinding will only be executed once.
         */
        isOnce : function () {
            return this._isOnce;
        },

        /**
         * @return {Function} Handler function bound to the signal.
         */
        getListener : function () {
            return this._listener;
        },

        /**
         * @return {Signal} Signal that listener is currently bound to.
         */
        getSignal : function () {
            return this._signal;
        },

        /**
         * Delete instance properties
         * @private
         */
        _destroy : function () {
            delete this._signal;
            delete this._listener;
            delete this.context;
        },

        /**
         * @return {string} String representation of the object.
         */
        toString : function () {
            return '[SignalBinding isOnce:' + this._isOnce +', isBound:'+ this.isBound() +', active:' + this.active + ']';
        }

    };


/*global SignalBinding:false*/

    // Signal --------------------------------------------------------
    //================================================================

    function validateListener(listener, fnName) {
        if (typeof listener !== 'function') {
            throw new Error( 'listener is a required param of {fn}() and should be a Function.'.replace('{fn}', fnName) );
        }
    }

    /**
     * Custom event broadcaster
     * <br />- inspired by Robert Penner's AS3 Signals.
     * @name Signal
     * @author Miller Medeiros
     * @constructor
     */
    function Signal() {
        /**
         * @type Array.<SignalBinding>
         * @private
         */
        this._bindings = [];
        this._prevParams = null;

        // enforce dispatch to aways work on same context (#47)
        var self = this;
        this.dispatch = function(){
            Signal.prototype.dispatch.apply(self, arguments);
        };
    }

    Signal.prototype = {

        /**
         * Signals Version Number
         * @type String
         * @const
         */
        VERSION : '1.0.0',

        /**
         * If Signal should keep record of previously dispatched parameters and
         * automatically execute listener during `add()`/`addOnce()` if Signal was
         * already dispatched before.
         * @type boolean
         */
        memorize : false,

        /**
         * @type boolean
         * @private
         */
        _shouldPropagate : true,

        /**
         * If Signal is active and should broadcast events.
         * <p><strong>IMPORTANT:</strong> Setting this property during a dispatch will only affect the next dispatch, if you want to stop the propagation of a signal use `halt()` instead.</p>
         * @type boolean
         */
        active : true,

        /**
         * @param {Function} listener
         * @param {boolean} isOnce
         * @param {Object} [listenerContext]
         * @param {Number} [priority]
         * @return {SignalBinding}
         * @private
         */
        _registerListener : function (listener, isOnce, listenerContext, priority) {

            var prevIndex = this._indexOfListener(listener, listenerContext),
                binding;

            if (prevIndex !== -1) {
                binding = this._bindings[prevIndex];
                if (binding.isOnce() !== isOnce) {
                    throw new Error('You cannot add'+ (isOnce? '' : 'Once') +'() then add'+ (!isOnce? '' : 'Once') +'() the same listener without removing the relationship first.');
                }
            } else {
                binding = new SignalBinding(this, listener, isOnce, listenerContext, priority);
                this._addBinding(binding);
            }

            if(this.memorize && this._prevParams){
                binding.execute(this._prevParams);
            }

            return binding;
        },

        /**
         * @param {SignalBinding} binding
         * @private
         */
        _addBinding : function (binding) {
            //simplified insertion sort
            var n = this._bindings.length;
            do { --n; } while (this._bindings[n] && binding._priority <= this._bindings[n]._priority);
            this._bindings.splice(n + 1, 0, binding);
        },

        /**
         * @param {Function} listener
         * @return {number}
         * @private
         */
        _indexOfListener : function (listener, context) {
            var n = this._bindings.length,
                cur;
            while (n--) {
                cur = this._bindings[n];
                if (cur._listener === listener && cur.context === context) {
                    return n;
                }
            }
            return -1;
        },

        /**
         * Check if listener was attached to Signal.
         * @param {Function} listener
         * @param {Object} [context]
         * @return {boolean} if Signal has the specified listener.
         */
        has : function (listener, context) {
            return this._indexOfListener(listener, context) !== -1;
        },

        /**
         * Add a listener to the signal.
         * @param {Function} listener Signal handler function.
         * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
         * @return {SignalBinding} An Object representing the binding between the Signal and listener.
         */
        add : function (listener, listenerContext, priority) {
            validateListener(listener, 'add');
            return this._registerListener(listener, false, listenerContext, priority);
        },

        /**
         * Add listener to the signal that should be removed after first execution (will be executed only once).
         * @param {Function} listener Signal handler function.
         * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
         * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
         * @return {SignalBinding} An Object representing the binding between the Signal and listener.
         */
        addOnce : function (listener, listenerContext, priority) {
            validateListener(listener, 'addOnce');
            return this._registerListener(listener, true, listenerContext, priority);
        },

        /**
         * Remove a single listener from the dispatch queue.
         * @param {Function} listener Handler function that should be removed.
         * @param {Object} [context] Execution context (since you can add the same handler multiple times if executing in a different context).
         * @return {Function} Listener handler function.
         */
        remove : function (listener, context) {
            validateListener(listener, 'remove');

            var i = this._indexOfListener(listener, context);
            if (i !== -1) {
                this._bindings[i]._destroy(); //no reason to a SignalBinding exist if it isn't attached to a signal
                this._bindings.splice(i, 1);
            }
            return listener;
        },

        /**
         * Remove all listeners from the Signal.
         */
        removeAll : function () {
            var n = this._bindings.length;
            while (n--) {
                this._bindings[n]._destroy();
            }
            this._bindings.length = 0;
        },

        /**
         * @return {number} Number of listeners attached to the Signal.
         */
        getNumListeners : function () {
            return this._bindings.length;
        },

        /**
         * Stop propagation of the event, blocking the dispatch to next listeners on the queue.
         * <p><strong>IMPORTANT:</strong> should be called only during signal dispatch, calling it before/after dispatch won't affect signal broadcast.</p>
         * @see Signal.prototype.disable
         */
        halt : function () {
            this._shouldPropagate = false;
        },

        /**
         * Dispatch/Broadcast Signal to all listeners added to the queue.
         * @param {...*} [params] Parameters that should be passed to each handler.
         */
        dispatch : function (params) {
            if (! this.active) {
                return;
            }

            var paramsArr = Array.prototype.slice.call(arguments),
                n = this._bindings.length,
                bindings;

            if (this.memorize) {
                this._prevParams = paramsArr;
            }

            if (! n) {
                //should come after memorize
                return;
            }

            bindings = this._bindings.slice(); //clone array in case add/remove items during dispatch
            this._shouldPropagate = true; //in case `halt` was called before dispatch or during the previous dispatch.

            //execute all callbacks until end of the list or until a callback returns `false` or stops propagation
            //reverse loop since listeners with higher priority will be added at the end of the list
            do { n--; } while (bindings[n] && this._shouldPropagate && bindings[n].execute(paramsArr) !== false);
        },

        /**
         * Forget memorized arguments.
         * @see Signal.memorize
         */
        forget : function(){
            this._prevParams = null;
        },

        /**
         * Remove all bindings from signal and destroy any reference to external objects (destroy Signal object).
         * <p><strong>IMPORTANT:</strong> calling any method on the signal instance after calling dispose will throw errors.</p>
         */
        dispose : function () {
            this.removeAll();
            delete this._bindings;
            delete this._prevParams;
        },

        /**
         * @return {string} String representation of the object.
         */
        toString : function () {
            return '[Signal active:'+ this.active +' numListeners:'+ this.getNumListeners() +']';
        }

    };


    // Namespace -----------------------------------------------------
    //================================================================

    /**
     * Signals namespace
     * @namespace
     * @name signals
     */
    var signals = Signal;

    /**
     * Custom event broadcaster
     * @see Signal
     */
    // alias for backwards compatibility (see #gh-44)
    signals.Signal = Signal;



    //exports to multiple environments
    if(typeof define === 'function' && define.amd){ //AMD
        define(function () { return signals; });
    } else if (typeof module !== 'undefined' && module.exports){ //node
        module.exports = signals;
    } else { //browser
        //use string because of Google closure compiler ADVANCED_MODE
        /*jslint sub:true */
        global['signals'] = signals;
    }

}(this));

},{}]},{},[1])(1)
});