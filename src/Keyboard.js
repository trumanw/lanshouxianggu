(function(ns){

var Keyboard = ns.Keyboard = Hilo.Class.create({
    Extends: Hilo.Container,
    constructor: function(properties){
        Keyboard.superclass.constructor.call(this, properties);
        this.init(properties);
    },

    init: function(properties){
        var keyHeight = 180;
        var keyWidth = 180;
        var doKey = new Hilo.Graphics({
            id: 'do',
            x: 0,
            y: this.height - keyHeight,
            width: keyWidth,
            height: keyHeight
        });
        doKey.lineStyle(4, "#009898").drawRect(0, 0, keyWidth-2, keyHeight-2).endFill();

        var riKey = new Hilo.Graphics({
            id: "ri",
            x: keyWidth,
            y: this.height - keyHeight,
            width: keyWidth,
            height: keyHeight
        });
        riKey.lineStyle(4, "#009898").drawRect(0, 0, keyWidth-2, keyHeight-2).endFill();

        var miKey = new Hilo.Graphics({
            id: "mi",
            x: 2 * keyWidth,
            y: this.height - keyHeight,
            width: keyWidth,
            height: keyHeight
        });
        miKey.lineStyle(4, "#009898").drawRect(0, 0, keyWidth-2, keyHeight-2).endFill();

        var faKey = new Hilo.Graphics({
            id: "fa",
            x: 3 * keyWidth,
            y: this.height - keyHeight,
            width: keyWidth,
            height: keyHeight
        });
        faKey.lineStyle(4, "#009898").drawRect(0, 0, keyWidth-2, keyHeight-2).endFill();

        this.addChild(doKey, riKey, miKey, faKey);

        // Show keyboard
        this.visible = true;
    }
});

})(window.game);
