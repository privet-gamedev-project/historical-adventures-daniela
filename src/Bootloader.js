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

        this.load.atlas('lolo_normal','img/lolo/lolo_normal.png','img/lolo/lolo_normal_atlas.json');
        this.load.animation('lolo_normal_Data', 'img/lolo/lolo_normal_anim.json');

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

        //Level4
        this.load.tilemapTiledJSON('Level4','../src/worlds/level4/level4.json');
        this.load.image('jungleTileset','../src/worlds/level4/Jungle_guide.png');
        this.load.image("liane","img/jungle/liane.png");
    
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
        //https://www.gameart2d.com/free-platformer-game-tileset.html
        //Level 4
        this.load.image("oceanBackground","img/backgrounds/Ocean.png");
        //Credits
        this.load.image('bg_Credits', 'img/backgrounds/credits.png');
        


        // Enemy
        this.load.atlas('bats', 'img/bat/bats.png', 'img/bat/bats_atlas.json');
        this.load.animation('batsAnim', 'img/bat/bats_anim.json');

        this.load.atlas('bee', 'img/bee/bee.png', 'img/bee/bee_atlas.json');
        this.load.animation('beeAnim', 'img/bee/bee_anim.json');

        //Bracelet
        this.load.atlas('bracelet', 'img/objects/bracelet/bracelet.png', 'img/objects/bracelet/bracelet_atlas.json');
        this.load.animation('braceletAnim', 'img/objects/bracelet/bracelet_anim.json');
        //CavemanClothes
        this.load.atlas('caveman_clothes', 'img/objects/caveman_clothes/caveman_clothes.png', 'img/objects/caveman_clothes/caveman_clothes_atlas.json');
        this.load.animation('caveman_clothesAnim', 'img/objects/caveman_clothes/caveman_clothes_anim.json');


        //Wheel
        this.load.atlas('wheel', 'img/wheelStone/wheelStone_32x32.png', 'img/wheelStone/wheelStone_32x32_atlas.json');
        this.load.animation('wheelAnim', 'img/wheelStone/wheelStone_32x32_anim.json');

        //Water
        this.load.image('water', 'img/objects/water-tile.png');
        
        //Joystick        
        this.load.atlas('joystick', 'img/objects/joystick/joystick.png', 'img/objects/joystick/joystick_atlas.json');
        this.load.animation('joystickAnim', 'img/objects/joystick/joystick_anim.json');


        //Level2 Platform
        this.load.image("platform", "img/objects/platform.png");

        // Coin
        //TODO: Cambiar por Pintura Rupestre
         this.load.spritesheet("coin", "img/objects/coin.png", {
            frameWidth: 20,
            frameHeight: 20
        });

        
        // the firecamp is a sprite sheet made by 32x58 pixels
        this.load.spritesheet("fire", "img/objects/fire.png", {
            frameWidth: 40,
            frameHeight: 70
        });


        //Sounds
        this.load.audio("soundJump", "sounds/jump.mp3");
        this.load.audio("danielaAuch", "sounds/Daniela_Auch.ogg");
        this.load.audio("es_LEVEL1_LOLO_findBracelet","sounds/dialogs/LEVEL1_LOLO_BuscaPulsera.ogg");
        this.load.audio("en_LEVEL1_LOLO_findBracelet","sounds/dialogs/LEVEL1_LOLO_MagicBracelet.ogg");
        this.load.audio("es_LOLO_WE_DID_IT","sounds/LOLO_Bien_lo_hemos_conseguido.ogg");
        this.load.audio("en_LOLO_WE_DID_IT","sounds/LOLO_Allright_We_did_it.ogg");
        this.load.audio("CaveBats","sounds/backgrounds/CaveBats.mp3");
        /*
        https://opengameart.org/content/cave-bats
        Copyright/Attribution Notice: 
        Please credit music by Dan Knoflicek
        */       
        this.load.audio("caveManBgSound","sounds/backgrounds/caveManBgSound.mp3");
        //By Xololex (Gonzalo)
        
        this.load.audio('LEVEL2_LOLO_findClothes','sounds/dialogs/LEVEL2_LOLO_findClothes.mp3');
        

        //UI
        this.load.image('volumeOn','img/ui/volumeON.png');
        this.load.image('volumeOff','img/ui/volumeOFF.png');
        //CONTROLS (For input Touch Versions)
        this.load.image('controlUp','img/ui/controlUp.png');        
        this.load.image('controlRight','img/ui/controlRight.png');        
        this.load.image('controlLeft','img/ui/controlLeft.png');        
        
        //FONTS
        this.load.json('fontJSON', 'font/font.json');
        this.load.image('font', 'font/font.png');       
            
        // Progress
        this.load.on('progress', (value) => {
            this.registry.events.emit('load_progress', value);
        });

        this.load.lang();
        // When all the assests are load go to next Scene
        this.load.on("complete", () => {
            const fontJSON = this.cache.json.get('fontJSON');
            this.cache.bitmapFont.add('pixel', Phaser.GameObjects.RetroFont.Parse(this, fontJSON));

            this.scene.stop('Loader');
            this.scene.stop('Bootloader');

            this.scene.start("Menu");
        });



        
    }

    create() {
    }
}
export default Bootloader;