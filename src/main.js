import UI from './scenes/UI.js';
import Menu from './scenes/Menu.js';
import SettingsLevel from './scenes/SettingsLevel.js';
import BonusLevel from './scenes/BonusLevel.js';
import LevelSelect from './scenes/LevelSelect.js';
import Scores from './scenes/Scores.js';
import Credits from './scenes/Credits.js';
import Level2 from './scenes/Level2.js';
import Level3 from './scenes/Level3.js';
import Level4 from './scenes/Level4.js';
import Level5 from './scenes/Level5.js';
import Level6 from './scenes/Level6.js';
import Level1 from './scenes/Level1.js';
import IntroStory from './scenes/IntroStory.js';
import Bootloader from './Bootloader.js';
import AudioLoader from './AudioLoader.js';
import Loader from './Loader.js';
import TG from './plugins/TG.js';

const config = {
    title: "HISTORICAL ADVENTURES OF DANIELA",
    url: "https://twitter.com/gamedev_innicia",
    version: '0.0.3',
    type: Phaser.AUTO,
    backgroundColor: "#000000",
    pixelArt: true,
    zoom: 1,
    banner:{
        hidePhaser: true,
        text:"#000000",
        background:[
            "#f4e541",
            "#ed2a3a",
            "#29c2ed",
            "#c929ed",
            "#42f4bf"]
    },
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
                disponibleLangs: ['es', 'en', "it", "de"],
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
            debug: false
        },
    },
    scene: [Loader, Bootloader, AudioLoader, Menu, SettingsLevel, BonusLevel, LevelSelect, Credits, IntroStory, Scores, Level1, Level2, Level3, Level4, Level5, Level6,   UI]
};

const game = new Phaser.Game(config);