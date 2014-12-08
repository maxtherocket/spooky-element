var SpookyEl = require('../index');
var domready = require('domready');
var tween = require('gsap');
var Signal = require('signals');

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

    var spookyBody = new SpookyEl('body');
    spookyBody.on()

    var reallySpooky = new ReallySpookyElement();
    reallySpooky.appendTo(spookyBody).show(0, function(){
        reallySpooky.rip();
    });

    var spookySignal = new Signal();
    var evenSpookierSignal =  new Signal();

    var spookySignalHandler = function(){
        console.log('spooky signal handler');
    }

    var spookyAddSignal = new SpookyEl('<div>ADD SIGNAL</div>').appendTo(spookyBody);
    spookyAddSignal.on('click', function(){
        reallySpooky.addSignal(spookySignal, spookySignalHandler);
        console.log('AFTER ADD reallySpooky._addedSignals: ', reallySpooky._addedSignals);
    });
    var spookyRemoveSignal = new SpookyEl('<div>REMOVE SIGNAL</div>').appendTo(spookyBody);
    spookyRemoveSignal.on('click', function(){
        reallySpooky.removeSignal(spookySignal, spookySignalHandler);
        console.log('AFTER REMOVE reallySpooky._addedSignals: ', reallySpooky._addedSignals);
    });
    var dispatchSignal = new SpookyEl('<div>DISPATCH SIGNAL</div>').appendTo(spookyBody);
    dispatchSignal.on('click', function(){
        spookySignal.dispatch();
    });

});
