(function(){

window.onload = function(){
    game.init();
}

var game = window.game = {
    width: 0,
    height: 0,
    layer: 0,

    // Resources
    asset: null,
    stage: null,
    ticker: null,
    state: null,
    score: 0,

    // Scenario
    bg: null,
    stave: null,
    keyboard: null,
    pitch: null,

    init: function(){
        this.asset = new game.Asset();
        this.asset.on('complete', function(e){
            this.asset.off('complete');
            this.initStave();
        }.bind(this));
        this.asset.load();
    },

    initStave: function(){
        this.width = 720;
        this.height = 1280;
        this.layer = 8;
        this.scale = 0.5;

        // init stave context
        this.stave = new Hilo.Stage({
            renderType:'canvas',
            width: this.width,
            height: this.height,
            scaleX: this.scale,
            scaleY: this.scale
        });
        document.body.appendChild(this.stave.canvas);

        // init time ticker
        this.ticker = new Hilo.Ticker(60);
        this.ticker.addTick(Hilo.Tween);
        this.ticker.addTick(this.stave);
        this.ticker.start();

        // bind actions on DOM
        this.stave.enableDOMEvent(Hilo.event.POINTER_START, true);
        // this.stave.on(Hilo.event.POINTER_START, this.onUserInput.bind(this));

        // init parameters
        this.initBackground();
        this.initPitch();
        this.initKeyboard();

        // ready to play
        this.gameReady();

        // DEBUG
        this.pitch.startMove();
    },

    initKeyboard: function(){
        // init keyboard
        this.keyboard = new game.Keyboard({
            width: this.width,
            height: this.height,
            keyHeight: this.height / this.layer,
            keyWidth: this.width / 4
        }).addTo(this.stave);

        // bind actions on keyboard
        this.keyboard.getChildById('do').on(Hilo.event.POINTER_START, function(e){
            if(this.pitch.hitTestPitch(1)){
                // hit on the right pitch
                this.pitch.resetPitches();
            } else {
                // hit on the wrong pitch
                // game over
            }
        }.bind(this));

        this.keyboard.getChildById('ri').on(Hilo.event.POINTER_START, function(e){
            if(this.pitch.hitTestPitch(2)){
                // hit on the right pitch
                this.pitch.resetPitches();
            } else {
                // hit on the wrong pitch
                // game over
            }
        }.bind(this));

        this.keyboard.getChildById('mi').on(Hilo.event.POINTER_START, function(e){
            if(this.pitch.hitTestPitch(3)){
                // hit on the right pitch
                this.pitch.resetPitches();
            } else {
                // hit on the wrong pitch
                // game over
            }
        }.bind(this));

        this.keyboard.getChildById('fa').on(Hilo.event.POINTER_START, function(e){
            if(this.pitch.hitTestPitch(4)){
                // hit on the right pitch
                this.pitch.resetPitches();
            } else {
                // hit on the wrong pitch
                // game over
            }
        }.bind(this));
    },

    onUserInput: function(e){
        // this.pitch.resetPitches();
    },

    initPitch: function(){
        // init stave bg
        var bgWidth = this.width * this.scale;
        var bgHeight = this.height * this.scale;

        this.pitch = new game.Pitch({
            image: this.asset.pitch,
            width: this.width,
            height: this.height,
            layer: this.layer,
            pitchHeight: this.height / this.layer,
            pitchWidth: this.width / 4
        }).addTo(this.stave);
    },

    initBackground: function(){
        // init background context
        var bgWidth = this.width * this.scale;
        var bgHeight = this.height * this.scale;
        document.body.insertBefore(Hilo.createElement('div', {
            id: 'bg',
            style: {
                // background: 'url(images/bg.png) no-repeat',
                backgroundColor: "#D4D4D4",
                backgroundSize: bgWidth + 'px, ' + bgHeight + 'px',
                position: 'absolute',
                width: bgWidth + 'px',
                height: bgHeight + 'px'
            }
        }), this.stave.canvas);

        // init keyboard
        // this.keyboard = new Hilo.Bitmap({
        //     id: 'keyboard',
        //     image: this.asset.keyboard
        // }).addTo(this.stave);

        // setup axis y
        // this.keyboard.y = this.height - this.keyboard.height;

        // tween the keyboard
        // Hilo.Tween.to(this.keyboard, {x:-60}, {duration:300, loop:true});
    },

    gameReady: function(){
        this.state = 'ready';
        this.score = 0;
        this.pitch.reset();
    }
};

})();
