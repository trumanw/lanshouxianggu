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

    bg: null,
    stave: null,
    keyboard: null,
    pitch: null,

    gameReadyScene: null,
    gameOverScene: null,

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

        // init parameters
        this.initBackground();
        this.initPitch();
        this.initKeyboard();
        this.initScenes();

        // ready to play
        // this.gameReady();
    },

    initScenes: function(){
        // init GameReady scene
        // this.gameReadyScene = new game.ReadyScene({
        //     width: this.width,
        //     height: this.height,
        //     image: this.asset.ready
        // }).addTo(this.stave);

        // init GameOver scene
        this.gameOverScene = new game.OverScene({
            width: this.width,
            height: this.height,
            image: this.asset.over,
            numberGlyphs: this.asset.numberGlyphs,
            visible: false
        }).addTo(this.stave);

        //绑定开始按钮事件
        this.gameOverScene.getChildById('start').on(Hilo.event.POINTER_START, function(e){
            e._stopped = true;
            this.gameOverScene.visible = false;
            // show pitch again
            this.gameReady();
        }.bind(this));
    },

    initKeyboard: function(){
        // init keyboard
        this.keyboard = new game.Keyboard({
            width: this.width,
            height: this.height,
            keyHeight: this.height / this.layer,
            keyWidth: this.width / 4
        }).addTo(this.stave);

        this.initKeyboardActions();
    },

    initKeyboardActions: function(){
        // bind actions on keyboard
        this.keyboard.getChildById('do').on(Hilo.event.POINTER_START, function(e){
            if(this.pitch.hitTestPitch(1)){
                // hit on the right pitch
                this.pitch.startMove();
            } else {
                // hit on the wrong pitch
                // game over
                this.gameOver();
            }
        }.bind(this));

        this.keyboard.getChildById('ri').on(Hilo.event.POINTER_START, function(e){
            if(this.pitch.hitTestPitch(2)){
                // hit on the right pitch
                this.pitch.startMove();
            } else {
                // hit on the wrong pitch
                // game over
                this.gameOver();
            }
        }.bind(this));

        this.keyboard.getChildById('mi').on(Hilo.event.POINTER_START, function(e){
            if(this.pitch.hitTestPitch(3)){
                // hit on the right pitch
                this.pitch.startMove();
            } else {
                // hit on the wrong pitch
                // game over
                this.gameOver();
            }
        }.bind(this));

        this.keyboard.getChildById('fa').on(Hilo.event.POINTER_START, function(e){
            if(this.pitch.hitTestPitch(4)){
                // hit on the right pitch
                this.pitch.startMove();
            } else {
                // hit on the wrong pitch
                // game over
                this.gameOver();
            }
        }.bind(this));
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
        var unitWidth = this.width / 4;
        var unitHeight = this.height / this.layer;
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

        // draw 4 stave lines
        var doChannel = new Hilo.Graphics({
            id: 'doChnl',
            x: 0,
            y: 0,
            width: unitWidth,
            height: bgHeight-unitHeight
        });
        doChannel.lineStyle(2, "#090909").drawRect(0, -2, unitWidth, this.height-unitHeight).endFill();
        var riChannel = new Hilo.Graphics({
            id: 'riChnl',
            x: 0,
            y: 0,
            width: unitWidth,
            height: bgHeight-unitHeight
        });
        doChannel.lineStyle(2, "#090909").drawRect(unitWidth, -2, unitWidth, this.height-unitHeight).endFill();
        var miChannel = new Hilo.Graphics({
            id: 'miChnl',
            x: 0,
            y: 0,
            width: unitWidth,
            height: bgHeight-unitHeight
        });
        doChannel.lineStyle(2, "#090909").drawRect(2*unitWidth, -2, unitWidth, this.height-unitHeight).endFill();
        var faChannel = new Hilo.Graphics({
            id: 'faChnl',
            x: 0,
            y: 0,
            width: unitWidth,
            height: bgHeight-unitHeight
        });
        doChannel.lineStyle(2, "#090909").drawRect(3*unitWidth, -2, unitWidth, this.height-unitHeight).endFill();

        this.stave.addChild(doChannel, riChannel, miChannel, faChannel);
    },

    gameReady: function(){
        this.state = 'ready';
        this.score = 0;
        this.pitch.reset();
        this.gameOverScene.visible = false;
        this.gameStart();
    },

    gameStart: function(){
        this.state = 'playing';
    },

    gameOver: function(){
        if(this.state !== 'over'){
            // update state of game
            this.state = 'over';
            // stop moving pitches
            this.pitch.stopMove();
            // hide pitch
            this.pitch.visible = false;
            // show the GameOver scene
            this.score = this.pitch.passThrough;
            this.gameOverScene.show(this.pitch.passThrough, this.saveBestScore());
        }
    },

    saveBestScore: function(){
        var score = this.score, best = 0;
        if(Hilo.browser.supportStorage){
            best = parseInt(localStorage.getItem('hilo-lsxg-best-score')) || 0;
        }
        if(score > best){
            best = score;
            localStorage.setItem('hilo-lsxg-best-score', score);
        }
        return best;
    }
};

})();
