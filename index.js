var _ = require('lodash');
var select = require('dom-select');
var style = require('dom-css');
var domify = require('domify');
var on = require('dom-event');
var off = on.off;
var append = require('insert').append;
var remove = require('insert').remove;
var inherits = require('inherits');
var mixes = require('mixes');
var Signal = require('signals').Signal;
var atts = require('atts');
var elementClass = require('element-class');

var noViewErrorMsg = 'The view is not defined in this SpookyElement';

/**
 * Creates or wraps a DOM element.
 * @class  SpookyElement
 * @param String
 */
var SpookyElement = function(elOrData, parentOrData){
    
    if (elOrData){
        // If the passed elemen is already an instance of spooky element, return the passed element
        if (elOrData.spooky){
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

    if (_.isFunction(elOrData)){
        // THis must be a template
        this.template = elOrData;
        var dom = domify( this.render(parentOrData) );
        this.view = dom;
    } else if (_.isString(elOrData)){
        if (elOrData.indexOf('<') === 0){
            // This is a tag
            this.view = domify(elOrData);
        } else {
            // This is a selector
            this.select(elOrData, parentOrData);
        }
    } else if (_.isElement(elOrData)){
        this.view = elOrData;
    } else if (this.template){
        this.view = domify( this.render(elOrData) );
    }

    // Set this to identify spooky elements
    this.spooky = true;

}

// Inherit from Array to make SpookyElement act like a jQuery object
inherits(SpookyElement, Array);

mixes(SpookyElement, {

    view: {
        set: function(view){
            this._view = view;
            if (view === null){
                this.length = 0;
            } else {
                // Make it jQuery compatible, so that TweenLite can use it
                this[0] = this._view;
                this.length = 1;
            }
        },
        get: function(){
            return this._view;
        }
    },

    // Called by spooky-router when view parameters have changed
    paramsChanged: function(){
    },

    select: function(selector, context){
        if (context && context.spooky){ context = context.view; }
        this.view = select(selector, context);
        return this;
    },

    getElement: function(selector){
        if (!this.view) throw new Error(noViewErrorMsg);
        if (!selector){
            return this.view;
        } else {
            return select(selector, this.view);
        }
    },

    findElement: function(selector){
        this.getElement(selector);
    },

    appendTo: function(elOrSelector){
        if (!this.view) throw new Error(noViewErrorMsg);
        var el = elOrSelector;
        if (_.isString(el)){ el = select(el) }
        if (el && el.spooky){ el = el.view; }
        append(el, this.view);
        // dispatch
        this.onAppended.dispatch(this);
        return this;
    },

    append: function(el){
        if (!this.view) throw new Error(noViewErrorMsg);
        if (_.isString(el)){
            // This is an HTML tag or a Text node
            el = domify(el);
        }
        append(this.view, el);
        return this;
    },

    render: function(data){
        if (this.template && _.isFunction(this.template)){
            var templateString = this.template(data);
            var trimmedString = templateString.replace(/^\s+|\s+$/g, '');
            return trimmedString;
        }
        return this;
    },

    on: function(event, handler){
        if (!this.view) throw new Error(noViewErrorMsg);
        on(this.view, event, handler);
        return this;
    },

    off: function(event, handler){
        if (!this.view) throw new Error(noViewErrorMsg);
        on(this.view, event, handler);
        return this;
    },

    css: function(propsOrProperty, styleVal){
        if (!this.view) throw new Error(noViewErrorMsg);
        if (styleVal){
            style(this.view, propsOrProperty, styleVal);
        } else {
            style(this.view, propsOrProperty);
        }
        return this;
    },

    attr: function(name, value){
        if (!this.view) throw new Error(noViewErrorMsg);
        if (arguments.length == 2){
            atts.attr(this.view, name, value);
            return this;
        } else if (arguments.length == 1) {
            return atts.attr(this.view, name);
        }
        return this;
    },

    addClass: function(clas){
        if (!this.view) throw new Error(noViewErrorMsg);
        elementClass(this.view).add(clas);
        return this;
    },

    removeClass: function(clas){
        if (!this.view) throw new Error(noViewErrorMsg);
        elementClass(this.view).remove(clas);
        return this;
    },

    hasClass: function(clas){
        if (!this.view) throw new Error(noViewErrorMsg);
        return elementClass(this.view).has(clas);
    },

    getWidth: function(){
        if (!this.view) throw new Error(noViewErrorMsg);
        return this.view.offsetWidth;
    },

    getHeight: function(){
        if (!this.view) throw new Error(noViewErrorMsg);
        return this.view.offsetHeight;
    },

    /**
     * Sets or returns the innerHTML property of the view
     * @method  html
     * @param String html
     */
    html: function(html){
        if (!this.view) throw new Error(noViewErrorMsg);
        if (html){
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
        this.removeAddedSignals();
        if (this.view){ remove(this.view); }
        this.view = null;
    },

    // Signals
    // Add and keep track of signals for easy removal
    addSignal: function(signal, handler, context, once){
        if (!signal) throw new Error('Signal was not provided');
        if (!handler) throw new Error('handler funciton was not provided');
        if (!this._addedSignals) this._addedSignals = [];
        if (_.isObject(context)) handler = handler.bind(context);
        var signalObj = {
            signal: signal,
            handler: handler
        };
        // Remove just to be safe
        this.removeSignal(signal, handler);
        if (once === true){
            signalObj.signal.addOnce( signalObj.handler );
        } else {
            signalObj.signal.add( signalObj.handler );
        }
        this._addedSignals.push( signalObj );
    },

    addSignalOnce: function(signal, handler, context){
        this.addSignal(signal, handler, context, true);
    },

    removeSignal: function(signal, handler){
        // Remove signals
        if (this._addedSignals && this._addedSignals.length){
            this._addedSignals.some(function(signalObj, i){
                if (signalObj.signal == signal && signalObj.handler == handler){
                    signalObj.signal.remove( signalObj.handler );
                    this._addedSignals.splice(i, 1);
                    return true;
                }
            }.bind(this));
        }
    },

    removeAddedSignals: function(){
        // Remove signals
        if (this._addedSignals && this._addedSignals.length){
            this._addedSignals.forEach(function(signalObj){
                signalObj.signal.remove( signalObj.handler );
            });
            this._addedSignals = [];
        }
    }

});

module.exports = SpookyElement;