(function(ns){

var Pitch = ns.Stave = Hilo.Class.create({
    Extends: Hilo.Container,
    constructor: function(properties){
        Stave.superclass.constructor.call(this, properties);
        this.init(properties);
    },

    init: function(properties){

    }
});

})(window.game);
