var _ = require('lodash');
var select = require('dom-select');
var style = require('dom-style');
var domify = require('domify');
var on = require('dom-event');
var off = on.off;
var append = require('insert').append;
var remove = require('insert').remove;
var inherits = require('inherits');
var mixes = require('mixes');
var addPx = require('add-px');
var Signal = require('signals').Signal; 

var SpookyElement = function(elOrData, parentOrData){
    
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
    // if (!this.view){
    //     throw new Error('Could not find or create a DOM element.');
    // }
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

    select: function(selector, context){
        if (context instanceof SpookyElement){ context = context.view; }
        this.view = select(selector, context);
        return this;
    },

    appendTo: function(elOrSelector){
        if (!this.view) throw new Error('The view is not defined in this SpookyElement');
        var el = elOrSelector;
        if (_.isString(el)){ el = select(el) }
        if (el instanceof SpookyElement){ el = el.view; }
        append(el, this.view);
        // dispatch
        this.onAppended.dispatch(this);
        return this;
    },

    append: function(el){
        if (!this.view) throw new Error('The view is not defined in this SpookyElement');
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
        if (!this.view) throw new Error('The view is not defined in this SpookyElement');
        on(this.view, event, handler);
        return this;
    },

    off: function(event, handler){
        if (!this.view) throw new Error('The view is not defined in this SpookyElement');
        on(this.view, event, handler);
        return this;
    },

    css: function(props){
        if (!this.view) throw new Error('The view is not defined in this SpookyElement');
        style(this.view, props);
        return this;
    },

    show: function(delay, onComplete){
        if (onComplete) onComplete();
        return this;
    },

    hide: function(delay, onComplete){
        if (onComplete) onComplete();
        return this;
    },

    resize: function(w, h){
        this.width = w;
        this.height = h;
        this.css({
            width: addPx(w),
            height: addPx(h)
        });
        return this;
    },

    rip: function(){
        this.removeAddedSignals();
        if (this.view){ remove(this.view); }
        this.view = null;
    },

    // CSS Hepers
    
    absolute: function(){
        this.css({
            position: 'absolute',
            top: '0px',
            left: '0px'
        });
    },

    z: function(z){
        this.css({
            zIndex: z
        });
    },

    // Signals
    // Add and keep track of signals for easy removal
    addSignal: function(signal, handler, once){
        if (!this._addedSignals) this._addedSignals = [];
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

    removeSignal: function(signal, handler){
        // Remove signals
        if (this._addedSignals && this._addedSignals.length){
            this._addedSignals.some(function(signalObj, i){
                if (signalObj.signal == signal && signalObj.handler == handler){
                    signalObj.signal.remove( signalObj.handler );
                    this._addedSignals.splice(i, 1);
                    return true;
                }
            });
        }
    },

    removeAddedSignals: function(){
        // Remove signals
        if (this._addedSignals && this._addedSignals.length){
            this._addedSignals.forEach(function(signalObj){
                signalObj.signal.remove( signalObj.handler );
            }
            this._addedSignals = [];
        }
    }

});

module.exports = SpookyElement;

