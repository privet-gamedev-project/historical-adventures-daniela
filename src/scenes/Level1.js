import Bats from '../gameObjects/Bats.js';
import Wheels from '../gameObjects/Wheels.js';
import BasicScene from "./BasicScene.js";
import GameConstants from "../services/GameConstants.js";

class Level1 extends BasicScene {
    constructor() {
        super({
            key: GameConstants.Levels.LEVEL1
        });
        this.target = GameConstants.Levels.LEVEL2;
    }

    preload() {
       
    }


    create() {
        this.scene.launch('UI');
        const uiScene = this.scene.get('UI');

        // background
        this.bg = this.add.tileSprite(0, 0, 2560, 1440, GameConstants.Textures.BG_LEVEL1).setOrigin(0).setScale(0.65);

        //Sounds
        this.soundLEVEL1_LOLO_findBracelet = this.sound.add(GameConstants.Sound.LEVEL1_LOLO_FINDBRACELET);
        this.soundLEVEL1_LOLO_findBracelet.play();


        this.music = this.sound.add(GameConstants.Sound.CAVEBATS);
        this.addEventForMusic(this.music);


        this.soundLOLO_Bien_lo_hemos_conseguido = this.sound.add(GameConstants.Sound.LOLO_BIEN_LO_HEMOS_CONSEGUIDO);

        
        
        //Text Dialog
        this.textDialog = this.add.dynamicBitmapText(30, 570, 'pixel', GameConstants.Texts.BUSCAR_PULSERA.toUpperCase(), 16);                
        this.textDialog.setScrollFactor(0);
        this.textDialog.setDepth(3);


        //Text Health
        this.textHealth = this.add.dynamicBitmapText(30, 20, 'pixel', GameConstants.Texts.VIDAS);        
        this.textHealth.setScrollFactor(0);
        this.textHealth.setDepth(3);

        //TODO: se debería pasar los parámetros 'x' e 'y' de forma dinámica en base al mapa y la posición de inicio
        // algo parecido a lo que se hace con los murciélagos y las ruedas
        //Daniela Creation
        this.daniela = this.createDaniela(this, 100, 100);
        this.lolo = this.createLoloNormal(this, this.daniela);
        this.daniela.followedBy(this.lolo);

        //Read Tilemap
        let map = this.createMap();

        //Creating Bats         
        this.bats = this.createBats();
        this.batsGroup = new Bats(this.physics.world, this, [], this.bats);
        this.anims.play(GameConstants.Anims.BATS, this.bats);

        //Creating Wheels         
        this.wheels = this.createWheels();
        this.wheelsGroup = new Wheels(this.physics.world, this, [], this.wheels);
        this.anims.play(GameConstants.Anims.WHEEL, this.wheels);

        //Create Bracelet
        this.bracelets = this.createEndLevelObject(GameConstants.Sprites.Bracelet.KEY);
        this.physics.world.enable(this.bracelets);
        this.magicbracelet = this.bracelets[0];
        this.magicbracelet.setScale(0.75);
        this.magicbracelet.body.setAllowGravity(false);
        this.anims.play(GameConstants.Anims.BRACELET, this.magicbracelet);


        //Tilemap
        let level1Tile = map.addTilesetImage(GameConstants.Tiles.CAVE_STONE);
        let Level1 = map.createDynamicLayer(GameConstants.Layers.WORLD, level1Tile, 0, 0);
        Level1.setCollisionByExclusion([-1]);

        //Colliders
        this.physics.add.collider(this.daniela, Level1);
        this.physics.add.collider(this.batsGroup, Level1);
        this.physics.add.collider(this.wheelsGroup, Level1);
        this.physics.add.collider(this.daniela, this.magicbracelet, () => {
            //this.scene.pause();
            this.music.stop();
            this.magicbracelet.destroy();
            this.soundLOLO_Bien_lo_hemos_conseguido.play();
            console.log('Daniela encuentra pulsera magica');
            this.daniela.nextScene();
        });
        this.physics.add.overlap(this.daniela, this.bats, () => {
            this.daniela.enemyCollision();
            console.log('Daniela colisiona con murciélago');
        });
        this.physics.add.overlap(this.daniela, this.wheels, () => {
            this.daniela.enemyCollision();
            console.log('Daniela colisiona con ruedas');
        });


        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        this.cameras.main.startFollow(this.daniela);
    }

    update(time, delta) {
        this.daniela.update(delta);
        this.batsGroup.update();
        this.wheelsGroup.update();
    }
}
export default Level1;