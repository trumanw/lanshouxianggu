(function(ns){

var Pitch = ns.Pitch = Hilo.Class.create({
    Extends: Hilo.Container,
    constructor: function(properties){
        Pitch.superclass.constructor.call(this, properties);

        this.numTotalPitches = properties.layer + 1;
        this.numOffStavePitches = 1;

        // this.reset(properties.image, properties);
        this.createPitches(properties.image, properties);
        this.moveTween = new Hilo.Tween(this, null, {
            onComplete: this.resetPitches.bind(this)
        });
    },

    startY: 0,

    width: 0,
    height: 0,
    pitchHeight: 0,
    pitchWidth: 0,

    numTotalPitches: 0,
    numOffStavePitches: 0,

    passThrough: 0,

    createPitches: function(image, properties){
        for(var i = 0; i < this.numTotalPitches; i++){
            var pitch = new Hilo.Bitmap({
                id: 'pitch' + i,
                image: image,
                scaleX: 0.52,
                scaleY: 0.52
            }).addTo(this);

            this.placePitches(pitch, i);
        }
    },

    renewPitches: function(image, properties){
        for(var i = 0; i < this.numTotalPitches; i++){
            var pitch = new Hilo.Bitmap({
                id: 'pitch' + i,
                image: image,
                scaleX: 0.52,
                scaleY: 0.52
            })

            // this.getChildAt(i) = pitch;
            this.setChildIndex(pitch, i);
            this.placePitches(pitch, i);
        }
    },

    placePitches: function(pitch, index){
        // randomly generate a placement of pitch in one layer
        var placement = (4 * Math.random()) >> 0;

        // init the position of the pitch
        pitch.x = this.pitchWidth * placement + ((this.pitchWidth - 170) / 2);
        pitch.y = this.pitchHeight * (index - 1);
    },

    resetPitches: function(){
        var total = this.children.length;
        // reset the pitch moved below to the bottom of the stave
        for(var i = 0; i < this.numOffStavePitches; i++) {
            var pitch = this.getChildAt(total - i - 1);
            this.setChildIndex(pitch, 0);
            this.placePitches(pitch, i);
        }

        // reset the x coordinate of all the pitches inside stave
        for(var i = 0; i < total - this.numOffStavePitches; i++){
            var pitch = this.getChildAt(i+1);
            pitch.y = this.pitchHeight * (i >> 0);
        }

        // reset x coordinate of pitches
        this.y = 0;

        // update number of the passing through pitches
        this.passThrough += this.numOffStavePitches;
    },

    hitTestPitch: function(index) {
        var total = this.children.length;
        var currentPitch = Math.floor((this.children[total-this.numOffStavePitches].x / this.pitchWidth) + 1);
        return currentPitch == index;
    },

    startMove: function(){
        // setup length interval of animation
        var targetY = this.pitchHeight * this.numOffStavePitches;
        Hilo.Tween._tweens.push(this.moveTween);
        // setup duration of animation
        this.moveTween.duration = 50;
        // setup the transformation of animation
        this.moveTween.setProps({y:this.y}, {y: targetY});
        // startup animation
        this.moveTween.start();
    },

    stopMove: function(){
        if(this.moveTween) this.moveTween.pause();
    },

    reset: function(image, properties){
        this.y = this.startY;
        this.passThrough = 0;
        // new pitches
        this.renewPitches(image, properties);
        // show itself
        this.visible = true;
    }

});

})(window.game);
