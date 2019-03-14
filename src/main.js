import Level1 from './scenes/Level1.js';
import IntroStory from './scenes/IntroStory.js';
import Bootloader from './Bootloader.js';
import Loader from './Loader.js';

const config = {
    title: "Privet Gamedev",
    version: '0.0.1',

    width: 800,
    height: 600,
    type: Phaser.AUTO,
    parent: "container",
    backgroundColor: "#000000",
    pixelArt: true,
    zoom: 1,
    physics: {
        default: "arcade",
        "arcade": {
            gravity: {
                y: 700,
            },
            debug: false,
        },
    },
    scene: [Loader, Bootloader, IntroStory, Level1]
};

const game = new Phaser.Game(config);