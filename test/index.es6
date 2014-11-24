var SpookyEl = require('../index');
var domready = require('domready');
var Class = require('jsface').Class;
var tween = require('gsap');

class ReallySpookyElement extends SpookyEl {

    constructor() {
        this.template = require('./hbs/ReallySpooky.hbs');
        super();
        this.css({
            opacity: 0
        });
        console.log('this.length: ', this.length);
        console.log('this[0]: ', this[0]);
        console.log('this: ', this);
    }

    show(delay, onComplete){
        tween.to(this, 1, {opacity:1, onComplete:onComplete});
    }

}


domready(function(){

    var basicSpooky = new SpookyEl('<div>BOO!</div>');

    var spookyBody = new SpookyEl('body').append(basicSpooky);

    var reallySpooky = new ReallySpookyElement();
    reallySpooky.appendTo(spookyBody).show(0, function(){
        reallySpooky.rip();
    });

    new SpookyEl(require('./hbs/ReallySpooky.hbs')).appendTo(spookyBody);

});
