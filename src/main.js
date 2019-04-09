import UI from './scenes/UI.js';
import Menu from './scenes/Menu.js';
import SettingsLevel from './scenes/SettingsLevel.js';
import LevelSelect from './scenes/LevelSelect.js';
import Scores from './scenes/Scores.js';
import Credits from './scenes/Credits.js';
import Level2 from './scenes/Level2.js';
import Level3 from './scenes/Level3.js';
import Level4 from './scenes/Level4.js';
import Level1 from './scenes/Level1.js';
import IntroStory from './scenes/IntroStory.js';
import Bootloader from './Bootloader.js';
import Loader from './Loader.js';
import TG from './plugins/TG.js';

const config = {
    title: "Privet Gamedev",
    version: '0.0.1',
    type: Phaser.AUTO,
    backgroundColor: "#000000",
    pixelArt: true,
    zoom: 1,
    scale: {
        parent: "container",
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 	854,
        height: 480,
    },
    input: {
        gamepad: true,
        queue: true,
    },
    plugins: {
        global: [{
            key: 'TG',
            plugin: TG,
            mapping: 'TG',
            data: {
                path: './src/i18n',
                disponibleLangs: ['es', 'en'],
                fallbackLang: 'en',
                spanishLangs: ['ca', 'gl', 'es', 'eu']
            }
        }]
    },
    physics: {
        default: "arcade",
        "arcade": {
            gravity: {
                y: 700,
            },
            // debug: true,
        },
    },
    scene: [Loader, Bootloader, Menu, SettingsLevel, LevelSelect, Credits, IntroStory, Scores, Level1, Level2, Level3, Level4, UI]
};

const game = new Phaser.Game(config);