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

    var reallySpooky = new SpookyEl(require('./hbs/ReallySpooky.hbs')).appendTo(spookyBody);

    var spookyHeading = new SpookyEl('.spooky-heading', reallySpooky);
    console.log('spookyHeading: ', spookyHeading);

});
