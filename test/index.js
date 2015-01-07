var SpookyEl = require('../index');
var SpookyElement = SpookyEl;
var domready = require('domready');
var tween = require('gsap');
var $ = require('jquery');

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

    var basicSpooky = SpookyEl('<div>BOO!</div>').css('width', 100).css({background:'#666'});

    var spookyBody = new SpookyEl('body').append(basicSpooky);

    var reallySpooky = new ReallySpookyElement();
    reallySpooky.appendTo(spookyBody).animateIn(0, function(){
        reallySpooky.destroy();
    });

    var ES5Spooky = function(data){
        this.template = require('./hbs/ES5Spooky.hbs');
        SpookyEl.call(this, data);
    }
    ES5Spooky.prototype = Object.create(SpookyEl.prototype);
    var es5Spooky = (new ES5Spooky()).appendTo(spookyBody);

    var superSpooky = new SpookyEl(require('./hbs/ReallySpooky.hbs')).appendTo(spookyBody);

    var spookyHeading = new SpookyEl('.spooky-heading', superSpooky);
    
    var spookyAppend = new SpookyEl('<div id="spooky-append"></div>').appendTo(spookyBody).append('Spooky Append').resize(100,100);

    var spookyAppendAppend = new SpookyEl( spookyAppend ).css({background:'#ff0000'});

    var spookyJQuery = new SpookyEl( $('#spooky-append') ).css({background:'#00ff00'});

    var spookyJQueryParent = new SpookyEl( $('#spooky-append'), $('body') ).css({background:'#0000ff'});

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

    spooky.attr('width', '400px');
    var width = spooky.attr('width');
    console.log('width: ', width);

    spooky.addClass('spookster');
    var hasClass = spooky.hasClass('spookster');
    console.log('hasClass: ', hasClass);
    spooky.removeClass('spookster');
    hasClass = spooky.hasClass('spookster');
    console.log('hasClass: ', hasClass);

});
