var $ = require('jquery');
var inherits = require('inherits');

var SpookyElement = function(el, context){
	return $.fn.init.call(this, el, context);
}

SpookyElement.prototype = Object.create($.fn);

SpookyElement.prototype.rip = function(){
	this.remove();
}

module.exports = SpookyElement;

