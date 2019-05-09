class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader');
    }

    preload() {
        console.log('Bootloader :D');

        //PLUGINS
        this.load.script('scrollbar', './libs/Scrollbars.js');

        this.load.path = './assets/';

        // Assets
        this.load.pack('assets_import', 'assets_import.json', 'assets');

        // Maps
        this.load.pack('maps', '../src/worlds/maps.json', 'maps');

        //INTROSTORY ASSETS         
        this.load.image("timedoor", "img/objects/timedoor.png");

        //Parallax Background Intro
        //https://opengameart.org/content/3-parallax-backgrounds
        for (let i = 1; i <= 8; i++) {
            this.load.image("layer_0" + i, "img/backgrounds/parallax_intro/layer_0" + i + "_854x480.png");
        }

       
        // player is a sprite sheet made by 24x48 pixels
        this.load.spritesheet("daniela_intro", "img/daniela/danielaintro.png", {
            frameWidth: 124,
            frameHeight: 132
        });

        // player is a sprite sheet made by 24x48 pixels
        this.load.spritesheet("lolo_intro", "img/lolo/lolo_intro.png", {
            frameWidth: 64,
            frameHeight: 64
        });

        //BONUS LEVEL
        //Parallax Background Bonus Level
        //https://jesse-m.itch.io/jungle-pack
        for (let i = 1; i <= 5; i++) {
            this.load.image("bonus_plx_" + i, "img/backgrounds/parallax_bonus/plx-" + i + ".png");
        }
        this.load.atlas('puzzlepiece', 'img/objects/puzzlepiece/puzzlepiece.png', 'img/objects/puzzlepiece/puzzlepiece_atlas.json');
        this.load.animation('puzzlepieceAnim', 'img/objects/puzzlepiece/puzzlepiece_anim.json');

        //Level2
        //Copyright/Attribution Notice: 
        //Credit "Tio Aimar @ opengameart.org" or simply "Tio Aimar" (this is not mandatory)
        //https://opengameart.org/content/2d-platformer-forest-pack

        //Level2
        this.load.tilemapTiledJSON('Level2', '../src/worlds/level2/forestmap.json');
        this.load.image('forestPack_32x32', '../src/worlds/level2/forestPack_32x32.png');
        //Level3
        this.load.tilemapTiledJSON('Level3', '../src/worlds/level3/grasstiles.json');
        this.load.image('grasstiles', '../src/worlds/level3/grasstiles.png');

        //Level4
        this.load.tilemapTiledJSON('Level4', '../src/worlds/level4/level4.json');
        this.load.image('jungle', '../src/worlds/level4/Jungle_guide.png');
        this.load.image("liana", "img/jungle/liane.png");
        this.load.image("endOfLiana", "img/jungle/endOfLiana.png");
        this.load.atlas('crocodile', 'img/jungle/crocodile.png', 'img/jungle/crocodile_atlas.json');
        this.load.animation('crocodileAnim', 'img/jungle/crocodile_anim.json');

        //Level5
        this.load.tilemapTiledJSON('Level5', '../src/worlds/level5/map.json');
        this.load.image('woods', '../src/worlds/level5/tileset.png');


        //Level6
        this.load.tilemapTiledJSON("Level6", "../src/worlds/level6/level6.json");
        this.load.image("spritesheet", "../src/worlds/level6/spritesheet.png");
        
        
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
        //Level 3 
        this.load.image('bg_Level3', 'img/backgrounds/background_level3.png');
        //https://rgoncalves83.itch.io/free-vector-grass-tileset
        //Level 4
        this.load.image("bg_Level4", "img/backgrounds/Ocean.png");
        //Level 5 
        this.load.image("bg_Level5", "img/backgrounds/bg_level5_2130x1280.png");
        
        
        
        //Level 6
        this.load.image("bg_Level6", "img/backgrounds/bg_volcano.png");
        this.load.image('map_1', 'img/objects/map/map_1.png');
        this.load.image('map_2', 'img/objects/map/map_2.png');
        this.load.image('map_3', 'img/objects/map/map_3.png');
        
        //Credits
        this.load.image('en_Credits', 'img/backgrounds/en_credits_800w.png');
        this.load.image('es_Credits', 'img/backgrounds/es_credits_800w.png');
        this.load.image('creditsPage2', 'img/backgrounds/credits_page2.png');

        // Settings 
        this.load.image("es_flag", "img/settings/es.png");
        this.load.image("en_flag", "img/settings/gb.png");
        this.load.image("it_flag", "img/settings/it.png");
        this.load.image("de_flag", "img/settings/de.png");

        // Enemies
        //FlyingEnemy
        this.load.atlas('bats', 'img/bat/bats.png', 'img/bat/bats_atlas.json');
        this.load.animation('batsAnim', 'img/bat/bats_anim.json');

        //Bees
        this.load.atlas('bee', 'img/bee/bee.png', 'img/bee/bee_atlas.json');
        this.load.animation('beeAnim', 'img/bee/bee_anim.json');

        //Soda
        this.load.atlas('soda', 'img/soda/soda.png', 'img/soda/soda_atlas.json');
        this.load.animation('sodaAnim', 'img/soda/soda_anim.json');

        //Soda
        this.load.atlas('mamut', 'img/mamut/mamut.png', 'img/mamut/mamut_atlas.json');
        this.load.animation('mamutAnim', 'img/mamut/mamut_anim.json');

        //Fruits
        this.load.atlas('fruits', 'img/fruits/fruits.png', 'img/fruits/fruits.json');

        //Snails
        this.load.atlas('snail', 'img/snail/snail.png', 'img/snail/snail_atlas.json');
        this.load.animation('snailAnim', 'img/snail/snail_anim.json');

        //Bracelet
        this.load.atlas('bracelet', 'img/objects/bracelet/bracelet.png', 'img/objects/bracelet/bracelet_atlas.json');
        this.load.animation('braceletAnim', 'img/objects/bracelet/bracelet_anim.json');
        //CavemanClothes
        this.load.atlas('caveman_clothes', 'img/objects/caveman_clothes/caveman_clothes.png', 'img/objects/caveman_clothes/caveman_clothes_atlas.json');
        this.load.animation('caveman_clothesAnim', 'img/objects/caveman_clothes/caveman_clothes_anim.json');


        //Wheel
        this.load.atlas('wheel', 'img/wheelStone/wheelStone_32x32.png', 'img/wheelStone/wheelStone_32x32_atlas.json');
        this.load.animation('wheelAnim', 'img/wheelStone/wheelStone_32x32_anim.json');

        //Donut
        this.load.atlas('donut', 'img/donut/donut.png', 'img/donut/donut_atlas.json');
        this.load.animation('donutAnim', 'img/donut/donut_anim.json');

        //Water
        this.load.image('water', 'img/objects/water-tile.png');

        //Joystick        
        this.load.atlas('joystick', 'img/objects/joystick/joystick.png', 'img/objects/joystick/joystick_atlas.json');
        this.load.animation('joystickAnim', 'img/objects/joystick/joystick_anim.json');


        //Level2 Platform
        this.load.image("platform", "img/objects/platform.png");

        // ExtraPoints        
        this.load.atlas('extrapoint', 'img/objects/extrapoint/extrapoint.png', 'img/objects/extrapoint/extrapoint_atlas.json');
        this.load.animation('extrapointAnim', 'img/objects/extrapoint/extrapoint_anim.json');

        //Star
        this.load.image("star", "img/objects/star.png");

        //play
        this.load.image("play", "img/objects/PlayButton.png");

        //play
        this.load.image("play2", "img/objects/PlayButton2.png");


        //lock
        this.load.image("lock", "img/objects/Lock.png");

        // the firecamp is a sprite sheet made by 32x58 pixels
        this.load.spritesheet("fire", "img/objects/fire.png", {
            frameWidth: 40,
            frameHeight: 70
        });
        
        //Dinobird
        this.load.atlas("dinobird", "img/dinobird/dinobird.png", "img/dinobird/dinobird_atlas.json");
        this.load.animation("dinobirdAnim", "img/dinobird/dinobird_anim.json");

        //Dinowater
        this.load.atlas("dinowater", "img/dinowater/dinowater.png", "img/dinowater/dinowater_atlas.json");
        this.load.animation("dinowaterAnim", "img/dinowater/dinowater_anim.json");

        //MapObject
        this.load.atlas("map","img/objects/map/map.png","img/objects/map/map_atlas.json");
        this.load.animation("mapAnim", "img/objects/map/map_anim.json");


        //UI
        this.load.image('volumeOn', 'img/ui/volumeON.png');
        this.load.image('volumeOff', 'img/ui/volumeOFF.png');
        //CONTROLS (For input Touch Versions)
        this.load.image('controlUp', 'img/ui/controlUp.png');
        this.load.image('controlDown', 'img/ui/controlDown.png');
        this.load.image('controlRight', 'img/ui/controlRight.png');
        this.load.image('controlLeft', 'img/ui/controlLeft.png');

        //FONTS
        this.load.json('fontJSON', 'font/font.json');
        this.load.image('font', 'font/font.png');

        // Progress
        this.load.on('progress', (value) => {
            this.registry.events.emit('load_progress', value);
        });

        this.load.lang();

        this.scene.launch('AudioLoader');

        // When all the assests are load go to next Scene
        this.load.on("complete", () => {
            const fontJSON = this.cache.json.get('fontJSON');
            this.cache.bitmapFont.add('pixel', Phaser.GameObjects.RetroFont.Parse(this, fontJSON));

            this.scene.stop('Loader');
            this.scene.stop('AudioLoader');
            this.scene.stop('Bootloader');
            this.scene.start("Menu");
        });
    }
}
export default Bootloader;