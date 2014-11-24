var _ = require('lodash');
var select = require('dom-select');
var style = require('dom-style');
var domify = require('domify');
var append = require('insert').append;
var remove = require('insert').remove;
var inherits = require('inherits');
var mixes = require('mixes');
 
var SpookyElement = function(elOrData, parentOrData){
    this._view = null;
    if (_.isFunction(elOrData)){
        // THis must be a template
        this.template = elOrData;
        this.view = domify( this.render(parentOrData) );
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
        this.view = select(selector, context);
        return this;
    },

    appendTo: function(elOrSelector){
        var el = elOrSelector;
        if (_.isString(el)){ el = select(el) }
        if (el instanceof SpookyElement){ el = el.view; }
        append(el, this.view);
        return this;
    },

    append: function(el){
        append(this.view, el);
        return this;
    },

    render: function(data){
        if (this.template && _.isFunction(this.template)){
            return this.template(data);
        }
        return this;
    },

    css: function(props){
        if (!this.view) return;
        style(this.view, props);
    },

    show: function(delay, onComplete){
        if (onComplete) onComplete();
    },

    hide: function(delay, onComplete){
        if (onComplete) onComplete();
    },

    rip: function(){
        if (this.view){ remove(this.view); }
        this.view = null;
    }

});

module.exports = SpookyElement;

