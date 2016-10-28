(function(ns){

var Asset = ns.Asset = Hilo.Class.create({
    Mixes: Hilo.EventMixin,

    queue: null,
    bg: null,
    keyboard: null,
    pitch: null,

    load: function(){
        var resources = [
            {id:'bg', src:'images/bg.png'},
            {id:'keyboard', src:'images/keyboard.png'},
            {id:'pitch', src:'images/pitch.jpg'}
        ];

        this.queue = new Hilo.LoadQueue();
        this.queue.add(resources);
        this.queue.on('complete', this.onComplete.bind(this));
        this.queue.start();
    },

    onComplete: function(e){
        this.bg = this.queue.get('bg').content;
        this.keyboard = this.queue.get('keyboard').content;
        this.pitch = this.queue.get('pitch').content;

        this.queue.off('complete');
        this.fire('complete');
    }
});

})(window.game);
