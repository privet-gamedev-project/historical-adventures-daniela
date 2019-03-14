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

        // Map
        this.load.tilemapTiledJSON('Level1', '../src/worlds/level1/cavemap.json');
        this.load.image('caveStones', '../src/worlds/level1/caveStones.png');
    
        //Backgrounds
        this.load.image('bg_Level1', 'img/backgrounds/2560x1440-snapSat1800.jpg');
        //Se cambiara por un dibujo de los niños de una cueva
        //Ahora mismo esta de ejemplo
        //http://kidskunst.info/46/05451-2d-game-background-cave.htm

        // Enemy
        this.load.spritesheet('bats', 'img/bat/bat-32X32.png', {
            frameWidth: 32,
            frameHeight: 32
        });

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
        
        /*this.load.on('complete', () => {
            this.scene.start('Level1');
        });*/

        // Progress
        this.load.on('progress', (value) => {
            this.registry.events.emit('load_progress', value);
        });
        //When all the assests are load go to next Scene
        this.load.on("complete", () => {
            this.scene.stop('Loader');
            this.scene.stop('Bootloader');

            this.scene.start("Level1");
        });



        
    }

    create() {
    }
}
export default Bootloader;