class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader'); 
    }

    preload() {
        console.log('Bootloader :D');
        //LOAD ALL ASSETS
        this.load.path = './assets/';
        this.load.atlas('daniela', 'img/daniela/daniela.png', 'img/daniela/daniela_atlas.json');
        this.load.animation('danielaData', 'img/daniela/daniela_anim.json');

        // Maps
        //Level1
        this.load.tilemapTiledJSON('Level1', '../src/worlds/level1/cavemap.json');
        this.load.image('caveStones', '../src/worlds/level1/caveStones.png');
        //Level2
        //Copyright/Attribution Notice: 
        //Credit "Tio Aimar @ opengameart.org" or simply "Tio Aimar" (this is not mandatory)
        //https://opengameart.org/content/2d-platformer-forest-pack
        
        //Level2
        this.load.tilemapTiledJSON('Level2', '../src/worlds/level2/forestmap.json');
        this.load.image('forestPack_32x32', '../src/worlds/level2/forestPack_32x32.png');

    
        //BACKGROUNDS
        //Menu
        this.load.image('bg_Menu', 'img/backgrounds/dibujoPortadaEscaneado.png');
        //Level1
        this.load.image('bg_Level1', 'img/backgrounds/2560x1440-snapSat1800.jpg');
        //Se cambiara por un dibujo de los niños de una cueva
        //Ahora mismo esta de ejemplo
        //http://kidskunst.info/46/05451-2d-game-background-cave.htm
        //Level2
        this.load.image('bg_Level2', 'img/backgrounds/bg_forest.png');


        // Enemy
        this.load.atlas('bats', 'img/bat/bats.png', 'img/bat/bats_atlas.json');
        this.load.animation('batsAnim', 'img/bat/bats_anim.json');

        //Bracelet
        this.load.spritesheet('bracelet', 'img/objects/bracelet.png', {
            frameWidth: 64,
            frameHeight: 64
        });

        //Wheel
        this.load.spritesheet('wheel', 'img/wheelStone/wheelStone_Spritesheet_32x32x4.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        //Water
        this.load.image('water', 'img/objects/water-tile.png');
        

        //Sounds
        this.load.audio("soundJump", "sounds/jump.mp3");
        this.load.audio("danielaAuch", "sounds/Daniela_Auch.mp3");
        this.load.audio("LEVEL1_LOLO_findBracelet","sounds/dialogs/LEVEL1_LOLO_findBracelet.mp3");
        this.load.audio("LOLO_Bien_lo_hemos_conseguido","sounds/LOLO_Bien_lo_hemos_conseguido.mp3");
        this.load.audio("CaveBats","sounds/backgrounds/CaveBats.mp3");
        /*
        https://opengameart.org/content/cave-bats
        Copyright/Attribution Notice: 
        Please credit music by Dan Knoflicek
        */

        // Progress
        this.load.on('progress', (value) => {
            this.registry.events.emit('load_progress', value);
        });
        // When all the assests are load go to next Scene
        this.load.on("complete", () => {
            this.scene.stop('Loader');
            this.scene.stop('Bootloader');

            this.scene.start("Menu");
        });



        
    }

    create() {
    }
}
export default Bootloader;