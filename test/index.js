var SpookyEl = require('../index');
var domready = require('domready');
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

    var basicSpooky = new SpookyEl('<div>BOO!</div>').css('width', 100).css({background:'#666'});

    var spookyBody = new SpookyEl('body').append(basicSpooky);

    var reallySpooky = new ReallySpookyElement();
    reallySpooky.appendTo(spookyBody).animateIn(0, function(){
        reallySpooky.destroy();
    });

    var superSpooky = new SpookyEl(require('./hbs/ReallySpooky.hbs')).appendTo(spookyBody);

    var spookyHeading = new SpookyEl('.spooky-heading', superSpooky);
    
    var spookyAppend = new SpookyEl('<div></div>').appendTo(spookyBody).append('Spooky Append').resize(100,100);

});
