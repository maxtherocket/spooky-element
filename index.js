var $ = require('jquery');
var inherits = require('inherits');
var _ = require('lodash');
var select = require('dom-select');
var domify = require('domify');
var append = require('insert').append;
var remove = require('insert').remove;
 
var SpookyElement = function(elOrData, parentOrData){
    this.view = null;
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

SpookyElement.prototype = {

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

    rip: function(){
        if (this.view){ remove(this.view); }
    }

}

module.exports = SpookyElement;

