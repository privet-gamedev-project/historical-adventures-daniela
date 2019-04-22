import DB from "./services/DB.js";
import GameConstants from "./services/GameConstants.js";


class Loader extends Phaser.Scene {
    constructor() {
        super('Loader');
    }

    init() {
        //store.clearAll(); 
        DB.createDB([{key: GameConstants.DB.DBNAME, value: DB.DB}]);
        /*store.each(function(key, value) {
            console.log(key, '->', value);           
        });*/

    }

    preload() {
        this.scene.launch('Bootloader');

        //PROGRESS BAR
        var width = this.cameras.main.width;
        var height = this.cameras.main.height;

        let x = width / 2 - 10;
        let y = height / 2 + 30;
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0xffffff, 0.5);
        progressBox.fillRect(x - 140, y - 10, 320, 50);

        var loadingText = this.make.text({
            x: width / 2 - 5,
            y: height / 2 - 30,
            text: 'Loading...',
            style: {
                font: '20px monospace',
                fill: '#ffffff'
            }
        });
        loadingText.setOrigin(0.5, 0.5);

        var percentText = this.make.text({
            x: width / 2 - 10,
            y: height / 2 - 2,
            text: '0%',
            style: {
                font: '18px monospace',
                fill: '#ffffff'
            }
        });
        percentText.setOrigin(0.5, 0.5);

        //While Loading show Progress Bar with percent
        this.registry.events.on('load_progress', (value) => {
            percentText.setText(parseInt(value * 100) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(x - 130, y, 300 * value, 30);
        });
    }
}

export default Loader;