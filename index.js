var select = require('queried');
var style = require('dom-css');
var domify = require('domify');
var on = require('dom-events').on;
var off = require('dom-events').off;
var once = require('dom-events').once;
var append = require('insert').append;
var prepend = require('insert').prepend;
var remove = require('insert').remove;
var mixes = require('mixes');
var Signal = require('signals').Signal;
var atts = require('atts');
var elementClass = require('element-class');

var NO_VIEW_ERROR_MSG = 'The view is not defined in this SpookyElement';

var isUndefined = require('is-undefined');
var isString = require('is-string');
var isFunction = require('is-function');
var isElement = require('is-element');

/**
 * Creates or wraps a DOM element.
 * @class  SpookyElement
 * @param String
 */
var SpookyElement = function(elOrData, parentOrData){
    
    // Create an instance if calling without new
    if (!(this instanceof SpookyElement)){
        return new SpookyElement(elOrData, parentOrData);
    }

    if (elOrData){
        // If the passed elemen is already an instance of spooky element, return the passed element
        if (elOrData._isSpookyElement){
            return elOrData;
        } else if (elOrData.jquery){
            // If a jquery object then extract th dom element
            if (elOrData.length){
                elOrData = elOrData[0];
            } else {
                return this;
            }
        }
    }

    // Parent (context) object could be a jQuery element
    if (parentOrData && parentOrData.jquery){
        parentOrData = (parentOrData.length) ? parentOrData[0] : null;
    }

    this._view = null;
    this.onAppended = new Signal();
    this.onPrepended = new Signal();

    if (isFunction(elOrData)){
        // THis must be a template
        this.template = elOrData;
        var dom = domify( this._render(parentOrData) );
        this.view = dom;
    } else if (isString(elOrData)){
        if (elOrData.indexOf('<') === 0){
            // This is a tag
            this.view = domify(elOrData);
        } else {
            // This is a selector
            this.select(elOrData, parentOrData);
        }
    } else if (isElement(elOrData)){
        this.view = elOrData;
    } else if (this.template){
        this.view = domify( this._render(elOrData) );
    }

    // Set this to identify spooky elements
    this._isSpookyElement = true;

}

// Inherit from Array to make SpookyElement act like a jQuery object
//inherits(SpookyElement, Array);
SpookyElement.prototype = Object.create(Array.prototype);

