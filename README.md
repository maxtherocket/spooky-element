# spooky-element

A very lightweight wrapper for DOM elements, with a lot of functionality.

Makes working with DOM elements a little less scary :)

[Imgur](http://i.imgur.com/4jTSYHn.png)

## Installation

`npm install spooky-element`

## Usage

```javascript

// Select an existing element withing the DOM
// new SpookyElement( selector [, parentSelector] )
// or
// new SpookyElement( selector [, spookyElementParent] )

new SpookyElement('.ghost');
new SpookyElement('.ghost', '#haunted-house');
new SpookyElement('.ghost', spookyHauntedHouse);

// Provide a DOM element
// new SpookyElement( domElement );

new SpookyElement( document.getElementById('boo') );

// Provide an HTML string
// new SpookyElement( HTMLString );

new SpookyElement( '<div class="boo"></div>' );

// Provide a template function (like handlebars)
// new SpookyElement( templateFunction [, templateData] );

new SpookyElement( require('templates/Boo.hbs'), {autoSpook:true} );

// You can also extend a SpookyElement
// ES6 Syntax here ... spooooky
// This will automatically render the template on initializations

class ExtraSpooky extends SpookyElement {
    constructor(){
        this.template = require('../templates/ui/ExtraSpooky.hbs');
        super();
    }
}
// Pass in data to the template for extra spoookiness
var extraSpooky = new ExtraSpooky({eyes:'angry', slime:true});