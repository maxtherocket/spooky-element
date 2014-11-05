var SpookyElement = require('../');
var $ = require('jquery');

// var div = document.createElement('div');
// div.className = 'howdy';
// document.body.appendChild(div);


// new SpookyElement('div') -> creats a div
// new SpookyElement('.spooky-div') -> finds an element

var spooky = new SpookyElement('<div></div>');

debugger;

spooky.css({
	width: 100,
	height: 100,
	background: '#ff0000'
}).appendTo(document.body);

spooky.rip();
