var SpookyEl = require('../index');
var domready = require('domready');
var Class = require('jsface').Class;

class ReallySpookyElement extends SpookyEl {

    constructor() {
        this.template = require('./hbs/ReallySpooky.hbs');
        super();
    }

}


domready(function(){

    var basicSpooky = new SpookyEl('<div>BOO!</div>');

    var spookyBody = new SpookyEl('body').append(basicSpooky);

    var reallySpooky = new ReallySpookyElement();
    reallySpooky.appendTo(spookyBody).rip();

    new SpookyEl(require('./hbs/ReallySpooky.hbs')).appendTo(spookyBody);

});
