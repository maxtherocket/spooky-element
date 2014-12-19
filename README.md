# spooky-element

A very lightweight, jQuery-like wrapper for DOM elements, with a lot of functionality.

Makes working with DOM elements a little less scary :)

- Very versatile and saves you time!
- Works well with Handlebars, especially with [hbsfy](https://github.com/epeli/node-hbsfy)
- Works with [GSAP](http://greensock.com/gsap) (TweenLite, TimelineLite, etc.)
- Extra spooky

![SPOOKY](http://i.imgur.com/Ut23RfP.png)

## Installation

`npm install spooky-element`

## Usage

### Initializing

```javascript
var SpookyElement = require('spooky-element');

// Select an existing element withing the DOM
// new SpookyElement( selector [, parentSelector] )
// or
// new SpookyElement( selector [, spookyElementParent] )

new SpookyElement('.ghost');
new SpookyElement('.ghost', '#haunted-house');
new SpookyElement('.ghost', spookyHauntedHouse);

// Pass in jQuery elements
new SpookyElement($('.ghost'), $('body'));

// Pass in a DOM element
// new SpookyElement( domElement );

new SpookyElement( document.getElementById('boo') );

// Pass in an HTML string
// new SpookyElement( HTMLString );

new SpookyElement( '<div class="boo"></div>' );

// Provide a template function (like handlebars)
// new SpookyElement( templateFunction [, templateData] );
// using [hbsfy](https://github.com/epeli/node-hbsfy) browserify transform here, very handy!

new SpookyElement( require('templates/Boo.hbs'), {autoSpook:true} );

// You can also extend a SpookyElement
// This will automatically render the template on initialization

var ExtraSpooky = function(data){
    this.template = require('../templates/ExtraSpooky.hbs');
    SpookyElement.call(this, data);
}
ExtraSpooky.prototype = Object.create(SpookyElement.prototype);


// Or ES6 syntax
class ExtraSpooky extends SpookyElement {
    constructor(data){
        this.template = require('../templates/ExtraSpooky.hbs');
        super(data);
    }
}

// Pass in data to the template for extra spoookiness
var extraSpooky = new ExtraSpooky({eyes:'angry', slime:true});