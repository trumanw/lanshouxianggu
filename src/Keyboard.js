(function(ns){

var Keyboard = ns.Keyboard = Hilo.Class.create({
    Extends: Hilo.Container,
    constructor: function(properties){
        Keyboard.superclass.constructor.call(this, properties);
        this.init(properties);
    },

    init: function(properties){
        // var keyHeight = 160;
        // var keyWidth = 180;
        var keyBorderWidth = 2;
        var doKey = new Hilo.Graphics({
            id: 'do',
            x: 0,
            y: properties.height - properties.keyHeight,
            width: properties.keyWidth,
            height: properties.keyHeight
        });
        doKey.lineStyle(keyBorderWidth, "#090909").drawRect(keyBorderWidth/2, -keyBorderWidth/2, properties.keyWidth-keyBorderWidth, properties.keyHeight).endFill();

        var riKey = new Hilo.Graphics({
            id: "ri",
            x: properties.keyWidth,
            y: properties.height - properties.keyHeight,
            width: properties.keyWidth,
            height: properties.keyHeight
        });
        riKey.lineStyle(keyBorderWidth, "#090909").drawRect(keyBorderWidth/2, -keyBorderWidth/2, properties.keyWidth-keyBorderWidth, properties.keyHeight).endFill();

        var miKey = new Hilo.Graphics({
            id: "mi",
            x: 2 * properties.keyWidth,
            y: properties.height - properties.keyHeight,
            width: properties.keyWidth,
            height: properties.keyHeight
        });
        miKey.lineStyle(keyBorderWidth, "#090909").drawRect(keyBorderWidth/2, -keyBorderWidth/2, properties.keyWidth-keyBorderWidth, properties.keyHeight).endFill();

        var faKey = new Hilo.Graphics({
            id: "fa",
            x: 3 * properties.keyWidth,
            y: properties.height - properties.keyHeight,
            width: properties.keyWidth,
            height: properties.keyHeight
        });
        faKey.lineStyle(keyBorderWidth, "#090909").drawRect(keyBorderWidth/2, -keyBorderWidth/2, properties.keyWidth-keyBorderWidth, properties.keyHeight).endFill();

        this.addChild(doKey, riKey, miKey, faKey);

        // Show keyboard
        this.visible = true;
    }
});

})(window.game);
