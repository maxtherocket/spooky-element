# spooky-element

A very lightweight, jQuery-like wrapper for DOM elements, with a lot of functionality.

Makes working with DOM elements a little less scary :)

Couldn't find anything like this, so I've put it together to help me build awesome sites, extra FAST!

- Saves you time
- Built for performance! Great for creating DOM on the fly
- Works well with Handlebars, especially with [hbsfy](https://github.com/epeli/node-hbsfy)
- Works great with [GSAP](http://greensock.com/gsap) (TweenLite, TimelineLite, etc.)
- Built on the shoulders of giants
- Extra spooky :ghost:

![SPOOKY](http://i.imgur.com/Ut23RfP.png)

## Installation

`npm install spooky-element`

## Usage

### Feature Examples

```javascript
var SpookyElement = require('spooky-element');

// Select an existing element withing the DOM
// new SpookyElement( selector [, parentSelector] )
// or
// new SpookyElement( selector [, spookyElementParent] )

new SpookyElement('.ghost');
new SpookyElement('.ghost', '#haunted-house');
// Or without new keyword
SpookyElement('.ghost', spookyElementHauntedHouse);

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
// using hbsfy (https://github.com/epeli/node-hbsfy) browserify transform here, very handy!

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
```

### Basic Usage

```javascript
var spooky = new SpookyElement( '<div class="boo">BOO!</div>' );
spooky.css({
    fontSize: '40px',
    fontWeight: 'bold',
    color: 'red',
    cursor: 'pointer'
})
// yes it's chainable
.appendTo('body')
.on('mousedown', function(){
    spooky.css('color', 'blue');
})
.on('mouseup', function(){
    spooky.css('color', 'red');
});

```

### All The Goods

```javascript

spookyElementInstance.view // Contains the DOM element

getElement(selector) // returns found element within the spooky element

findElement(selector) // alias to getElement()

find(selector) // Returns a found DOM element and wraps it into a SpookyElement

findAll(selector) // Returns an array of all found DOM elements as SpookyElements

appendTo(element) // Appends to either a DOM element or a SpookyElement

prependTo(element) // Prepends to a DOM or a SpookyElement

append(element) // Append a DOM or a SpookyElement

on(event, handler) // Attach an event handler to the element

off(event, handler) // Detach an event handler from the element

css(objectOrProp [, val]) // Modify CSS

attr(attr, val) // Modify attributes

addClass(class) // Add class to element

removeClass(class) // Remove class from element

hasClass(class) // Check if element has class

getWidth() // Get element width

getHeight() // Get element height

html([html]) // Get or set innerHTML

resize(w,h) // Set the width/height of the element

destroy() // Removes element

remove() // Removes element

```


## License MIT

See [LICENSE](LICENSE) file