mixes(SpookyElement, {

    view: {
        set: function(view){
            this._view = view;
            if (view === null){
                this.length = 0;
            } else {
                // Make it jQuery compatible, so that gsap (TweenLite, TweenMax) can use it
                this[0] = this._view;
                this.length = 1;
            }
        },
        get: function(){
            return this._view;
        }
    },

    select: function(selector, context){
        if (context && context._isSpookyElement){ context = context.view; }
        this.view = select(selector, context);
        return this;
    },

    getElement: function(selector){
        if (!this.view) throw new Error(NO_VIEW_ERROR_MSG);
        if (!selector){
            return this.view;
        } else {
            return select(selector, this.view);
        }
    },

    findElement: function(selector){
        return this.getElement(selector);
    },

    find: function(selector){
        var element = this.getElement(selector);
        if (element){
            return new SpookyElement(element);
        }
        return null;
    },

    findAll: function(selector){
        if (!this.view) throw new Error(NO_VIEW_ERROR_MSG);
        var elements = select.all(selector, this.view);
        var spookyElements = [];
        if (elements){
            for (var i = 0, len = elements.length; i < len; i += 1) {
                var element = elements[i];
                spookyElements.push( SpookyElement(element) );
            }
        }
        return spookyElements;
    },

    appendTo: function(elOrSelector){
        if (!this.view) throw new Error(NO_VIEW_ERROR_MSG);
        var el = elOrSelector;
        if (isString(el)){ el = select(el) }
        if (el && el._isSpookyElement){ el = el.view; }
        append(el, this.view);
        // dispatch
        this.onAppended.dispatch(this);
        return this;
    },

    prependTo: function(elOrSelector){
        if (!this.view) throw new Error(NO_VIEW_ERROR_MSG);
        var el = elOrSelector;
        if (isString(el)){ el = select(el) }
        if (el && el._isSpookyElement){ el = el.view; }
        prepend(el, this.view);
        // dispatch
        this.onPrepended.dispatch(this);
        return this;
    },

    append: function(el){
        if (!this.view) throw new Error(NO_VIEW_ERROR_MSG);
        if (isString(el)){
            // This is an HTML tag or a Text node
            el = domify(el);
        }
        append(this.view, el);
        return this;
    },

    prepend: function(el){
        if (!this.view) throw new Error(NO_VIEW_ERROR_MSG);
        if (isString(el)){
            // This is an HTML tag or a Text node
            el = domify(el);
        }
        prepend(this.view, el);
        return this;
    },

    _render: function(data){
        if (this.template && isFunction(this.template)){
            var templateString = this.template(data);
            var trimmedString = templateString.replace(/^\s+|\s+$/g, '');
            return trimmedString;
        }
        return this;
    },

    on: function(event, handler){
        if (!this.view) throw new Error(NO_VIEW_ERROR_MSG);
        on(this.view, event, handler);
        return this;
    },

    off: function(event, handler){
        if (!this.view) throw new Error(NO_VIEW_ERROR_MSG);
        off(this.view, event, handler);
        return this;
    },

    once: function(event, handler){
        if (!this.view) throw new Error(NO_VIEW_ERROR_MSG);
        once(this.view, event, handler);
        return this;
    },

    css: function(propsOrProperty, styleVal){
        if (!this.view) throw new Error(NO_VIEW_ERROR_MSG);
        if (styleVal){
            style(this.view, propsOrProperty, styleVal);
        } else {
            style(this.view, propsOrProperty);
        }
        return this;
    },

    attr: function(name, value){
        if (!this.view) throw new Error(NO_VIEW_ERROR_MSG);
        if (arguments.length == 2){
            atts.attr(this.view, name, value);
            return this;
        } else if (arguments.length == 1) {
            return atts.attr(this.view, name);
        }
        return this;
    },

    addClass: function(clas){
        if (!this.view) throw new Error(NO_VIEW_ERROR_MSG);
        elementClass(this.view).add(clas);
        return this;
    },

    removeClass: function(clas){
        if (!this.view) throw new Error(NO_VIEW_ERROR_MSG);
        elementClass(this.view).remove(clas);
        return this;
    },

    hasClass: function(clas){
        if (!this.view) throw new Error(NO_VIEW_ERROR_MSG);
        return elementClass(this.view).has(clas);
    },

    getWidth: function(){
        if (!this.view) throw new Error(NO_VIEW_ERROR_MSG);
        return this.view.offsetWidth;
    },

    getHeight: function(){
        if (!this.view) throw new Error(NO_VIEW_ERROR_MSG);
        return this.view.offsetHeight;
    },

    /**
     * Sets or returns the innerHTML property of the view
     * @method  html
     * @param String html
     */
    html: function(html){
        if (!this.view) throw new Error(NO_VIEW_ERROR_MSG);
        if (!isUndefined(html)){
            this.view.innerHTML = html;
        } else {
            return this.view.innerHTML;
        }
        return this;
    },

    animateIn: function(opts, onComplete){
        if (onComplete) onComplete();
        return this;
    },

    animateOut: function(opts, onComplete){
        if (onComplete) onComplete();
        return this;
    },

    resize: function(w, h){
        this.width = w;
        this.height = h;
        this.css({
            width: w,
            height: h
        });
        return this;
    },

    destroy: function(){
        if (this.view){ this.remove(); }
        this.view = null;
    },

    remove: function(){
        if (this.view) {
	        remove(this.view);
	    } 
	    this.view = null;
        return this;
    }

});

module.exports = SpookyElement;
