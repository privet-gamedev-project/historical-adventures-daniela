import Daniela from '../player/Daniela.js';

class IntroStory extends Phaser.Scene {
    constructor() {
        super({key: 'IntroStory'});
    }
    
    preload() {
        console.log('Scene: IntroStory');
    }

    create() {
        this.daniela = new Daniela({
            scene: this,
            key: 'daniela',
            x: this.sys.game.config.width/2,
            y: 100
        });
    }

    update(time, delta) {
        this.daniela.update(delta);
    }
}

export default IntroStory;
